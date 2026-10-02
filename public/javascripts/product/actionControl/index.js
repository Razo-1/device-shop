export const qty = (originalPrice) => {
    const minus = document.getElementById('qtyMinus');
    const input = document.getElementById('qtyInput');
    const plus = document.getElementById('qtyPlus');
    const inStock = document.getElementById('inStock');
    let price = document.querySelector('.price-value')

    minus.addEventListener('click',(e) => {
        if(Number(input.value) > 1){
            input.value = Number(input.value) - 1
            price.textContent = (originalPrice * Number(input.value)).toLocaleString('en-US') + ' $'
        }
    })
    
    plus.addEventListener('click',(e) => {        
        if(Number(inStock.textContent) >= Number(input.value) + 1){
            input.value = Number(input.value) + 1
            price.textContent = (originalPrice * Number(input.value)).toLocaleString('en-US') + ' $'
        }
    })

}