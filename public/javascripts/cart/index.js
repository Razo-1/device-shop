import { updateOrder } from "./updateOrder/index.js";
import { updateQuantity } from "./updateQuantity/index.js";
import { viewProduct } from "./viewProduct/index.js";

updateQuantity();
viewProduct();

const cleanAll = document.getElementById('cleanAll');

cleanAll.addEventListener('click',() => {

    if(Number(cleanAll.dataset.items)){
        fetch(`http://localhost:3000/user/cart/clear-all`,{
            method : 'DELETE'
        })
        .then(res => res.json())
        .then(res => {
            if(res.ok){
                const item = document.querySelector('.results-count');
                item.textContent = "0 items";

                const cartItem = document.getElementById('itemCarts');
                cartItem.remove()

                document.querySelector('.cart-summary').remove()

                cleanAll.remove()
            }
        })
        .catch(rej => console.log(rej))
    }
    
})

document.querySelectorAll('button[data-rem]').forEach(el => {
    el.addEventListener('click',() => {
        const category = el.dataset.type.slice(0,-1);
        const cartItem = el.closest('.cart-item')
        const id = cartItem.dataset.productId;
        const price = cartItem.querySelector('.item-total');

        updateOrder('minus',Number(price.textContent.split('$').pop()))

        fetch(`http://localhost:3000/user/cart/delete`,{
            method : 'DELETE',
            headers : { 'Content-Type' : 'application/json' },
            body : JSON.stringify({
                category,
                id
            })
        })
        
    })
})
















const buy = document.getElementById('buy');

buy.addEventListener('click',(e) => {
    console.log('buy');
    
})