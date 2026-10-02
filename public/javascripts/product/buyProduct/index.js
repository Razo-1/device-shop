import { showAlert } from "../../total/alart/index.js";

export const buyProdcut = (originalPrice) => {
    const input = document.getElementById('qtyInput');
    const buy = document.querySelector('.btn-add-cart');
    const inStock = document.getElementById('inStock');
    let price = document.querySelector('.price-value')
    
    buy.addEventListener('click',(e) => {
        
        if(inStock){
            const catalog = document.querySelector('.category-badge').textContent.trim().slice(0,-1)
            const id = window.location.href.split('=').pop();
            
            fetch(`http://localhost:3000/product/buy-gadget`,{
                method : 'PATCH',
                headers : { 'content-type' : 'application/json' },
                body : JSON.stringify({
                    id,
                    count  : Number(input.value),
                    catalog
                })
            })
            .then(res => res.json()) 
            .then(res => {

                if(res.ok){
                    price.textContent = originalPrice.toLocaleString('en-US') + ' $'
                    if(Number(inStock.textContent) - Number(input.value) === 0){
                        window.location.href = location.href
                    }else{
                        inStock.textContent = Number(inStock.textContent) - Number(input.value)
                        input.value = 1
                    }
                }
            })
            .catch(rej => console.log(rej))  
        }else{
            showAlert('error',"This item is out of stock")
        }       
    })

}