export function favoritDevice(el){
    const id = el.closest('.product-card').dataset.productid;

    const category = window.location.href.split('/').pop();
    
            fetch(`http://localhost:3000/device/wishlist`,{
                method : 'POST',
                headers : { 'content-type' : 'application/json' },
                body : JSON.stringify({ category, id })

            })
            .then(res => {
                if(res.status === 401){
                    
                    fetch(`http://localhost:3000/auth/refresh-token`,{
                        method : 'POST'
                    })
                    .then(res => {
                        if(!res.ok){
                            window.location.href = '/'
                            return
                        }
                    })
                }
                return res.json()
                
            })
            .then(res => {    
                            
                if(res.ok){                    
                    el.classList.add('active');
                }else{
                    el.classList.remove('active');
                }
            })
            .catch(rej => console.log(rej))
        
}