const loginEmail = document.getElementById('login-email');
const loginPassword = document.getElementById('login-password');
const rememberCheckbox = document.getElementById('remember');
const form = document.getElementById('form');
const btn = document.querySelector('.btn-submit');
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

loginEmail.addEventListener('change', (e) => {
    if(!emailRegex.test(e.target.value)){
        e.target.classList.add('error');
    }else{
        e.target.classList.remove('error');
    }
});

loginPassword.addEventListener('change', (e) => {
    let pass = e.target.value.trim().length

    if(pass < 8){
        e.target.classList.add('error');
    }else{
        e.target.classList.remove('error');
    }
});

form.addEventListener('submit', (e) => {
    e.preventDefault()
    if(emailRegex.test(loginEmail.value) && loginPassword.value.length > 7){

        fetch(`http://localhost:3000/auth/login`,{
            method : 'POST',
            headers : { "content-type" : "application/json"},
            body : JSON.stringify({
                email : loginEmail.value,
                password : loginPassword.value,
                remember : rememberCheckbox.checked,
            })
        })
        .then(res => res.json())
        .then(res => {
            if(res.ok){
                window.location.href = 'http://localhost:3000/home'
            }else{
                const error = document.createElement('span')
                error.classList.add('invError')
                error.textContent = 'Invalid email address or password'
                btn.before(error)
            }
        })
        .catch(rej => console.log(rej))
    }
});

