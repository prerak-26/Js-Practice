import { cart } from "../../data/cart.js";
import saveToLocalStorage from "./saveLocalStorage.js";
import printCartQuantity from "./cartQuantityHtml.js";

function updateCartQuantity() {
    let cartQuantity = 0;
    cart.forEach(item => {
        cartQuantity += item.quantity;
    });
    saveToLocalStorage('cartQuantity', cartQuantity);
    printCartQuantity();
}

export default updateCartQuantity;