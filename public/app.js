// JQUERY stuff 

$('.message a').click(function(){
    $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
 });

 // JQUERY END ------------------------------------------------------------------------------

 // wowjs stuff ------------------------------------------------------------------------------

//  new WOW().int  

//  wowjs END ------------------------------------------------------------------------------

 const registerForm = document.querySelector('.register-form');
 const loginForm = document.querySelector('.login-form');
 const registerPassword = document.querySelector('#register-password')
 
 const 


 registerForm.addEventListener('submit', e => {
     e.preventDefault();
     const loginDetails = {
         username: username.value,
         password: password.value
     };
     console.log('Confirmation: "Register" is working');


 fetch('api/user/register', {
     method: 'POST', 
     headers: {
         'content-type': 'application/json'
     },
     body: JSON.stringify(loginDetails)
 })
 .then(res => res.json())
 .then(response => {
     if(response.status === 'succes') {
         localStorage.setItem('token', response.token);
         location.href = response.redirect;
     } else {
         alert('Incorrect account name or password.');
     }

    })
    .catch(err => {
        console.log(err);
        alert('Incorrect account name or password.');
    });
 });




 