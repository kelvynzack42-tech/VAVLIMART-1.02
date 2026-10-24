
/* ================= INLINE SCRIPT 1 ================= */


const money=n=>'GH₵'+Number(n||0).toLocaleString('en-GH',{minimumFractionDigits:2,maximumFractionDigits:2});
// ValviMart brand migration: preserve existing customer data created under legacy storage keys.
(function migrateLegacyBrandStorage(){
  try{
    const prefixes=['flaxx_','flexx_'];
    const allKeys=[];
    for(let i=0;i<localStorage.length;i++){ const k=localStorage.key(i); if(k) allKeys.push(k); }
    allKeys.forEach(k=>{
      if(!prefixes.some(prefix=>k.startsWith(prefix))) return;
      const nk=k.replace(/^flaxx_/,'valvi_').replace(/^flexx_/,'valvi_');
      if(!localStorage.getItem(nk)){
        const value=localStorage.getItem(k);
        if(value!==null) localStorage.setItem(nk,value);
      }
    });
  }catch(e){ console.warn('ValviMart legacy storage migration skipped',e); }
})();
const KEY={products:'valvi_products_v4',categories:'valvi_categories_v4',users:'valvi_users_v4',current:'valvi_current_user_v4',favourites:'valvi_favourites_v4',cart:'valvi_cart_v4',orders:'valvi_orders_v4',admin:'valvi_admin_v4',support:'valvi_support_email_v4',messages:'valvi_messages_v4',reviews:'valvi_reviews_v4'};
const defaultCategories=["Men", "Women", "Unisex", "Sneakers", "Watches", "Bags", "Phones & Tablets", "Computers & Laptops", "Electronics", "Home Appliances", "Furniture", "Office Supplies", "Beauty & Personal Care", "Groceries", "Baby & Kids", "Sports & Fitness", "Hardware & Tools", "Kitchen & Dining", "Home & Living", "Books & Education"];
const baseProducts=[
{id:1,name:'Abstract Arrow Sleeveless',price:120,group:'Men',img:'p1.jpg',sizes:['S','M','L','XL','XXL'],desc:'Premium everyday sleeveless design.',stock:18,featured:true},
{id:2,name:'Abstract Arrow Sleeveless',price:120,group:'Men',img:'p2.jpg',sizes:['S','M','L','XL','XXL'],desc:'Clean streetwear fit.',stock:15,featured:false},
{id:3,name:'Abstract Arrow T-Shirt',price:130,group:'Men',img:'p3.jpg',sizes:['S','M','L','XL','XXL'],desc:'Statement tee with a relaxed fit.',stock:20,featured:true},
{id:4,name:'Abstract Arrow T-Shirt',price:130,group:'Men',img:'p4.jpg',sizes:['S','M','L','XL','XXL'],desc:'Modern casual essential.',stock:20,featured:false},
{id:5,name:'Bold Black Watch',price:250,group:'Men',img:'p5.jpg',sizes:[],desc:'Bold everyday watch.',stock:8,featured:true},
{id:6,name:'Classic High Sneaker',price:350,group:'Men',img:'p6.jpg',sizes:[],desc:'High-top street sneaker.',stock:10,featured:false},
{id:7,name:'Premium Designer Bag',price:400,group:'Men',img:'p7.jpg',sizes:[],desc:'Structured statement bag.',stock:6,featured:false},
{id:8,name:'Abstract Arrow Crop Top',price:100,group:'Women',img:'p8.jpg',sizes:['S','M','L','XL'],desc:'Cropped fashion essential.',stock:14,featured:true},
{id:9,name:'Abstract Arrow Crop Top',price:100,group:'Women',img:'p9.jpg',sizes:['S','M','L','XL'],desc:'Fresh seasonal crop top.',stock:13,featured:false},
{id:10,name:'Abstract Arrow Oversized Tee',price:140,group:'Women',img:'p10.jpg',sizes:['S','M','L','XL'],desc:'Relaxed oversized tee.',stock:18,featured:true},
{id:11,name:'Abstract Arrow Oversized Tee',price:140,group:'Women',img:'p11.jpg',sizes:['S','M','L','XL'],desc:'Soft everyday oversized fit.',stock:17,featured:false},
{id:12,name:'Elegant Rose Watch',price:280,group:'Women',img:'p12.jpg',sizes:[],desc:'Elegant rose-tone watch.',stock:7,featured:true},
{id:13,name:'Fashion Chunky Sneaker',price:380,group:'Women',img:'p13.jpg',sizes:[],desc:'Chunky fashion sneaker.',stock:11,featured:false},
{id:14,name:'Luxury Designer Bag',price:450,group:'Women',img:'p14.jpg',sizes:[],desc:'Luxury-inspired designer bag.',stock:5,featured:true},
{id:15,name:'Abstract Arrow Sleeveless',price:120,group:'Unisex',img:'p15.jpg',sizes:['S','M','L','XL','XXL'],desc:'Unisex streetwear essential.',stock:16,featured:false},
{id:16,name:'Abstract Arrow T-Shirt',price:130,group:'Unisex',img:'p16.jpg',sizes:['S','M','L','XL','XXL'],desc:'Unisex statement tee.',stock:20,featured:true},
{id:17,name:'Abstract Arrow Hoodie',price:220,group:'Unisex',img:'p17.jpg',sizes:['S','M','L','XL','XXL'],desc:'Comfortable premium hoodie.',stock:12,featured:true},
{id:18,name:'Abstract Arrow Hoodie',price:220,group:'Unisex',img:'p18.jpg',sizes:['S','M','L','XL','XXL'],desc:'Relaxed unisex hoodie.',stock:10,featured:false},
{id:19,name:'Sport Force Watch',price:230,group:'Unisex',img:'p19.jpg',sizes:[],desc:'Sport-inspired everyday watch.',stock:9,featured:false},
{id:20,name:'Street Style Sneaker',price:320,group:'Unisex',img:'p20.jpg',sizes:[],desc:'Clean street-style sneaker.',stock:14,featured:true},
{id:21,name:'Premium Travel Bag',price:480,group:'Unisex',img:'p21.jpg',sizes:[],desc:'Premium travel-ready bag.',stock:6,featured:false}
];
const expandedProducts=[{"id": 100, "name": "Android Smartphone", "price": 1250, "group": "Phones & Tablets", "img": "v12.jpg", "sizes": [], "desc": "Android Smartphone from VALVIMART phones & tablets collection. Product details and availability can be managed by the store administrator.", "stock": 10, "featured": true}, {"id": 101, "name": "4G Tablet", "price": 980, "group": "Phones & Tablets", "img": "p17.jpg", "sizes": [], "desc": "4G Tablet from VALVIMART phones & tablets collection. Product details and availability can be managed by the store administrator.", "stock": 13, "featured": false}, {"id": 102, "name": "Fast Charging Adapter", "price": 85, "group": "Phones & Tablets", "img": "p18.jpg", "sizes": [], "desc": "Fast Charging Adapter from VALVIMART phones & tablets collection. Product details and availability can be managed by the store administrator.", "stock": 16, "featured": false}, {"id": 103, "name": "Wireless Earbuds", "price": 160, "group": "Phones & Tablets", "img": "p19.jpg", "sizes": [], "desc": "Wireless Earbuds from VALVIMART phones & tablets collection. Product details and availability can be managed by the store administrator.", "stock": 19, "featured": false}, {"id": 104, "name": "Student Laptop", "price": 4200, "group": "Computers & Laptops", "img": "v56.jpg", "sizes": [], "desc": "Student Laptop from VALVIMART computers & laptops collection. Product details and availability can be managed by the store administrator.", "stock": 10, "featured": true}, {"id": 105, "name": "Wireless Keyboard & Mouse", "price": 240, "group": "Computers & Laptops", "img": "p21.jpg", "sizes": [], "desc": "Wireless Keyboard & Mouse from VALVIMART computers & laptops collection. Product details and availability can be managed by the store administrator.", "stock": 13, "featured": false}, {"id": 106, "name": "USB-C Hub", "price": 180, "group": "Computers & Laptops", "img": "p1.jpg", "sizes": [], "desc": "USB-C Hub from VALVIMART computers & laptops collection. Product details and availability can be managed by the store administrator.", "stock": 16, "featured": false}, {"id": 107, "name": "Laptop Backpack", "price": 220, "group": "Computers & Laptops", "img": "v26.jpg", "sizes": [], "desc": "Laptop Backpack from VALVIMART computers & laptops collection. Product details and availability can be managed by the store administrator.", "stock": 19, "featured": false}, {"id": 108, "name": "Smart LED Television", "price": 3200, "group": "Electronics", "img": "p3.jpg", "sizes": [], "desc": "Smart LED Television from VALVIMART electronics collection. Product details and availability can be managed by the store administrator.", "stock": 10, "featured": true}, {"id": 109, "name": "Bluetooth Speaker", "price": 390, "group": "Electronics", "img": "p4.jpg", "sizes": [], "desc": "Bluetooth Speaker from VALVIMART electronics collection. Product details and availability can be managed by the store administrator.", "stock": 13, "featured": false}, {"id": 110, "name": "Power Bank", "price": 210, "group": "Electronics", "img": "p5.jpg", "sizes": [], "desc": "Power Bank from VALVIMART electronics collection. Product details and availability can be managed by the store administrator.", "stock": 16, "featured": false}, {"id": 111, "name": "Home Wi-Fi Router", "price": 480, "group": "Electronics", "img": "p6.jpg", "sizes": [], "desc": "Home Wi-Fi Router from VALVIMART electronics collection. Product details and availability can be managed by the store administrator.", "stock": 19, "featured": false}, {"id": 112, "name": "Standing Fan", "price": 650, "group": "Home Appliances", "img": "p7.jpg", "sizes": [], "desc": "Standing Fan from VALVIMART home appliances collection. Product details and availability can be managed by the store administrator.", "stock": 10, "featured": true}, {"id": 113, "name": "Microwave Oven", "price": 1250, "group": "Home Appliances", "img": "p8.jpg", "sizes": [], "desc": "Microwave Oven from VALVIMART home appliances collection. Product details and availability can be managed by the store administrator.", "stock": 13, "featured": false}, {"id": 114, "name": "Electric Kettle", "price": 190, "group": "Home Appliances", "img": "p9.jpg", "sizes": [], "desc": "Electric Kettle from VALVIMART home appliances collection. Product details and availability can be managed by the store administrator.", "stock": 16, "featured": false}, {"id": 115, "name": "Washing Machine", "price": 4900, "group": "Home Appliances", "img": "v02.jpg", "sizes": [], "desc": "Washing Machine from VALVIMART home appliances collection. Product details and availability can be managed by the store administrator.", "stock": 19, "featured": false}, {"id": 116, "name": "Modern Study Desk", "price": 1150, "group": "Furniture", "img": "p11.jpg", "sizes": [], "desc": "Modern Study Desk from VALVIMART furniture collection. Product details and availability can be managed by the store administrator.", "stock": 10, "featured": true}, {"id": 117, "name": "Office Chair", "price": 980, "group": "Furniture", "img": "p12.jpg", "sizes": [], "desc": "Office Chair from VALVIMART furniture collection. Product details and availability can be managed by the store administrator.", "stock": 13, "featured": false}, {"id": 118, "name": "Two-Seater Sofa", "price": 3800, "group": "Furniture", "img": "p13.jpg", "sizes": [], "desc": "Two-Seater Sofa from VALVIMART furniture collection. Product details and availability can be managed by the store administrator.", "stock": 16, "featured": false}, {"id": 119, "name": "Bedside Table", "price": 650, "group": "Furniture", "img": "p14.jpg", "sizes": [], "desc": "Bedside Table from VALVIMART furniture collection. Product details and availability can be managed by the store administrator.", "stock": 19, "featured": false}, {"id": 120, "name": "A4 Paper Ream", "price": 75, "group": "Office Supplies", "img": "p15.jpg", "sizes": [], "desc": "A4 Paper Ream from VALVIMART office supplies collection. Product details and availability can be managed by the store administrator.", "stock": 10, "featured": true}, {"id": 121, "name": "Inkjet Printer", "price": 1450, "group": "Office Supplies", "img": "p16.jpg", "sizes": [], "desc": "Inkjet Printer from VALVIMART office supplies collection. Product details and availability can be managed by the store administrator.", "stock": 13, "featured": false}, {"id": 122, "name": "Office Stapler Set", "price": 55, "group": "Office Supplies", "img": "p17.jpg", "sizes": [], "desc": "Office Stapler Set from VALVIMART office supplies collection. Product details and availability can be managed by the store administrator.", "stock": 16, "featured": false}, {"id": 123, "name": "Desk Organizer", "price": 120, "group": "Office Supplies", "img": "v27.jpg", "sizes": [], "desc": "Desk Organizer from VALVIMART office supplies collection. Product details and availability can be managed by the store administrator.", "stock": 19, "featured": false}, {"id": 124, "name": "Skincare Gift Set", "price": 220, "group": "Beauty & Personal Care", "img": "v14.jpg", "sizes": [], "desc": "Skincare Gift Set from VALVIMART beauty & personal care collection. Product details and availability can be managed by the store administrator.", "stock": 10, "featured": true}, {"id": 125, "name": "Hair Dryer", "price": 260, "group": "Beauty & Personal Care", "img": "p20.jpg", "sizes": [], "desc": "Hair Dryer from VALVIMART beauty & personal care collection. Product details and availability can be managed by the store administrator.", "stock": 13, "featured": false}, {"id": 126, "name": "Electric Trimmer", "price": 180, "group": "Beauty & Personal Care", "img": "p21.jpg", "sizes": [], "desc": "Electric Trimmer from VALVIMART beauty & personal care collection. Product details and availability can be managed by the store administrator.", "stock": 16, "featured": false}, {"id": 127, "name": "Body Care Bundle", "price": 150, "group": "Beauty & Personal Care", "img": "v40.jpg", "sizes": [], "desc": "Body Care Bundle from VALVIMART beauty & personal care collection. Product details and availability can be managed by the store administrator.", "stock": 19, "featured": false}, {"id": 128, "name": "Rice 5kg", "price": 145, "group": "Groceries", "img": "p2.jpg", "sizes": [], "desc": "Rice 5kg from VALVIMART groceries collection. Product details and availability can be managed by the store administrator.", "stock": 10, "featured": true}, {"id": 129, "name": "Cooking Oil 3L", "price": 115, "group": "Groceries", "img": "p3.jpg", "sizes": [], "desc": "Cooking Oil 3L from VALVIMART groceries collection. Product details and availability can be managed by the store administrator.", "stock": 13, "featured": false}, {"id": 130, "name": "Breakfast Cereal Pack", "price": 65, "group": "Groceries", "img": "p4.jpg", "sizes": [], "desc": "Breakfast Cereal Pack from VALVIMART groceries collection. Product details and availability can be managed by the store administrator.", "stock": 16, "featured": false}, {"id": 131, "name": "Beverage Family Pack", "price": 95, "group": "Groceries", "img": "p5.jpg", "sizes": [], "desc": "Beverage Family Pack from VALVIMART groceries collection. Product details and availability can be managed by the store administrator.", "stock": 19, "featured": false}, {"id": 132, "name": "Baby Care Kit", "price": 180, "group": "Baby & Kids", "img": "p6.jpg", "sizes": [], "desc": "Baby Care Kit from VALVIMART baby & kids collection. Product details and availability can be managed by the store administrator.", "stock": 10, "featured": true}, {"id": 133, "name": "Kids School Backpack", "price": 150, "group": "Baby & Kids", "img": "v04.jpg", "sizes": [], "desc": "Kids School Backpack from VALVIMART baby & kids collection. Product details and availability can be managed by the store administrator.", "stock": 13, "featured": false}, {"id": 134, "name": "Baby Feeding Set", "price": 95, "group": "Baby & Kids", "img": "v48.jpg", "sizes": [], "desc": "Baby Feeding Set from VALVIMART baby & kids collection. Product details and availability can be managed by the store administrator.", "stock": 16, "featured": false}, {"id": 135, "name": "Educational Building Blocks", "price": 210, "group": "Baby & Kids", "img": "p9.jpg", "sizes": [], "desc": "Educational Building Blocks from VALVIMART baby & kids collection. Product details and availability can be managed by the store administrator.", "stock": 19, "featured": false}, {"id": 136, "name": "Yoga Mat", "price": 160, "group": "Sports & Fitness", "img": "p10.jpg", "sizes": [], "desc": "Yoga Mat from VALVIMART sports & fitness collection. Product details and availability can be managed by the store administrator.", "stock": 10, "featured": true}, {"id": 137, "name": "Adjustable Dumbbell Pair", "price": 520, "group": "Sports & Fitness", "img": "v53.jpg", "sizes": [], "desc": "Adjustable Dumbbell Pair from VALVIMART sports & fitness collection. Product details and availability can be managed by the store administrator.", "stock": 13, "featured": false}, {"id": 138, "name": "Football", "price": 190, "group": "Sports & Fitness", "img": "p12.jpg", "sizes": [], "desc": "Football from VALVIMART sports & fitness collection. Product details and availability can be managed by the store administrator.", "stock": 16, "featured": false}, {"id": 139, "name": "Skipping Rope", "price": 45, "group": "Sports & Fitness", "img": "p13.jpg", "sizes": [], "desc": "Skipping Rope from VALVIMART sports & fitness collection. Product details and availability can be managed by the store administrator.", "stock": 19, "featured": false}, {"id": 140, "name": "Car Phone Holder", "price": 85, "group": "Automotive", "img": "p14.jpg", "sizes": [], "desc": "Car Phone Holder from VALVIMART automotive collection. Product details and availability can be managed by the store administrator.", "stock": 10, "featured": true}, {"id": 141, "name": "Tyre Inflator", "price": 380, "group": "Automotive", "img": "p15.jpg", "sizes": [], "desc": "Tyre Inflator from VALVIMART automotive collection. Product details and availability can be managed by the store administrator.", "stock": 13, "featured": false}, {"id": 142, "name": "Car Cleaning Kit", "price": 130, "group": "Automotive", "img": "p16.jpg", "sizes": [], "desc": "Car Cleaning Kit from VALVIMART automotive collection. Product details and availability can be managed by the store administrator.", "stock": 16, "featured": false}, {"id": 143, "name": "Seat Organizer", "price": 110, "group": "Automotive", "img": "p17.jpg", "sizes": [], "desc": "Seat Organizer from VALVIMART automotive collection. Product details and availability can be managed by the store administrator.", "stock": 19, "featured": false}, {"id": 144, "name": "Home Tool Kit", "price": 390, "group": "Hardware & Tools", "img": "v24.jpg", "sizes": [], "desc": "Home Tool Kit from VALVIMART hardware & tools collection. Product details and availability can be managed by the store administrator.", "stock": 10, "featured": true}, {"id": 145, "name": "Cordless Drill", "price": 850, "group": "Hardware & Tools", "img": "v54.jpg", "sizes": [], "desc": "Cordless Drill from VALVIMART hardware & tools collection. Product details and availability can be managed by the store administrator.", "stock": 13, "featured": false}, {"id": 146, "name": "Measuring Tape", "price": 45, "group": "Hardware & Tools", "img": "p20.jpg", "sizes": [], "desc": "Measuring Tape from VALVIMART hardware & tools collection. Product details and availability can be managed by the store administrator.", "stock": 16, "featured": false}, {"id": 147, "name": "LED Work Light", "price": 160, "group": "Hardware & Tools", "img": "p21.jpg", "sizes": [], "desc": "LED Work Light from VALVIMART hardware & tools collection. Product details and availability can be managed by the store administrator.", "stock": 19, "featured": false}, {"id": 148, "name": "Nonstick Cookware Set", "price": 680, "group": "Kitchen & Dining", "img": "v58.jpg", "sizes": [], "desc": "Nonstick Cookware Set from VALVIMART kitchen & dining collection. Product details and availability can be managed by the store administrator.", "stock": 10, "featured": true}, {"id": 149, "name": "Dinner Plate Set", "price": 240, "group": "Kitchen & Dining", "img": "p2.jpg", "sizes": [], "desc": "Dinner Plate Set from VALVIMART kitchen & dining collection. Product details and availability can be managed by the store administrator.", "stock": 13, "featured": false}, {"id": 150, "name": "Blender", "price": 420, "group": "Kitchen & Dining", "img": "v32.jpg", "sizes": [], "desc": "Blender from VALVIMART kitchen & dining collection. Product details and availability can be managed by the store administrator.", "stock": 16, "featured": false}, {"id": 151, "name": "Food Storage Set", "price": 130, "group": "Kitchen & Dining", "img": "p4.jpg", "sizes": [], "desc": "Food Storage Set from VALVIMART kitchen & dining collection. Product details and availability can be managed by the store administrator.", "stock": 19, "featured": false}, {"id": 152, "name": "Bedsheet Set", "price": 260, "group": "Home & Living", "img": "p5.jpg", "sizes": [], "desc": "Bedsheet Set from VALVIMART home & living collection. Product details and availability can be managed by the store administrator.", "stock": 10, "featured": true}, {"id": 153, "name": "Decorative Lamp", "price": 210, "group": "Home & Living", "img": "p6.jpg", "sizes": [], "desc": "Decorative Lamp from VALVIMART home & living collection. Product details and availability can be managed by the store administrator.", "stock": 13, "featured": false}, {"id": 154, "name": "Laundry Basket", "price": 95, "group": "Home & Living", "img": "p7.jpg", "sizes": [], "desc": "Laundry Basket from VALVIMART home & living collection. Product details and availability can be managed by the store administrator.", "stock": 16, "featured": false}, {"id": 155, "name": "Curtain Pair", "price": 280, "group": "Home & Living", "img": "p8.jpg", "sizes": [], "desc": "Curtain Pair from VALVIMART home & living collection. Product details and availability can be managed by the store administrator.", "stock": 19, "featured": false}, {"id": 156, "name": "General Knowledge Book", "price": 95, "group": "Books & Education", "img": "p9.jpg", "sizes": [], "desc": "General Knowledge Book from VALVIMART books & education collection. Product details and availability can be managed by the store administrator.", "stock": 10, "featured": true}, {"id": 157, "name": "Scientific Calculator", "price": 180, "group": "Books & Education", "img": "p10.jpg", "sizes": [], "desc": "Scientific Calculator from VALVIMART books & education collection. Product details and availability can be managed by the store administrator.", "stock": 13, "featured": false}, {"id": 158, "name": "School Stationery Pack", "price": 120, "group": "Books & Education", "img": "p11.jpg", "sizes": [], "desc": "School Stationery Pack from VALVIMART books & education collection. Product details and availability can be managed by the store administrator.", "stock": 16, "featured": false}, {"id": 159, "name": "Dictionary", "price": 110, "group": "Books & Education", "img": "p12.jpg", "sizes": [], "desc": "Dictionary from VALVIMART books & education collection. Product details and availability can be managed by the store administrator.", "stock": 19, "featured": false}, {"id": 160, "name": "Cabin Travel Suitcase", "price": 780, "group": "Travel & Luggage", "img": "p13.jpg", "sizes": [], "desc": "Cabin Travel Suitcase from VALVIMART travel & luggage collection. Product details and availability can be managed by the store administrator.", "stock": 10, "featured": true}, {"id": 161, "name": "Travel Neck Pillow", "price": 95, "group": "Travel & Luggage", "img": "p14.jpg", "sizes": [], "desc": "Travel Neck Pillow from VALVIMART travel & luggage collection. Product details and availability can be managed by the store administrator.", "stock": 13, "featured": false}, {"id": 162, "name": "Packing Cube Set", "price": 140, "group": "Travel & Luggage", "img": "p15.jpg", "sizes": [], "desc": "Packing Cube Set from VALVIMART travel & luggage collection. Product details and availability can be managed by the store administrator.", "stock": 16, "featured": false}, {"id": 163, "name": "Waterproof Travel Bag", "price": 260, "group": "Travel & Luggage", "img": "p16.jpg", "sizes": [], "desc": "Waterproof Travel Bag from VALVIMART travel & luggage collection. Product details and availability can be managed by the store administrator.", "stock": 19, "featured": false}, {"id": 164, "name": "Pet Feeding Bowl", "price": 65, "group": "Pet Supplies", "img": "p17.jpg", "sizes": [], "desc": "Pet Feeding Bowl from VALVIMART pet supplies collection. Product details and availability can be managed by the store administrator.", "stock": 10, "featured": true}, {"id": 165, "name": "Pet Grooming Brush", "price": 55, "group": "Pet Supplies", "img": "p18.jpg", "sizes": [], "desc": "Pet Grooming Brush from VALVIMART pet supplies collection. Product details and availability can be managed by the store administrator.", "stock": 13, "featured": false}, {"id": 166, "name": "Pet Bed", "price": 240, "group": "Pet Supplies", "img": "p19.jpg", "sizes": [], "desc": "Pet Bed from VALVIMART pet supplies collection. Product details and availability can be managed by the store administrator.", "stock": 16, "featured": false}, {"id": 167, "name": "Pet Toy Pack", "price": 85, "group": "Pet Supplies", "img": "p20.jpg", "sizes": [], "desc": "Pet Toy Pack from VALVIMART pet supplies collection. Product details and availability can be managed by the store administrator.", "stock": 19, "featured": false}, {"id": 168, "name": "Remote Control Car", "price": 260, "group": "Toys & Games", "img": "p21.jpg", "sizes": [], "desc": "Remote Control Car from VALVIMART toys & games collection. Product details and availability can be managed by the store administrator.", "stock": 10, "featured": true}, {"id": 169, "name": "Board Game Set", "price": 180, "group": "Toys & Games", "img": "p1.jpg", "sizes": [], "desc": "Board Game Set from VALVIMART toys & games collection. Product details and availability can be managed by the store administrator.", "stock": 13, "featured": false}, {"id": 170, "name": "Plush Teddy Bear", "price": 150, "group": "Toys & Games", "img": "p2.jpg", "sizes": [], "desc": "Plush Teddy Bear from VALVIMART toys & games collection. Product details and availability can be managed by the store administrator.", "stock": 16, "featured": false}, {"id": 171, "name": "Kids Art Kit", "price": 125, "group": "Toys & Games", "img": "p3.jpg", "sizes": [], "desc": "Kids Art Kit from VALVIMART toys & games collection. Product details and availability can be managed by the store administrator.", "stock": 19, "featured": false}, {"id": 172, "name": "Everyday Running Sneakers", "price": 390, "group": "Sneakers", "img": "p4.jpg", "sizes": [], "desc": "Everyday Running Sneakers from VALVIMART sneakers collection. Product details and availability can be managed by the store administrator.", "stock": 10, "featured": true}, {"id": 173, "name": "Classic Canvas Sneakers", "price": 280, "group": "Sneakers", "img": "p5.jpg", "sizes": [], "desc": "Classic Canvas Sneakers from VALVIMART sneakers collection. Product details and availability can be managed by the store administrator.", "stock": 13, "featured": false}, {"id": 174, "name": "Training Shoes", "price": 420, "group": "Sneakers", "img": "p6.jpg", "sizes": [], "desc": "Training Shoes from VALVIMART sneakers collection. Product details and availability can be managed by the store administrator.", "stock": 16, "featured": false}, {"id": 175, "name": "Casual Slip-On Shoes", "price": 250, "group": "Sneakers", "img": "p7.jpg", "sizes": [], "desc": "Casual Slip-On Shoes from VALVIMART sneakers collection. Product details and availability can be managed by the store administrator.", "stock": 19, "featured": false}, {"id": 176, "name": "Minimalist Wristwatch", "price": 280, "group": "Watches", "img": "v05.jpg", "sizes": [], "desc": "Minimalist Wristwatch from VALVIMART watches collection. Product details and availability can be managed by the store administrator.", "stock": 10, "featured": true}, {"id": 177, "name": "Digital Sports Watch", "price": 230, "group": "Watches", "img": "v20.jpg", "sizes": [], "desc": "Digital Sports Watch from VALVIMART watches collection. Product details and availability can be managed by the store administrator.", "stock": 13, "featured": false}, {"id": 178, "name": "Classic Metal Watch", "price": 350, "group": "Watches", "img": "v17.jpg", "sizes": [], "desc": "Classic Metal Watch from VALVIMART watches collection. Product details and availability can be managed by the store administrator.", "stock": 16, "featured": false}, {"id": 179, "name": "Everyday Analog Watch", "price": 260, "group": "Watches", "img": "v31.jpg", "sizes": [], "desc": "Everyday Analog Watch from VALVIMART watches collection. Product details and availability can be managed by the store administrator.", "stock": 19, "featured": false}, {"id": 180, "name": "Everyday Backpack", "price": 260, "group": "Bags", "img": "v28.jpg", "sizes": [], "desc": "Everyday Backpack from VALVIMART bags collection. Product details and availability can be managed by the store administrator.", "stock": 10, "featured": true}, {"id": 181, "name": "Crossbody Bag", "price": 210, "group": "Bags", "img": "v30.jpg", "sizes": [], "desc": "Crossbody Bag from VALVIMART bags collection. Product details and availability can be managed by the store administrator.", "stock": 13, "featured": false}, {"id": 182, "name": "Laptop Carry Bag", "price": 320, "group": "Bags", "img": "p14.jpg", "sizes": [], "desc": "Laptop Carry Bag from VALVIMART bags collection. Product details and availability can be managed by the store administrator.", "stock": 16, "featured": false}, {"id": 183, "name": "Weekend Duffle Bag", "price": 390, "group": "Bags", "img": "p15.jpg", "sizes": [], "desc": "Weekend Duffle Bag from VALVIMART bags collection. Product details and availability can be managed by the store administrator.", "stock": 19, "featured": false}, {"id": 200, "name": "Flagship Smartphone", "price": 6500, "group": "Phones & Tablets", "img": "v03.jpg", "sizes": [], "desc": "Flagship Smartphone from the VALVIMART phones & tablets collection.", "stock": 6, "featured": false}, {"id": 201, "name": "Galaxy S24 Ultra", "price": 8500, "group": "Phones & Tablets", "img": "v59.jpg", "sizes": [], "desc": "Galaxy S24 Ultra from the VALVIMART phones & tablets collection.", "stock": 4, "featured": false}, {"id": 202, "name": "Desktop Computer Set", "price": 3800, "group": "Computers & Laptops", "img": "v10.jpg", "sizes": [], "desc": "Desktop Computer Set from the VALVIMART computers & laptops collection.", "stock": 7, "featured": false}, {"id": 203, "name": "Smart Fitness Watch", "price": 320, "group": "Watches", "img": "v08.jpg", "sizes": [], "desc": "Smart Fitness Watch from the VALVIMART watches collection.", "stock": 12, "featured": false}, {"id": 204, "name": "Sport Wheel Watch", "price": 290, "group": "Watches", "img": "v25.jpg", "sizes": [], "desc": "Sport Wheel Watch from the VALVIMART watches collection.", "stock": 9, "featured": false}, {"id": 205, "name": "Gold Chronograph Watch", "price": 450, "group": "Watches", "img": "v57.jpg", "sizes": [], "desc": "Gold Chronograph Watch from the VALVIMART watches collection.", "stock": 6, "featured": false}, {"id": 206, "name": "Wooden Watch & Jewelry Organizer", "price": 180, "group": "Home & Living", "img": "v00.jpg", "sizes": [], "desc": "Wooden Watch & Jewelry Organizer from the VALVIMART home & living collection.", "stock": 10, "featured": false}, {"id": 207, "name": "Smart Fridge", "price": 7800, "group": "Home Appliances", "img": "v01.jpg", "sizes": [], "desc": "Smart Fridge from the VALVIMART home appliances collection.", "stock": 3, "featured": false}, {"id": 208, "name": "French Door Refrigerator", "price": 9200, "group": "Home Appliances", "img": "v33.jpg", "sizes": [], "desc": "French Door Refrigerator from the VALVIMART home appliances collection.", "stock": 3, "featured": false}, {"id": 209, "name": "Digital Air Fryer", "price": 650, "group": "Home Appliances", "img": "v21.jpg", "sizes": [], "desc": "Digital Air Fryer from the VALVIMART home appliances collection.", "stock": 10, "featured": false}, {"id": 210, "name": "Steam Iron", "price": 230, "group": "Home Appliances", "img": "v34.jpg", "sizes": [], "desc": "Steam Iron from the VALVIMART home appliances collection.", "stock": 14, "featured": false}, {"id": 211, "name": "Kitchen Knife Block Set", "price": 340, "group": "Kitchen & Dining", "img": "v35.jpg", "sizes": [], "desc": "Kitchen Knife Block Set from the VALVIMART kitchen & dining collection.", "stock": 9, "featured": false}, {"id": 212, "name": "Silicone Kitchen Utensil Set", "price": 130, "group": "Kitchen & Dining", "img": "v36.jpg", "sizes": [], "desc": "Silicone Kitchen Utensil Set from the VALVIMART kitchen & dining collection.", "stock": 15, "featured": false}, {"id": 213, "name": "Nutella Hazelnut Spread", "price": 75, "group": "Groceries", "img": "v07.jpg", "sizes": [], "desc": "Nutella Hazelnut Spread from the VALVIMART groceries collection.", "stock": 20, "featured": false}, {"id": 214, "name": "Nescafé Selection Coffee", "price": 90, "group": "Groceries", "img": "v15.jpg", "sizes": [], "desc": "Nescafé Selection Coffee from the VALVIMART groceries collection.", "stock": 20, "featured": false}, {"id": 215, "name": "Ferrero Rocher Gift Box", "price": 160, "group": "Groceries", "img": "v43.jpg", "sizes": [], "desc": "Ferrero Rocher Gift Box from the VALVIMART groceries collection.", "stock": 12, "featured": false}, {"id": 216, "name": "Snickers Minis Bag", "price": 55, "group": "Groceries", "img": "v44.jpg", "sizes": [], "desc": "Snickers Minis Bag from the VALVIMART groceries collection.", "stock": 25, "featured": false}, {"id": 217, "name": "Cadbury Dairy Milk Bars", "price": 40, "group": "Groceries", "img": "v45.jpg", "sizes": [], "desc": "Cadbury Dairy Milk Bars from the VALVIMART groceries collection.", "stock": 25, "featured": false}, {"id": 218, "name": "Free Range Chicken Drumsticks", "price": 85, "group": "Groceries", "img": "v42.jpg", "sizes": [], "desc": "Free Range Chicken Drumsticks from the VALVIMART groceries collection.", "stock": 10, "featured": false}, {"id": 219, "name": "Vaseline Cocoa Body Oil", "price": 60, "group": "Beauty & Personal Care", "img": "v06.jpg", "sizes": [], "desc": "Vaseline Cocoa Body Oil from the VALVIMART beauty & personal care collection.", "stock": 18, "featured": false}, {"id": 220, "name": "Dry Body Brush Set", "price": 70, "group": "Beauty & Personal Care", "img": "v41.jpg", "sizes": [], "desc": "Dry Body Brush Set from the VALVIMART beauty & personal care collection.", "stock": 15, "featured": false}, {"id": 221, "name": "Socket & Wrench Tool Kit", "price": 620, "group": "Hardware & Tools", "img": "v11.jpg", "sizes": [], "desc": "Socket & Wrench Tool Kit from the VALVIMART hardware & tools collection.", "stock": 6, "featured": false}, {"id": 222, "name": "Mechanic Tool Set", "price": 480, "group": "Hardware & Tools", "img": "v55.jpg", "sizes": [], "desc": "Mechanic Tool Set from the VALVIMART hardware & tools collection.", "stock": 8, "featured": false}, {"id": 223, "name": "Two-Door Storage Cabinet", "price": 1450, "group": "Furniture", "img": "v13.jpg", "sizes": [], "desc": "Two-Door Storage Cabinet from the VALVIMART furniture collection.", "stock": 5, "featured": false}, {"id": 224, "name": "Dressing Mirror Unit", "price": 2200, "group": "Furniture", "img": "v38.jpg", "sizes": [], "desc": "Dressing Mirror Unit from the VALVIMART furniture collection.", "stock": 3, "featured": false}, {"id": 225, "name": "Tall Shoe Rack", "price": 420, "group": "Furniture", "img": "v37.jpg", "sizes": [], "desc": "Tall Shoe Rack from the VALVIMART furniture collection.", "stock": 9, "featured": false}, {"id": 226, "name": "Wall Mounted Hook Rack", "price": 190, "group": "Home & Living", "img": "v39.jpg", "sizes": [], "desc": "Wall Mounted Hook Rack from the VALVIMART home & living collection.", "stock": 12, "featured": false}, {"id": 227, "name": "Bedside Baby Crib", "price": 1250, "group": "Baby & Kids", "img": "v16.jpg", "sizes": [], "desc": "Bedside Baby Crib from the VALVIMART baby & kids collection.", "stock": 5, "featured": false}, {"id": 228, "name": "Baby Nest Bed", "price": 260, "group": "Baby & Kids", "img": "v19.jpg", "sizes": [], "desc": "Baby Nest Bed from the VALVIMART baby & kids collection.", "stock": 10, "featured": false}, {"id": 229, "name": "Baby Play Gym Mat", "price": 310, "group": "Baby & Kids", "img": "v22.jpg", "sizes": [], "desc": "Baby Play Gym Mat from the VALVIMART baby & kids collection.", "stock": 9, "featured": false}, {"id": 230, "name": "Baby Car Seat", "price": 780, "group": "Baby & Kids", "img": "v46.jpg", "sizes": [], "desc": "Baby Car Seat from the VALVIMART baby & kids collection.", "stock": 6, "featured": false}, {"id": 231, "name": "Baby High Chair", "price": 560, "group": "Baby & Kids", "img": "v47.jpg", "sizes": [], "desc": "Baby High Chair from the VALVIMART baby & kids collection.", "stock": 7, "featured": false}, {"id": 232, "name": "Baby Playpen", "price": 690, "group": "Baby & Kids", "img": "v49.jpg", "sizes": [], "desc": "Baby Playpen from the VALVIMART baby & kids collection.", "stock": 5, "featured": false}, {"id": 233, "name": "Mesh Pen Stand", "price": 60, "group": "Office Supplies", "img": "v18.jpg", "sizes": [], "desc": "Mesh Pen Stand from the VALVIMART office supplies collection.", "stock": 20, "featured": false}, {"id": 234, "name": "Embossed Leather Backpack", "price": 420, "group": "Bags", "img": "v29.jpg", "sizes": [], "desc": "Embossed Leather Backpack from the VALVIMART bags collection.", "stock": 8, "featured": false}, {"id": 235, "name": "Resistance Bands Set", "price": 120, "group": "Sports & Fitness", "img": "v23.jpg", "sizes": [], "desc": "Resistance Bands Set from the VALVIMART sports & fitness collection.", "stock": 20, "featured": false}, {"id": 236, "name": "Boxing Heavy Bag Kit", "price": 850, "group": "Sports & Fitness", "img": "v09.jpg", "sizes": [], "desc": "Boxing Heavy Bag Kit from the VALVIMART sports & fitness collection.", "stock": 5, "featured": false}, {"id": 237, "name": "Smart Music Boxing Wall", "price": 480, "group": "Sports & Fitness", "img": "v60.jpg", "sizes": [], "desc": "Smart Music Boxing Wall from the VALVIMART sports & fitness collection.", "stock": 6, "featured": false}, {"id": 238, "name": "Folding Treadmill", "price": 4200, "group": "Sports & Fitness", "img": "v50.jpg", "sizes": [], "desc": "Folding Treadmill from the VALVIMART sports & fitness collection.", "stock": 3, "featured": false}, {"id": 239, "name": "Hyper Grip Basketball", "price": 240, "group": "Sports & Fitness", "img": "v51.jpg", "sizes": [], "desc": "Hyper Grip Basketball from the VALVIMART sports & fitness collection.", "stock": 14, "featured": false}, {"id": 240, "name": "Weight Bench with Rack", "price": 950, "group": "Sports & Fitness", "img": "v52.jpg", "sizes": [], "desc": "Weight Bench with Rack from the VALVIMART sports & fitness collection.", "stock": 4, "featured": false}, {"id": 241, "name": "Cast Iron Dumbbells 60 lbs", "price": 520, "group": "Sports & Fitness", "img": "v61.jpg", "sizes": [], "desc": "Cast Iron Dumbbells 60 lbs from the VALVIMART sports & fitness collection.", "stock": 8, "featured": false}];
const allStoreProducts=[...baseProducts,...expandedProducts];
const get=(k,f)=>JSON.parse(localStorage.getItem(k)||'null')??f;const set=(k,v)=>localStorage.setItem(k,JSON.stringify(v));
let welcomeUnlocked=false;
let products=get(KEY.products,allStoreProducts), categories=get(KEY.categories,defaultCategories), users=get(KEY.users,{}), currentUser=get(KEY.current,null), favourites=get(KEY.favourites,get('valvi_wishlist_v4',[])), cart=get(KEY.cart,[]), orders=get(KEY.orders,[]), admin=get(KEY.admin,{username:'admin',password:'FLAXX2026'}), support=get(KEY.support,'kelvynzack42@gmail.com'), messages=get(KEY.messages,{}), reviews=get(KEY.reviews,{});
if(!localStorage.getItem('valvi_allround_catalog_v2')){products=products.map(p=>{const e=expandedProducts.find(x=>String(x.id)===String(p.id));return e&&!p.imageData?{...p,img:e.img}:p});const existingIds=new Set(products.map(p=>String(p.id)));products=[...products,...expandedProducts.filter(p=>!existingIds.has(String(p.id)))];categories=[...new Set([...categories,...defaultCategories])];set(KEY.products,products);set(KEY.categories,categories);localStorage.setItem('valvi_allround_catalog_v2','1');}
if(!localStorage.getItem(KEY.products))set(KEY.products,products);if(!localStorage.getItem(KEY.favourites))set(KEY.favourites,favourites);if(!localStorage.getItem(KEY.categories))set(KEY.categories,categories);if(!localStorage.getItem(KEY.admin))set(KEY.admin,admin);if(!localStorage.getItem(KEY.support))set(KEY.support,support);if(!localStorage.getItem(KEY.messages))set(KEY.messages,messages);if(!localStorage.getItem(KEY.reviews))set(KEY.reviews,reviews);
const $=s=>document.querySelector(s), $$=s=>document.querySelectorAll(s);const toast=t=>{$('#toast').textContent=t;$('#toast').classList.add('show');setTimeout(()=>$('#toast').classList.remove('show'),1800)};
function imgSrc(p){return p?.imageData||('assets/products/'+(p?.img||'p1.jpg'))}
function userStatus(u){return u?.status||'active'}
async function boot(){
  const params=new URLSearchParams(window.location.search);
  const adminEntry=params.get('admin')==='1' || /admin\.html$/i.test(window.location.pathname);

  if(adminEntry){
    adminStandalone=true;
    $('#welcomeScreen').classList.add('hidden');
    $('#loginScreen').classList.add('hidden');
    $('#storeApp').classList.add('hidden');
    $('#adminPortal').classList.add('open');
    showAdminLogin();
    return;
  }

  // ALWAYS start normal visitors on the Welcome screen.
  // Do not use a persistent 'visited' flag here: it caused the Welcome screen
  // to flash briefly and then disappear on refresh. The only way into the
  // storefront is the explicit ENTER STORE action.
  welcomeUnlocked=false;
  document.documentElement.dataset.welcomeLocked='1';
  $('#welcomeScreen').classList.remove('hidden');
  $('#loginScreen').classList.add('hidden');
  $('#storeApp').classList.add('hidden');

  // Only hydrate an account if the server still has a valid session.
  try{
    const me=await apiRequest('/api/me');
    if(me.authenticated && me.user){ syncLocalUser(me.user); fillAccount(); }
    else { currentUser=null; localStorage.removeItem(KEY.current); }
  }catch(_){}
}

