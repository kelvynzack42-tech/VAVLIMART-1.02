const http = require("http");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
// Load local .env without requiring an extra package.
try {
  const envFile = path.join(__dirname, "..", ".env");
  if (fs.existsSync(envFile)) {
    fs.readFileSync(envFile, "utf8").split(/\r?\n/).forEach(line => {
      const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
      if (m && process.env[m[1]] === undefined) {
        let v = m[2].trim();
        if ((v.startsWith("\"") && v.endsWith("\"")) || (v.startsWith("\'") && v.endsWith("\'"))) v = v.slice(1,-1);
        process.env[m[1]] = v;
      }
    });
  }
} catch (_) {}
const ROOT = path.join(__dirname, "..");
const DATA = path.join(__dirname, "data");
const DB = path.join(DATA, "db.json");
const PORT = Number(process.env.PORT || 3000);
const HOST = process.env.HOST || "0.0.0.0";
const SESSION_TTL = 1000 * 60 * 60 * 24 * 7;
const RESET_TTL = 1000 * 60 * 15;
const VERIFY_TTL = 1000 * 60 * 10;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'kelvynzack42@gmail.com';
const resetTokens = new Map();
const authCodes = new Map();
const adminSessions = new Map();
const MANAGER_ROLES = {'web-manager':['dashboard','products','categories','events'],'inventory-manager':['dashboard','products'],'orders-care':['dashboard','orders','customers','messages'],'marketing-manager':['dashboard','events'],'support-agent':['dashboard','messages']};
const ROLE_LABELS = {'executive-admin':'Executive Admin','web-manager':'Web Manager','inventory-manager':'Inventory Manager','orders-care':'Orders & Customer Care','marketing-manager':'Marketing Manager','support-agent':'Support Agent'};
const ADMIN_USER = process.env.ADMIN_USER || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'FLAXX2026';
const ADMIN_SESSION_TTL = 1000 * 60 * 60 * 12;
// Google Identity Services uses a public web client ID. Keep the known working
// VALVIMART client ID as a safe fallback so Google Sign-In does not disappear
// when Render has not yet injected the environment variable.
const DEFAULT_GOOGLE_CLIENT_ID = '844332259125-43spp0jse0gbk1i4j5oc9flpabu8fno6.apps.googleusercontent.com';
const GOOGLE_CLIENT_ID = String(process.env.GOOGLE_CLIENT_ID || DEFAULT_GOOGLE_CLIENT_ID).trim();
const GOOGLE_CLIENT_SECRET = String(process.env.GOOGLE_CLIENT_SECRET || '').trim();
const GOOGLE_REDIRECT_URI = String(process.env.GOOGLE_REDIRECT_URI || `http://localhost:${PORT}/auth/google/callback`).trim();

