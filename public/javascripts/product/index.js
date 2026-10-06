import { qty } from "./actionControl/index.js";
import { buyProdcut } from "./buyProduct/index.js";
import { toggleFavorite } from "./favorite/index.js";

const originalPrice = Number(
    document.querySelector('.price-value').textContent.replace(/\D/g, '')
);
const back = document.getElementById('back');

back.addEventListener('click',() => {
    window.history.back();

    setTimeout(() => {
        window.location.reload();
    }, 100);
})

qty(originalPrice)

buyProdcut(originalPrice)

toggleFavorite();

