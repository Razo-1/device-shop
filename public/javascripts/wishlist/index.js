import { toCart } from "./addtoCart/index.js";

const clearWishlist = document.getElementById('clearWishlist');

clearWishlist.addEventListener('click',(e) => {
    fetch(`http://localhost:3000/user/wishlist/clear-all`,{method : 'DELETE'})
    .then(res => res.json())
    .then(res => {
        if(res.ok){
            window.location.href = location.href 
        }
    })
    .catch(rej => console.log(rej))
})

document.querySelectorAll('button[data-id]').forEach(el => {
    el.addEventListener('click',(e) => {

        const category = el.dataset.type
        const id = el.dataset.id
        document.querySelector('.products-grid').children.length
        fetch(`http://localhost:3000/device/wishlist`,{
                method : 'POST',
                headers : { 'content-type' : 'application/json' },
                body : JSON.stringify({ category, id })

            })
            .then(res => res.json())
            .then(res => {
                if(!res.ok){
                    el.closest('.product-card').remove()                    
                    if(!document.querySelector('.products-grid').children.length){
                        document.querySelector('.empty-state').style.display = 'flex'
                    }
                }
            })
            .catch(rej => console.log(rej))

    })
})

document.querySelectorAll('.btn-cart').forEach(el => {
    el.addEventListener('click',(e) => {
        toCart(el)
    })
})