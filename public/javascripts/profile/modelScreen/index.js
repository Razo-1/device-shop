import { showAlert } from "../../total/alart/index.js";

export function modelScreen(){
        function openModal(modalId) {
            document.getElementById(modalId).classList.add('active');
        }

        function closeModal(modalId) {
            document.getElementById(modalId).classList.remove('active');
        }

        document.getElementById('btn-add-funds').addEventListener('click', () => {
            openModal('modal-add-funds');
        });

        document.getElementById('close-add-funds').addEventListener('click', () => {
            closeModal('modal-add-funds');
        });

        document.getElementById('form-add-funds').addEventListener('submit', (e) => {
            e.preventDefault();
            const amount = Number(e.target.querySelector('input[type="number"]').value);
            const method = e.target.querySelector('select').value;
            if(method){
                fetch('http://localhost:3000/profile/deposit', {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                    body: JSON.stringify({
                        deposit: amount,
                    })
                })
                .then(res => res.json())
                .then(res => {
                    if (res.ok) {
                        showAlert('success',res.msg);
                        const amountWithPercent = amount - (amount * 0.3 / 100);

                        const balance = document.getElementById('balance');

                        const pastBalance = Number(balance.textContent.slice(1));

                        balance.textContent = '$' + (pastBalance + amountWithPercent).toFixed(2);

                        closeModal('modal-add-funds');
                        e.target.reset();
                    } else {
                        showAlert('error',res.msg);
                    }
                })
                .catch(error => {
                    console.log(error);
                });
            }
            
            closeModal('modal-add-funds');
            e.target.reset();
        });

        document.querySelectorAll('.modal-overlay').forEach(overlay => {
            overlay.addEventListener('click', (e) => {
                const modal = e.target.closest('.modal');
                if (modal) {
                    modal.classList.remove('active');
                }
            });
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                document.querySelectorAll('.modal.active').forEach(modal => {
                    modal.classList.remove('active');
                });
            }
        });
}