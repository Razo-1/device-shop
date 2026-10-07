import { showAlert } from '../total/alart/index.js'

const productsGrid = document.querySelector('.products-grid');

document.querySelectorAll('.product-card').forEach(el => {
    el.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            const count = Number(el.dataset.count);

            fetch(`http://localhost:3000/return-device/return`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({
                    id: el.dataset.productid,
                    count,
                    title: el.dataset.title
                })
            })
            .then(res => res.json())
            .then(res => {
                if (res.ok) {
                    showAlert('success', res.msg);

                    el.remove();

                    if (!productsGrid.querySelector('.product-card')) {
                        const emptyState = document.createElement('div');
                        emptyState.classList.add('empty-state');

                        const icon = document.createElement('div');
                        icon.classList.add('empty-icon');
                        icon.textContent = '📦';

                        const title = document.createElement('div');
                        title.classList.add('empty-title');
                        title.textContent = 'No purchases yet';

                        const text = document.createElement('div');
                        text.classList.add('empty-text');
                        text.textContent = 'Start shopping to see your purchases here';

                        emptyState.append(icon, title, text);
                        productsGrid.append(emptyState);
                    }
                } else {
                    showAlert('error', res.msg);
                }
            })
            .catch(rej => console.log(rej))
        }
    })
})