function findUserByLogin(v){const x=v.trim().toLowerCase();return users[x]||Object.values(users).find(u=>(u.phone||'').trim().toLowerCase()===x)}
function showAuth(mode){$('#loginForm').classList.toggle('hidden',mode!=='login');$('#registerForm').classList.toggle('hidden',mode!=='register');$('#forgotForm').classList.toggle('hidden',mode!=='forgot');$('#showLogin').classList.toggle('active',mode==='login');$('#showRegister').classList.toggle('active',mode==='register');$('#showLogin').classList.toggle('hidden',mode==='forgot');$('#showRegister').classList.toggle('hidden',mode==='forgot');if(mode==='login'){ $('#authTitle').textContent='Sign in.'; try{ if(window.__valviGoogleRefresh) window.__valviGoogleRefresh(); }catch(_){};$('#authIntro').textContent='Sign in to save favourites, manage your account and place orders faster.';$('#authSwitch').innerHTML="Don't have an account? <button type='button' id='registerLink' class='linkbtn'>Register here</button>";$('#registerLink').onclick=()=>showAuth('register')}else if(mode==='register'){ $('#authTitle').textContent='Create account.';$('#authIntro').textContent='Register once to save favourites, manage your details and checkout faster.';$('#authSwitch').innerHTML='Already have an account? <button type="button" id="loginLink" class="linkbtn">Login here</button>';$('#loginLink').onclick=()=>showAuth('login')}else{$('#authTitle').textContent='Forgot password?';$('#authIntro').textContent='Verify your email and phone number, then create a new password.';$('#authSwitch').innerHTML='Remembered your password? <button type="button" id="loginLink2" class="linkbtn">Back to login</button>';$('#loginLink2').onclick=()=>showAuth('login')}}
$('#showLogin').onclick=()=>showAuth('login');$('#showRegister').onclick=()=>showAuth('register');$('#registerLink').onclick=()=>showAuth('register');$('#forgotBtn').onclick=()=>showAuth('forgot');$('#backToLogin').onclick=()=>showAuth('login');

