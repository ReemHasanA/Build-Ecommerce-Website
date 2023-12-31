// shop.js

document.addEventListener("DOMContentLoaded", function () {
  // Fetch data from the API
  fetch('http://localhost/Build-Ecommerce-Website-main/shop/GETproductAll.php', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      var gallery = document.getElementById('shopItem');
      gallery.innerHTML = '';

      data.forEach(product => {
        const shopItem = document.createElement('div');
        shopItem.className = "shop-item";
        shopItem.innerHTML = `
          <a href="#" class="shop-item--container">
            <div class="meta">
              <span class="tag">${product.tag}</span>
              <span class="discount">${product.discount}</span>
            </div>
            <img src="${product.img}" width="160" height="160" />
          </a>
          <div class="title">
            <h3><a href="#">${product.name}</a></h3>
          </div>
          <div class="price"><span>$${product.price}</span></div>
        `;
        gallery.appendChild(shopItem);
      });
    });
});