function ensureDB(){
  // Create the data directory before creating db.json.
  // This is required on a fresh Windows extraction and on Render.
  fs.mkdirSync(DATA, { recursive: true });
  const seedFile = path.join(DATA, "..", "seed-products.json");
  const seedProducts = fs.existsSync(seedFile) ? JSON.parse(fs.readFileSync(seedFile, "utf8")) : [];
  if(!fs.existsSync(DB)){
    fs.writeFileSync(DB, JSON.stringify({
      users: [], managers: [], products: seedProducts, orders: [], sessions: [], messages: [], admin: {username: ADMIN_USER, salt: null, passwordHash: null, name: 'VALVIMART Administrator', email: ADMIN_EMAIL, phone: '', address: ''}, coupons: [
        {code:"WELCOME10", type:"percent", value:10, active:true}
      ]
    }, null, 2));
    return;
  }
  // Existing databases are authoritative. Never reseed an empty product list:
  // an empty list can be intentional after an administrator deletes products.
  // Only repair missing top-level collections, while preserving the exact product
  // catalogue chosen by the administrator.
  try {
    const db = JSON.parse(fs.readFileSync(DB, "utf8"));
    let changed = false;
    if(!Array.isArray(db.products)){ db.products = []; changed = true; }
    if(!Array.isArray(db.users)){ db.users=[]; changed = true; }
    if(!Array.isArray(db.managers)){ db.managers=[]; changed = true; }
    if(!Array.isArray(db.orders)){ db.orders=[]; changed = true; }
    if(!Array.isArray(db.sessions)){ db.sessions=[]; changed = true; }
    if(!Array.isArray(db.messages)){ db.messages=[]; changed = true; }
    if(!Array.isArray(db.events)){ db.events=[]; changed = true; }
    if(!db.admin || typeof db.admin !== 'object'){ db.admin={username:ADMIN_USER,salt:null,passwordHash:null,name:'VALVIMART Administrator',email:ADMIN_EMAIL,phone:'',address:''}; changed=true; }
    if(!db.admin.username) db.admin.username=ADMIN_USER;
    if(!db.admin.name) db.admin.name='VALVIMART Administrator';
    if(!db.admin.email) db.admin.email=ADMIN_EMAIL;
    if(!Array.isArray(db.coupons)){ db.coupons=[{code:"WELCOME10", type:"percent", value:10, active:true}]; changed = true; }
    if(changed) fs.writeFileSync(DB, JSON.stringify(db,null,2));
  } catch (_) {}
}
function readDB(){ ensureDB(); return JSON.parse(fs.readFileSync(DB,"utf8")); }
function writeDB(db){ fs.writeFileSync(DB, JSON.stringify(db,null,2)); }
function json(res,status,data){
  const body=JSON.stringify(data);
  res.writeHead(status, {"Content-Type":"application/json; charset=utf-8","Cache-Control":"no-store"});
  res.end(body);
}
function parseCookies(req){
  const out={};
  (req.headers.cookie||"").split(";").forEach(x=>{
    const i=x.indexOf("="); if(i<0)return;
    out[x.slice(0,i).trim()]=decodeURIComponent(x.slice(i+1).trim());
  });
  return out;
}
function readBody(req){
  return new Promise((resolve,reject)=>{
    let b=""; req.on("data",c=>{b+=c;if(b.length>1e6)req.destroy();});
    req.on("end",()=>{try{resolve(b?JSON.parse(b):{})}catch(e){reject(e)}});
    req.on("error",reject);
  });
}
function hashPassword(password,salt=crypto.randomBytes(16).toString("hex")){
  return {salt,hash:crypto.scryptSync(password,salt,64).toString("hex")};
}
function verifyPassword(password,u){
  const h=crypto.scryptSync(password,u.salt,64).toString("hex");
  return crypto.timingSafeEqual(Buffer.from(h,"hex"),Buffer.from(u.passwordHash,"hex"));
}
function token(){return crypto.randomBytes(32).toString("hex");}
function currentUser(req,db){
  const sid=parseCookies(req).valvi_session;
  const s=db.sessions.find(x=>x.id===sid && x.expires>Date.now());
  return s ? db.users.find(u=>u.id===s.userId) : null;
}
function publicUser(u){
  if(!u)return null;
  return {id:u.id,first:u.first,last:u.last,email:u.email,phone:u.phone,address:u.address,avatar:u.avatar||null,provider:u.provider||"local",created:u.created};
}
function sendFile(res,file){
  const ext=path.extname(file).toLowerCase();
  const types={".html":"text/html; charset=utf-8",".css":"text/css",".js":"text/javascript",".json":"application/json",".png":"image/png",".jpg":"image/jpeg",".jpeg":"image/jpeg",".svg":"image/svg+xml",".webp":"image/webp"};
  if(!fs.existsSync(file)) return json(res,404,{error:"Not found"});
  res.writeHead(200,{"Content-Type":types[ext]||"application/octet-stream"});
  fs.createReadStream(file).pipe(res);
}
function id(prefix){return prefix+"-"+crypto.randomBytes(4).toString("hex").toUpperCase();}
function adminSession(req){ const sid=parseCookies(req).valvi_admin_session; const session=adminSessions.get(sid); if(!session || session.expires<Date.now()) return null; return session; }
function adminUser(req){ return Boolean(adminSession(req)); }
function requireAdmin(req,res){
  const session=adminSession(req);
  if(!session){json(res,401,{error:"Manager or administrator login required"});return false;}
  if(session.role==='executive-admin') return true;
  const pathOnly=new URL(req.url, 'http://localhost').pathname;
  const allowed=MANAGER_ROLES[session.role]||[];
  let area='';
  if(pathOnly.endsWith('/dashboard')) area='dashboard';
  else if(pathOnly.includes('/products')) area='products';
  else if(pathOnly.includes('/categories')) area='categories';
  else if(pathOnly.includes('/events')) area='events';
  else if(pathOnly.includes('/orders')) area='orders';
  else if(pathOnly.includes('/customers') || pathOnly.includes('/users')) area='customers';
  else if(pathOnly.includes('/messages')) area='messages';
  if(!allowed.includes(area)){json(res,403,{error:'Your assigned role does not permit this action.'});return false;}
  return true;
}
function requireExecutive(req,res){ const session=adminSession(req); if(!session){json(res,401,{error:'Executive admin login required'});return false;} if(session.role!=='executive-admin'){json(res,403,{error:'Only the Executive Admin can manage staff accounts.'});return false;} return true; }

async function sendEmail(to, subject, text){
  const key=process.env.RESEND_API_KEY;
  if(!key) throw new Error('Email delivery is not configured. Set RESEND_API_KEY in .env.');
  const from=process.env.MAIL_FROM || `VALVIMART <onboarding@resend.dev>`;
  const r=await fetch('https://api.resend.com/emails',{method:'POST',headers:{'Authorization':`Bearer ${key}`,'Content-Type':'application/json'},body:JSON.stringify({from,to,subject,text})});
  if(!r.ok){ let detail=''; try{const d=await r.json();detail=d.message||d.error||''}catch(_){} throw new Error(detail||'Unable to deliver email'); }
  return r.json();
}

function normalizeE164(phone){
  let v=String(phone||'').trim().replace(/[^0-9+]/g,'');
  if(/^0\d{7,14}$/.test(v)) v='+233'+v.slice(1);
  return v;
}