// Return-to-store works from login, register and forgot-password states.
$('#authReturnStore')?.addEventListener('click',()=>{localStorage.setItem('valvi_store_visited_v1','1'); try{window.history.replaceState({},'',window.location.pathname)}catch(_){} closeOverlays(); $('#loginScreen')?.classList.add('hidden'); $('#welcomeScreen')?.classList.add('hidden'); $('#storeApp')?.classList.remove('hidden'); showStore(); window.scrollTo({top:0,behavior:'smooth'});});

// One reliable close-button handler for every storefront overlay/panel, including dynamically created buttons.
document.addEventListener('click',function(e){
  const btn=e.target.closest('.close');
  if(!btn)return;
  if(btn.id==='closeService'){ e.preventDefault(); e.stopPropagation(); if(typeof window.__closeService==='function') window.__closeService(); return; }
  if(btn.id==='closeProductForm'){ return; }
  if(btn.id==='closeAdminLogin'){ return; }
  if(btn.id==='closeOrderTracking'){ e.preventDefault(); e.stopPropagation(); if(typeof window.__closeTracking==='function') window.__closeTracking(); else closeOverlays(); return; }
  e.preventDefault(); e.stopPropagation();
  if(typeof closeOverlays==='function') closeOverlays();
},true);

// Always close the current overlay before navigating home/store.
document.addEventListener('click',function(e){
  const a=e.target.closest('a[href="#home"], .brand[href="#home"]');
  if(a){ closeOverlays(); document.querySelector('#nav')?.classList.remove('open'); }
},true);
function normalizePhone(v){return String(v||'').replace(/[^0-9+]/g,'')}
const API_BASE=(window.location.protocol==='http:'||window.location.protocol==='https:')?'':'http://127.0.0.1:3000';
async function apiRequest(path,options={}){const opts={credentials:'include',...options,headers:{'Content-Type':'application/json',...(options.headers||{})}};try{const r=await fetch(API_BASE+path,opts);let d={};try{d=await r.json()}catch(_){}if(!r.ok)throw new Error(d.error||'Request failed');return d}catch(err){if(err instanceof TypeError)throw new Error('Cannot connect to VALVIMART server. Please open the store through the running server link (http://127.0.0.1:3000).');throw err}}
function syncLocalUser(u){const safe={id:u.id||'',first:u.first||'',last:u.last||'',email:u.email||'',phone:u.phone||'',address:u.address||'',status:u.status||'active',created:u.created||new Date().toISOString(),provider:u.provider||'local'};users[safe.email]=safe;set(KEY.users,users);currentUser=safe;set(KEY.current,currentUser);return safe}
let authPendingEmail='';
function ensureAuthCodeField(form,id,placeholder){let x=document.getElementById(id);if(!x){x=document.createElement('input');x.id=id;x.placeholder=placeholder;x.inputMode='numeric';x.autocomplete='one-time-code';x.maxLength=6;x.style.display='none';form.insertBefore(x,form.querySelector('button.primary'));}return x}
$('#loginForm').onsubmit=async e=>{e.preventDefault();const identifier=$('#loginEmail').value.trim(),password=$('#loginPassword').value;if(!identifier)return toast('Enter your account email or phone number');if(!password)return toast('Enter your password');const btn=$('#loginForm button.primary');if(btn){btn.disabled=true;btn.textContent='VERIFYING...'}try{if($('#loginForm').dataset.codeSent==='1'){const email=authPendingEmail||identifier.toLowerCase();const code=($('#loginVerificationCode')?.value||'').trim();if(!code)return toast('Enter the verification code sent to your email');const d=await apiRequest('/api/auth/login/verify',{method:'POST',body:JSON.stringify({email,code})});syncLocalUser(d.user);$('#loginForm').reset();delete $('#loginForm').dataset.codeSent;$('#loginVerificationCode')?.remove();authPendingEmail='';showStore({force:true});window.scrollTo({top:0,behavior:'smooth'});toast('Login verified. Welcome back, '+(d.user.first||'Customer'));return}const d=await apiRequest('/api/auth/login',{method:'POST',body:JSON.stringify({identifier,email:identifier,password})});if(d.verificationRequired){authPendingEmail=d.email||identifier.toLowerCase();const code=ensureAuthCodeField($('#loginForm'),'loginVerificationCode','Verification code sent to your email');code.style.display='block';$('#loginForm').dataset.codeSent='1';toast('Verification code sent to '+authPendingEmail)}else{syncLocalUser(d.user);$('#loginForm').reset();delete $('#loginForm').dataset.codeSent;$('#loginVerificationCode')?.remove();authPendingEmail='';showStore({force:true});toast('Welcome back, '+(d.user.first||'Customer'))}}catch(err){toast(err.message)}finally{if(btn){btn.disabled=false;btn.textContent=$('#loginForm').dataset.codeSent==='1'?'VERIFY LOGIN CODE':'LOGIN TO VALVIMART'}}};

