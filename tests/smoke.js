const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const root = path.resolve(__dirname, '..');
const app = fs.readFileSync(path.join(root, 'assets/js/app.js'), 'utf8');
const server = fs.readFileSync(path.join(root, 'server/server.js'), 'utf8');

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

(async () => {
  assert((app.match(/e\.target\.closest\('#enterBtn'\)/g) || []).length === 1,
    'Welcome page must have exactly one ENTER STORE handler.');
  assert(app.includes('welcomeUnlocked=false;') && app.includes("dataset.welcomeLocked='1'"),
    'Welcome page must start locked.');
  assert(app.includes('showStore({force:true})'),
    'ENTER STORE must explicitly unlock the storefront.');
  assert(!app.includes("const oldEnter=$x('#enterBtn')"),
    'Duplicate ENTER STORE handler remains.');
  assert(!server.includes('const requestedUnit=Number(item.unitPrice)'),
    'Server must not trust browser-supplied unit prices.');
  assert(server.includes('const basePrice=Math.max(0,Number(product.price||0));'),
    'Server must calculate price from its product catalog.');
  assert(server.includes('const discountPct=Math.max(0,Math.min(100,Number(product.discountPct||0)));'),
    'Server must apply authoritative product discounts.');

  const port = 3017;
  const child = spawn(process.execPath, [path.join(root, 'server/server.js')], {
    cwd: root,
    env: { ...process.env, PORT: String(port), HOST: '127.0.0.1' },
    stdio: ['ignore', 'pipe', 'pipe']
  });
  let output = '';
  child.stdout.on('data', d => output += d);
  child.stderr.on('data', d => output += d);
  const deadline = Date.now() + 5000;
  let ready = false;
  while (Date.now() < deadline) {
    try {
      const r = await fetch(`http://127.0.0.1:${port}/api/health`);
      if (r.ok) { ready = true; break; }
    } catch (_) {}
    await new Promise(r => setTimeout(r, 100));
  }
  assert(ready, 'Backend health endpoint did not start. ' + output);
  const health = await (await fetch(`http://127.0.0.1:${port}/api/health`)).json();
  assert(health.ok === true, 'Backend health endpoint returned an unexpected response.');
  const products = await (await fetch(`http://127.0.0.1:${port}/api/products`)).json();
  assert(Array.isArray(products.products), 'Products endpoint failed.');

  // Admin login regression: known fresh-install credentials must create a usable session.
  const badLogin = await fetch(`http://127.0.0.1:${port}/api/admin/login`, {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({username:'admin',password:'wrong-password'})});
  assert(badLogin.status === 401, 'Invalid admin credentials must be rejected.');
  const login = await fetch(`http://127.0.0.1:${port}/api/admin/login`, {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({username:process.env.ADMIN_USER||'admin',password:process.env.ADMIN_PASSWORD||'FLAXX2026'})});
  assert(login.ok, 'Default fresh-install admin login failed: ' + await login.text());
  const cookie = (login.headers.get('set-cookie')||'').split(';')[0];
  assert(cookie.startsWith('valvi_admin_session='), 'Admin login did not set an admin session cookie.');
  const dashboard = await fetch(`http://127.0.0.1:${port}/api/admin/dashboard`, {headers:{Cookie:cookie}});
  assert(dashboard.ok, 'Admin session could not access the protected dashboard.');
  child.kill();

  console.log(`VALVIMART smoke tests passed: ${products.products.length} products loaded.`);
})().catch(err => {
  console.error('VALVIMART smoke tests FAILED:', err.message);
  process.exitCode = 1;
});


// Product deletion persistence regression: an empty product catalogue must stay empty.
const serverPath = path.join(__dirname, '..', 'server', 'server.js');
const serverSource = fs.readFileSync(serverPath, 'utf8');
assert(!serverSource.includes('db.products = seedProducts;'), 'Server must not reseed an intentionally empty product catalogue');
assert(serverSource.includes('if(!Array.isArray(db.products)){ db.products = [];'), 'Server must preserve empty product catalogues');
console.log('VALVIMART product deletion persistence regression check passed');
