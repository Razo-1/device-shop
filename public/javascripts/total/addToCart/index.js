import { showAlert } from "../alart/index.js"; 

export const toCart = (el) =>{
    
    const id = el.closest('.product-card').dataset.productid;
    const category = window.location.href.split('/').pop();
   
    fetch(`http://localhost:3000/device/cart`,{
        method : 'POST',
        headers : { 'content-type' : 'application/json' },
        body : JSON.stringify({
            id,
            category,
        })
    })
    .then(res => {
        if(res.status === 401){        
            fetch(`http://localhost:3000/auth/refresh-token`,{
                method : 'POST'
            })
            .then(res => {
                if(!res.ok){
                    window.location.href = '/'
                    return
                }
            })
        }
        return res.json()
    })
    .then(res => {
        if(res.ok){
            showAlert('success',res.msg)
        }else{
            showAlert('error',res.msg)
        }
    })
    .catch(rej => console.log(rej))
}