$('#registerForm').onsubmit=async e=>{e.preventDefault();const first=$('#firstName').value.trim(),last=$('#lastName').value.trim(),email=$('#email').value.trim().toLowerCase(),phone=normalizePhone($('#phone').value),address=$('#address').value.trim(),password=$('#registerPassword').value;if(!first||!last)return toast('Enter your first and last name');if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))return toast('Enter a valid email address');if(phone.length<7)return toast('Enter a valid phone number');if(password.length<6)return toast('Password must be at least 6 characters');if(password!==$('#registerPassword2').value)return toast('Passwords do not match');const btn=$('#registerForm button.primary');if(btn){btn.disabled=true;btn.textContent='CREATING ACCOUNT...'}try{const d=await apiRequest('/api/auth/register',{method:'POST',body:JSON.stringify({first,last,email,phone,address,password})});syncLocalUser(d.user);$('#registerForm').reset();showStore({force:true});window.scrollTo({top:0,behavior:'smooth'});toast('Account created successfully. Welcome to VALVIMART!')}catch(err){toast(err.message)}finally{if(btn){btn.disabled=false;btn.textContent='CREATE MY ACCOUNT'}}};
$('#forgotForm').onsubmit=async e=>{e.preventDefault();const email=$('#resetEmail').value.trim().toLowerCase(),phone=normalizePhone($('#resetPhone').value),code=$('#resetVerificationCode').value.trim(),password=$('#resetPassword').value,password2=$('#resetPassword2').value;if(!email||!phone)return toast('Enter your account email and phone number');if(password.length<6)return toast('New password must be at least 6 characters');if(password!==password2)return toast('Passwords do not match');const form=$('#forgotForm'),btn=form.querySelector('button.primary');if(btn)btn.disabled=true;try{if(form.dataset.codeSent==='1'){if(!code)return toast('Enter the verification code sent to your email');await apiRequest('/api/auth/reset-password',{method:'POST',body:JSON.stringify({email,phone,code,password})});form.reset();delete form.dataset.codeSent;$('#resetVerificationCode').style.display='none';if(btn)btn.textContent='SEND VERIFICATION CODE';toast('Password changed successfully. You can now login.');showAuth('login');return}await apiRequest('/api/auth/request-reset',{method:'POST',body:JSON.stringify({email,phone})});form.dataset.codeSent='1';$('#resetVerificationCode').style.display='block';if(btn)btn.textContent='RESET PASSWORD';toast('Verification code sent to '+email)}catch(err){toast(err.message)}finally{if(btn)btn.disabled=false}};
async function showStore(options={}){if(!welcomeUnlocked && !options.force){return false;} localStorage.setItem('valvi_store_visited_v1','1');welcomeUnlocked=true;document.documentElement.dataset.welcomeLocked='0';$('#welcomeScreen').classList.add('hidden');$('#loginScreen').classList.add('hidden');$('#storeApp').classList.remove('hidden');$('#serviceEmailLabel').textContent=support;renderFilters();renderCatalog();renderCart();renderFavourites();fillAccount();renderInbox();renderAccountOrders();try{const pd=await apiRequest('/api/products');if(Array.isArray(pd.products)){products=pd.products.map(p=>({...p,id:Number(p.id)||p.id}));set(KEY.products,products);renderFilters();renderCatalog(sidebarCategory||'All')}}catch(_){}try{const od=await apiRequest('/api/orders');if(Array.isArray(od.orders)){orders=od.orders;set(KEY.orders,orders);renderAccountOrders()}}catch(_){} }
let sidebarCategory='All';
function renderFilters(){
  const box=$('#sideCategoryLinks');
  if(!box)return;
  const all=[...new Set([...(categories||[]),...(products||[]).map(p=>p.group||p.type).filter(Boolean)].filter(Boolean))];
  categories=all;
  box.innerHTML=all.map(c=>`<button type="button" class="side-category-link ${sidebarCategory===c?'active':''}" data-side-category="${esc(c)}">${esc(c)}</button>`).join('')||'<div class="mini" style="padding:10px 12px">Categories will appear here.</div>';
  $$('#sideCategoryLinks [data-side-category]').forEach(b=>b.onclick=()=>{
    navigateToCategory(b.dataset.sideCategory);
    $('#nav')?.classList.remove('open');$('#sideNavScrim')?.classList.remove('open');document.body.classList.remove('side-nav-active');$('#hamb')?.setAttribute('aria-expanded','false');
  });
  if($('#allProductsNav'))$('#allProductsNav').onclick=e=>{e.preventDefault();navigateToHome();};
}
function card(p,i=0){
  const stock=Number(p.stock||0);
  const fav=favourites.some(f=>String(f)===String(p.id));
  const badge=stock<=0?'<div class="stock-badge out">OUT OF STOCK</div>':stock<=5?`<div class="stock-badge low">${stock} IN STOCK</div>`:'';
  return `<article class="card" style="animation-delay:${Math.min(i,12)*40}ms" data-id="${esc(p.id)}"><div class="photo"><img src="${esc(imgSrc(p))}" alt="${esc(p.name)}" loading="lazy" onerror="this.onerror=null;this.style.opacity=.25"><button type="button" class="heart ${fav?'saved':''}" data-favourite="${esc(p.id)}" aria-label="Save to favourites">${fav?'♥':'♡'}</button><button type="button" class="quick" data-view="${esc(p.id)}">QUICK VIEW</button></div><div class="info"><div class="name">${esc(p.name)}</div><div class="price">${money(p.price)}</div>${badge}</div></article>`;
}
// Storefront navigation: each category is a distinct browser-history view.
function vmRouteFromLocation(state){
  if(state && state.vmPage==='category') return {vmPage:'category',category:state.category||'All'};
  if(state && state.vmPage==='home') return {vmPage:'home'};
  const hash=String(location.hash||'');
  if(hash.startsWith('#category=')){
    let category='All';
    try{category=decodeURIComponent(hash.slice('#category='.length))||'All'}catch(_){}
    return {vmPage:'category',category};
  }
  return {vmPage:'home'};
}
function renderStoreRoute(route,scroll=true){
  const page=route?.vmPage==='category'?'category':'home';
  sidebarCategory=page==='category'?(route.category||'All'):'All';
  renderFilters();
  if(page==='category'){
    renderCatalog(sidebarCategory);
    if(scroll) document.getElementById('shop')?.scrollIntoView({behavior:'auto',block:'start'});
  }else{
    if($('#marketSearchInput'))$('#marketSearchInput').value='';
    if($('#searchInput'))$('#searchInput').value='';
    renderCatalog('All');
    if(scroll) document.getElementById('home')?.scrollIntoView({behavior:'auto',block:'start'});
  }
}
function navigateToCategory(group){
  const name=String(group||'All');
  if(history.state?.vmPage==='category' && history.state.category===name){
    renderStoreRoute({vmPage:'category',category:name}); return;
  }
  try{history.pushState({vmPage:'category',category:name},'',location.pathname+location.search+'#category='+encodeURIComponent(name));}catch(_){}
  renderStoreRoute({vmPage:'category',category:name});
}
function navigateToHome(){
  if(history.state?.vmPage==='home' && location.hash==='#home'){
    renderStoreRoute({vmPage:'home'});return;
  }
  try{history.pushState({vmPage:'home'},'',location.pathname+location.search+'#home');}catch(_){}
  renderStoreRoute({vmPage:'home'});
}
function restoreStorefrontHistory(state){
  const route=vmRouteFromLocation(state);
  // Ignore browser-history changes for non-storefront overlays/routes.
  if(location.hash==='#service') return;
  renderStoreRoute(route);
}
if(!window.__valviCategoryHistoryBound){
  window.__valviCategoryHistoryBound=true;
  const initialRoute=vmRouteFromLocation(history.state);
  try{
    history.replaceState(initialRoute, '', location.pathname+location.search+(initialRoute.vmPage==='category'?'#category='+encodeURIComponent(initialRoute.category):'#home'));
  }catch(_){}
  window.addEventListener('popstate',e=>restoreStorefrontHistory(e.state));
  window.addEventListener('hashchange',()=>restoreStorefrontHistory(history.state));
}
function renderCatalog(filter='All',search=''){
  sidebarCategory=filter||'All';
  const available=products;
  const matches=p=>`${p.name} ${p.desc||''} ${p.group||''} ${p.type||''}`.toLowerCase().includes(search.toLowerCase());
  const filtered=available.filter(matches);
  const allGroups=[...new Set([...(categories||[]),...available.map(p=>p.group||p.type).filter(Boolean)])];
  let html='';
  if(filter==='All'&&!search.trim()){
    // Home storefront: show a distinct, browsable product shelf for each category.
    const groups=allGroups.map(group=>({group,items:available.filter(p=>(p.group||p.type)===group)})).filter(x=>x.items.length);
    html=groups.map(({group,items})=>{
      const preview=items.slice(0,4);
      return `<section class="category-section storefront-category" data-category="${esc(group)}"><div class="collection-title category-title"><div><span>${esc(group.toUpperCase())}</span><small class="category-subtitle">Explore this collection</small></div><button type="button" class="category-view-all" data-view-category="${esc(group)}">VIEW ALL <span aria-hidden="true">↗</span></button></div><div class="grid">${preview.map((p,i)=>card(p,i)).join('')}</div></section>`;
    }).join('')||'<div class="empty">Products are being prepared. Please check back soon.</div>';
  }else{
    let arr=filtered;
    if(filter!=='All')arr=arr.filter(p=>(p.group===filter||p.type===filter));
    const title=filter==='All'?'SEARCH RESULTS':String(filter).toUpperCase();
    html=`<section class="category-section" data-category="${esc(filter)}"><div class="collection-title category-title"><div><span>${esc(title)}</span><small class="category-subtitle">${arr.length} PRODUCT${arr.length===1?'':'S'}</small></div><button type="button" class="category-view-home" id="returnStorefront">← BACK TO HOME</button></div><div class="grid">${arr.map((p,i)=>card(p,i)).join('')||'<div class="empty">No products found in this category.</div>'}</div></section>`;
  }
  $('#shop').innerHTML=html;
  renderFilters();
  $$('#shop [data-view-category]').forEach(b=>b.onclick=()=>navigateToCategory(b.dataset.viewCategory));
  bindCards();
}
// Delegated, capture-phase handler: keeps the return-to-storefront control working
// even after category views are repeatedly re-rendered.
if(!document.documentElement.dataset.vmStorefrontReturnBound){
  document.documentElement.dataset.vmStorefrontReturnBound='1';
  document.addEventListener('click',function(e){
    const btn=e.target.closest('#returnStorefront');
    if(!btn)return;
    e.preventDefault();
    e.stopPropagation();
    navigateToHome();
    document.querySelector('#nav')?.classList.remove('open');
    document.querySelector('#sideNavScrim')?.classList.remove('open');
    document.body.classList.remove('side-nav-active');
    document.querySelector('#hamb')?.setAttribute('aria-expanded','false');
  },true);
}
function bindCards(){$$('.quick').forEach(b=>b.onclick=e=>{e.preventDefault();e.stopPropagation();openProduct(b.dataset.view)});$$('.heart').forEach(b=>b.onclick=e=>{e.preventDefault();e.stopPropagation();toggleFavourite(isNaN(+b.dataset.favourite)?b.dataset.favourite:+b.dataset.favourite)});$$('.size').forEach(b=>b.onclick=()=>{$$(`.size[data-id="${CSS.escape(b.dataset.id)}"]`).forEach(x=>x.classList.remove('selected'));b.classList.add('selected')})}
function toggleFavourite(id){favourites=favourites.includes(id)?favourites.filter(x=>x!==id):[...favourites,id];set(KEY.favourites,favourites);renderFavourites();renderCatalog(currentFilter());toast(favourites.includes(id)?'Added to favourites':'Removed from favourites')}
function currentFilter(){return sidebarCategory||'All'}
function renderFavourites(){ $('#wishCount').textContent=favourites.length;$('#wishlistGrid').innerHTML=favourites.length?favourites.map(id=>products.find(p=>p.id===id)).filter(Boolean).map(p=>`<div class="wish-card"><img src="${imgSrc(p)}"><div><b style="font-size:10px">${esc(p.name)}</b><div class="price">${money(p.price)}</div><button class="dark full" style="margin-top:8px" onclick="addSimple(${p.id})">ADD TO CART</button></div></div>`).join(''):'<p class="mini">No favourites saved yet.</p>'}
function openProduct(id){const p=products.find(x=>String(x.id)===String(id));if(!p)return toast('This product is no longer available. Please refresh the shop.');$('#modalImage').src=imgSrc(p);$('#modalName').textContent=p.name;$('#modalPrice').textContent=money(p.price);$('#modalCategory').textContent=String(p.group||p.type||'Collection').toUpperCase();$('#modalDesc').textContent=(p.desc||'Premium VALVIMART selection.')+' '+(Number(p.stock||0)>0?('There are '+Number(p.stock||0)+' item'+(Number(p.stock||0)===1?'':'s')+' currently in stock.'): 'This product is currently out of stock. You may still add it to your cart, but checkout is unavailable until it is restocked.');$('#modalSizes').innerHTML=(p.sizes||[]).map(s=>`<button class="size" data-modal-size="${esc(s)}">${esc(s)}</button>`).join('');$('#modalRating').innerHTML=[1,2,3,4,5].map(n=>`<button class="star-btn" data-rating="${n}">★</button>`).join('');$$('#modalRating .star-btn').forEach(b=>b.onclick=()=>{$$('#modalRating .star-btn').forEach(x=>x.classList.toggle('active',+x.dataset.rating<=+b.dataset.rating))});$('#modalReviews').innerHTML='';renderReviews(id);$('#submitReview').onclick=()=>submitReview(id);$('#productModal').classList.add('open');$('#overlay').classList.add('open');$$('#modalSizes .size').forEach(b=>b.onclick=()=>{$$('#modalSizes .size').forEach(x=>x.classList.remove('selected'));b.classList.add('selected')});$('#addBtn').disabled=Number(p.stock||0)<=0;$('#addBtn').textContent=Number(p.stock||0)<=0?'OUT OF STOCK':'ADD TO CART';$('#addBtn').onclick=()=>{if(Number(p.stock||0)<=0)return toast('This product is out of stock. Checkout is unavailable until it is restocked.');const sel=$('#modalSizes .selected');addSimple(p.id,sel?.dataset.modalSize||'');closeOverlays()}}
function addSimple(id,size=''){const p=products.find(x=>x.id===id);if(!p)return;const stock=Number(p.stock||0);if(stock<=0)return toast('This product is out of stock and is no longer available in the shop.');const item=cart.find(x=>x.id===id&&x.size===size);const nextQty=(item?.qty||0)+1;if(nextQty>stock)return toast('Only '+stock+' item'+(stock===1?'':'s')+' available');if(item)item.qty=nextQty;else cart.push({id,size,qty:1});set(KEY.cart,cart);renderCart();toast('Added to cart');}
function renderCart(){let total=0,count=0,blocked=false;$('#cartList').innerHTML=cart.length?cart.map((x,i)=>{const p=products.find(y=>y.id===x.id);if(!p)return'';const stock=Number(p.stock||0),short=stock<x.qty;blocked=blocked||short;total+=p.price*x.qty;count+=x.qty;return`<div class="cart-row"><img src="${imgSrc(p)}"><div><h4>${esc(p.name)}</h4><p>${money(p.price)}${x.size?' • '+esc(x.size):''}</p>${stock<=0?'<div class="stock-badge out">OUT OF STOCK</div>':stock<=5?`<div class="stock-badge low">${stock} IN STOCK</div>`:`<div class="stock-badge">${stock} IN STOCK</div>`}${short?'<div class="stock-note">Not enough stock for this quantity. Checkout is blocked.</div>':''}<div class="qty"><button onclick="changeQty(${i},-1)">−</button><span>${x.qty}</span><button onclick="changeQty(${i},1)">+</button></div><button class="linkbtn" onclick="removeCart(${i})">Remove</button></div><b>${money(p.price*x.qty)}</b></div>`}).join(''):'<div style="padding:55px;text-align:center;color:#777;font-size:12px">Your cart is empty.</div>';$('#cartCount').textContent=count;$('#subtotal').textContent=money(total);$('#checkoutBtn').disabled=blocked||!cart.length;$('#checkoutBtn').style.opacity=blocked?'0.55':'1';$('#checkoutBtn').title=blocked?'Checkout unavailable until all cart items are in stock':''}
function changeQty(i,d){const item=cart[i];if(!item)return;const p=products.find(x=>x.id===item.id);const stock=Number(p?.stock||0),next=item.qty+d;if(next<1){cart.splice(i,1)}else if(stock<=0){return toast('This product is out of stock. Please wait for restock.')}else if(next>stock){return toast('Only '+stock+' item'+(stock===1?'':'s')+' available')}else{item.qty=next}set(KEY.cart,cart);renderCart()}function removeCart(i){if(!cart[i])return;cart.splice(i,1);set(KEY.cart,cart);renderCart()}
function closeOverlays(){['#drawer','#productModal','#checkoutBox','#wishlistPanel','#accountPanel','#inboxPanel','#orderTrackingPanel'].forEach(s=>document.querySelector(s)?.classList.remove('open'));$('#overlay')?.classList.remove('open');$('#searchBox')?.classList.add('hidden');if(typeof window.__closeTracking==='function')window.__closeTracking();}
$('#cartBtn').onclick=()=>{$('#drawer').classList.add('open');$('#overlay').classList.add('open')};$('#closeCart').onclick=closeOverlays;$('#closeModal').onclick=closeOverlays;$('#overlay').onclick=closeOverlays;
$('#wishlistBtn').onclick=()=>{$('#wishlistPanel').classList.add('open');$('#overlay').classList.add('open')};$('#accountBtn').onclick=()=>{if(!currentUser){$('#storeApp').classList.add('hidden');$('#loginScreen').classList.remove('hidden');showAuth('login');return}$('#accountPanel').classList.add('open');$('#overlay').classList.add('open');fillAccount()};$('#wishlistNav').onclick=e=>{e.preventDefault();$('#wishlistBtn').click()};$('#accountNav').onclick=e=>{e.preventDefault();$('#accountBtn').click()};function closePanels(){closeOverlays()}
$('#accountForm').onsubmit=async e=>{e.preventDefault();if(!currentUser)return toast('Please login to edit your account');const first=$('#editFirst').value.trim(),last=$('#editLast').value.trim(),phone=normalizePhone($('#editPhone').value),address=$('#editAddress').value.trim();if(!first||!last)return toast('Enter your first and last name');if(phone.length<7)return toast('Enter a valid phone number');const duplicate=Object.values(users).some(u=>u.email!==currentUser.email&&normalizePhone(u.phone)===phone);if(duplicate)return toast('That phone number is already used by another account');try{const d=await apiRequest('/api/account',{method:'PATCH',body:JSON.stringify({first,last,phone,address})});syncLocalUser(d.user);fillAccount();toast('Account details saved')}catch(err){toast(err.message)}};
async function renderAccountOrders(){const box=$('#accountOrders');if(!box)return;if(!currentUser){box.innerHTML='<p class="mini">Please login to view your orders.</p>';return}try{const d=await apiRequest('/api/orders');if(Array.isArray(d.orders)){orders=d.orders;set(KEY.orders,orders)}}catch(_){}const mine=orders.filter(o=>String(o.userEmail||'').toLowerCase()===String(currentUser.email||'').toLowerCase() || String(o.userId||'')===String(currentUser.id||'')).slice().reverse();box.innerHTML=mine.length?mine.map(o=>`<div class="message-card" style="margin-bottom:8px"><b>${esc(o.id)} • GH₵${Number(o.total||0).toFixed(2)}</b><div class="mini">${esc(o.created?new Date(o.created).toLocaleString():(o.date||''))} • ${esc(o.status||'Pending')}</div><div class="mini">${(o.items||[]).map(i=>esc(i.name||i.title||'Product')+' × '+Number(i.qty||1)).join(', ')}</div></div>`).join(''):'<p class="mini">No orders yet.</p>'}
function profileInitial(user){const first=String(user?.first||'').trim();if(first)return Array.from(first)[0].toLocaleUpperCase();const email=String(user?.email||'').trim();return (Array.from(email)[0]||'C').toLocaleUpperCase()}
function fillAccount(){if(!currentUser){$('#accountName').textContent='Guest';$('#accountEmail').textContent='Login to manage your account';$('#accountAvatar').textContent='G';return}const fullName=[currentUser.first,currentUser.last].filter(Boolean).join(' ').trim();$('#accountName').textContent=fullName||currentUser.email||'Customer';$('#accountEmail').textContent=currentUser.email||'';$('#accountAvatar').textContent=profileInitial(currentUser);$('#accountAvatar').setAttribute('aria-label',(fullName||currentUser.email||'Customer')+' profile initial');$('#editFirst').value=currentUser.first||'';$('#editLast').value=currentUser.last||'';$('#editPhone').value=currentUser.phone||'';$('#editAddress').value=currentUser.address||'';$('#coName').value=fullName;$('#coPhone').value=currentUser.phone||'';$('#coAddress').value=currentUser.address||'';renderAccountOrders()}
$('#logoutCustomer').onclick=async()=>{try{await apiRequest('/api/auth/logout',{method:'POST',body:'{}'})}catch(_){}currentUser=null;localStorage.removeItem(KEY.current);cart=[];set(KEY.cart,cart);closeOverlays();$('#storeApp').classList.add('hidden');$('#loginScreen').classList.remove('hidden');showAuth('login');$('#loginEmail').value='';$('#loginPassword').value=''};

$('#searchBtn').onclick=()=>{const q=$('#marketSearchInput')?.value?.trim()||'';if($('#searchInput'))$('#searchInput').value=q;sidebarCategory='All';renderCatalog('All',q);$('#searchBox')?.classList.add('hidden');$('#shop')?.scrollIntoView({behavior:'smooth',block:'start'});};$('#searchGo').onclick=()=>{sidebarCategory='All';renderCatalog('All',$('#searchInput').value);$('#searchBox').classList.add('hidden');$('#shop')?.scrollIntoView({behavior:'smooth',block:'start'});};$('#searchInput').oninput=()=>renderCatalog('All',$('#searchInput').value);$('#searchInput').onkeydown=e=>{if(e.key==='Enter')$('#searchGo').click()};
$('#checkoutBtn').onclick=()=>{if(!currentUser){closeOverlays();$('#storeApp').classList.add('hidden');$('#loginScreen').classList.remove('hidden');showAuth('login');return toast('Please login before checkout')}if(!cart.length)return toast('Your cart is empty');const blocked=cart.find(x=>{const p=products.find(p=>p.id===x.id);return !p||Number(p.stock||0)<Number(x.qty||0)});if(blocked){const p=products.find(p=>p.id===blocked.id);return toast(p&&Number(p.stock||0)<=0?p.name+' is out of stock — checkout is blocked until restock':'Not enough stock for '+(p?.name||'a product'))}$('#drawer').classList.remove('open');$('#checkoutBox').classList.add('open');$('#overlay').classList.add('open')};$('#closeCheckout').onclick=closeOverlays;$('#coPayment').onchange=()=>$('#momoNotice').classList.toggle('hidden',$('#coPayment').value!=='Mobile Money');
$('#checkoutForm').onsubmit=async e=>{e.preventDefault();if(!currentUser)return toast('Please sign in before checkout');if(!cart.length)return toast('Your cart is empty');const lines=cart.map(x=>{const p=products.find(p=>p.id===x.id);return{item:x,product:p}});const unavailable=lines.find(({item,product})=>!product||Number(product.stock||0)<item.qty);if(unavailable)return toast(!unavailable.product?'A product in your cart is no longer available':'Not enough stock for '+unavailable.product.name);const paymentMethod=$('#coPayment').value;const btn=$('#checkoutForm button.primary');if(btn){btn.disabled=true;btn.textContent='PLACING ORDER...'}try{const d=await apiRequest('/api/orders',{method:'POST',body:JSON.stringify({customer:$('#coName').value.trim(),phone:$('#coPhone').value.trim(),address:$('#coAddress').value.trim(),paymentMethod,items:cart.map(x=>({id:x.id,qty:x.qty,size:x.size||''}))})});if(d.products)products=d.products;orders.unshift(d.order);set(KEY.products,products);set(KEY.orders,orders);sendMessage(currentUser.email,'Order '+d.order.id,paymentMethod==='Mobile Money'?'Your Mobile Money payment is pending confirmation.':'Your order has been received and is being processed.');cart=[];set(KEY.cart,cart);renderCart();renderCatalog(currentFilter());renderAccountOrders();closeOverlays();toast(paymentMethod==='Mobile Money'?'Order placed — payment pending confirmation':'Order sent to VALVIMART')}catch(err){toast(err.message)}finally{if(btn){btn.disabled=false;btn.textContent='PLACE ORDER'}}};

