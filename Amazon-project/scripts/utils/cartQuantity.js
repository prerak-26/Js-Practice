import { cart } from "../../data/cart.js";
import saveToLocalStorage from "./saveLocalStorage.js";

function updateCartQuantity() {
    let cartQuantity = 0;
    cart.forEach(item => {
        cartQuantity += item.quantity;
    });
    saveToLocalStorage('cartQuantity', cartQuantity);
    // document.querySelector('.cart-quantity').innerText = JSON.parse(localStorage.getItem('cartQuantity')) || 0;
    const cartQuantityEl = document.querySelector('.cart-quantity');
    if (cartQuantityEl) {
        cartQuantityEl.innerText =
            JSON.parse(localStorage.getItem('cartQuantity')) || 0;
    }
}

export default updateCartQuantity;