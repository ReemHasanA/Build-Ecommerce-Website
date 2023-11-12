let email = sessionStorage.getItem(`email`);

console.log(email);

document.addEventListener("DOMContentLoaded", function () {
    const list = document.getElementById("Products");
    // Fetch data from the API
    let a=0;
    fetch(`http://localhost/ecommerce/API1/cart/GETcart.php?email=${email}`)
    .then(response => response.json())
    .then(data => {
        console.log('Cart data:', data);

        const productsCards = document.getElementById('products-cards');
        let total=0;
        data.forEach(item => {
            if (item.price>item.price_after_discount&&item.price_after_discount>0) {
                newPrice=item.price_after_discount;
              }else{
                newPrice=item.price;
              }
              total+=item.quantity*newPrice;
              console.log(total);
            const row = document.createElement('tr');
            row.innerHTML = `
                <td> 
                <a class="remove-button" data-product-id="${item.product_id}">X</button>
                </td>
                <td> <img src="${item.image}" > </td>
                <td> ${item.name} </td>
                <td> ${item.price} </td>
                <td> ${item.price_after_discount} </td>
                <td> ${item.quantity} </td>
            `;
            productsCards.appendChild(row);
        });
        document.getElementById('Subtotal').innerHTML=total+'JD;'
        document.getElementById('Subtotal1').innerHTML=total+'JD;'
        });

        // Add event listener for remove buttons
        const removeButtons = document.querySelectorAll('.remove-button');
        removeButtons.forEach(button => {
            button.addEventListener('click', () => {
                const productId = button.dataset.productId;

                // Confirm with the user before removing the item
                const confirmRemove = confirm('Are you sure you want to remove this item?');

                console.log('Product ID to remove:', productId);

                if (confirmRemove) {
                    // Make a DELETE request to remove the item from the database
                    fetch(`http://localhost/ecommerce/API1/cart/DELETEcart.php?product_id=${productId}`, {
                        method: 'DELETE',
                    })
                        .then(response => {
                            if (!response.ok) {
                                throw new Error('Failed to remove item from the cart');
                            }
                            return response.json();
                        })
                        .then(data => {
                            // Assuming data contains information about the removal status
                            console.log('Removal status:', data);

                            // Update the cart display on the client side if needed
                            // For example, you might want to remove the corresponding row from the table
                            button.closest('tr').remove();
                        })
                        .catch(error => {
                            console.error('Removal error:', error);
                            // Handle errors as needed
                        });
                }
            });
        });
    })
    .catch(error => {
        console.error('Fetch error:', error);
        // Handle errors as needed
    });
