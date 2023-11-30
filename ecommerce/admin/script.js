document.querySelector(".jsFilter").addEventListener("click", function () {
  document.querySelector(".filter-menu").classList.toggle("active");
});

document.querySelector(".grid").addEventListener("click", function () {
  document.querySelector(".list").classList.remove("active");
  document.querySelector(".grid").classList.add("active");
  document.querySelector(".products-area-wrapper").classList.add("gridView");
  document
    .querySelector(".products-area-wrapper")
    .classList.remove("tableView");
});

document.querySelector(".list").addEventListener("click", function () {
  document.querySelector(".list").classList.add("active");
  document.querySelector(".grid").classList.remove("active");
  document.querySelector(".products-area-wrapper").classList.remove("gridView");
  document.querySelector(".products-area-wrapper").classList.add("tableView");
});

var modeSwitch = document.querySelector('.mode-switch');
modeSwitch.addEventListener('click', function () {                   
     document.documentElement.classList.toggle('light');
 modeSwitch.classList.toggle('active');
});




  document.addEventListener("DOMContentLoaded", function() {
    const eventContainer = document.querySelector('.products-area-wrapper');
    
    fetch('http://localhost/ecommerce/API1/prouduct/read_product.php')
      // C:\xampp\htdocs\ecommerce\API1\prouduct\read_product.php
      .then(response => response.json())
      .then(data => {
        data.forEach(event => {
          const productRow = document.createElement('div');
          productRow.className = 'products-row';

          productRow.innerHTML = `
            <div class="product-cell image">
              <img src="${event.img}" >
            </div>
            <div class="product-cell category">
              <span class="cell-label">Event Name:</span>${event.name}
            </div>
            <div class="product-cell">
              <span class="cell-label">Event Date:</span>${event.description}
            </div>
            <div class="product-cell">
              <span class="cell-label">Category:</span>${event.price}
            </div>
            <div class="product-cell">
              <span class="cell-label">Location:</span>${event.price_after_discount}
            </div>
            <div class="product-cell">
              <span class="cell-label">Number of Sites:</span>${event.Dimensions}
            </div>
            <div class="product-cell" ">
              <span class="cell-label">Description:</span>${event.color}
            </div>
           
            <div class="product-cell" ">
            <span class="cell-label">Action:</span><button class="app-content-headerButton"><a style = "text-decoration: none;color:white" href="editproduct.html?id=${event.product_id}">Edit</a></button>
            <button style ="margin-left:10px"class="app-content-headerButton"><a style = "text-decoration: none;color:white;" href="http://localhost/ecommerce/API1/prouduct/delete_product.php?id=${event.product_id}">Delete</a></button>
          </div>
          `;
          eventContainer.appendChild(productRow);
        });
      })
      .catch(error => console.error('Error:', error));
  });



  
const searchInput = document.getElementById('lala');

searchInput.addEventListener('keyup', (e) => {
    e.preventDefault();
    const content = searchInput.value;

    const eventContainer = document.querySelector('.products-area-wrapper');
    eventContainer.innerHTML = ''; // Clear the existing content

    const url = 'http://localhost/ecommerce/API1/prouduct/getEventByCD.php';
    const dataToSend = {
        'content': content,
    };

    const requestOptions = {
        method: 'POST',
        body: JSON.stringify(dataToSend),
        headers: {
            'Content-Type': 'application/json',
        },
    };
     
    fetch(url, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
                

            }
            return response.json();
        })
        
        .then(data => {
            data.forEach(event => {
                const productRow = document.createElement('div');
                productRow.className = 'products-row';

                productRow.innerHTML = `<div class="product-cell image">
                <img src="${event.img}">
              </div>
              <div class="product-cell category">
                <span class="cell-label">product Name:</span>${event.name}
              </div>
              <div class="product-cell">
                <span class="cell-label">product Date:</span>${event.description}
              </div>
              <div class="product-cell">
                <span class="cell-label">price:</span>${event.price}
              </div>
              <div class="product-cell">
                <span class="cell-label">after discount:</span>${event.price_after_discount}
              </div>
              <div class="product-cell">
                <span class="cell-label">Number of Sites:</span>${event.Dimensions}
              </div>
              <div class="product-cell" ">
                <span class="cell-label">Description:</span>${event.color}
              </div>
             
              <div class="product-cell" ">
              <span class="cell-label">Action:</span><button class="app-content-headerButton"><a style = "text-decoration: none;color:white" href="editproduct.html?id=${event.product_id}">Edit</a></button>
              <button style ="margin-left:10px"class="app-content-headerButton"><a style = "text-decoration: none;color:white;" href="http://localhost/ecommerce/API1/prouduct/delete_product.php?id=${event.product_id}" >Delete</a></button>
            </div>
            
                `;
                eventContainer.appendChild(productRow);
            });
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
});


