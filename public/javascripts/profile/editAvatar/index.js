export function editAvatar(){
    document.querySelector('.avatar-edit-label input').addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {

            const formData = new FormData();
            formData.append('avatar', file);

            fetch(`http://localhost:3000/profile/avatar`,{
                method : 'PATCH',
                credentials : 'include',
                body : formData
            })
            .then(res => res.json())
            .then(res => {
                if(res.ok){
                    const reader = new FileReader();

                    reader.onload = function(event) {
                        const avatarContainer = document.querySelector('.profile-avatar');

                        const existingImg = avatarContainer.querySelector('.avatar-image');
                        const placeholder = avatarContainer.querySelector('.avatar-placeholder');

                        if (placeholder) {
                            placeholder.remove();
                        }

                        if (existingImg) {
                            existingImg.src = event.target.result;
                        } else {
                            const img = document.createElement('img');

                            img.className = 'avatar-image';
                            img.src = event.target.result;

                            avatarContainer.appendChild(img);
                        }
                    };

                    reader.readAsDataURL(file);
                }
            })
            .catch(rej => console.log(rej))
            
        }
    });

}