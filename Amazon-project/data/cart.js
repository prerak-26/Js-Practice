import saveToLocalStorage from "../scripts/utils/saveLocalStorage.js";
import updateCartQuantity from "../scripts/utils/cartQuantity.js";

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(productId) {
    let isExisting;
    cart.forEach(item => {
        if (productId == item.productId) {
            isExisting = item;
        };
    });

    if (isExisting) {
        isExisting.quantity++;
        console.log("donee")
    } else {
        cart.push({
            productId,
            quantity: 1,
            deliveryOptionId: '1'
        });
    };
    saveToLocalStorage('cart',cart);
};

function removeCartItem(productId){
    const newCart = [];

    cart.forEach((cartItem) =>{
        if(cartItem.productId !== productId){
            newCart.push(cartItem);
        }
    });

    cart = newCart;

    updateCartQuantity();

    saveToLocalStorage('cart',cart);
};

export {cart,addToCart,removeCartItem};