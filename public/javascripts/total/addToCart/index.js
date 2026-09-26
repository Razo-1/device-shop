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
    .then(res => res.json())
    .then(res => {
        if(res.ok){
            showAlert('success',res.msg)
        }else{
            showAlert('error',res.msg)
        }
    })
    .catch(rej => console.log(rej))
}