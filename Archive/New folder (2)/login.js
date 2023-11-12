const loginForm = document.querySelector('.content__form');
const usernameInput = document.querySelector('.username');
const passwordInput = document.querySelector('.password');
const passerror = document.getElementById('loginError');
const loginError = document.getElementById('passerror');
const emailerror = document.getElementById('emailerror');

loginForm.addEventListener('keyup', function (e) {
    e.preventDefault();

    const enteredUsername = usernameInput.value;
    const enteredPassword = passwordInput.value;

    // Simple validation - check if username and password are not empty
    

    // Regex for a basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Regex for password - at least 6 characters
    const passwordRegex = /^.{6,}$/;

    // Check if the entered email is a valid email
    if (!emailRegex.test(enteredUsername)) {
        emailerror.innerText = 'Enter a valid email address.';
        return;
    } else {
        emailerror.innerText = '';
    }

    // Check if the entered password meets the criteria
    if (passwordRegex.test(enteredPassword)) {
        passerror.innerText = 'Password must be at least 6 characters.';
        return;
    } else {
        passerror.innerText = '';
    }

    // Replace the following check with your actual authentication logic
    if (enteredUsername == 'user@example.com' && enteredPassword == 'password') {
        // Successful login
        alert('Login successful');
        loginError.innerText = '';
        loginForm.reset();
    } else {
        // Incorrect username or password
        loginError.innerText = 'Incorrect username or password';
    }
});