async function sendMessage(email,subject,body){if(!email||!subject||!body)return;try{try{await apiRequest('/api/admin/messages',{method:'POST',body:JSON.stringify({email,subject,body})})}catch(_){await apiRequest('/api/messages',{method:'POST',body:JSON.stringify({subject,body})})}if(email===currentUser?.email)await renderInbox()}catch(_){messages[email]=messages[email]||[];messages[email].push({id:Date.now()+Math.random(),subject,body,date:new Date().toLocaleString(),read:false});set(KEY.messages,messages);if(email===currentUser?.email)renderInbox()}}
async function renderInbox(){if(!currentUser||!$('#inboxList'))return;let list=[];try{const d=await apiRequest('/api/messages');list=Array.isArray(d.messages)?d.messages:[];messages[currentUser.email]=list;set(KEY.messages,messages)}catch(_){list=(messages[currentUser.email]||[]).slice().reverse()}$('#inboxCount').textContent=list.filter(m=>!m.read).length;$('#inboxList').innerHTML=list.length?list.map(m=>`<div class="message-card ${m.read?'':'unread'}"><b>${esc(m.subject)}</b><p>${esc(m.body)}</p><small>${esc(m.date||new Date(m.createdAt||Date.now()).toLocaleString())}</small></div>`).join(''):'<p class="mini">No messages yet.</p>'}
function openInbox(){if(!currentUser){closeOverlays();$('#storeApp').classList.add('hidden');$('#loginScreen').classList.remove('hidden');showAuth('login');return toast('Please login to access your inbox')}$('#inboxPanel').classList.add('open');$('#overlay').classList.add('open');messages[currentUser.email]=(messages[currentUser.email]||[]).map(m=>({...m,read:true}));set(KEY.messages,messages);renderInbox()}
$('#inboxBtn')?.addEventListener('click',openInbox);$('#inboxNav').onclick=e=>{e.preventDefault();openInbox()};
$$('.social-btn').forEach(b=>b.onclick=()=>toast(b.dataset.social+' login needs OAuth setup on a secure backend.'));
function getProductReviews(id){return reviews[id]||[]}
function averageRating(id){const r=getProductReviews(id);return r.length?(r.reduce((a,x)=>a+x.rating,0)/r.length).toFixed(1):'0.0'}
function submitReview(id){if(!currentUser)return toast('Login required');const rating=Number(document.querySelector('#modalRating .active')?.dataset.rating||0),comment=$('#modalComment').value.trim();if(!rating)return toast('Choose a star rating');if(!comment)return toast('Write a comment or feedback');reviews[id]=reviews[id]||[];reviews[id].push({email:currentUser.email,name:currentUser.first+' '+currentUser.last,rating,comment,date:new Date().toLocaleString()});set(KEY.reviews,reviews);$('#modalComment').value='';renderReviews(id);toast('Thank you for your feedback')}
function renderReviews(id){const arr=getProductReviews(id);$('#modalReviews').innerHTML=`<div style="margin-top:12px"><b>Reviews (${arr.length}) • ${averageRating(id)} / 5</b>${arr.map(r=>`<div class="review"><b>${esc(r.name)} • ${'★'.repeat(r.rating)}${'☆'.repeat(5-r.rating)}</b><div>${esc(r.comment)}</div><small>${esc(r.date)}</small></div>`).join('')}</div>`}

// customer service: dynamic admin email
const serviceLink=document.createElement('a');serviceLink.href='#service';serviceLink.textContent='CONTACT ADMIN';serviceLink.className='primary';serviceLink.style.cssText='position:fixed;right:20px;bottom:20px;z-index:40;text-decoration:none';document.body.appendChild(serviceLink);
// ADMIN — server-authenticated (do not use localStorage/sessionStorage for admin access)
let adminStandalone=false;
let adminAuthed=false;
// The customer login page's Admin Login link must open the administrator login directly,
// without passing through the welcome screen. Keep ?admin=1 as a refresh-safe fallback.
$('#adminOpenBtn')?.addEventListener('click',()=>{$('#adminPortal').classList.add('open');showAdminLogin()});
$('#closeAdminLogin').onclick=()=>{if(adminStandalone){window.location.href='index.html'}else{$('#adminPortal').classList.remove('open')}};
$('#exitAdmin').onclick=()=>{if(adminStandalone){window.location.href='index.html'}else{$('#adminPortal').classList.remove('open')}};

async function showAdminLogin(){
  try{
    const me=await apiRequest('/api/admin/me');
    adminAuthed=Boolean(me.authenticated); if(me.authenticated){if($('#adminRoleChip'))$('#adminRoleChip').textContent=me.roleLabel||'Executive Admin';applyManagerRole(me.role||'executive-admin');}
  }catch(_){ adminAuthed=false; }
  if(adminAuthed){
    $('#adminLogin').classList.add('hidden');
    $('#adminDashboard').classList.remove('hidden');
    try{
      const data=await apiRequest('/api/admin/dashboard');
      if(Array.isArray(data.products)){products=data.products;set(KEY.products,products);}
      if(Array.isArray(data.orders)){orders=data.orders;set(KEY.orders,orders);}
      if(Array.isArray(data.coupons)){set('valvi_coupons',data.coupons);}
      if(Array.isArray(data.users)){
        const mapped={}; data.users.forEach(u=>mapped[u.email]=u);
        users=mapped; set(KEY.users,users);
      }
    }catch(err){ toast(err.message); }
    renderAdminAll();
    await loadAdminProfile();
  }else{
    $('#adminLogin').classList.remove('hidden');
    $('#adminDashboard').classList.add('hidden');
  }
}

// The single admin login submit handler is registered after DOMContentLoaded below.
$('#adminLogout').onclick=async()=>{
  try{await apiRequest('/api/admin/logout',{method:'POST',body:'{}'});}catch(_){}
  adminAuthed=false;
  await showAdminLogin();
};
$$('.side').forEach(b=>b.dataset.adminView&&b.addEventListener('click',()=>switchAdmin(b.dataset.adminView)));async function switchAdmin(v){$$('.side[data-admin-view]').forEach(x=>x.classList.toggle('active',x.dataset.adminView===v));$$('.admin-view').forEach(x=>x.classList.add('hidden'));$('#admin-'+v).classList.remove('hidden');$('#adminTitle').textContent=v[0].toUpperCase()+v.slice(1);if(v==='users'&&adminAuthed){try{const data=await adminFetch('/api/admin/customers');if(Array.isArray(data.customers)){const mapped={};data.customers.forEach(u=>mapped[u.email]=u);users=mapped;set(KEY.users,users);renderUsers();const count=$('#registeredUsersCount');if(count)count.textContent=String(data.registeredUsers||data.customers.length);}}catch(err){toast(err.message)}}}
function applyManagerRole(role){
  const allowed={ 'executive-admin':['dashboard','products','categories','events','orders','users','messages','settings','staff'], 'web-manager':['dashboard','products','categories','events'], 'inventory-manager':['dashboard','products'], 'orders-care':['dashboard','orders','users','messages'], 'marketing-manager':['dashboard','events'], 'support-agent':['dashboard','messages'] };
  const views=allowed[role]||['dashboard'];
  $$('.side[data-admin-view]').forEach(b=>{const v=b.dataset.adminView;b.style.display=views.includes(v)?'':'none'});
  $$('.admin-view').forEach(v=>{const key=v.id.replace('admin-','');if(!views.includes(key))v.classList.add('hidden')});
  $$('.executive-only').forEach(el=>el.style.display=role==='executive-admin'?'':'none');
  if(role==='executive-admin') loadManagerAccounts().catch(()=>{});
  const first=views[0]||'dashboard'; if($('#admin-'+first)) switchAdmin(first);
}
async function loadManagerAccounts(){const box=$('#managerAccountsList');if(!box)return;const data=await adminFetch('/api/admin/managers');box.innerHTML=(data.managers||[]).map(m=>`<div class="manager-account"><div><strong>${esc(m.name)}</strong><br><small>@${esc(m.username)}</small></div><div><strong>${esc(m.roleLabel)}</strong><br><small class="${m.active?'':'inactive'}">${m.active?'Active':'Disabled'}</small></div><button class="ghost" type="button" data-manager-edit="${esc(m.id)}">Edit credentials</button><button class="ghost" type="button" data-manager-toggle="${esc(m.id)}" data-active="${m.active?'1':'0'}">${m.active?'Disable':'Enable'}</button></div>`).join('')||'<p>No manager accounts have been created yet.</p>';
box.querySelectorAll('[data-manager-edit]').forEach(btn=>btn.addEventListener('click',async()=>{const m=(data.managers||[]).find(x=>x.id===btn.dataset.managerEdit);if(!m)return;
const name=prompt('Manager full name:',m.name);if(name===null)return;
const username=prompt('Manager username:',m.username);if(username===null)return;
const roleOptions=['web-manager','inventory-manager','orders-care','marketing-manager','support-agent'];const rolePrompt='Enter assigned role exactly:\n'+roleOptions.join('\n');const role=prompt(rolePrompt,m.role);if(role===null)return;if(!roleOptions.includes(role)){toast('Invalid role. No changes saved.');return;}
const password=prompt('New password (leave blank to keep current password):','');if(password===null)return;
const payload={name:name.trim(),username:username.trim(),role};if(password)payload.password=password;
try{await adminFetch('/api/admin/managers/'+encodeURIComponent(m.id),{method:'PATCH',body:JSON.stringify(payload)});await loadManagerAccounts();toast('Manager credentials and role updated')}catch(e){toast(e.message)}}));
box.querySelectorAll('[data-manager-toggle]').forEach(btn=>btn.addEventListener('click',async()=>{try{await adminFetch('/api/admin/managers/'+encodeURIComponent(btn.dataset.managerToggle),{method:'PATCH',body:JSON.stringify({active:btn.dataset.active!=='1'})});await loadManagerAccounts();toast('Manager account updated')}catch(e){toast(e.message)}}))}
function renderAdminAll(){products=get(KEY.products,products);categories=get(KEY.categories,categories);orders=get(KEY.orders,orders);support=get(KEY.support,support);$('#sProducts').textContent=products.length;$('#sOrders').textContent=orders.length;$('#sRevenue').textContent=money(orders.filter(o=>o.status!=='Cancelled').reduce((a,o)=>a+Number(o.total||0),0));$('#sLow').textContent=products.filter(p=>Number(p.stock||0)<=5).length;renderProductTable();renderCategoryList();renderOrderTable();renderGroupOptions();renderUsers();renderMessageUsers();$('#supportEmail').value=support;$('#serviceEmailLabel').textContent=support;serviceLink.href='#service'}
function renderProductTable(){$('#productTable').innerHTML=products.map(p=>`<tr><td><img src="${imgSrc(p)}" style="width:42px;height:50px;object-fit:cover;vertical-align:middle;margin-right:7px"><b>${esc(p.name)}</b></td><td>${esc(p.group)}</td><td>${money(p.price)}</td><td>${p.stock}</td><td><button class="ghost" onclick="editProduct(${p.id})">Edit</button> <button class="ghost" onclick="deleteProduct(${p.id})">Delete</button></td></tr>`).join('')}
function renderCategoryList(){$('#categoryList').innerHTML=categories.map(c=>`<span class="tag">${esc(c)} ${['Men','Women','Unisex','Sneakers','Watches','Bags'].includes(c)?'':`<button onclick="deleteCategory('${esc(c).replaceAll("'","\'")}')">×</button>`}</span>`).join('')}
function renderOrderTable(){
  $('#orderTable').innerHTML=orders.slice().reverse().map(o=>{
    const payment=o.paymentMethod||o.payment||'Not specified';
    return `<tr>
      <td><b>${esc(o.id)}</b></td>
      <td>${esc(o.customer)}</td>
      <td>${esc(o.phone)}</td>
      <td>${money(o.total)}</td>
      <td>${esc(payment)} ${(payment==='Mobile Money')?`<br><span class="${o.paymentStatus==='successful'?'payment-success':o.paymentStatus==='failed'?'payment-failed':'payment-pending'}">${o.paymentStatus==='successful'?'PAYMENT SUCCESSFUL':o.paymentStatus==='failed'?'TRANSACTION FAILED':'PENDING PAYMENT'}</span>`:''}</td>
      <td><select onchange="updateOrder('${esc(o.id)}',this.value)">${['Order Received','Order Processing','Order Confirm','Order Delivered'].map(st=>`<option ${o.status===st?'selected':''}>${st}</option>`).join('')}</select></td>
      <td><button class="ghost" onclick="trackAdminOrder('${esc(o.id)}')">VIEW / TRACK</button></td>
    </tr>`;
  }).join('')||'<tr><td colspan="7">No orders yet.</td></tr>';
}
window.trackAdminOrder=(id)=>{const o=orders.find(x=>String(x.id)===String(id));if(!o)return;const box=document.querySelector('#adminTrackingResult');if(box){box.innerHTML=`<div class=\"account-card\"><b>${esc(o.id)}</b><div class=\"mini\">${esc(o.customer||'')} • ${esc(o.phone||'')}</div><div style=\"margin-top:8px\"><b>Items:</b> ${(o.items||[]).map(i=>esc(i.name||i.title||'Product')+' × '+Number(i.qty||1)).join(', ')||'No items recorded'}</div><div style=\"margin-top:6px\"><b>Total:</b> ${money(o.total)} • <b>Status:</b> ${esc(o.status||'Order Received')}</div></div>`;} };
/* status updates are handled by updateOrder() */
/* legacy block removed */
window.confirmPayment=id=>{orders=orders.map(o=>o.id===id?{...o,paymentStatus:'successful',status:'Processing'}:o);set(KEY.orders,orders);const o=orders.find(x=>x.id===id);if(o?.userEmail)sendMessage(o.userEmail,'Payment successful — '+id,'Your Mobile Money payment has been confirmed by VALVIMART. Your order is now processing.');renderAdminAll();toast('Payment confirmed')};
window.failPayment=id=>{const o=orders.find(x=>x.id===id);if(!o)return;if(o.status!=='Cancelled'&&!o.stockRestored&&o.items?.length){o.items.forEach(item=>{const p=products.find(p=>p.id===item.id);if(p)p.stock=Number(p.stock||0)+Number(item.qty||0)});o.stockRestored=true}o.paymentStatus='failed';o.status='Cancelled';set(KEY.products,products);set(KEY.orders,orders);if(o?.userEmail)sendMessage(o.userEmail,'Payment failed — '+id,'Your Mobile Money transaction could not be confirmed. Your order was cancelled and reserved stock was released. Please contact customer service.');renderAdminAll();renderCatalog(currentFilter());toast('Payment marked failed')};
$('#categoryForm').onsubmit=e=>{e.preventDefault();let c=$('#newCategory').value.trim();if(c&&!categories.some(x=>x.toLowerCase()===c.toLowerCase())){categories.push(c);set(KEY.categories,categories);$('#newCategory').value='';renderAdminAll();renderFilters();toast('Category added')}};window.deleteCategory=c=>{if(confirm('Delete category '+c+'?')){categories=categories.filter(x=>x!==c);set(KEY.categories,categories);renderAdminAll();renderFilters();toast('Category deleted')}};

function renderDashboardCustomers(){const box=$('#dashboardCustomers');if(!box)return;const arr=Object.values(users).slice().sort((a,b)=>new Date(b.created||0)-new Date(a.created||0)).slice(0,8);box.innerHTML=arr.length?arr.map(u=>`<div class="dashboard-customer"><div><b>${esc(((u.first||'')+' '+(u.last||'')).trim()||'Customer')}</b><div class="mini">${esc(u.email||'—')} • ${esc(u.phone||'—')}</div></div><span class="user-badge ${u.status==='banned'?'status-banned':u.status==='suspended'?'status-suspended':'status-active'}">${esc(u.status||'active')}</span></div>`).join(''):'<p class="mini">No customer accounts yet.</p>'}
function renderUsers(){const arr=Object.values(users).sort((a,b)=>new Date(b.created||0)-new Date(a.created||0));const count=$('#registeredUsersCount');if(count)count.textContent=String(arr.length);$('#userTable').innerHTML=arr.length?arr.map(u=>`<div class="admin-user-card"><div><b>${esc(((u.first||'')+' '+(u.last||'')).trim()||'Customer')}</b> <span class="user-badge ${u.status==='banned'?'status-banned':u.status==='suspended'?'status-suspended':'status-active'}">${esc(u.status||'active')}</span> <span class="user-badge ${u.loginStatus==='Logged in'?'status-active':'status-suspended'}">${esc(u.loginStatus||'Not logged in')}</span><div class="admin-user-meta">Customer ID: ${esc(u.id||'—')}<br>Email: ${esc(u.email||'—')}<br>Phone: ${esc(u.phone||'—')}<br>Address: ${esc(u.address||'Not provided')}<br>Provider: ${esc(u.provider||'local')}<br>Registered: ${esc(u.created||'Unknown')}<br>Account: ${esc(u.accountStatus||'registered')}</div></div><div class="admin-actions"><button class="ghost" onclick="viewUser('${encodeURIComponent(u.email)}')">View</button><button class="warning" onclick="setUserStatus('${encodeURIComponent(u.email)}','suspended')">Suspend</button><button class="danger" onclick="setUserStatus('${encodeURIComponent(u.email)}','banned')">Ban</button><button class="ghost" onclick="setUserStatus('${encodeURIComponent(u.email)}','active')">Restore</button><button class="danger" onclick="deleteUser('${encodeURIComponent(u.email)}')">Delete</button></div></div>`).join(''):'<p class="mini">No registered customer accounts.</p>'}
window.viewUser=email=>{const u=users[decodeURIComponent(email)];if(!u)return;const box=$('#adminUserDetails');if(!box)return;box.innerHTML=`<div class="admin-detail-grid"><div><span>Customer ID</span><b>${esc(u.id||'Not available')}</b></div><div><span>Full Name</span><b>${esc(((u.first||'')+' '+(u.last||'')).trim()||'Not provided')}</b></div><div><span>Email</span><b>${esc(u.email||'Not provided')}</b></div><div><span>Phone</span><b>${esc(u.phone||'Not provided')}</b></div><div><span>Address</span><b>${esc(u.address||'Not provided')}</b></div><div><span>Provider</span><b>${esc(u.provider||'local')}</b></div><div><span>Status</span><b>${esc(u.status||'active')}</b></div><div><span>Joined</span><b>${esc(u.created||'Not available')}</b></div></div>`;$('#adminUserModal').classList.add('open');$('#adminUserModal').setAttribute('aria-hidden','false')};
$('#closeAdminUserModal')?.addEventListener('click',()=>{$('#adminUserModal').classList.remove('open');$('#adminUserModal').setAttribute('aria-hidden','true')});
$('#adminUserModal')?.addEventListener('click',e=>{if(e.target.id==='adminUserModal')$('#closeAdminUserModal').click()});
window.setUserStatus=async(email,status)=>{email=decodeURIComponent(email);try{const d=await adminFetch('/api/admin/users/'+encodeURIComponent(email),{method:'PATCH',body:JSON.stringify({status})});users[email]=d.user;set(KEY.users,users);if(currentUser?.email===email&&status!=='active'){currentUser=null;set(KEY.current,null);closeOverlays();$('#storeApp').classList.add('hidden');$('#loginScreen').classList.remove('hidden')}renderUsers();toast('Account '+status)}catch(e){toast(e.message)}};
window.deleteUser=async email=>{email=decodeURIComponent(email);const u=users[email];if(!u)return;if(!confirm('Delete '+u.first+' '+u.last+' account?'))return;try{await adminFetch('/api/admin/users/'+encodeURIComponent(email),{method:'DELETE'});delete users[email];set(KEY.users,users);renderUsers();renderMessageUsers();toast('Customer account deleted')}catch(e){toast(e.message)}};
function renderMessageUsers(){$('#messageUser').innerHTML=Object.values(users).filter(u=>u.status!=='deleted').map(u=>`<option value="${esc(u.email)}">${esc(u.first+' '+u.last)} — ${esc(u.email)}</option>`).join('')}
$('#messageForm').onsubmit=async e=>{e.preventDefault();const email=$('#messageUser').value,subject=$('#messageSubject').value.trim(),body=$('#messageBody').value.trim();if(!email||!subject||!body)return toast('Select a customer and enter a subject and message');const btn=e.currentTarget.querySelector('button.primary');if(btn){btn.disabled=true;btn.textContent='SENDING...'}try{await apiRequest('/api/admin/messages',{method:'POST',body:JSON.stringify({email,subject,body})});$('#messageSubject').value='';$('#messageBody').value='';toast('Message delivered to customer inbox')}catch(err){toast(err.message)}finally{if(btn){btn.disabled=false;btn.textContent='SEND MESSAGE'}}};
function renderGroupOptions(){const s=$('#pGroup');s.innerHTML=categories.map(c=>`<option>${esc(c)}</option>`).join('')}
$('#addProduct').onclick=()=>openProductForm();$('#closeProductForm').onclick=()=>{$('#productFormBox').classList.remove('open');$('#productOverlay').classList.remove('open')};$('#productOverlay').onclick=()=>$('#closeProductForm').click();
$('#pImageFile').onchange=e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=()=>{$('#pPreview').src=r.result};r.readAsDataURL(f)};
function openProductForm(id=null){const p=id?products.find(x=>String(x.id)===String(id)):null;$('#productFormTitle').textContent=p?'Edit Product':'Add Product';$('#editProductId').value=p?.id||'';$('#pName').value=p?.name||'';$('#pDesc').value=p?.desc||'';$('#pGroup').value=p?.group||categories[0];$('#pPrice').value=p?.price||'';$('#pStock').value=p?.stock??'';$('#pSizes').value=(p?.sizes||[]).join(',');$('#pFeatured').checked=!!p?.featured;$('#pImageUrl').value=p?.img||'';$('#pPreview').src=p?imgSrc(p):'';$('#pImageFile').value='';$('#productFormBox').classList.add('open');$('#productOverlay').classList.add('open')}
window.editProduct=openProductForm;window.deleteProduct=async id=>{if(!confirm('Delete this product?'))return;try{await adminFetch('/api/admin/products/'+encodeURIComponent(id),{method:'DELETE'});products=products.filter(p=>String(p.id)!==String(id));set(KEY.products,products);await renderAdminAll();renderCatalog(currentFilter());toast('Product deleted')}catch(e){toast(e.message)}};
$('#productForm').onsubmit=e=>{e.preventDefault();const id=+$('#editProductId').value;const old=products.find(p=>p.id===id);const file=$('#pImageFile').files[0];const finish=imageData=>{const p={id:id?Number(id):Date.now(),name:$('#pName').value.trim(),desc:$('#pDesc').value.trim(),group:$('#pGroup').value,price:+$('#pPrice').value,stock:+$('#pStock').value,sizes:$('#pSizes').value.split(',').map(x=>x.trim()).filter(Boolean),featured:$('#pFeatured').checked,img:$('#pImageUrl').value.trim()||old?.img||'p1.jpg',imageData:imageData||old?.imageData||''};products=id?products.map(x=>x.id===id?p:x):[p,...products];try{set(KEY.products,products)}catch(err){toast('Image is too large. Choose a smaller image.');return}$('#closeProductForm').click();renderAdminAll();renderCatalog(currentFilter());toast('Product saved')};if(file){const r=new FileReader();r.onload=()=>{const im=new Image();im.onload=()=>{const max=900,scale=Math.min(1,max/im.width);const c=document.createElement('canvas');c.width=Math.round(im.width*scale);c.height=Math.round(im.height*scale);c.getContext('2d').drawImage(im,0,0,c.width,c.height);finish(c.toDataURL('image/jpeg',.82))};im.src=r.result};r.readAsDataURL(file)}else finish('')};
async function loadAdminProfile(){try{const p=await apiRequest('/api/admin/me');$('#adminProfileName').value=p.name||'';$('#adminProfileEmail').value=p.email||'';$('#adminProfilePhone').value=p.phone||'';$('#adminProfileAddress').value=p.address||'';$('#newAdminUser').value=p.username||'';$('#newAdminPass').value='';const n=String(p.name||'').trim(),email=String(p.email||'').trim();$('#adminProfileAvatar').textContent=(Array.from(n||email)[0]||'A').toLocaleUpperCase();const summary=$('#adminProfileSummaryName');if(summary)summary.textContent=n||email||'Administrator';}catch(e){console.warn('Admin profile load failed',e)}}
$('#settingsForm').onsubmit=async e=>{e.preventDefault();const btn=e.currentTarget.querySelector('button[type=submit]');if(btn){btn.disabled=true;btn.textContent='SAVING...'}try{const profile=await adminFetch('/api/admin/profile',{method:'PATCH',body:JSON.stringify({name:$('#adminProfileName').value.trim(),email:$('#adminProfileEmail').value.trim(),phone:$('#adminProfilePhone').value.trim(),address:$('#adminProfileAddress').value.trim(),username:$('#newAdminUser').value.trim(),password:$('#newAdminPass').value})});set(KEY.admin,{username:profile.profile.username,name:profile.profile.name,email:profile.profile.email,phone:profile.profile.phone,address:profile.profile.address});support=$('#supportEmail').value.trim()||support;set(KEY.support,support);await loadAdminProfile();renderAdminAll();toast('Admin settings saved successfully')}catch(err){toast(err.message||'Could not save admin settings')}finally{if(btn){btn.disabled=false;btn.textContent='SAVE ADMIN SETTINGS'}}};
function esc(v){return String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]))}
// Final landing-page guard: normal visitors cannot leave Welcome except via ENTER STORE.
document.addEventListener('click',function(e){
  const b=e.target.closest('#enterBtn');
  if(!b)return;
  e.preventDefault(); e.stopImmediatePropagation();
  welcomeUnlocked=true;
  showStore({force:true});
},{capture:true});
// Floating scroll control: jump between the product area and the feature/service section.
(function setupScrollControl(){
  const btn=document.getElementById('scrollToggle');
  if(!btn)return;
  const update=()=>{
    const store=document.getElementById('storeApp');
    if(!store || store.classList.contains('hidden')){btn.classList.add('hidden');return;}
    btn.classList.remove('hidden');
    const nearBottom=window.scrollY+window.innerHeight>=document.documentElement.scrollHeight-180;
    btn.textContent=nearBottom?'↑':'↓';
    btn.setAttribute('aria-label',nearBottom?'Scroll to top':'Scroll to features');
  };
  btn.addEventListener('click',()=>{
    const nearBottom=window.scrollY+window.innerHeight>=document.documentElement.scrollHeight-180;
    window.scrollTo({top:nearBottom?0:document.documentElement.scrollHeight,behavior:'smooth'});
  });
  window.addEventListener('scroll',update,{passive:true});
  window.addEventListener('resize',update);
  setTimeout(update,100);
})();

