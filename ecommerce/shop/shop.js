document.addEventListener("DOMContentLoaded", function () {
  const gallery = document.getElementById('shopItem');
  let originalData = [];

  // Function to create the HTML structure for a shop item
  function createShopItem(product) {
    const shopItem = document.createElement('div');
    shopItem.className = "shop-item";
    shopItem.innerHTML = `
      <a  href="producte.html?id=${product.product_id}"  class="shop-item--container"   >
        <div class="meta">
          <span class="tag">${product.Dimensions}</span>
          <span class="discount"> <del>$${product.price}</del></span>
          </div>
          <img src="${product.img}" width="160" height="160" />
          </a>
          <div class="title">
          <h3><a href="#">${product.name}</a></h3>
          </div>
          <div class="price">
            <span>Price after DISCOUNT  <a>$${product.price_after_discount}</a></span>
            </div>
            <div id = "button">
            <button id="button"><a href="producte.html?id=${product.product_id}">Add to Cart</a></button>
            </div>
            
    `;
    return shopItem;
  }

  // Function to update the shop items based on filters
  function updateShopItems(products) {
    gallery.innerHTML = '';
    products.forEach(product => {
      const shopItem = createShopItem(product);
      gallery.appendChild(shopItem);
    });
  }

  // Fetch data from the API and initialize originalData
  fetch('http://localhost/ecommerce/API1/prouduct/read_product.php', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  })
    .then(response => response.json())
    .then(data => {
      originalData = [...data];
      updateShopItems(originalData);
    });

  // Add event listeners to trigger filtering when the user changes the filters
  document.getElementById('priceFilter').addEventListener('change', filterProducts);
  document.getElementById('categoryFilter').addEventListener('change', filterProducts);

  // Function to filter products based on price and category
  function filterProducts() {
    const priceFilter = document.getElementById('priceFilter').value;
    const categoryFilter = document.getElementById('categoryFilter').value;
    console.log(categoryFilter);
    const filteredProducts = originalData.filter(product => {
      const priceInRange = priceFilter === 'all' || (
        parseFloat(product.price_after_discount) >= parseFloat(priceFilter.split('-')[0]) &&
        parseFloat(product.price_after_discount) <= parseFloat(priceFilter.split('-')[1])
      );

      const categoryMatches = categoryFilter === 'all' || product.category_id === categoryFilter;
      // (
      //   fetch(`http://localhost/ecommerce/API1/filter/GETcategory.php?id=${categoryFilter}`)
      //   .then (response=>response.json())
      //   .then(Match=>{
      //     console.log(Match);
      //   })
      // )
      //
        console.log(categoryMatches);
      return priceInRange && categoryMatches;
    });

    updateShopItems(filteredProducts);
  }
});

let i=sessionStorage.length
  if (i<2){
    document.getElementById('logout').style.display='none';
    document.getElementById('Signup').style.display='inline-block';

} else{
    document.getElementById("Signup").style.display = "none";
    document.getElementById('logout').style.display='inline';

}  
function logout() {
  sessionStorage.clear();
  location.reload();
}