let email = sessionStorage.getItem(`email`);


document.addEventListener("DOMContentLoaded", function () {
    const list = document.getElementById("Products");
    // Fetch data from the API
    let a=0;
    if(!email){
        document.getElementById('toLogin').innerHTML=`<a href="../loginSignUp/signup.html">  Login </a> First`
    }else{
    fetch(`http://localhost/ecommerce/API1/cart/GETcart.php?email=${email}`)
    .then(response => response.json())
    .then(data => {
        // console.log('Cart data:', data);

        const productsCards = document.getElementById('products-cards');
        let total=0;
        data.forEach(item => {
            // console.log(item)
            if (item.price>item.price_after_discount&&item.price_after_discount>0) {
                newPrice=item.price_after_discount;
              }else{
                newPrice=item.price;
              }
              total+=item.quantity*newPrice;
            //   console.log(total);
            const row = document.createElement('tr');
            row.innerHTML = `
                <td> 
                <a class="remove-button" data-product-id="${item.product_id}" onclick='del(${item.product_id})'>X</a>
                </td>
                <td> <img src="${item.img}" > </td>
                <td> ${item.name} </td>
                <td> ${item.price} </td>
                <td> ${item.price_after_discount} </td>
                <td> 
                <a onclick="add(${item.product_id})"> + </a>
                ${item.quantity} 
                <a onclick="sub(${item.product_id})"> - </a>
                </td>
            `;
            productsCards.appendChild(row);
        });
        document.getElementById('Subtotal').innerHTML=total+'JD;'
        
        document.getElementById('Subtotal1').innerHTML=total+'JD;'
        })};

        // Add event listener for remove buttons
        // const removeButtons = document.querySelectorAll('.remove-button');
        // removeButtons.forEach(button => {
        //     button.addEventListener('click', () => {
        //         console.log("mm")
        //         const productId = button.dataset.productId;

        //         // Confirm with the user before removing the item
        //         const confirmRemove = confirm('Are you sure you want to remove this item?');

        //         console.log('Product ID to remove:', productId);

        //         if (confirmRemove) {
        //             // Make a DELETE request to remove the item from the database
        //             fetch(`http://localhost/ecommerce/API1/cart/DELETEcart.php?product_id=${productId}`, {
        //                 method: 'DELETE',
        //             })
        //                 .then(response => {
        //                     if (!response.ok) {
        //                         throw new Error('Failed to remove item from the cart');
        //                     }
        //                     return response.json();
        //                 })
        //                 .then(data => {
        //                     // Assuming data contains information about the removal status
        //                     console.log('Removal status:', data);

        //                     // Update the cart display on the client side if needed
        //                     // For example, you might want to remove the corresponding row from the table
        //                     button.closest('tr').remove();
        //                 })
        //                 .catch(error => {
        //                     console.error('Removal error:', error);
        //                     // Handle errors as needed
        //                 });
        //         }
        //     });
        // });
    })
    .catch(error => {
        console.error('Fetch error:', error);
        // Handle errors as needed
    });
function del(id) {
    console.log(id)
    delData={
        email:email,
        product_id:id
    }
    fetch('http://localhost/ecommerce/API1/cart/DELETEcart.php',{
    method: 'DELETE',
    body: JSON.stringify(delData),
})
location.reload();
}
function add(id) {
    
    fetch(`http://localhost/ecommerce/API1/cart/ADDtoCart.php`, {
    method: "POST",
    body: JSON.stringify({
      email: email,
      product_id: id
  
    }),})
  location.reload();
  };
  
function sub(id) {
      
    fetch(`http://localhost/ecommerce/API1/cart/subtractQuantity.php`, {
    method: "POST",
    body: JSON.stringify({
      email: email,
      product_id: id

    }),})
location.reload();
    };
        