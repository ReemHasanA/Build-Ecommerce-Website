document.getElementById('submit').disabled = true;
let pas=document.getElementById('password');
let checkpas=document.getElementById('password2');
let mail=document.getElementById('email');

function final(){
        if ((pas.value.match(pas2)) && (mail.value.match(mail2))&&(pas2.value===checkpas.value)) {
            document.getElementById('submit').disabled = false;
    }}
let pas2=/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{6,18}$/;
function CheckPassword() {
    if (pas.value.match(pas2)) {
        document.getElementById('errPass').innerHTML=` `
        final()
    }else{
        document.getElementById('errPass').innerHTML=`The password must be at least 6 characters.<br>`
        
    }

}
let mail2=/^[^ ]+@[a-zA-Z_]+\.[a-zA-Z]{2,3}$/;
function CheckEmail() {
    if (mail.value.match(mail2)) {
        document.getElementById('errMail').innerHTML=` `
        final()
    }else{
        document.getElementById('errMail').innerHTML=`<img src="images/x.svg" width="10px" alt="error">unvalid Email.<br>`
         
    }
}

function AddInput() {
    localStorage.setItem("Email", mail.value);
    localStorage.setItem("pass", pas.value);
    window.open('exercise1.html', '_blank')
}
const button = document.querySelector('#login')

// add click event listener
button.addEventListener('click', () => {
  // open a new tab
  const tab = window.open('logIn.html', '_blank')
})






// const form = document.getElementById('form');
// const username = document.getElementById('username');
// const email = document.getElementById('email');
// const password = document.getElementById('password');
// const password2 = document.getElementById('password2');



// const setError = (element, message) => {
//     const inputControl = element.parentElement;
//     const errorDisplay = inputControl.querySelector('.error');

//     errorDisplay.innerText = message;
//     inputControl.classList.add('error');
//     inputControl.classList.remove('success')
// }

// const setSuccess = element => {
//     const inputControl = element.parentElement;
//     const errorDisplay = inputControl.querySelector('.error');

//     errorDisplay.innerText = '';
//     inputControl.classList.add('success');
//     inputControl.classList.remove('error');
// };

// const isValidEmail = email => {
//     const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     return re.test(String(email).toLowerCase());
// }

// const validateInputs = () => {
//     const usernameValue = username.value.trim();
//     const emailValue = email.value.trim();
//     const passwordValue = password.value.trim();
//     const password2Value = password2.value.trim();

//     if(usernameValue === '') {
//         setError(username, 'Username is required');
//     } else {
//         setSuccess(username);
//     }

//     if(emailValue === '') {
//         setError(email, 'Email is required');
//     } else if (!isValidEmail(emailValue)) {
//         setError(email, 'Provide a valid email address');
//     } else {
//         setSuccess(email);
//     }

//     if(passwordValue === '') {
//         setError(password, 'Password is required');
//     } else if (passwordValue.length < 8 ) {
//         setError(password, 'Password must be at least 8 character.')
//     } else {
//         setSuccess(password);
//     }

//     if(password2Value === '') {
//         setError(password2, 'Please confirm your password');
//     } else if (password2Value !== passwordValue) {
//         setError(password2, "Passwords doesn't match");
//     } else {
//         setSuccess(password2);
//     }

// };

