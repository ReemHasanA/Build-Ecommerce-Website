let email = sessionStorage.getItem(`email`);
let userid = sessionStorage.getItem(`userid`);
document.addEventListener("DOMContentLoaded", function () {
 
  // Replace 'http://localhost/ecommerce/API1/prouduct/read_product.php' with the actual URL of your API
  const queryString = window.location.search;

    // Parse the query string using the URLSearchParams object
    const searchParams = new URLSearchParams(queryString);

    // Get the value of the 'id' query parameter
    const productId  = searchParams.get('id');
    const apiUrl =
      `http://localhost/ecommerce/API1/prouduct/read_product.php?id=${productId}`;
    
      
    
    // Fetch data from the API
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        // Assuming data is an array of products
        const product = data; // Use the first product as an example

        // Update HTML elements with product data
        document.querySelector(
          ".left-column"
        ).innerHTML = `<img data-image="red" class="active" src="${product.img}" alt="">`;
        document.getElementById("productName").innerText = product.name;
        document.getElementById("productDetails").innerText =
          product.description;
        document.getElementById(
          "productPrice"
        ).innerText = `price: ${product.price}$`;
        document.getElementById(
          "discountPrice"
        ).innerText = `Price after Discount: ${product.price_after_discount}$`;
      })
      .catch((error) => console.error("Error fetching data:", error));
  });
  $(document).ready(function () {
    $("#addtocart").on("click", function () {
      var button = $(this);
      var cart = $("#cart");
      var cartTotal = cart.attr("data-totalitems");
      var newCartTotal = parseInt(cartTotal) + 1;

      button.addClass("sendtocart");
      setTimeout(function () {
        button.removeClass("sendtocart");
        cart.addClass("shake").attr("data-totalitems", newCartTotal);
        setTimeout(function () {
          cart.removeClass("shake");
        }, 500);
      }, 1000);
    });
  });
 

// Call the fetchComments function when the page loads
document.addEventListener('DOMContentLoaded', function () {
  
  const queryString = window.location.search;
  // Parse the query string using the URLSearchParams object
  const searchParams = new URLSearchParams(queryString);
  // Get the value of the 'id' query parameter
  const productId = searchParams.get('id');
  const cont = document.getElementById('cont');

fetch(`http://localhost/ecommerce/API1/rate/GETrate.php?id=${productId}`)
      .then((response)=>response.json())
      .then((comments)=>{
        console.log(comments)
        comments.forEach(comment => {
            const commentsContainer = document.createElement('div');
            commentsContainer.className = 'commented-section mt-2';
            commentsContainer.innerHTML = `
            <div class="comment">
                <div class="commented-section mt-2" >
                
                    <div class="d-flex flex-row align-items-center commented-user">
                        <h5 class="mr-2">${comment.username}</h5><span class="dot mb-1"></span><span class="mb-1 ml-2">rate ${comment.rate}/5</span>
                    </div>
                    <div class="comment-text-sm"><span>${comment.comment_content}</span></div>
                    <div class="reply-section">
                        <hr>                           
                    </div>
                </div></div>
            `;
            cont.appendChild(commentsContainer);
        });
      })
});

document.addEventListener("DOMContentLoaded", function () {
    const commentButton = document.getElementById("commentButton");

    commentButton.addEventListener("click", function () {
        const commentInput = document.getElementById("commentInput").value;
        const rateInput = document.getElementById("rateInput").value;

        // Get the product_id from the URL
        const queryString = window.location.search;
        const searchParams = new URLSearchParams(queryString);
        const productId = searchParams.get('id');

        // Replace the following values with your actual data
        const commentData = {
            "comment_content": commentInput,
            "rate": rateInput,
            "product_id": productId,
            "user_id": userid
        };

        fetch('http://localhost/ecommerce/API1/rate/insert.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(commentData),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            // Update the UI or perform any other actions on success
        })
        .catch((error) => {
            console.error('Error:', error);
            // Handle errors here
        });
    });

    fetch(`http://localhost/ecommerce/API1/cart/CountCart.php?email=${email}`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        const cartElement = document.getElementById('cart');
        // const currentTotalItems = cartElement.getAttribute('data-totalitems');
        cartElement.setAttribute('data-totalitems', data);
});
});function add() {
  const queryString = window.location.search;

    // Parse the query string using the URLSearchParams object
    const searchParams = new URLSearchParams(queryString);

    // Get the value of the 'id' query parameter
    const productId  = searchParams.get('id');
  fetch(`http://localhost/ecommerce/API1/cart/ADDtoCart.php`, {
  method: "POST",
  body: JSON.stringify({
    email: email,
    product_id: productId

  })

})};
