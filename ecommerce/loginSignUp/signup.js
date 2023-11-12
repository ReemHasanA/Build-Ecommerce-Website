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
        var email = document.getElementById("email").value;
        var password = document.getElementById("password1").value;
        console.log(email, password);

        var user = { email: email, password: password };
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

                    
                    window.location.href = "../athath/index.html";
                    sessionStorage.setItem("isLoggedin", "true");
                } else if (data.ROLE == 1 && data.STATUS === true ) {
                    window.location.href = "../inbox.html";
                    console.log('Validation is false');
                } else {
                    alert("the email or password not valid")
                }
            })
            .catch((error) => {
                console.error('Fetch error:', error);
            });
    });
});


