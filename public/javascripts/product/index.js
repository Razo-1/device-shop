import { qty } from "./actionControl/index.js";
import { buyProdcut } from "./buyProduct/index.js";
import { toggleFavorite } from "./favorite/index.js";

let originalPrice = Number(document.querySelector('.price-value').textContent.trim().slice(0,-2))

const back = document.getElementById('back');

back.addEventListener('click',() => {
    window.history.back();
})

qty(originalPrice)

buyProdcut(originalPrice)

toggleFavorite()