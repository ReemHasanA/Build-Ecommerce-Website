

let email = sessionStorage.getItem(`email`);

console.log(email);
username= document.getElementById("username");
id= document.getElementById("id");
password= document.getElementById("password");
img= document.getElementById("img");
document.getElementById("email").innerHTML=email;

// document.addEventListener("DOMContentLoaded", function () {
//     const list = document.getElementById("Products");
//     // Fetch data from the API

fetch(`http://localhost/project-4/Build-Ecommerce-Website/API1/user/GETuserByEmail.php?email=${email}`)
.then(response => response.json())
.then(data => {
    console.log(data);
    username.innerHTML=data.username;
    id.innerHTML=data.id;
    password.innerHTML=data.password;
    if(data.image!=null){
        img.innerHTML=`<img class="profile_img" src="${data.image}">`}
        else{
            img.innerHTML=`<img class="profile_img" src="https://www.akmllc.com.cy/storage/2022/09/User-Profile-PNG-Clipart-768x672.png">`}
            // const div = document.createElement("div");
            
            //  div.innerHTML+=
            
            console.log(data.id)
        });
function edit() {
    document.getElementById("editForm").style.display='inline-block';
    document.getElementById("ed").style.display='none';
    document.getElementById("sa").style.display='inline-block';
    
}
function save() {
    newName=document.getElementById('name');
    newImg=document.getElementById('newImg');
    newPass=document.getElementById('newPass');
    newEmail=document.getElementById('newEmail');
    let userId = sessionStorage.getItem(`id`);
    
    
    
    // Get form data
    const formData = {
        username: newName.value,
        email: newEmail.value,
        password: newPass.value,
        image: newImg.value
      };
      
    
      console.log(userId);

      // Assume you have an API endpoint for updating user information
      const apiUrl = `http://localhost/ecommerce/API1/user/userupdate.php?id=${userId}`;
      console.log(apiUrl);

      // Make API request (you may want to use fetch or another library)
      // Example using fetch:
      fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      .then(response => response.json())
      .then(data => {
        console.log('User information updated successfully:', data);
        // You can add further UI updates or redirects as needed
      })
      .catch(error => {
        console.error('Error updating user information:', error);
        // Handle errors and provide feedback to the user
      });
    
    document.getElementById("editForm").style.display='none';
    document.getElementById("ed").style.display='inline-block';
    document.getElementById("sa").style.display='none';
}

