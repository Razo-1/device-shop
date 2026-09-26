const favorit = document.getElementById('favBtn');

export const toggleFavorite = () => {

    const id = window.location.href.split('=').pop()
    const category = document.querySelector('.category-badge').textContent.trim().slice(0,-1)

    favorit.addEventListener('click', (e) => {
        fetch(`http://localhost:3000/device/wishlist`,{
                method : 'POST',
                headers : { 'content-type' : 'application/json' },
                body : JSON.stringify({ category, id })
            })
            .then(res => res.json())
            .then(res => {
                if(res.ok){
                    favorit.classList.add('active')
                }else{
                    favorit.classList.remove('active')
                }
            })
            .catch(rej => console.log(rej))
    })
}