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
        .then(res => res.json())
        .then(res => {
            if(res.ok){
                cartItem.remove()

                const count = document.querySelector('.results-count');
                const n = Math.max(0, parseInt(count.textContent) - 1);
                count.textContent = `${n} item${n !== 1 ? 's' : ''}`;

                if(n === 0){
                    document.querySelector('.cart-summary').style.display = 'none';
                    document.querySelector('#cleanAll').style.display = 'none';
                }
            }
        })
        .catch(rej => console.log(rej))    
    })
})
















const buy = document.getElementById('buy');

buy.addEventListener('click',(e) => {
    console.log('buy');
    
})