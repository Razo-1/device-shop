import { showAlert } from "../../total/alart/index.js";

export function removeAvatar(){
    const deleteAvatar = document.getElementById('deleteAvatar');

    deleteAvatar.addEventListener('click',(e) => {
        const avatarContainer = deleteAvatar.closest('div').querySelector('.profile-avatar');
        const img = avatarContainer.querySelector('.avatar-image');

        if(!img){
            showAlert('error','Profile picture is missing. Nothing to delete.')
        }else{
            fetch(`http://localhost:3000/profile/remove-avatar`,{
                method : 'DELETE',
                credentials : 'include',
            })
            .then(res => res.json())
            .then(res => {
                if(res.ok){
                    const avatarContainer = document.querySelector('.profile-avatar');
                    
                    if (img) {
                        img.remove();
                    }
                    
                    const name = document.querySelector('.user-name').textContent
                    const placeholder = document.createElement('div');
                    placeholder.className = 'avatar-placeholder';
                    placeholder.textContent = name.charAt(0);
                    avatarContainer.appendChild(placeholder);
                    showAlert('success',res.msg);
                }else{
                    showAlert('error',res.msg);
                }
            })
            .catch(rej => console.log(rej))
        }
    })
}