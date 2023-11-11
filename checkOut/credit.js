//payment validation

let cvv=document.getElementById('cvv');
let cvv2= /^\d{3}$/;
function Checkcvv() {
    if (cvv.value.match(cvv2)) {
        document.getElementById('errcvv').innerHTML=` `;
        // final();
    }else{
         document.getElementById('errcvv').innerHTML=`<img src="images/x.svg" width="10px" alt="error">unvalid cvv.<br>`;
    }
}

let cardNumber = document.getElementById('cardNumber');
let cardNumber2= /^\d{16}$/;
function CheckcardNumber() {
    if (cardNumber.value.match(cardNumber2)) {
        document.getElementById('errCheckcardNumber').innerHTML=` `;
        // final();
    }else{
         document.getElementById('errCheckcardNumber').innerHTML=`<img src="images/x.svg" width="10px" alt="error">unvalid card Number.<br>`;
    }
}

let expirationDate = document.getElementById('expirationDate');
let expirationDate2 = /^(0[1-9]|1[0-2])\/\d{2}$/;
function checkexpirationDate() {
    if (expirationDate.value.match(expirationDate2)) {
        document.getElementById('errexpirationDate').innerHTML=` `;
        // final();
    }else{
         document.getElementById('errexpirationDate').innerHTML=`<img src="images/x.svg" width="10px" alt="error">unvalid Date.<br>`;
    }
}
let NameOnCard = document.getElementById('NameOnCard');
let NameOnCard2 = /^[a-zA-Z_\s]$/;
function checkNameOnCard() {
    if (NameOnCard.value.match(NameOnCard2)) {
        document.getElementById('errNameOnCard').innerHTML=` `;
        // final();
    }else{
         document.getElementById('errNameOnCard').innerHTML=`<img src="images/x.svg" width="10px" alt="error">unvalid Name.<br>`;
    }
}





//git summery
let email = sessionStorage.getItem(`email`);

console.log(email);

document.addEventListener("DOMContentLoaded", function () {
    const list = document.getElementById("Products");
    // Fetch data from the API
    let a=0;
    fetch(`http://localhost/ecommerce/API1/cart/GETcart.php?email=${email}`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        // const list = document.createElement("ul");
        data.forEach( listItem=> {
    
         list.innerHTML+=`<li class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
         <span class="col-2">${listItem.name}</span>
        <span>${listItem.quantity}</span>
        <span>${listItem.price} JD</span>
          </li>`;
        a+=listItem.quantity*listItem.price;
        
    });
    console.log(a);
    document.getElementById("Total").innerHTML=a+'JD';
    sessionStorage.setItem('total', a);
});
});
// 



function checkout() {
    

fetch('http://localhost/ecommerce/API1/cart/Checkout.php', {
  method: "POST",
  body: JSON.stringify({
    email: email,
    total_price: sessionStorage.getItem('total'),
    payment_by:document.querySelector('input[name="Payment"]:checked').value
  })
 
})
alert('Checkout successfully!');

}
