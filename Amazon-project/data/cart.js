import saveToLocalStorage from "../scripts/utils/saveLocalStorage.js";
import updateCartQuantity from "../scripts/utils/cartQuantity.js";

let cart;

loadFromLocalStorage();

function loadFromLocalStorage() {
    cart = JSON.parse(localStorage.getItem('cart')) || [];
}

function addToCart(productId) {
    let isExisting;
    cart.forEach(item => {
        if (productId == item.productId) {
            isExisting = item;
        };
    });

    if (isExisting) {
        isExisting.quantity++;
    } else {
        cart.push({
            productId,
            quantity: 1,
            deliveryOptionId: '1'
        });
    };
    saveToLocalStorage('cart', cart);
};

function removeCartItem(productId) {
    const newCart = [];

    cart.forEach((cartItem) => {
        if (cartItem.productId !== productId) {
            newCart.push(cartItem);
        }
    });

    cart = newCart;

    updateCartQuantity();

    saveToLocalStorage('cart', cart);
};

function updateDeliveryOption(productId, deliveryOptionId) {
    let matchingProduct;
    cart.forEach((cartItem) => {
        if (cartItem.productId === productId) {
            matchingProduct = cartItem;
        }
    });

    matchingProduct.deliveryOptionId = deliveryOptionId;

    saveToLocalStorage('cart', cart);
}

export { cart, addToCart, removeCartItem, updateDeliveryOption, loadFromLocalStorage };