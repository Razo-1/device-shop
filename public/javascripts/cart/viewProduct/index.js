export function viewProduct(){
    document.querySelectorAll('div[data-img]').forEach(el => {
        el.addEventListener('click',() => {
            const cart = el.closest('.cart-item')
            const type = cart.querySelector('.btn-remove').dataset.type.slice(0,-1)
            window.location.href = `/device/product?type=${type}&detail=${cart.dataset.productId}`
        })
    })
}