export function favoritDevice(el){
    const id = el.closest('.product-card').dataset.productid;

    const category = window.location.href.split('/').pop();
    
            fetch(`http://localhost:3000/device/wishlist`,{
                method : 'POST',
                headers : { 'content-type' : 'application/json' },
                body : JSON.stringify({ category, id })

            })
            .then(res => res.json())
            .then(res => {
                if(res.ok){
                    el.classList.add('active');
                }else{
                    el.classList.remove('active');
                }
            })
            .catch(rej => console.log(rej))
        
}