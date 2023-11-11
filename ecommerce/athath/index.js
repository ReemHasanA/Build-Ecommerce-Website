const shopText = document.querySelectorAll('.shop')

for(let i = 0; i < shopText.length; i++) {
  shopText[i].innerHTML = "Shop"
}

Splitting();

setTimeout(() => {
  document.querySelector(".card").focus();
},1500);


// // forcards
let signInButton = document.getElementById('signout')
// console.log(signInButton)
// let isLoggedIn = sessionStorage.getItem("isLoggedin");
// if(isLoggedIn === 'true'){
//     signInButton.innerHTML='logout';
//     signInButton.addEventListener('click', () => { 
//         signupButtonNav.addEventListener('click', (e) => {
//             window.location.href = "../athath/index.html";
//             sessionStorage.setItem("isLoggedin","false");
//         });


// });}
// forcards


// / Check if the user is logged in
const isLoggedIn = sessionStorage.getItem('isLoggedin');

if (isLoggedIn === 'true') {

    // Change text and behavior for logged-in users
 
    signInButton.innerHTML = 'Log out';

    signInButton.addEventListener('click', () => {
        // Log out logic
        window.location.href = 'index.html';
        sessionStorage.setItem("isLoggedin","false");
    });

}