try{boot().catch(err=>{console.error('VALVIMART boot error',err);
  // On any startup error, fail safely to the Welcome screen. Never auto-enter
  // the storefront. ENTER STORE remains the explicit unlock action.
  welcomeUnlocked=false;
  document.documentElement.dataset.welcomeLocked='1';
  document.querySelector('#welcomeScreen')?.classList.remove('hidden');
  document.querySelector('#loginScreen')?.classList.add('hidden');
  document.querySelector('#storeApp')?.classList.add('hidden');
});}catch(err){console.error('VALVIMART boot error',err);
  welcomeUnlocked=false;
  document.documentElement.dataset.welcomeLocked='1';
  document.querySelector('#welcomeScreen')?.classList.remove('hidden');
  document.querySelector('#loginScreen')?.classList.add('hidden');
  document.querySelector('#storeApp')?.classList.add('hidden');
}




/* ================= INLINE SCRIPT 2 ================= */

document.addEventListener('DOMContentLoaded', function(){
  document.querySelectorAll('button').forEach(function(btn){
    if(btn.dataset.actionBound || btn.disabled) return;
    const hasInline = btn.hasAttribute('onclick');
    const hasKnown = ['showLogin','showRegister','forgotBtn','backToLogin','registerLink',
      'enterBtn','hamb','searchBtn','searchGo','favouritesBtn','accountBtn','inboxBtn',
      'checkoutBtn','closeCheckout','closeCart','closeModal','logoutCustomer',
      'adminOpenBtn','closeAdminLogin','exitAdmin','adminLogout','addProduct'].includes(btn.id);
    const type = (btn.getAttribute('type')||'submit').toLowerCase();
    if(hasInline || hasKnown || type==='submit') return;
    btn.addEventListener('click', function(){
      if(typeof toast==='function') toast((btn.textContent||'Button').trim()+' is not available yet.');
    });
    btn.dataset.actionBound='1';
  });
});



/* ================= INLINE SCRIPT 3 ================= */

document.addEventListener('DOMContentLoaded', function(){
  document.querySelectorAll('a[href="#home"],a[href="#shop"],a[href="#service"]').forEach(function(a){
    a.addEventListener('click', function(e){
      const id=a.getAttribute('href').slice(1), el=document.getElementById(id);
      if(el){ e.preventDefault(); el.scrollIntoView({behavior:'smooth',block:'start'}); }
    });
  });
});



/* ================= INLINE SCRIPT 4 ================= */

document.addEventListener('DOMContentLoaded',function(){
  const $x=s=>document.querySelector(s);
  const $$x=s=>Array.from(document.querySelectorAll(s));
  const $q=s=>document.querySelector(s);
  const escx=v=>String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));

  function renderOrderHistorySafe(){
    const box=$q('#accountOrders');
    if(!box || typeof currentUser==='undefined') return;
    const mine=(orders||[]).filter(o=>o.userEmail===currentUser?.email).slice().reverse();
    box.innerHTML=mine.length ? mine.map(o=>{
      const st=String(o.status||'Pending').toLowerCase().replace(/\s+/g,'-');
      return `<div class="message-card" style="margin-bottom:8px">
        <div style="display:flex;justify-content:space-between;gap:8px;flex-wrap:wrap">
          <b>${escx(o.id)}</b><span class="status-pill status-${st}">${escx(o.status||'Pending')}</span>
        </div>
        <div class="mini">${escx(o.date||'')} • GH₵${Number(o.total||0).toFixed(2)}</div>
        <div class="mini">${(o.items||[]).map(i=>escx(i.name||'Product')+' × '+Number(i.qty||1)).join(', ')}</div>
      </div>`;
    }).join(''):'<p class="mini">No orders yet.</p>';
  }

  async function trackOrder(){
    const id=($q('#trackingInput')?.value||'').trim().toUpperCase();
    const box=$q('#trackingResult');
    if(!box) return;
    if(!id) { box.innerHTML='<p class="mini">Enter an order number.</p>'; return; }
    box.innerHTML='<p class="mini">Loading your order…</p>';
    try{
      // Fetch the latest server copy so the customer sees status changes made by admin.
      let order=null;
      try{
        const data=await apiRequest('/api/orders/'+encodeURIComponent(id));
        order=data.order||null;
        if(order){orders=[order,...(orders||[]).filter(local=>String(local.id)!==String(order.id))];set(KEY.orders,orders);}
      }catch(ex){
        order=(orders||[]).find(o=>String(o.id).toUpperCase()===id)||null;
      }
      if(!order){ box.innerHTML='<p class="mini">Order not found. Please check the order number.</p>'; return; }
      if(typeof currentUser!=='undefined' && order.userEmail && order.userEmail!==currentUser?.email && order.userId && order.userId!==currentUser?.id){
        box.innerHTML='<p class="mini">You can only track your own orders.</p>'; return;
      }

      const statusMap={
        'Order Received':0,'Order Processing':1,'Order Confirm':2,'Order Delivered':3,
        'Pending Payment':0,'Pending':0,'Processing':1,'Shipped':2,'Delivered':3
      };
      const labels=['Order Received','Order Processing','Order Confirm','Order Delivered'];
      const currentLabel=labels[statusMap[String(order.status||'Order Received')]] || String(order.status||'Order Received');
      const current=statusMap[String(order.status||'Order Received')] ?? 0;
      const items=(order.items||[]).map(i=>{
        const product=products.find(p=>String(p.id)===String(i.id));
        const image=i.image||i.imageData||(product?imgSrc(product):'');
        const title=i.name||i.title||(product?.name)||'Product';
        const unit=Number(i.unitPrice||i.price||product?.price||0);
        return `<div style="display:grid;grid-template-columns:58px 1fr auto;gap:10px;align-items:center;padding:9px 0;border-bottom:1px solid #eee">
          <div style="width:58px;height:68px;background:#f3f3f3;overflow:hidden"><img src="${escx(image)}" alt="${escx(title)}" style="width:100%;height:100%;object-fit:cover"></div>
          <span><b>${escx(title)}</b><br><span class="mini">Qty: ${Number(i.qty||1)}${i.size?` • Size: ${escx(i.size)}`:''}</span></span>
          <b>GH₵${(unit*Number(i.qty||1)).toFixed(2)}</b>
        </div>`;
      }).join('');
      const rows=labels.map((s,i)=>`
        <div class="track-line" style="opacity:${i<=current?1:.45}">
          <span class="track-dot" style="background:${i<=current?'#111':'#bbb'}"></span>
          <div><b>${s}</b><div class="mini">${i<current?'Completed':i===current?'Current status':'Waiting'}</div></div>
        </div>`).join('');
      const payment=order.paymentMethod||order.payment||'Not specified';
      const created=order.created||order.createdAt||order.date;
      const dateText=created?new Date(created).toLocaleString('en-GH',{dateStyle:'medium',timeStyle:'short'}):(order.date||'');
      box.innerHTML=`
        <div class="account-card">
          <div style="display:flex;justify-content:space-between;gap:10px;align-items:center;flex-wrap:wrap">
            <h3 style="margin:0">${escx(order.id)}</h3>
            <span class="status-pill">${escx(currentLabel)}</span>
          </div>
          <div class="mini" style="margin-top:5px">Placed: ${escx(dateText)}</div>
          <hr style="border:0;border-top:1px solid #eee;margin:12px 0">
          <h4 style="margin:0 0 7px">ORDER DETAILS</h4>
          ${items||'<div class="mini">No item details available.</div>'}
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:12px">
            <div><span class="mini">TOTAL</span><br><b>GH₵${Number(order.total||0).toFixed(2)}</b></div>
            <div><span class="mini">PAYMENT METHOD</span><br><b>${escx(payment)}</b></div>
            <div><span class="mini">CUSTOMER</span><br><b>${escx(order.customer||'')}</b></div>
            <div><span class="mini">PHONE</span><br><b>${escx(order.phone||'')}</b></div>
          </div>
          ${order.address?`<div style="margin-top:10px"><span class="mini">DELIVERY ADDRESS</span><br><b>${escx(order.address)}</b></div>`:''}
          <hr style="border:0;border-top:1px solid #eee;margin:14px 0">
          <h4 style="margin:0 0 7px">ORDER STATUS</h4>
          ${rows}
        </div>`;
    }catch(e){
      box.innerHTML='<p class="mini">Unable to load your latest order status. Please try again.</p>';
    }
  }

  // Order tracking opens and closes like every other storefront panel.
  function openOrderTracking(){
    if(typeof currentUser==='undefined' || !currentUser){
      closeOverlays();
      $q('#storeApp')?.classList.add('hidden');
      $q('#loginScreen')?.classList.remove('hidden');
      if(typeof showAuth==='function')showAuth('login');
      if(typeof toast==='function')toast('Please login to track an order');
      return;
    }
    ['#drawer','#wishlistPanel','#accountPanel','#inboxPanel','#productModal','#checkoutBox'].forEach(s=>$q(s)?.classList.remove('open'));
    $q('#orderTrackingPanel')?.classList.add('open');
    $q('#overlay')?.classList.add('open');
  }
  function closeOrderTracking(){
    $q('#orderTrackingPanel')?.classList.remove('open');
    $q('#overlay')?.classList.remove('open');
  }
  window.__closeTracking=closeOrderTracking;

  const trackBtn=$q('#trackOrderBtn');
  if(trackBtn) trackBtn.addEventListener('click',trackOrder);
  const closeTrack=$q('#closeOrderTracking');
  if(closeTrack) closeTrack.addEventListener('click',closeOrderTracking);
  $q('#trackingInput')?.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();trackOrder();}});

  // Add a tracking entry point to the account area without changing existing markup.
  const accountNav=$q('#accountNav');
  if(accountNav && !document.querySelector('#trackingQuickBtn')){
    const b=document.createElement('button');
    b.id='trackingQuickBtn'; b.className='ghost full'; b.textContent='TRACK AN ORDER';
    b.style.marginTop='8px';
    b.onclick=openOrderTracking;
    const accountPanel=$q('#accountPanel .panel-body');
    if(accountPanel) accountPanel.appendChild(b);
  }

  // Admin order lookup button: always show the exact matching order and its items.
  const adminTrackBtn=$q('#adminTrackOrderBtn');
  if(adminTrackBtn) adminTrackBtn.addEventListener('click',async()=>{
    const id=($q('#adminTrackingInput')?.value||'').trim().toUpperCase();
    const box=$q('#adminTrackingResult');
    if(!box)return;
    if(!id){box.innerHTML='<p class=\"mini\">Enter an Order ID.</p>';return;}
    const local=(orders||[]).find(o=>String(o.id).toUpperCase()===id);
    if(local){
      box.innerHTML=`<div class=\"account-card\"><b>${escx(local.id)}</b><div class=\"mini\">${escx(local.customer||'')} • ${escx(local.phone||'')}</div><div style=\"margin-top:8px\"><b>Items:</b> ${(local.items||[]).map(i=>escx(i.name||'Product')+' × '+Number(i.qty||1)).join(', ')||'No items recorded'}</div><div style=\"margin-top:6px\"><b>Total:</b> GH₵${Number(local.total||0).toFixed(2)} • <b>Status:</b> ${escx(local.status||'Order Received')}</div></div>`;
      return;
    }
    box.innerHTML='<p class=\"mini\">Order not found.</p>';
  });

  // Keep account order history synchronized after order placement/status changes.
  // Navigation buttons/links: close the mobile menu after navigation and never leave stale panels open.
  $$x('.nav a').forEach(a=>a.addEventListener('click',()=>{ $x('#nav')?.classList.remove('open'); }));
  $x('.brand')?.addEventListener('click',()=>{ closeOverlays(); $x('#nav')?.classList.remove('open'); });

  const oldShowStore=window.showStore;
  if(typeof oldShowStore==='function'){
    window.showStore=function(){ oldShowStore.apply(this,arguments); setTimeout(renderOrderHistorySafe,0); };
  }
});



/* ================= INLINE SCRIPT 5 ================= */

document.addEventListener('DOMContentLoaded',function(){
 const b=document.querySelector('#applyCoupon');
 if(!b)return;
 b.addEventListener('click',function(){
   const code=(document.querySelector('#couponCode')?.value||'').trim().toUpperCase();
   const msg=document.querySelector('#couponMessage');
   if(code==='WELCOME10'){localStorage.setItem('valvi_coupon','WELCOME10');msg.textContent='10% discount will be applied at checkout.';if(typeof toast==='function')toast('Coupon applied');}
   else {localStorage.removeItem('valvi_coupon');msg.textContent='Invalid or expired coupon.';if(typeof toast==='function')toast('Invalid coupon');}
 });
});



/* ================= INLINE SCRIPT 6 ================= */

document.addEventListener("DOMContentLoaded",async function(){
  try{
    const r=await fetch("/api/health",{credentials:"include"});
    if(r.ok){
      const badge=document.createElement("div");
      badge.textContent="● Backend connected";
      badge.style.cssText="position:fixed;right:12px;bottom:12px;z-index:9999;padding:7px 10px;border-radius:999px;background:#111;color:#fff;font:700 11px Arial;box-shadow:0 4px 15px #0002";
      document.body.appendChild(badge);
      setTimeout(()=>badge.remove(),4000);
    }
  }catch(e){}
});



/* ================= INLINE SCRIPT 7 ================= */

