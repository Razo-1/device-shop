const logout = document.getElementById('logout')

export function logoutProfile(){    
    logout.addEventListener('click',(e) => {
        fetch(`http://localhost:3000/auth/logout`,{
            method : 'POST',
            credentials : 'include',
        })
        .then(res => res.json())
        .then(res => {
            if(res.ok){
                window.location.href = '/'
            }
        })
        .catch(rej => console.log(rej))
    })
}

