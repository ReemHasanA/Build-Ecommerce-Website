var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });


  
  let scrollcontainer = document.querySelector( ".galary");
  let backbtn=document.getElementById("back");
  let nextbtn=document.getElementById("next");

  scrollcontainer.addEventListener("wheel",(evt)=>{
      scrollcontainer.style.scrollBehavior="auto";

      evt.preventDefault();
      scrollcontainer.scrollLeft += evt.deltaY; 
  })

  nextbtn.addEventListener("click",()=>{
      scrollcontainer.style.scrollBehavior="smooth";
      scrollcontainer.scrollLeft +=900;
  })

  backbtn.addEventListener("click",()=>{
      scrollcontainer.style.scrollBehavior="smooth";

      scrollcontainer.scrollLeft -=900;
  })
  
  function logout() {
    sessionStorage.clear();
  }
  let i=sessionStorage.length
  if (i<2){
    document.getElementById('logout').style.display='none';
    document.getElementById('Signup').style.display='inline-block';

} else{
    document.getElementById("Signup").style.display = "none";
    document.getElementById('logout').style.display='inline';

}  