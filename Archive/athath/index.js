const shopText = document.querySelectorAll('.shop')

for(let i = 0; i < shopText.length; i++) {
  shopText[i].innerHTML = "Shop"
}

Splitting();

setTimeout(() => {
  document.querySelector(".card").focus();
},1500);


// forcards

// forcards