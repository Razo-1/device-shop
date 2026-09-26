import { updateOrder } from "../updateOrder/index.js";

export function updateQuantity(){
    document.querySelectorAll('button[data-id]').forEach(el => {
        el.addEventListener('click',() => {

            const quantityControl  = el.closest('.quantity-control');
            const input = quantityControl.querySelector('.qty-input');
            const totalPrice = el.closest('.item-footer').querySelector('.item-total');
            const originalPrice = Number.parseInt(totalPrice.dataset.originalPrice / 362);
            
            if(el.textContent === '+'){
                    if(Number(input.max) >= Number(input.value) + 1){
                    input.value = Number(input.value) + 1;      
                    
                    updateOrder('pluse',originalPrice);
                    
                    const price = Number(totalPrice.textContent.split('$').pop()) + originalPrice;
                    
                    totalPrice.textContent = "Total: $" +  price;
                }
            }else if(el.textContent === '-'){
                if(Number(input.value) - 1 >= 1){

                    input.value = Number(input.value) - 1;

                    updateOrder('minus',originalPrice);

                    const price = Number(totalPrice.textContent.split('$').pop()) - originalPrice;

                    totalPrice.textContent = "Total: $" +  price;

                }
            }
        
        
        })
    })
}