document.addEventListener("DOMContentLoaded",function(){
  const overlay=document.createElement("div");
  overlay.id="pageTransition";
  overlay.innerHTML='<div class="fx-mark">VALVIMART</div>';
  document.body.appendChild(overlay);

  document.querySelectorAll("main > *, .hero, .section-title, .product-card, .card, .message-card, .account-card").forEach(function(el){
    el.classList.add("fx-reveal");
  });
  if("IntersectionObserver" in window){
    const io=new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){e.target.classList.add("fx-visible");io.unobserve(e.target)}
      });
    },{threshold:.08});
    document.querySelectorAll(".fx-reveal").forEach(function(el){io.observe(el)});
  }else document.querySelectorAll(".fx-reveal").forEach(function(el){el.classList.add("fx-visible")});

  document.addEventListener("click",function(e){
    const a=e.target.closest("a");
    if(!a)return;
    const href=a.getAttribute("href")||"";
    if(href.charAt(0)==="#"){
      const target=document.querySelector(href);
      if(target){e.preventDefault();target.scrollIntoView({behavior:"smooth",block:"start"});}
    }
  });

  document.querySelectorAll('a[href*="admin.html"],a[href*="?admin=1"]').forEach(function(a){
    a.addEventListener("click",function(){
      overlay.classList.add("show");
      setTimeout(function(){overlay.classList.remove("show")},650);
    });
  });
});



/* ================= INLINE SCRIPT 8 ================= */

document.addEventListener('DOMContentLoaded',function(){
  const $x=s=>document.querySelector(s);
  const $$x=s=>Array.from(document.querySelectorAll(s));
  const WA='https://wa.me/233257053921';
  const ADMIN_EMAIL=window.VALVI_ADMIN_EMAIL||window.FLEXX_ADMIN_EMAIL||'kelvynzack42@gmail.com';

  // 3D cube welcome background
  const wb=$x('.welcome-bg');
  if(wb&&!wb.querySelector('.cube-field')){const f=document.createElement('div');f.className='cube-field';for(let i=0;i<22;i++){const c=document.createElement('div');c.className='cube';c.style.left=(Math.random()*100)+'%';c.style.animationDelay=(-Math.random()*14)+'s';c.style.animationDuration=(10+Math.random()*10)+'s';for(let j=0;j<6;j++)c.appendChild(document.createElement('i'));f.appendChild(c)}wb.appendChild(f)};if(wb&&!wb.querySelector('.fashion-orbit')){const f=document.createElement('div');f.className='fashion-orbit';f.innerHTML='<span class="f1">👟</span><span class="f2">👜</span><span class="f3">👗</span><span class="f4">⌚</span>';wb.appendChild(f)}

  // Full-screen customer service page
  if(!$x('#serviceScreen')){const d=document.createElement('div');d.id='serviceScreen';d.innerHTML=`<div class="service-page"><div class="service-card"><button class="close" id="closeService" style="float:right">×</button><div class="eyebrow">VALVIMART SUPPORT</div><h1>Customer Service</h1><p style="color:#777;line-height:1.7">Need help with an order, payment, product, delivery or account? Contact the administrator directly.</p><div class="service-email"><strong>Administrator email</strong><span>${ADMIN_EMAIL}</span></div><div class="service-actions"><a class="email-btn" href="mailto:${ADMIN_EMAIL}?subject=VALVI%20MART%20Customer%20Service">SEND EMAIL</a><a class="whatsapp-btn" href="${WA}" target="_blank" rel="noopener">OPEN WHATSAPP</a></div></div></div>`;document.body.appendChild(d)}
  function openService(){document.body.classList.add('service-open');history.pushState({flexxView:'service'},'','#service');document.querySelector('#serviceScreen')?.scrollTo?.(0,0)}
  function closeService(){document.body.classList.remove('service-open');if(location.hash==='#service')history.replaceState({},'',location.pathname);};window.__closeService=closeService;
  $x('#closeService').onclick=closeService;
  $$x('a[href="#service"]').forEach(a=>a.onclick=e=>{e.preventDefault();openService()});
  document.addEventListener('click',function(e){
    const a=e.target.closest('a[href="#service"]');
    if(a){e.preventDefault();e.stopPropagation();openService();}
  },true);
  if(location.hash==='#service') setTimeout(openService,0);

  // Storefront panels intentionally use the half-screen drawer layout defined in CSS.

  // Inbox is private: never open it for a guest, even if another handler fires.
  document.addEventListener('click',function(e){
    const inbox=e.target.closest('#inboxBtn,#inboxNav,a[href="#inbox"]');
    if(inbox && !currentUser){
      e.preventDefault();
      e.stopImmediatePropagation();
      closeOverlays();
      $x('#storeApp')?.classList.add('hidden');
      $x('#loginScreen')?.classList.remove('hidden');
      if(typeof showAuth==='function')showAuth('login');
      toast('Please login to access your inbox');
      return false;
    }
  },true);

  // Login guard for favourites/cart additions. Viewing is allowed; adding is not.
  document.addEventListener('click',function(e){
    const heart=e.target.closest('.heart');
    const add=e.target.closest('#addBtn');
    if((heart||add)&&!currentUser){e.preventDefault();e.stopImmediatePropagation();closeOverlays();$x('#storeApp')?.classList.add('hidden');$x('#loginScreen')?.classList.remove('hidden');if(typeof showAuth==='function')showAuth('login');toast('Please login to add products to your favourites or cart');return false;}
  },true);

  // Premium 3D welcome parallax: subtle pointer-controlled depth, no external library.
  const welcome=$x('#welcomeScreen');
  if(welcome){
    const updateWelcome3D=(e)=>{
      if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
      const x=(e.clientX/window.innerWidth-.5), y=(e.clientY/window.innerHeight-.5);
      welcome.style.setProperty('--rx',(-y*4).toFixed(2)+'deg');
      welcome.style.setProperty('--ry',(x*5).toFixed(2)+'deg');
      welcome.style.setProperty('--mx',(x*22).toFixed(1)+'px');
      welcome.style.setProperty('--my',(y*16).toFixed(1)+'px');
    };
    welcome.addEventListener('pointermove',updateWelcome3D,{passive:true});
    welcome.addEventListener('pointerleave',()=>{welcome.style.setProperty('--rx','0deg');welcome.style.setProperty('--ry','0deg');welcome.style.setProperty('--mx','0px');welcome.style.setProperty('--my','0px')});
  }

  // Registration scroll controls
  const reg=$x('#registerForm');
  if(reg&&!$x('#registerScrollControls')){const wrap=document.createElement('div');wrap.className='auth-scroll-wrap';wrap.id='registerScrollWrap';while(reg.firstChild)wrap.appendChild(reg.firstChild);reg.appendChild(wrap);const ctl=document.createElement('div');ctl.id='registerScrollControls';ctl.className='register-scroll-controls';ctl.innerHTML='<button type="button" id="regUp">▲ SCROLL UP</button><button type="button" id="regDown">▼ SCROLL DOWN</button>';reg.insertBefore(ctl,wrap);$x('#regUp').onclick=()=>wrap.scrollBy({top:-240,behavior:'smooth'});$x('#regDown').onclick=()=>wrap.scrollBy({top:240,behavior:'smooth'})}

  // Forgot password verification flow. Server emails the code to the administrator/customer account.
  const ff=$x('#forgotForm');
  if(ff){
    if(!$x('#resetCode')){const c=document.createElement('input');c.id='resetCode';c.placeholder='Verification code sent to your account email';c.inputMode='numeric';c.autocomplete='one-time-code';ff.insertBefore(c,$x('#resetPassword'))}
    const verify=document.createElement('button');verify.type='button';verify.className='ghost';verify.id='requestResetCode';verify.textContent='SEND VERIFICATION CODE';
    const resetBtn=ff.querySelector('button.primary');ff.insertBefore(verify,resetBtn);
    const status=document.createElement('div');status.className='reset-wait hidden';status.id='resetStatus';ff.insertBefore(status,resetBtn);
    verify.onclick=async()=>{const email=$x('#resetEmail').value.trim().toLowerCase(),phone=$x('#resetPhone').value.trim();if(!email||!phone)return toast('Enter your email and phone number first');verify.disabled=true;verify.textContent='SENDING...';try{const r=await fetch('/api/auth/request-reset',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email,phone})});const d=await r.json();if(!r.ok)throw new Error(d.error||'Unable to send verification code');$x('#resetCode').style.display='block';status.classList.remove('hidden');status.textContent='A verification code has been sent to your account email. Enter it below, then click RESET PASSWORD.';toast('Verification code sent')}catch(err){toast(err.message)}finally{verify.disabled=false;verify.textContent='RESEND VERIFICATION CODE'}};
    ff.onsubmit=async e=>{e.preventDefault();const email=$x('#resetEmail').value.trim().toLowerCase(),phone=$x('#resetPhone').value.trim(),code=$x('#resetCode').value.trim(),p1=$x('#resetPassword').value,p2=$x('#resetPassword2').value;if(p1!==p2)return toast('Passwords do not match');if(!code)return toast('Enter the verification code');const btn=resetBtn;btn.disabled=true;btn.textContent='VERIFYING...';try{const r=await fetch('/api/auth/reset-password',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email,phone,code,password:p1})});const d=await r.json();if(!r.ok)throw new Error(d.error||'Reset failed');status.classList.remove('hidden');status.textContent='Verification accepted. Password change is being completed...';await new Promise(res=>setTimeout(res,2600));status.textContent='✓ Password change successful. You can now login with your new password.';toast('Password changed successfully');ff.reset();$x('#resetCode').style.display='none'}catch(err){toast(err.message)}finally{btn.disabled=false;btn.textContent='RESET PASSWORD'}};
  }

  // Promotions/discounts stored with products. Existing catalog is decorated after each render.
  const promoKey='valvi_promotion_v1';
  function discountFor(p){const pct=Math.max(0,Math.min(100,Number(p.discountPct||0)));return pct?Math.max(0,Number(p.price||0)*(1-pct/100)):Number(p.price||0)}
  function decorateCatalog(){
    const promo=JSON.parse(localStorage.getItem(promoKey)||'null');
    if(promo&&promo.title){let b=$x('#promoBanner');if(!b){b=document.createElement('div');b.id='promoBanner';b.className='promo-banner';$x('#storeApp')?.insertBefore(b,$x('#home'));}b.textContent=promo.title+(promo.ends?(' • Ends '+promo.ends):'')}else $x('#promoBanner')?.remove();
    $x('#shop')?.querySelectorAll('.card').forEach(card=>{const name=card.querySelector('.name')?.textContent;const p=(typeof products!=='undefined'?products:[]).find(x=>x.name===name);if(!p)return;const price=card.querySelector('.price');if(price&&Number(p.discountPct||0)>0){price.innerHTML='<span class="old-price">'+money(p.price)+'</span> '+money(discountFor(p))+' <span class="discount-tag">-'+Number(p.discountPct)+'%</span>'}})
  }
  const shop=$x('#shop');if(shop)new MutationObserver(()=>setTimeout(decorateCatalog,0)).observe(shop,{childList:true,subtree:true});
  setInterval(decorateCatalog,1500);

  // Discount-aware checkout and stock enforcement, with WhatsApp order notification.
  const cf=$x('#checkoutForm');
  if(cf){cf.onsubmit=async function(e){e.preventDefault();if(!currentUser)return toast('Please sign in before checkout');if(!cart.length)return toast('Your cart is empty');const lines=cart.map(x=>({item:x,product:products.find(p=>String(p.id)===String(x.id))}));const bad=lines.find(x=>!x.product||Number(x.product.stock||0)<Number(x.item.qty||0));if(bad)return toast(!bad.product?'A product is no longer available':'Checkout blocked: '+bad.product.name+' has insufficient stock');const total=lines.reduce((s,x)=>s+discountFor(x.product)*Number(x.item.qty||0),0);const payment=$x('#coPayment').value;if(!payment)return toast('Select a payment method');const orderPayload={items:lines.map(x=>({id:x.product.id,name:x.product.name,qty:Number(x.item.qty||0),size:x.item.size||'',unitPrice:discountFor(x.product)})),total,paymentMethod:payment,customer:$x('#coName').value.trim(),phone:$x('#coPhone').value.trim(),address:$x('#coAddress').value.trim()};const btn=cf.querySelector('button.dark');if(btn){btn.disabled=true;btn.textContent='PLACING ORDER...'}try{const d=await apiRequest('/api/orders',{method:'POST',body:JSON.stringify(orderPayload)});const saved=d.order;orders=[saved,...orders.filter(o=>String(o.id)!==String(saved.id))];set(KEY.orders,orders);if(Array.isArray(d.products)){products=d.products;set(KEY.products,products)}sendMessage(currentUser.email,'Order '+saved.id,'Your order has been received. Payment: '+payment+'.');const text='VALVIMART NEW ORDER%0A%0AOrder: '+encodeURIComponent(saved.id)+'%0ACustomer: '+encodeURIComponent(orderPayload.customer)+'%0APhone: '+encodeURIComponent(orderPayload.phone)+'%0ATotal: GH₵'+encodeURIComponent(total.toFixed(2))+'%0APayment: '+encodeURIComponent(payment)+'%0A%0AItems:%0A'+encodeURIComponent(orderPayload.items.map(i=>i.name+' x '+i.qty).join('%0A'));try{window.open(WA+'?text='+text,'_blank','noopener')}catch(_){}cart=[];set(KEY.cart,cart);renderCart();renderCatalog(currentFilter());renderAccountOrders();closeOverlays();toast('Order placed successfully')}catch(err){toast(err.message)}finally{if(btn){btn.disabled=false;btn.textContent='PLACE ORDER →'}}};}
  // Admin promotion controls and inventory health panel.
  const dash=$x('#admin-dashboard');
  if(dash&&!$x('#promoAdmin')){
    const box=document.createElement('div');box.id='promoAdmin';box.className='admin-card promo-admin';box.innerHTML=`<h3>Discounts & Promotion Event</h3><form id="promoForm"><input id="promoTitle" placeholder="Promotion event title"><input id="promoProduct" placeholder="Product ID or ALL"><input id="promoDiscount" type="number" min="0" max="100" placeholder="Discount %"><button class="primary">SAVE PROMOTION</button></form><div id="promoCurrent" class="mini" style="margin-top:8px"></div>`;dash.appendChild(box);
    const inv=document.createElement('div');inv.className='admin-card';inv.innerHTML='<h3>Inventory alerts</h3><div id="inventoryAlerts" class="stock-dashboard"></div>';dash.appendChild(inv);
    function renderPromoAdmin(){const p=JSON.parse(localStorage.getItem(promoKey)||'null');$x('#promoCurrent').textContent=p?'Active: '+p.title+' • '+(p.discount||0)+'% • Product: '+p.product:'No active promotion.'}
    $x('#promoForm').onsubmit=e=>{e.preventDefault();const title=$x('#promoTitle').value.trim(),product=$x('#promoProduct').value.trim(),pct=Number($x('#promoDiscount').value||0);if(product&&product.toUpperCase()!=='ALL'){const found=products.find(p=>String(p.id)===product);if(!found)return toast('Product ID not found');products=products.map(p=>String(p.id)===product?{...p,discountPct:pct}:p)}else products=products.map(p=>({...p,discountPct:pct}));set(KEY.products,products);localStorage.setItem(promoKey,JSON.stringify({title:title||'VALVIMART PROMOTION',product:product||'ALL',discount:pct,ends:''}));renderPromoAdmin();renderCatalog(currentFilter());renderAdminAll();toast('Promotion saved')};renderPromoAdmin();
  }
  function renderInventoryAlerts(){const box=$x('#inventoryAlerts');if(!box||typeof products==='undefined')return;const low=products.filter(p=>Number(p.stock||0)>0&&Number(p.stock||0)<=5),out=products.filter(p=>Number(p.stock||0)<=0),del=JSON.parse(localStorage.getItem('valvi_deleted_products_v1')||'[]');box.innerHTML=`<div class="mini-stock"><b>LOW STOCK (${low.length})</b>${low.map(p=>esc(p.name)+' — '+p.stock+' left').join('<br>')||'None'}</div><div class="mini-stock"><b>OUT OF STOCK (${out.length})</b>${out.map(p=>esc(p.name)).join('<br>')||'None'}</div><div class="mini-stock"><b>DELETED (${del.length})</b>${del.map(p=>esc(p.name)).join('<br>')||'None'}</div>`}
  setInterval(renderInventoryAlerts,1200);

  // Archive deleted products so admin can see them.
  // Product deletion is handled exclusively by the server-backed admin integration below.


  // Admin order sorting by exact creation date/time.
  const orderSection=$x('#admin-orders');
  if(orderSection&&!$x('#orderSort')){const bar=document.createElement('div');bar.className='sort-bar';bar.innerHTML='<label>Sort orders:</label><select id="orderSort"><option value="new">Newest first</option><option value="old">Oldest first</option></select>';orderSection.querySelector('.admin-card')?.insertBefore(bar,orderSection.querySelector('.table-wrap'));$x('#orderSort').onchange=renderSortedOrders}
  function renderSortedOrders(){const body=$x('#orderTable');if(!body||typeof orders==='undefined')return;const dir=$x('#orderSort')?.value==='old'?1:-1;const arr=orders.slice().sort((a,b)=>dir*(new Date(a.createdAt||a.date).getTime()-new Date(b.createdAt||b.date).getTime()));body.innerHTML=arr.map(o=>`<tr><td>${esc(o.id)}</td><td>${esc(o.customer)}</td><td>${esc(o.phone)}</td><td>${money(o.total)}</td><td>${esc(o.paymentMethod||o.payment||'Not specified')} ${(o.paymentMethod||o.payment)==='Mobile Money'?`<br><span class="payment-${o.paymentStatus||'pending'}">${esc(o.paymentStatus||'pending').toUpperCase()}</span>`:''}</td><td><select onchange="updateOrder('${esc(o.id)}',this.value)">${['Order Received','Order Processing','Order Confirm','Order Delivered'].map(s=>`<option ${o.status===s?'selected':''}>${s}</option>`).join('')}</select></td><td><button class="ghost" onclick="trackAdminOrder('${esc(o.id)}')">VIEW / TRACK</button></td></tr>`).join('')||'<tr><td colspan="7">No orders yet.</td></tr>'}
  setInterval(()=>{if($x('#admin-orders')?.classList.contains('hidden')===false)renderSortedOrders()},2000);

  // Guest storefront + admin "View Store" behavior.
  // Customers may browse the entire storefront without logging in. Authentication is
  // only required when they try to add an item to the cart/favourites or checkout.
  // ENTER STORE is intentionally handled by the single capture-phase handler above.
  // Keeping one handler prevents duplicate navigation, flashes, and competing state changes.

  // Return from the admin dashboard directly to the public store homepage.
  const viewStore=$x('#exitAdmin');
  if(viewStore){
    viewStore.onclick=()=>{
      if(typeof adminStandalone!=='undefined' && adminStandalone){
        // Standalone admin page (?admin=1): return to the normal public storefront.
        window.location.href='index.html';
        return;
      }
      $x('#adminPortal')?.classList.remove('open');
      $x('#storeApp')?.classList.remove('hidden');
      $x('#welcomeScreen')?.classList.add('hidden');
      $x('#loginScreen')?.classList.add('hidden');
      showStore();
      window.scrollTo({top:0,behavior:'smooth'});
      toast('Store homepage opened');
    };
  }

  // Browser back/forward navigation buttons.
  if(!$x('#navHistory')){const n=document.createElement('div');n.id='navHistory';n.className='nav-history';n.innerHTML='<button id="navBack" title="Back">←</button><button id="navForward" title="Forward">→</button>';document.body.appendChild(n);$x('#navBack').onclick=()=>history.back();$x('#navForward').onclick=()=>history.forward()}
  window.addEventListener('popstate',()=>{if(location.hash!=='#service')document.body.classList.remove('service-open')});
});



