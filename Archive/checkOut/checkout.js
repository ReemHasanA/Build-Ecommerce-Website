// $(document).ready(function() {
//     $('.minus').click(function () {
//         var $input = $(this).parent().find('input');
//         var count = parseInt($input.val()) - 1;
//         count = count < 1 ? 1 : count;
//         $input.val(count);
//         $input.change();
//         return false;
//     });
//     $('.plus').click(function () {
//         var $input = $(this).parent().find('input');
//         $input.val(parseInt($input.val()) + 1);
//         $input.change();
//         return false;
//     });
// });
// shop.js

document.addEventListener("DOMContentLoaded", function () {
    // Fetch data from the API
    fetch('http://localhost/Build-Ecommerce-Website-main/checkOut/GETproductAll.php', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        var gallery = document.getElementById('row');
        gallery.innerHTML = '';
        data.forEach(product => {
          const shopItem = document.createElement('div');
          shopItem.className = "imgandname";
          shopItem.innerHTML = `
            <div class="row">
              <div class="imgandname">
                <img id="imggg" src="${product.img}" />
                <div class="h1andh3">
                  <h1>${product.name}</h1>
                  <h3>color : white</h3>
                  <button>remove</button>
                </div>
              </div>
              <div class="price">$${product.price}</div>
            </div>
          `;
          gallery.appendChild(shopItem);
        });
        var cart = this.getElementById('square-1')
        cart.innerHTML='';
        data.forEach(product=>{
          const cartiteam= document.createElement('div');
          cartiteam.className="price-and-name";
          cartiteam.innerHTML=`<div style="margin-left: 20px">${product.name}</div>
          <div style="margin-right: 20px">${product.price}$</div>`;
          cart.appendChild(cartiteam);
        })
      });
  });
  