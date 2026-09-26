import { toCart } from "../total/addToCart/index.js";
import { displayProducts } from "./drawShop/index.js";
import { favoritDevice } from "./favorite/index.js";
import { getFilterParams } from "./paramFilter/index.js";

const search = document.getElementById('search');

search.addEventListener('submit',(e) => {
    e.preventDefault();

    let input = search.querySelector('input')
    const catalog = window.location.pathname.split('/').filter(Boolean).pop();

    if(input.value === ''){
        window.location.href = location.href
    }

    if(input.value.trim()){
        fetch(`http://localhost:3000/device/search?catalog=${catalog}&item=${input.value}`)
        .then(res => res.json())
        .then(res => {
            if(res.ok){
                displayProducts(res.find)
            }
        })
        .catch(rej => console.log(rej))
        .finally(res => console.log('ok'))
    }
})


document.querySelector('.btn-apply').addEventListener('click', (e) => {

    e.preventDefault();
    
    const filters = getFilterParams();
    const endPoint = window.location.pathname.split('/').filter(Boolean).pop()
    
    fetch(`http://localhost:3000/device/filter/${endPoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(filters)
    })
    .then(res => res.json())
    .then(data => {
        displayProducts(data)
    })
    .catch(err => console.error(err));
});


document.querySelector('.btn-reset').addEventListener('click', () => {
  window.location.href = window.location.href
});


document.addEventListener('click', (e) => {
    const cardLink = e.target.closest('a[data-product]');
    if (cardLink) {
        e.preventDefault();
        const card = cardLink.closest('.product-card');
        const id = card.dataset.productid;
        const type = window.location.pathname.split('/').filter(Boolean).pop();
        window.location.href = `/device/product?type=${type}&detail=${id}`;
        return;
    }

    const favBtn = e.target.closest('button[data-id]');
    if (favBtn) {
        favoritDevice(favBtn);
        return;
    }

    const cartBtn = e.target.closest('button[data-cart]');
    if (cartBtn) {
        console.log('sss');
        toCart(cartBtn);
    }
});