/* ================= INLINE SCRIPT 9 ================= */

/* VALVIMART GOOGLE IDENTITY SERVICES — robust renderer */
(function(){
  let googleReady=false, googleStarted=false, googleClientId='';
  const statusEl=()=>document.getElementById('googleStatus');
  const boxEl=()=>document.getElementById('googleSignInButton');
  function setStatus(text){ const el=statusEl(); if(el) el.textContent=text; }
  function showLoading(text='Loading Google Sign-In…'){ const box=boxEl(); if(box && !googleReady) box.innerHTML='<div class="google-loading" aria-live="polite">'+text+'</div>'; }
  function waitForGoogle(attempt=0){
    if(googleReady || googleStarted) return;
    if(window.google && window.google.accounts && window.google.accounts.id){ initGoogle(); return; }
    if(attempt>=80){ setStatus('Google Sign-In could not load. Check your internet connection and reload the page.'); showLoading('Google Sign-In unavailable'); return; }
    setTimeout(()=>waitForGoogle(attempt+1),250);
  }
  async function googleConfig(){
    showLoading();
    try {
      const r=await fetch('/api/config',{cache:'no-store',credentials:'same-origin'});
      const d=await r.json();
      if(!r.ok || !d.googleClientId){
        setStatus('Google Sign-In is not configured on this server yet.');
        showLoading('Google Sign-In unavailable');
        return;
      }
      googleClientId=d.googleClientId;
      setStatus('Continue with your Google account.');
      waitForGoogle();
    } catch(e){ setStatus('Unable to connect to the VALVIMART server. Start the Node server and reload.'); showLoading('Start the server to use Google'); }
  }
  function initGoogle(){
    if(googleReady || googleStarted || !googleClientId) return;
    if(!window.google || !window.google.accounts || !window.google.accounts.id){ waitForGoogle(); return; }
    googleStarted=true;
    try {
      window.google.accounts.id.initialize({client_id:googleClientId,callback:handleGoogleCredential,auto_select:false,cancel_on_tap_outside:true});
      googleReady=true;
      renderGoogleButton();
    } catch(e){ googleStarted=false; googleReady=false; setStatus('Google Sign-In could not be initialized: '+e.message); showLoading('Google Sign-In error'); }
  }
  function renderGoogleButton(){
    const box=boxEl(); if(!box || !googleReady) return;
    box.innerHTML='';
    window.google.accounts.id.renderButton(box,{theme:'outline',size:'large',shape:'rectangular',text:'continue_with',width:330,logo_alignment:'left'});
  }
  async function handleGoogleCredential(response){
    try {
      if(!response || !response.credential) throw new Error('Google did not return a login credential.');
      const r=await fetch('/api/auth/google',{method:'POST',headers:{'Content-Type':'application/json'},credentials:'include',body:JSON.stringify({credential:response.credential})});
      const d=await r.json(); if(!r.ok) throw new Error(d.error||'Google sign-in failed');
      if(typeof syncLocalUser==='function') syncLocalUser(d.user);
      if(typeof showStore==='function') showStore();
      window.scrollTo({top:0,behavior:'smooth'});
      if(typeof toast==='function') toast('Welcome, '+(d.user.first||'Customer'));
    } catch(e){ setStatus(e.message); if(typeof toast==='function') toast(e.message); }
  }
  window.addEventListener('load',googleConfig);
  document.addEventListener('DOMContentLoaded',()=>setTimeout(googleConfig,100));
  window.__valviGoogleRefresh=()=>{ if(googleReady) renderGoogleButton(); else waitForGoogle(); }; window.addEventListener('resize',()=>{if(googleReady) renderGoogleButton();});
})();



/* ================= INLINE SCRIPT 10 ================= */

/* VALVIMART ADMIN BACKEND INTEGRATION */
(function(){
  async function adminFetch(path, opts={}){
    opts.credentials='include'; opts.headers=Object.assign({'Content-Type':'application/json'},opts.headers||{});
    const r=await fetch(path,opts); let d={}; try{d=await r.json()}catch(e){}
    if(!r.ok) throw new Error(d.error||'Administrator request failed'); return d;
  }
  async function loadAdminData(){
    const d=await adminFetch('/api/admin/dashboard');
    // The server is the single source of truth. Never push browser-local
    // products/orders back to the server automatically; doing so can resurrect
    // products that an administrator deliberately deleted.
    products=(Array.isArray(d.products)?d.products:[]).map(p=>({...p,id:Number(p.id)||p.id,group:p.group||p.type||'Unisex'}));
    orders=Array.isArray(d.orders)?d.orders:[];
    users={}; (d.users||[]).forEach(u=>users[u.email]=u); if(Array.isArray(d.messages)){window.__adminMessages=d.messages;}
    set(KEY.products,products); set(KEY.orders,orders); set(KEY.users,users);
    renderAdminLocal();
  }
  function renderAdminLocal(){
    $('#sProducts').textContent=products.length;
    $('#sOrders').textContent=orders.length;
    $('#sRevenue').textContent=money(orders.filter(o=>o.status!=='Cancelled').reduce((a,o)=>a+Number(o.total||0),0));
    $('#sLow').textContent=products.filter(p=>Number(p.stock||0)<=5).length;
    renderProductTable(); renderCategoryList(); renderOrderTable(); renderGroupOptions(); renderUsers(); renderMessageUsers(); renderDashboardCustomers();
    $('#supportEmail').value=support;
    if(typeof serviceLink!=='undefined') serviceLink.href='#service';
  }
  window.renderAdminAll=async function(){try{await loadAdminData()}catch(e){toast(e.message)}};

  document.addEventListener('DOMContentLoaded',function(){
    const refreshCustomers=$('#refreshCustomers');
    if(refreshCustomers) refreshCustomers.addEventListener('click',async function(){try{const data=await adminFetch('/api/admin/customers');const mapped={};(data.customers||[]).forEach(u=>mapped[u.email]=u);users=mapped;set(KEY.users,users);renderUsers();toast('Customer list refreshed from server')}catch(e){toast(e.message)}});
    adminFetch('/api/admin/me').then(function(me){
      if(me.authenticated){adminAuthed=true;sessionStorage.setItem('valvi_admin_auth','1');$('#adminLogin').classList.add('hidden');$('#adminDashboard').classList.remove('hidden');if($('#adminRoleChip'))$('#adminRoleChip').textContent=me.roleLabel||'Executive Admin';applyManagerRole(me.role||'executive-admin');loadAdminData().catch(function(err){toast(err.message)})}
      else {adminAuthed=false;sessionStorage.removeItem('valvi_admin_auth');$('#adminLogin').classList.remove('hidden');$('#adminDashboard').classList.add('hidden')}
    }).catch(function(){adminAuthed=false;sessionStorage.removeItem('valvi_admin_auth');$('#adminLogin').classList.remove('hidden');$('#adminDashboard').classList.add('hidden')});
    const login=$('#adminLoginForm');
    if(login) login.onsubmit=async function(e){
      e.preventDefault(); const btn=login.querySelector('button.primary');
      btn.disabled=true; btn.textContent='SIGNING IN...';
      try{
        await adminFetch('/api/admin/login',{method:'POST',body:JSON.stringify({username:$('#adminUser').value.trim(),password:$('#adminPass').value})});
        // Verify the protected dashboard can be loaded before revealing it.
        await loadAdminData();
        adminAuthed=true; sessionStorage.setItem('valvi_admin_auth','1');
        const me=await adminFetch('/api/admin/me'); const roleLabel=me.roleLabel||'Executive Admin'; if($('#adminRoleChip')) $('#adminRoleChip').textContent=roleLabel; applyManagerRole(me.role||'executive-admin');
        $('#adminLogin').classList.add('hidden'); $('#adminDashboard').classList.remove('hidden');
        toast('Admin dashboard opened');
      }catch(err){toast(err.message)}finally{btn.disabled=false;btn.textContent='SIGN IN'}
    };
    const logout=$('#adminLogout'); if(logout) logout.onclick=async function(){try{await adminFetch('/api/admin/logout',{method:'POST'})}catch(e){} adminAuthed=false;sessionStorage.removeItem('valvi_admin_auth');showAdminLogin()};
    const managerForm=$('#managerCreateForm'); if(managerForm) managerForm.addEventListener('submit',async function(e){e.preventDefault();const submit=managerForm.querySelector('button[type="submit"]');submit.disabled=true;try{await adminFetch('/api/admin/managers',{method:'POST',body:JSON.stringify({name:$('#managerName').value.trim(),username:$('#managerUsername').value.trim(),password:$('#managerPassword').value,role:$('#managerAssignedRole').value})});managerForm.reset();await loadManagerAccounts();toast('Manager account created with its assigned role')}catch(err){toast(err.message)}finally{submit.disabled=false}});
    const settings=$('#settingsForm'); if(settings) settings.onsubmit=function(e){e.preventDefault(); support=$('#supportEmail').value.trim()||support; set(KEY.support,support); $('#supportEmail').value=support; if(typeof serviceLink!=='undefined')serviceLink.href='#service'; toast('Store settings saved')};
  });

  window.deleteProduct=async function(id){
    if(!confirm('Delete this product?'))return;
    const pid=String(id);
    try{
      await adminFetch('/api/admin/products/'+encodeURIComponent(pid),{method:'DELETE'});
      // Make the server authoritative immediately after deletion. This prevents
      // stale localStorage data or another render pass from bringing the product back.
      const fresh=await adminFetch('/api/admin/dashboard');
      products=(Array.isArray(fresh.products)?fresh.products:[]).map(p=>({...p,id:Number(p.id)||p.id}));
      // Remove the deleted product from all browser-side derived state too.
      favourites=favourites.filter(fid=>String(fid)!==pid);
      cart=cart.filter(item=>String(item.id)!==pid);
      set(KEY.products,products);
      set(KEY.favourites,favourites);
      set(KEY.cart,cart);
      renderAdminLocal();
      renderFilters();
      renderCatalog(currentFilter());
      renderCart();
      renderFavourites();
      toast('Product permanently deleted');
    }catch(e){toast(e.message)}
  };

  document.addEventListener('DOMContentLoaded',function(){
    const form=$('#productForm'); if(!form)return;
    form.onsubmit=async function(e){
      e.preventDefault(); const id=$('#editProductId').value; const old=products.find(x=>String(x.id)===String(id)); const file=$('#pImageFile').files[0];
      const finish=async imageData=>{
        const p={id:id?Number(id):Date.now(),name:$('#pName').value.trim(),desc:$('#pDesc').value.trim(),group:$('#pGroup').value,price:+$('#pPrice').value,stock:+$('#pStock').value,sizes:$('#pSizes').value.split(',').map(x=>x.trim()).filter(Boolean),featured:$('#pFeatured').checked,img:$('#pImageUrl').value.trim()||old?.img||'p1.jpg',imageData:imageData||old?.imageData||''};
        try{const d=await adminFetch('/api/admin/products',{method:'POST',body:JSON.stringify(p)});const saved=d.product; products=products.filter(x=>String(x.id)!==String(saved.id));products.unshift(saved);set(KEY.products,products);$('#closeProductForm').click();renderAdminLocal();renderCatalog(currentFilter());toast('Product saved')}catch(err){toast(err.message)}
      };
      if(file){const r=new FileReader();r.onload=()=>{const im=new Image();im.onload=()=>{const max=900,scale=Math.min(1,max/im.width);const c=document.createElement('canvas');c.width=Math.round(im.width*scale);c.height=Math.round(im.height*scale);c.getContext('2d').drawImage(im,0,0,c.width,c.height);finish(c.toDataURL('image/jpeg',.82))};im.src=r.result};r.readAsDataURL(file)} else finish('');
    };
  });

  window.updateOrder=async function(id,status){
    const o=orders.find(x=>String(x.id)===String(id)); if(!o)return;
    try{const d=await adminFetch('/api/admin/orders/'+encodeURIComponent(id),{method:'PATCH',body:JSON.stringify({status})}); Object.assign(o,d.order); set(KEY.orders,orders); renderAdminLocal(); toast('Order updated')}catch(e){toast(e.message)}
  };
  window.confirmPayment=async function(id){try{const d=await adminFetch('/api/admin/orders/'+encodeURIComponent(id),{method:'PATCH',body:JSON.stringify({paymentStatus:'successful'})});const o=orders.find(x=>String(x.id)===String(id));if(o)Object.assign(o,d.order);set(KEY.orders,orders);renderAdminLocal();toast('Payment confirmed')}catch(e){toast(e.message)}};
  window.failPayment=async function(id){try{const d=await adminFetch('/api/admin/orders/'+encodeURIComponent(id),{method:'PATCH',body:JSON.stringify({paymentStatus:'failed',status:'Cancelled'})});const o=orders.find(x=>String(x.id)===String(id));if(o)Object.assign(o,d.order);set(KEY.orders,orders);renderAdminLocal();toast('Payment marked failed')}catch(e){toast(e.message)}};
  window.setUserStatus=async function(encoded,status){const email=decodeURIComponent(encoded);try{const d=await adminFetch('/api/admin/users/'+encodeURIComponent(email),{method:'PATCH',body:JSON.stringify({status})});users[email]=d.user;set(KEY.users,users);renderUsers();toast('Account '+status)}catch(e){toast(e.message)}};
  window.deleteUser=async function(encoded){const email=decodeURIComponent(encoded);const u=users[email];if(!u)return;if(!confirm('Delete '+u.first+' '+u.last+' account?'))return;try{await adminFetch('/api/admin/users/'+encodeURIComponent(email),{method:'DELETE'});delete users[email];set(KEY.users,users);renderUsers();renderMessageUsers();toast('Account deleted')}catch(e){toast(e.message)}};
})();


/* VALVIMART marketplace event banners + search field */
(function marketplaceEvents(){
  const $id=id=>document.getElementById(id);
  let eventImageData='';
  async function readEvents(){
    const host=$id('storeEventCarousel'); if(!host)return;
    try{
      const r=await fetch((typeof API_BASE!=='undefined'?API_BASE:'')+'/api/events',{credentials:'include'});
      const d=await r.json(); const events=Array.isArray(d.events)?d.events:[];
      if(!events.length)return;
      host.innerHTML=events.map(ev=>`<article class="store-event-card" style="background-image:url('${String(ev.image||'').replace(/'/g,'%27')}')"><div class="event-copy"><span class="market-eyebrow">VALVIMART EVENT</span><h3>${escapeText(ev.title||'Special event')}</h3><p>${escapeText(ev.message||'Discover special offers at VALVIMART.')}</p><button class="primary" onclick="document.getElementById('shop').scrollIntoView({behavior:'smooth'})">Shop the event ↗</button></div></article>`).join('');
    }catch(e){console.warn('Store events could not be loaded',e)}
  }
  function escapeText(v){return String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
  const file=$id('eventImageFile'),preview=$id('eventImagePreview');
  file?.addEventListener('change',()=>{const f=file.files?.[0];if(!f)return;if(!f.type.startsWith('image/')){alert('Choose an image file.');file.value='';return}if(f.size>3*1024*1024){alert('Please use an image under 3 MB.');file.value='';return}const reader=new FileReader();reader.onload=()=>{eventImageData=String(reader.result||'');if(preview){preview.src=eventImageData;preview.classList.remove('hidden')}};reader.readAsDataURL(f)});
  $id('adminEventForm')?.addEventListener('submit',async e=>{e.preventDefault();const title=$id('eventTitle').value.trim(),message=$id('eventMessage').value.trim();if(!title||!eventImageData)return alert('Add an event title and banner image.');const btn=e.currentTarget.querySelector('button[type="submit"]');if(btn){btn.disabled=true;btn.textContent='PUBLISHING…'}try{const r=await fetch((typeof API_BASE!=='undefined'?API_BASE:'')+'/api/admin/events',{method:'POST',credentials:'include',headers:{'Content-Type':'application/json'},body:JSON.stringify({title,message,image:eventImageData})});const d=await r.json();if(!r.ok)throw new Error(d.error||'Could not publish event');e.currentTarget.reset();eventImageData='';preview?.classList.add('hidden');await readEvents();await readAdminEvents();alert('Event published to the storefront.')}catch(err){alert(err.message)}finally{if(btn){btn.disabled=false;btn.textContent='PUBLISH EVENT'}}});
  async function readAdminEvents(){const host=$id('adminEventList');if(!host)return;try{const r=await fetch((typeof API_BASE!=='undefined'?API_BASE:'')+'/api/admin/events',{credentials:'include'});const d=await r.json();if(!r.ok)throw new Error(d.error||'Could not load events');host.innerHTML=(d.events||[]).map(ev=>`<div class="admin-event-item"><img src="${ev.image}" alt=""><div><strong>${escapeText(ev.title)}</strong><p class="mini">${escapeText(ev.message||'No description')}</p></div><button type="button" data-delete-event="${escapeText(ev.id)}">Delete</button></div>`).join('')||'<p class="mini">No events published yet.</p>';}catch(err){host.innerHTML='<p class="mini">Sign in as administrator to manage events.</p>'}}
  $id('adminEventList')?.addEventListener('click',async e=>{const b=e.target.closest('[data-delete-event]');if(!b)return;if(!confirm('Delete this event from the storefront?'))return;try{const r=await fetch((typeof API_BASE!=='undefined'?API_BASE:'')+'/api/admin/events/'+encodeURIComponent(b.dataset.deleteEvent),{method:'DELETE',credentials:'include'});const d=await r.json();if(!r.ok)throw new Error(d.error||'Delete failed');await readAdminEvents();await readEvents()}catch(err){alert(err.message)}});
  document.querySelector('[data-admin-view="events"]')?.addEventListener('click',readAdminEvents);
  const search=$id('marketSearchInput');function doSearch(){const q=(search?.value||'').trim();const target=$id('searchInput');if(target)target.value=q;$id('searchGo')?.click();if(!target){$id('shop')?.scrollIntoView({behavior:'smooth'})}}
  $id('searchBtn')?.addEventListener('click',doSearch);search?.addEventListener('keydown',e=>{if(e.key==='Enter')doSearch()});
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',readEvents);else readEvents();
})();


/* Storefront navigation polish: category returns, department anchors and the promo CTA. */
document.addEventListener('DOMContentLoaded',()=>{
  const drop=document.getElementById('shopTheDrop');
  drop?.addEventListener('click',()=>{document.getElementById('shop')?.scrollIntoView({behavior:'smooth',block:'start'});});
  document.getElementById('browseDepartmentsLink')?.addEventListener('click',e=>{e.preventDefault();document.getElementById('shop')?.scrollIntoView({behavior:'smooth',block:'start'});});
  document.querySelectorAll('.brand[href="#home"]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();if(typeof navigateToHome==='function')navigateToHome();else document.getElementById('home')?.scrollIntoView({behavior:'smooth',block:'start'});}));
});
