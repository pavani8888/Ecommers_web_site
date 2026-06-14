const Products=[
{id:1, name:"sofa", price:5000,image:"img1.jpg"},
{id:2,name:"pen",price:10,  image:"img2.png"},
{id:3, name:"Mobile", price:15000,  image:"img3.jpg"},
{ id:4, name:"bag", price:1000,image:"img4.jpg"},
{id:5,name:"hand bag",price:550,image:"img5.jpg"},
{id:6, name:"slippers", price:230, image:"img6.jpg" },
{ id:7, name:"laptop", price:65000, image:"img7.jpg"},
{id:8, name:"tv",price:10000, image:"img8.jpg" },
{id:9,name:"refrigerators",price:13000,image:"img9.jpg"},
{id:10, name:"laptop", price:55000, image:"img10.jpg"},
{id:11, name:"keyboard", price:1200, image:"img11.jpg"},
{id:12, name:"mouse", price:600, image:"img12.jpg"},
{id:13, name:"monitor", price:12000, image:"img13.jpg"},
{id:20, name:"sharpener", price:10, image:"img20.jpg"},
{id:21, name:"bottle", price:250, image:"img21.jpg"},
{id:22, name:"watch", price:2000, image:"img22.jpg"},
{id:23, name:"headphones", price:1500, image:"img23.jpg"},
{id:30, name:"fan", price:1800, image:"img30.jpg"},
{id:31, name:"ac", price:40000, image:"img31.jpg"},
{id:32, name:"refrigerator", price:28000, image:"img32.jpg"},
{id:33, name:"washing machine", price:22000, image:"img33.jpg"},
{id:40, name:"curtain", price:800, image:"img40.jpg"},
{id:41, name:"clock", price:700, image:"img41.jpg"},
{id:42, name:"lamp", price:900, image:"img42.jpg"},
{id:43, name:"shoes", price:2500, image:"img43.jpg"},
{id:50, name:"belt", price:500, image:"img50.jpg"},
{id:51, name:"wallet", price:700, image:"img51.jpg"},
{id:52, name:"sunglasses", price:1200, image:"img52.jpg"},
{id:53, name:"helmet", price:1800, image:"img53.jpg"},
{id:60, name:"hard Disk", price:4500, image:"img60.jpg"},
{id:61, name:"ssd", price:5500, image:"img61.jpg"},
{id:62, name:"tablet", price:22000, image:"img62.jpg"},
{id:63, name:"smart Watch", price:3500, image:"img63.jpg"},
{id:70, name:"badminton Racket", price:900, image:"img70.jpg"},
{id:71, name:"yoga Mat", price:600, image:"img71.jpg"},
{id:72, name:"dumbbells", price:1500, image:"img72.jpg"},
{id:73, name:"treadmill", price:25000, image:"img73.jpg"},
{id:80, name:"gas Stove", price:3500, image:"img80.jpg"},
{id:81, name:"pressure Cooker", price:1800, image:"img81.jpg"},
{id:82, name:"rice Cooker", price:2500, image:"img82.jpg"},
{id:83, name:"vacuum Cleaner", price:6000, image:"img83.jpg"},
{id:90, name:"soap", price:50, image:"img90.jpg"},
{id:91, name:"toothpaste", price:120, image:"img91.jpg"},
{id:92, name:"toothbrush", price:40, image:"img92.jpg"},
{id:93, name:"handwash", price:90, image:"img93.jpg"},
{id:99, name:"tool Kit", price:2000, image:"img99.jpg"},
{id:100, name:"hammer", price:350, image:"img100.jpg"},
        ]
        let cart=[];
        function searchItems(){
          const search=document.getElementById("search").value;
          const filter=Products.filter(product=>{
             return product.name.includes(search);
          })
          displayProducts(filter);
        }

        function displayProducts(filter=Products){
            const productdiv=document.querySelector(".pro");
            productdiv.innerHTML=''
            filter.forEach((product) => {
                let productContainer=document.createElement("div");
                productContainer.classList.add("items")
                productContainer.innerHTML=`
                <img src="${product.image}" alt="" class="pic">
                <p>${product.name}</p>
                <p>${product.price}</p>
                <button onclick="addCart(${product.id})">add to cart</button>
                `;
                productdiv.appendChild(productContainer)
            });
          

        }
      
        function addCart(id){ 
         let selectItems=Products.find((product)=>product.id === id)
         let existItems=cart.find((item)=>item.id === id)
          if(!selectItems){
            return 
          }
          else if(existItems){
            existItems.quantity++;
          } else {
           cart.push({ ...selectItems,quantity:1 });
          }
             updatecart();
        }

        function updatecart(){
             const cartItems=document.querySelector(".cart-items");
          cartItems.innerHTML="";
          let totalamount=0;
          if(cart.length===0){
            cartItems.innerHTML='<p>your cart is empty</p>'
            document.getElementById("total").innerText="Total:$0";
            localStorage.removeItem("cart");
            return;
          }
          cart.forEach((item,index)=>{
            let creatediv=document.createElement("div");
            creatediv.classList.add("cart-item");
            totalamount+=item.price*item.quantity;
            creatediv.innerHTML = ` 
                     <img src="${item.image}" alt="${item.image}" class="pic1">
                    <p>${item.name}</p>
                    <p>${item.price}</p>
                    <input type="number" value="${item.quantity}" min=1 id="val" onchange="qualityUpdate(${index},this.value)">
                    <button onclick="remove(${index})">Remove</button>
            `;
            cartItems.appendChild(creatediv)
          })
          document.getElementById("total").innerText=`Total:${totalamount}`;
          localStorage.setItem("cart",JSON.stringify(cart));
        }

        window.addEventListener("DOMContentLoaded",()=>{
          const storeCart=localStorage.getItem("cart");
          if(storeCart){
            cart=JSON.parse(storeCart);
            updatecart();
          }
        })

        function remove(index){
          cart.splice(index,1);
          updatecart();

        }

        function qualityUpdate(index,quantity){
          cart[index].quantity=Math.max(1,quantity);
          updatecart();
        }

        addCart();
        displayProducts();
       