const registerName = document.getElementById('register-name');
const registerEmail = document.getElementById('register-email');
const registerPassword = document.getElementById('register-password');
const registerConfirm = document.getElementById('register-confirm');
const termsCheckbox = document.getElementById('terms');
const form = document.querySelector('.auth-form');
const btn = document.querySelector('.btn-submit');
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

registerName.addEventListener('change', (e) => {
    let name = e.target.value.trim().length
    if(name < 2){
        e.target.classList.add('error');
    }else{
        e.target.classList.remove('error');
    }
});

registerEmail.addEventListener('change', (e) => {
    if(!emailRegex.test(e.target.value)){
        e.target.classList.add('error');
    }else{
        e.target.classList.remove('error');
    }
});

registerPassword.addEventListener('change', (e) => {
    let pass = e.target.value.trim().length;

    if(pass < 8){
        e.target.classList.add('error');
    }else{
        e.target.classList.remove('error');
    }
});

registerConfirm.addEventListener('change', (e) => {
    if(e.target.value !== registerPassword.value){
        e.target.classList.add('error');
    }else{
        e.target.classList.remove('error');
    }
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    if(emailRegex.test(registerEmail.value) && 
       registerPassword.value.length > 7 && 
       registerPassword.value === registerConfirm.value &&
       termsCheckbox.checked){

        fetch(`http://localhost:3000/auth/register`,{
            method : 'POST',
            headers : { 'content-type' :'application/json' },
            body : JSON.stringify({
                name : registerName.value,
                email : registerEmail.value,
                password : registerPassword.value,
            })
        })
        .then(res => res.json())
        .then(res => {
            if(res.ok){
                window.location.href = 'http://localhost:3000/home';
            }else{
                const error = document.createElement('span');
                error.classList.add('invError');
                error.textContent = res.message || 'Registration failed';
                btn.before(error);
            }
        })
        .catch(rej => console.log(rej));
    }
});