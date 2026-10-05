import { showAlert } from "../../total/alart/index.js";

export function changePassword(){
     document.querySelector('.password-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const inputs = e.target.querySelectorAll('.form-input');
        const current = inputs[0].value;
        const newPass = inputs[1].value;
        const confirm = inputs[2].value;

        if (newPass !== confirm) {
            confirm.classList.add('errorPass')
            return;
        }

        if (newPass.length < 6) {
            confirm.classList.remove('errorPass')
            return;
        }


        fetch(`http://localhost:3000/profile/change-password`,{
            method : 'PATCH',
            headers : { 'Content-type' : 'application/json' },
            credentials : 'include',
            body : JSON.stringify({current,newPass})
        })
        .then(res => res.json())
        .then(res => {

            if(res.ok){
                showAlert('success',res.msg)
            }else{
                showAlert('error',res.msg)
            }
        })
        .catch(rej => console.log(rej));
        
        inputs.forEach(input => input.value = '');
    });

}