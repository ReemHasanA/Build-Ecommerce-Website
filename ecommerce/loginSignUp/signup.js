document.addEventListener("DOMContentLoaded", function () {
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');
    

    signUpButton.addEventListener('click', () => {
        container.classList.add("right-panel-active");
    });

    signInButton.addEventListener('click', () => {
        container.classList.remove("right-panel-active");
    });

    const signIn = document.getElementById("signin");
    signIn.addEventListener("click", (event) => {
        event.preventDefault();
        var username = document.getElementById("username").value;
        var password = document.getElementById("password1").value;
        console.log(username, password);

        var user = { username: username, password: password };
        console.log(user);

        fetch("http://localhost/ecommerce/API1/user/login_oop.php", {
            method: "POST",
            body: JSON.stringify(user),
            // headers: { "Content-Type": "application/json" }
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Network response was not ok');
                }
            })
            .then((data) => {
                if (data.ROLE === 2 && data.STATUS === true) {
                    console.log('Validation is true');
                    console.log('Role:', data.ROLE);
                    sessionStorage.setItem("userid", data.USER_ID);
                    console.log('User ID:', data.USER_ID);
                    sessionStorage.setItem("email", username);

                    window.location.href = "../slide.html";
                    
                } else if (data.ROLE == 1 && data.STATUS === true ) {
                    sessionStorage.setItem("email", username);
                    window.location.href = "../admin/index.html";
                    console.log('Validation is false');
                } else {
                    alert("the username or password not valid")
                }
            })
            .catch((error) => {
                console.error('Fetch error:', error);
            });
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const signUpButton = document.getElementById('signUpForm');
    const signInButton = document.getElementById('signin');
    const container = document.getElementById('container');

    signUpButton.addEventListener('click', () => {
        container.classList.add("right-panel-active");
    });

    signInButton.addEventListener('click', () => {
        container.classList.remove("right-panel-active");
    });

    const signUpForm = document.getElementById("signUpForm");
    signUpForm.addEventListener("submit", function (event) {
        event.preventDefault();

        // Validate form inputs
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("checkPassword").value;

        if (!name || !email || !password || !confirmPassword) {
            alert("Please fill in all fields");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        // If validation passes, proceed with API request
        const user = { username: name, email: email, password: password };

        fetch("http://localhost/ecommerce/API1/user/signup_api.php", {
            method: "POST",
            body: JSON.stringify(user),
            headers: { "Content-Type": "application/json" },
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Network response was not ok');
                }
            })
            .then((data) => {
                if (data.status === 1) {
                    alert('Registration successful');
                    sessionStorage.setItem("userid", data.USER_ID);
                    console.log('User ID:', data.USER_ID);
                    sessionStorage.setItem("email", email);
                    
                    window.location.href = "../slide.html";

                    // Redirect or perform other actions after successful registration
                } else if (data.status === 10) {
                    alert('User with the same username already exists');
                } else {
                    alert('Registration failed: ' + data.message);
                }
            })
            .catch((error) => {
                console.error('Fetch error:', error);
            });
    });
});
