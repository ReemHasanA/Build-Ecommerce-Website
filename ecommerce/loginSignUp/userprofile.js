// Get email from sessionStorage
const email = sessionStorage.getItem("email");

// Display email on the page
document.getElementById("email").innerHTML = email;

// Get elements
const username = document.getElementById("username");
const id = document.getElementById("id");
const password = document.getElementById("password");
const img = document.getElementById("img");

// Fetch user profile data from the API
fetch(`http://localhost/ecommerce/API1/user/userprofile.php?email=${email}`)
  .then(response => response.json())
  .then(data => {
    console.log(data);

    // Display user profile data on the page
    username.innerHTML = data.username;
    id.innerHTML = data.id;
    password.innerHTML = data.password;

    if (data.image != null) {
      img.innerHTML = `<img class="profile_img" src="${data.image}">`;
    } else {
      img.innerHTML = `<img class="profile_img" src="https://www.akmllc.com.cy/storage/2022/09/User-Profile-PNG-Clipart-768x672.png">`;
    }

    console.log(data.id);
  })
  .catch(error => {
    console.error('Error fetching user profile:', error);
    // Handle errors and provide feedback to the user
  });

// Function to toggle between edit and save forms
function toggleForms() {
  const editForm = document.getElementById("editForm");
  const edButton = document.getElementById("ed");
  const saveButton = document.getElementById("sa");

  editForm.style.display = editForm.style.display === 'none' ? 'inline-block' : 'none';
  edButton.style.display = edButton.style.display === 'none' ? 'inline-block' : 'none';
  saveButton.style.display = saveButton.style.display === 'none' ? 'inline-block' : 'none';
}
function edit() {
  document.getElementById("editForm").style.display = 'inline-block';
  document.getElementById("ed").style.display = 'none';
  document.getElementById("sa").style.display = 'inline-block';
}
// Function to save user information
function save() {
  // Get form elements
  const newName = document.getElementById('name');
  const newImg = document.getElementById('newImg');
  const newPass = document.getElementById('newPass');
  const newEmail = document.getElementById('newEmail');
  const userId = sessionStorage.getItem('id');

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

  // Make API request using fetch
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

  // Toggle forms after saving
  toggleForms();
}