async function api(req,res){
  const requestUrl = new URL(req.url, `http://${req.headers.host || HOST}`);
  const p=requestUrl.pathname;
  const db=readDB();

  if(req.method==="GET" && p==="/api/health") return json(res,200,{ok:true,backend:"VALVIMART",time:new Date().toISOString()});
  if(req.method==="GET" && p==="/api/config") return json(res,200,{googleClientId:GOOGLE_CLIENT_ID,googleEnabled:Boolean(GOOGLE_CLIENT_ID),googleRedirectUri:GOOGLE_REDIRECT_URI});

  // Standard Google OAuth redirect callback. The visible Google button currently
  // uses the Google Identity Services ID-token flow, but this route is available
  // when a standard OAuth redirect flow is used.
  if(req.method==="GET" && p==="/auth/google/callback") {
    const q=Object.fromEntries(requestUrl.searchParams.entries());
    const code=String(q.code||'').trim();
    const error=String(q.error||'').trim();
    if(error || !code) return sendFile(res,path.join(ROOT,'index.html'));
    if(!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) return json(res,503,{error:"Google OAuth callback is not fully configured. Set GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET and GOOGLE_REDIRECT_URI."});
    try {
      const tokenResponse=await fetch('https://oauth2.googleapis.com/token',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams({code,client_id:GOOGLE_CLIENT_ID,client_secret:GOOGLE_CLIENT_SECRET,redirect_uri:GOOGLE_REDIRECT_URI,grant_type:'authorization_code'})});
      const tokens=await tokenResponse.json();
      if(!tokenResponse.ok || !tokens.id_token) return json(res,401,{error:"Google authorization code could not be exchanged"});
      const info=await fetch('https://oauth2.googleapis.com/tokeninfo?id_token='+encodeURIComponent(tokens.id_token));
      if(!info.ok) return json(res,401,{error:"Google identity could not be verified"});
      const g=await info.json();
      if(String(g.aud||'')!==GOOGLE_CLIENT_ID || String(g.email_verified||'').toLowerCase()!=='true') return json(res,401,{error:"Google identity verification failed"});
      const email=String(g.email||'').trim().toLowerCase();
      if(!email) return json(res,401,{error:"Google account did not provide an email address"});
      let u=db.users.find(x=>x.email===email);
      // Google is a LOGIN method here, not an automatic registration method.
      // A customer must first create a VALVIMART account before Google sign-in can be used.
      if(!u) return json(res,401,{error:"No VALVIMART account exists for this Google email. Please register an account first."});
      const first=String(g.given_name||'').trim(), last=String(g.family_name||'').trim();
      if(u.status!=="active") return json(res,403,{error:`Account is ${u.status}`});
      u.provider='google'; u.googleSub=String(g.sub||u.googleSub||''); if(g.picture)u.avatar=String(g.picture); if(first)u.first=first; if(last)u.last=last;
      const sid=token(); db.sessions.push({id:sid,userId:u.id,expires:Date.now()+SESSION_TTL}); writeDB(db);
      res.writeHead(302,{Location:'/index.html?google=success'}); return res.end();
    } catch(e) { return json(res,502,{error:"Google OAuth callback service is temporarily unavailable"}); }
  }
  if(req.method==="GET" && p==="/api/me") {
    const u=currentUser(req,db);
    return json(res,200,{authenticated:Boolean(u),user:publicUser(u)});
  }

  // Customer account details are persisted in the server database, not only in the browser.
  if(req.method==="PATCH" && p==="/api/account") {
    const u=currentUser(req,db);
    if(!u) return json(res,401,{error:"Login required"});
    const b=await readBody(req);
    const first=String(b.first ?? u.first ?? '').trim();
    const last=String(b.last ?? u.last ?? '').trim();
    const phone=String(b.phone ?? u.phone ?? '').trim();
    const address=String(b.address ?? u.address ?? '').trim();
    if(!first || !last || phone.replace(/\D/g,'').length<7) return json(res,400,{error:"First name, last name and a valid phone number are required"});
    const duplicate=db.users.find(x=>x.id!==u.id && String(x.phone||'').replace(/\D/g,'')===phone.replace(/\D/g,''));
    if(duplicate) return json(res,409,{error:"That phone number is already used by another account"});
    u.first=first; u.last=last; u.phone=phone; u.address=address;
    writeDB(db);
    return json(res,200,{user:publicUser(u)});
  }

  if(req.method==="POST" && p==="/api/auth/register"){
    const b=await readBody(req);
    const email=String(b.email||"").trim().toLowerCase(), password=String(b.password||"");
    const first=String(b.first||"").trim(), last=String(b.last||"").trim();
    const phone=String(b.phone||"").trim(), address=String(b.address||"").trim();
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || password.length<6) return json(res,400,{error:"Valid email and password (6+ characters) are required"});
    if(!first || !last || phone.replace(/\\D/g,'').length<7) return json(res,400,{error:"First name, last name and a valid phone number are required"});
    if(db.users.some(u=>u.email===email)) return json(res,409,{error:"An account with this email already exists. Use login or forgot password."});
    const ph=hashPassword(password);
    const u={id:id("USR"),first,last,email,phone,address,salt:ph.salt,passwordHash:ph.hash,status:"active",provider:"local",emailVerified:true,created:new Date().toISOString()};
    db.users.push(u);
    const sid=token();
    db.sessions.push({id:sid,userId:u.id,expires:Date.now()+SESSION_TTL});
    writeDB(db);
    res.setHeader("Set-Cookie",`valvi_session=${sid}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${SESSION_TTL/1000}${req.headers["x-forwarded-proto"]==="https" || req.headers.host?.startsWith("https://") ? "; Secure" : ""}`);
    return json(res,201,{user:publicUser(u)});
  }

  if(req.method==="POST" && p==="/api/auth/google") {
    if(!GOOGLE_CLIENT_ID) return json(res,503,{error:"Google Sign-In is not configured yet. Add GOOGLE_CLIENT_ID to .env."});
    const b=await readBody(req);
    const credential=String(b.credential||'').trim();
    if(!credential) return json(res,400,{error:"Google credential is required"});
    try {
      const r=await fetch('https://oauth2.googleapis.com/tokeninfo?id_token='+encodeURIComponent(credential));
      if(!r.ok) return json(res,401,{error:"Google authentication could not be verified"});
      const g=await r.json();
      if(String(g.aud||'')!==GOOGLE_CLIENT_ID) return json(res,401,{error:"Google client ID does not match this store"});
      if(String(g.email_verified||'').toLowerCase()!=='true') return json(res,401,{error:"Google email is not verified"});
      const email=String(g.email||'').trim().toLowerCase();
      if(!email) return json(res,401,{error:"Google account did not provide an email address"});
      let u=db.users.find(x=>x.email===email);
      // Google sign-in is only available to customers who already registered.
      if(!u) return json(res,401,{error:"No VALVIMART account exists for this Google email. Please register an account first."});
      const first=String(g.given_name||'').trim();
      const last=String(g.family_name||'').trim();
      if(u.status!=="active") return json(res,403,{error:`Account is ${u.status}`});
      u.provider='google'; u.googleSub=String(g.sub||u.googleSub||''); if(g.picture)u.avatar=String(g.picture); if(first)u.first=first; if(last)u.last=last;
      const sid=token(); db.sessions.push({id:sid,userId:u.id,expires:Date.now()+SESSION_TTL}); writeDB(db);
      res.setHeader("Set-Cookie",`valvi_session=${sid}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${SESSION_TTL/1000}${req.headers["x-forwarded-proto"]==="https" || req.headers.host?.startsWith("https://") ? "; Secure" : ""}`);
      return json(res,200,{user:publicUser(u),google:true});
    } catch(e) {
      return json(res,502,{error:"Google authentication service is temporarily unavailable"});
    }
  }

  if(req.method==="POST" && p==="/api/auth/login"){
    const b=await readBody(req), identifier=String(b.identifier||b.email||"").trim(), email=identifier.toLowerCase(), password=String(b.password||"");
    const normalizedPhone=identifier.replace(/\D/g,'');
    const u=db.users.find(x=>x.email===email || (normalizedPhone && String(x.phone||'').replace(/\D/g,'')===normalizedPhone));
    if(!u) return json(res,401,{error:"Incorrect login details"});
    if(!u.passwordHash || !u.salt || !verifyPassword(password,u)) return json(res,401,{error:"Incorrect login details"});
    if(u.status!=="active") return json(res,403,{error:`Account is ${u.status}`});
    const sid=token(); db.sessions.push({id:sid,userId:u.id,expires:Date.now()+SESSION_TTL});
    writeDB(db);
    res.setHeader("Set-Cookie",`valvi_session=${sid}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${SESSION_TTL/1000}${req.headers["x-forwarded-proto"]==="https" || req.headers.host?.startsWith("https://") ? "; Secure" : ""}`);
    return json(res,200,{user:publicUser(u)});
  }

  if(req.method==="POST" && p==="/api/auth/login/verify"){
    const b=await readBody(req), email=String(b.email||"").trim().toLowerCase(), code=String(b.code||"").trim();
    const pending=authCodes.get('login:'+email);
    if(!pending || pending.expires<Date.now() || pending.code!==code) return json(res,400,{error:"Invalid or expired verification code"});
    const u=db.users.find(x=>x.id===pending.userId && x.email===email);
    if(!u || u.status!=="active"){authCodes.delete('login:'+email);return json(res,403,{error:"Account is not active"});}
    const sid=token(); db.sessions.push({id:sid,userId:u.id,expires:Date.now()+SESSION_TTL}); authCodes.delete('login:'+email); writeDB(db);
    res.setHeader("Set-Cookie",`valvi_session=${sid}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${SESSION_TTL/1000}${req.headers["x-forwarded-proto"]==="https" || req.headers.host?.startsWith("https://") ? "; Secure" : ""}`);
    return json(res,200,{user:publicUser(u)});
  }


  if(req.method==="POST" && p==="/api/auth/request-reset"){
    const b=await readBody(req), email=String(b.email||'').trim().toLowerCase(), phone=String(b.phone||'').trim();
    const u=db.users.find(x=>x.email===email && String(x.phone||'').replace(/\D/g,'')===phone.replace(/\D/g,''));
    if(!u) return json(res,400,{error:'The email and phone number do not match an account'});
    const code=String(crypto.randomInt(100000,999999));
    resetTokens.set(email,{code,expires:Date.now()+RESET_TTL,phone:phone.replace(/\D/g,'')});
    try{
      await sendEmail(email,'VALVIMART password reset verification code',
        `A password reset was requested for your VALVIMART account.\n\nVerification code: ${code}\n\nThis code expires in 15 minutes. If you did not request this reset, ignore this email.`);
    }catch(e){
      resetTokens.delete(email);
      return json(res,503,{error:e.message});
    }
    return json(res,200,{ok:true,message:'Verification code sent to your account email'});
  }

  if(req.method==="POST" && p==="/api/auth/reset-password"){
    const b=await readBody(req), email=String(b.email||'').trim().toLowerCase(), phone=String(b.phone||'').trim().replace(/\D/g,''), code=String(b.code||'').trim(), password=String(b.password||'');
    const u=db.users.find(x=>x.email===email && String(x.phone||'').replace(/\D/g,'')===phone);
    const t=resetTokens.get(email);
    if(!u||!t||t.expires<Date.now()||t.code!==code)return json(res,400,{error:'Invalid or expired verification code'});
    if(password.length<6)return json(res,400,{error:'Password must be at least 6 characters'});
    const ph=hashPassword(password);u.salt=ph.salt;u.passwordHash=ph.hash;u.emailVerified=true;resetTokens.delete(email);writeDB(db);
    return json(res,200,{ok:true,message:'Password changed successfully'});
  }

  if(req.method==="POST" && p==="/api/auth/logout"){
    const sid=parseCookies(req).valvi_session; db.sessions=db.sessions.filter(s=>s.id!==sid); writeDB(db);
    res.setHeader("Set-Cookie","valvi_session=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0");
    return json(res,200,{ok:true});
  }

  if(req.method==="GET" && p==="/api/events") return json(res,200,{events:(Array.isArray(db.events)?db.events:[]).filter(e=>e.active!==false)});
  if(req.method==="GET" && p==="/api/admin/events") { if(!requireAdmin(req,res)) return; return json(res,200,{events:Array.isArray(db.events)?db.events:[]}); }
  if(req.method==="POST" && p==="/api/admin/events") {
    if(!requireAdmin(req,res)) return;
    const b=await readBody(req), title=String(b.title||'').trim(), message=String(b.message||'').trim(), image=String(b.image||'');
    if(!title || !image.startsWith('data:image/')) return json(res,400,{error:'Event title and a valid image are required'});
    if(image.length>4_500_000) return json(res,413,{error:'Image is too large. Use an image under 3 MB.'});
    if(!Array.isArray(db.events)) db.events=[];
    const event={id:crypto.randomUUID(),title,message,image,active:true,createdAt:new Date().toISOString()};db.events.unshift(event);writeDB(db);return json(res,201,{event});
  }
  if(req.method==="DELETE" && p.startsWith("/api/admin/events/")) {
    if(!requireAdmin(req,res)) return;const eid=decodeURIComponent(p.split('/').pop());db.events=(Array.isArray(db.events)?db.events:[]).filter(e=>String(e.id)!==eid);writeDB(db);return json(res,200,{ok:true});
  }

  if(req.method==="POST" && p==="/api/admin/login") {
    const b=await readBody(req), username=String(b.username||'').trim().toLowerCase(), password=String(b.password||'');
    const manager=(Array.isArray(db.managers)?db.managers:[]).find(m=>m.username.toLowerCase()===username && m.active!==false);
    let role='executive-admin', loginUser='';
    if(manager){ if(!verifyPassword(password,manager)) return json(res,401,{error:'Invalid manager username or password'}); role=manager.role; loginUser=manager.username; }
    else { const stored=db.admin && db.admin.username ? db.admin : null; loginUser=stored?.username || ADMIN_USER; const validPassword=stored?.passwordHash ? verifyPassword(password, stored) : password===ADMIN_PASSWORD; if(username!==String(loginUser).trim().toLowerCase() || !validPassword) return json(res,401,{error:'Invalid username or password'}); }
    const sid=token(); adminSessions.set(sid,{expires:Date.now()+ADMIN_SESSION_TTL,role,username:loginUser});
    res.setHeader("Set-Cookie",`valvi_admin_session=${sid}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${ADMIN_SESSION_TTL/1000}${(String(req.headers["x-forwarded-proto"]||"").split(",")[0].trim()==="https" || !!req.socket.encrypted) ? "; Secure" : ""}`);
    return json(res,200,{ok:true,user:{username:loginUser,role,roleLabel:ROLE_LABELS[role]||'Manager'}});
  }
  if(req.method==='GET' && p==='/api/admin/managers') { if(!requireExecutive(req,res)) return; return json(res,200,{managers:(db.managers||[]).map(({id,username,name,role,active,createdAt})=>({id,username,name,role,roleLabel:ROLE_LABELS[role],active:active!==false,createdAt}))}); }
  if(req.method==='POST' && p==='/api/admin/managers') {
    if(!requireExecutive(req,res)) return; const b=await readBody(req), username=String(b.username||'').trim(), name=String(b.name||'').trim(), password=String(b.password||''), role=String(b.role||'');
    if(username.length<3 || !/^[a-zA-Z0-9._-]+$/.test(username)) return json(res,400,{error:'Username must be at least 3 characters and use letters, numbers, dots, underscores or hyphens.'});
    if(name.length<2 || password.length<8) return json(res,400,{error:'Enter a manager name and a password of at least 8 characters.'});
    if(!Object.prototype.hasOwnProperty.call(MANAGER_ROLES,role)) return json(res,400,{error:'Choose a valid fixed manager role.'});
    if(username.toLowerCase()===(db.admin?.username||ADMIN_USER).toLowerCase() || (db.managers||[]).some(m=>m.username.toLowerCase()===username.toLowerCase())) return json(res,409,{error:'That username is already assigned.'});
    const ph=hashPassword(password), manager={id:crypto.randomUUID(),username,name,role,active:true,createdAt:new Date().toISOString(),salt:ph.salt,passwordHash:ph.hash}; if(!Array.isArray(db.managers))db.managers=[];db.managers.push(manager);writeDB(db);
    return json(res,201,{manager:{id:manager.id,username,name,role,roleLabel:ROLE_LABELS[role],active:true,createdAt:manager.createdAt}});
  }
  if(req.method==='PATCH' && p.startsWith('/api/admin/managers/')) {
    if(!requireExecutive(req,res)) return;
    const mid=decodeURIComponent(p.split('/').pop()), b=await readBody(req), manager=(db.managers||[]).find(m=>m.id===mid);
    if(!manager)return json(res,404,{error:'Manager not found'});
    const username=typeof b.username==='string'?b.username.trim():manager.username;
    const name=typeof b.name==='string'?b.name.trim():manager.name;
    const role=typeof b.role==='string'?b.role:manager.role;
    if(username.length<3 || !/^[a-zA-Z0-9._-]+$/.test(username)) return json(res,400,{error:'Username must be at least 3 characters and use letters, numbers, dots, underscores or hyphens.'});
    if(name.length<2) return json(res,400,{error:'Manager name must contain at least 2 characters.'});
    if(!Object.prototype.hasOwnProperty.call(MANAGER_ROLES,role)) return json(res,400,{error:'Choose a valid fixed manager role.'});
    if(username.toLowerCase()===(db.admin?.username||ADMIN_USER).toLowerCase() || (db.managers||[]).some(m=>m.id!==mid && m.username.toLowerCase()===username.toLowerCase())) return json(res,409,{error:'That username is already assigned.'});
    if(typeof b.active==='boolean') manager.active=b.active;
    manager.username=username; manager.name=name; manager.role=role;
    if(b.password){if(String(b.password).length<8)return json(res,400,{error:'Password must be at least 8 characters.'});const ph=hashPassword(String(b.password));manager.salt=ph.salt;manager.passwordHash=ph.hash;}
    writeDB(db);
    return json(res,200,{ok:true,manager:{id:manager.id,username:manager.username,name:manager.name,role:manager.role,roleLabel:ROLE_LABELS[manager.role],active:manager.active!==false}});
  }
  if(req.method==="POST" && p==="/api/admin/logout") {
    const sid=parseCookies(req).valvi_admin_session; adminSessions.delete(sid);
    res.setHeader("Set-Cookie","valvi_admin_session=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0");
    return json(res,200,{ok:true});
  }
  if(req.method==="GET" && p==="/api/admin/me") {
    const a=db.admin || {}, session=adminSession(req);
    return json(res,200,{authenticated:Boolean(session),username:session?.username||a.username||ADMIN_USER,role:session?.role||null,roleLabel:ROLE_LABELS[session?.role]||'',name:a.name||'VALVIMART Administrator',email:a.email||ADMIN_EMAIL,phone:a.phone||'',address:a.address||''});
  }
  if(req.method==="PATCH" && p==="/api/admin/profile") {
    if(!requireAdmin(req,res)) return;
    const b=await readBody(req), a=db.admin || {};
    const username=String(b.username||'').trim();
    const name=String(b.name||'').trim();
    const email=String(b.email||'').trim().toLowerCase();
    const phone=String(b.phone||'').trim();
    const address=String(b.address||'').trim();
    if(!username || !name || !email) return json(res,400,{error:'Name, email and username are required'});
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json(res,400,{error:'Enter a valid admin email'});
    a.username=username; a.name=name; a.email=email; a.phone=phone; a.address=address;
    if(String(b.password||'')){ if(String(b.password).length<6)return json(res,400,{error:'Password must be at least 6 characters'}); const ph=hashPassword(String(b.password)); a.salt=ph.salt; a.passwordHash=ph.hash; }
    db.admin=a; writeDB(db);
    return json(res,200,{ok:true,profile:{username:a.username,name:a.name,email:a.email,phone:a.phone,address:a.address}});
  }
  if(req.method==="GET" && p==="/api/admin/dashboard") {
    if(!requireAdmin(req,res)) return;
    const now=Date.now();
    const users=db.users.map(u=>{
      const sessions=db.sessions.filter(s=>s.userId===u.id && s.expires>now);
      return {...publicUser(u),status:u.status||'active',accountStatus:'registered',loginStatus:sessions.length?'Logged in':'Not logged in',activeSessions:sessions.length};
    });
    const role=adminSession(req)?.role||'executive-admin'; const allow=MANAGER_ROLES[role]||[]; return json(res,200,{products:(role==='executive-admin'||allow.includes('products'))?db.products:[],users:(role==='executive-admin'||allow.includes('customers'))?users:[],registeredUsers:(role==='executive-admin'||allow.includes('customers'))?users.length:0,orders:(role==='executive-admin'||allow.includes('orders'))?db.orders:[],coupons:role==='executive-admin'?db.coupons:[],messages:(role==='executive-admin'||allow.includes('messages'))?(Array.isArray(db.messages)?db.messages:[]):[],role,roleLabel:ROLE_LABELS[role]||'Manager'});
  }
  if(req.method==="GET" && p==="/api/admin/customers") {
    if(!requireAdmin(req,res)) return;
    const now=Date.now();
    const customers=db.users.map(u=>{
      const sessions=db.sessions.filter(s=>s.userId===u.id && s.expires>now);
      return {...publicUser(u),status:u.status||'active',accountStatus:'registered',loginStatus:sessions.length?'Logged in':'Not logged in',activeSessions:sessions.length};
    });
    return json(res,200,{customers,registeredUsers:customers.length});
  }
  if(req.method==="POST" && p==="/api/admin/products/sync") {
    if(!requireAdmin(req,res)) return; const b=await readBody(req); if(!Array.isArray(b.products)) return json(res,400,{error:'Products must be an array'}); db.products=b.products; writeDB(db); return json(res,200,{products:db.products});
  }
  if(req.method==="POST" && p==="/api/admin/products") {
    if(!requireAdmin(req,res)) return; const b=await readBody(req); if(!b.name || Number.isNaN(Number(b.price))) return json(res,400,{error:'Name and valid price are required'}); const rawId=Number(b.id); const product={...b,id:Number.isFinite(rawId)&&rawId>0?rawId:Date.now(),price:Number(b.price),stock:Number(b.stock||0),group:String(b.group||b.type||"Unisex")}; const i=db.products.findIndex(x=>String(x.id)===String(product.id)); if(i>=0) db.products[i]=product; else db.products.unshift(product); writeDB(db); return json(res,200,{product});
  }
  if(req.method==="DELETE" && p.startsWith("/api/admin/products/")) {
    if(!requireAdmin(req,res)) return; const pid=decodeURIComponent(p.split('/').pop()); db.products=db.products.filter(x=>String(x.id)!==pid); writeDB(db); return json(res,200,{ok:true});
  }
  if(req.method==="POST" && p==="/api/admin/orders/sync") {
    if(!requireAdmin(req,res)) return; const b=await readBody(req); if(!Array.isArray(b.orders)) return json(res,400,{error:'Orders must be an array'}); db.orders=b.orders; writeDB(db); return json(res,200,{orders:db.orders});
  }
  if(req.method==="PATCH" && p.startsWith("/api/admin/orders/")) {
    if(!requireAdmin(req,res)) return; const oid=decodeURIComponent(p.split('/').pop()), b=await readBody(req), o=db.orders.find(x=>String(x.id)===oid); if(!o)return json(res,404,{error:'Order not found'}); if(b.status){const allowed=['Order Received','Order Processing','Order Confirm','Order Delivered']; if(!allowed.includes(String(b.status))) return json(res,400,{error:'Invalid order status'}); o.status=String(b.status);}
    if(b.paymentStatus)o.paymentStatus=b.paymentStatus; if(typeof b.stockRestored==='boolean')o.stockRestored=b.stockRestored; writeDB(db); return json(res,200,{order:o});
  }
  if(req.method==="PATCH" && p.startsWith("/api/admin/users/")) {
    if(!requireAdmin(req,res)) return; const email=decodeURIComponent(p.split('/').pop()).toLowerCase(), b=await readBody(req), u=db.users.find(x=>x.email===email); if(!u)return json(res,404,{error:'Customer not found'}); if(b.status)u.status=b.status; writeDB(db); return json(res,200,{user:publicUser(u)});
  }
  if(req.method==="POST" && p==="/api/admin/messages") {
    if(!requireAdmin(req,res)) return;
    const b=await readBody(req);
    const email=String(b.email||'').trim().toLowerCase();
    const subject=String(b.subject||'').trim();
    const body=String(b.body||'').trim();
    const u=db.users.find(x=>x.email===email);
    if(!u) return json(res,404,{error:'Customer not found'});
    if(!subject || !body) return json(res,400,{error:'Subject and message are required'});
    if(!Array.isArray(db.messages)) db.messages=[];
    const message={id:id('MSG'),userId:u.id,userEmail:u.email,subject,body,createdAt:new Date().toISOString(),read:false,from:'admin'};
    db.messages.push(message);
    writeDB(db);
    let emailSent=false;
    if(process.env.RESEND_API_KEY){ try { await sendEmail(u.email, subject, body); emailSent=true; } catch(_) {} }
    return json(res,201,{message,emailSent});
  }
  if(req.method==="POST" && p==="/api/messages") {
    const u=currentUser(req,db);
    if(!u) return json(res,401,{error:'Login required'});
    const b=await readBody(req);
    const subject=String(b.subject||'').trim(), body=String(b.body||'').trim();
    if(!subject || !body) return json(res,400,{error:'Subject and message are required'});
    if(!Array.isArray(db.messages)) db.messages=[];
    const message={id:id('MSG'),userId:u.id,userEmail:u.email,subject,body,createdAt:new Date().toISOString(),read:false,from:'system'};
    db.messages.push(message);
    writeDB(db);
    return json(res,201,{message});
  }
  if(req.method==="GET" && p==="/api/messages") {
    const u=currentUser(req,db);
    if(!u) return json(res,401,{error:'Login required'});
    const list=(Array.isArray(db.messages)?db.messages:[]).filter(m=>String(m.userId||'')===String(u.id)||String(m.userEmail||'').toLowerCase()===String(u.email).toLowerCase()).sort((a,b)=>new Date(b.createdAt||0)-new Date(a.createdAt||0));
    list.forEach(m=>{m.read=true});
    writeDB(db);
    return json(res,200,{messages:list});
  }
  if(req.method==="DELETE" && p.startsWith("/api/admin/users/")) {
    if(!requireAdmin(req,res)) return; const email=decodeURIComponent(p.split('/').pop()).toLowerCase(); db.users=db.users.filter(x=>x.email!==email); db.sessions=db.sessions.filter(s=>db.users.some(u=>u.id===s.userId)); writeDB(db); return json(res,200,{ok:true});
  }

  if(req.method==="GET" && p==="/api/products") return json(res,200,{products:db.products});
  if(req.method==="GET" && p==="/api/orders"){
    const u=currentUser(req,db); if(!u)return json(res,401,{error:"Login required"});
    return json(res,200,{orders:db.orders.filter(o=>String(o.userId||'')===String(u.id)||String(o.userEmail||'').toLowerCase()===String(u.email||'').toLowerCase())});
  }

  if(req.method==="GET" && p.startsWith("/api/orders/") && p.split('/').length===4){
    const u=currentUser(req,db); if(!u)return json(res,401,{error:"Login required"});
    const oid=decodeURIComponent(p.split('/').pop()||'').trim();
    const order=db.orders.find(o=>String(o.id).toUpperCase()===oid.toUpperCase());
    if(!order)return json(res,404,{error:"Order not found"});
    const owns=String(order.userId||'')===String(u.id)||String(order.userEmail||'').toLowerCase()===String(u.email||'').toLowerCase();
    if(!owns)return json(res,403,{error:"You can only track your own orders"});
    return json(res,200,{order});
  }

  if(req.method==="POST" && p==="/api/orders"){
    const u=currentUser(req,db); if(!u)return json(res,401,{error:"Login required"});
    const b=await readBody(req), items=Array.isArray(b.items)?b.items:[];
    if(!items.length)return json(res,400,{error:"Cart is empty"});
    for(const item of items){
      const product=db.products.find(x=>String(x.id)===String(item.id));
      const qty=Math.max(1,Number(item.qty||0));
      if(!product)return json(res,400,{error:`Product ${item.name||item.id} is no longer available`});
      if(Number(product.stock||0)<qty)return json(res,409,{error:`Insufficient stock for ${product.name}`});
    }
    for(const item of items){const product=db.products.find(x=>String(x.id)===String(item.id));product.stock=Number(product.stock||0)-Math.max(1,Number(item.qty||0));}
    const orderItems=items.map(item=>{
      const product=db.products.find(x=>String(x.id)===String(item.id));
      const qty=Math.max(1,Number(item.qty||0));
      // NEVER trust price/unitPrice supplied by the browser. Recalculate from the
      // server-side catalog so a modified request cannot lower the checkout total.
      const basePrice=Math.max(0,Number(product.price||0));
      const discountPct=Math.max(0,Math.min(100,Number(product.discountPct||0)));
      const unitPrice=Math.max(0,basePrice*(1-discountPct/100));
      return {
        id:product.id,
        name:String(product.name||item.name||'Product'),
        title:String(product.name||item.name||'Product'),
        image:product.imageData||('assets/products/'+String(product.img||'')),
        qty,
        size:item.size||'',
        unitPrice
      };
    });
    // Total is calculated exclusively from authoritative server-side prices/discounts.
    const total=orderItems.reduce((sum,item)=>sum+(Number(item.unitPrice)||0)*item.qty,0);
    const paymentMethod=String(b.paymentMethod||"Cash on delivery");
    const order={id:id("FX"),userId:u.id,userEmail:u.email,customer:String(b.customer||`${u.first||''} ${u.last||''}`).trim(),phone:String(b.phone||u.phone||''),address:String(b.address||u.address||''),items:orderItems,total,paymentMethod,paymentStatus:paymentMethod==="Cash on delivery"?"not_required":"pending",status:"Order Received",created:new Date().toISOString()};
    db.orders.push(order); writeDB(db); return json(res,201,{order,products:db.products});
  }

  if(req.method==="POST" && p==="/api/coupons"){
    const b=await readBody(req), code=String(b.code||"").trim().toUpperCase();
    const c=db.coupons.find(x=>x.code===code&&x.active);
    return c ? json(res,200,{valid:true,coupon:{code:c.code,type:c.type,value:c.value}}) : json(res,404,{valid:false,error:"Invalid or expired coupon"});
  }

  return json(res,404,{error:"API route not found"});
}

const server=http.createServer(async(req,res)=>{
  try{
    if(req.url.startsWith("/api/")) return await api(req,res);
    let pathname=decodeURIComponent(new URL(req.url, `http://${req.headers.host || HOST}`).pathname);
    // Discreet manager entry point. It routes to the existing server-authenticated
    // management login; the URL itself is not an authentication mechanism.
    if(pathname==="/manager-access" || pathname==="/manager-access/" || pathname==="/manager-access.html"){
      res.writeHead(302, {Location:"/index.html?admin=1", "Cache-Control":"no-store"});
      return res.end();
    }
    if(pathname==="/") pathname="/index.html";
    const relative=pathname.replace(/^\/+/,"");
    const file=path.resolve(ROOT,relative);
    const publicRoot=path.resolve(ROOT);
    const allowed=pathname==="/index.html" || pathname==="/admin.html" || relative.startsWith("assets/");
    if(!allowed || !(file===publicRoot || file.startsWith(publicRoot + path.sep))) return json(res,403,{error:"Forbidden"});
    sendFile(res,file);
  }catch(e){ console.error(e); json(res,500,{error:"Server error"}); }
});
ensureDB();
server.listen(PORT,HOST,()=>console.log(`VALVIMART running at http://${HOST}:${PORT}`));
