let cart = JSON.parse(localStorage.getItem('cart')) || [];

function saveToLocalStorage(name,data){
    localStorage.setItem(name, JSON.stringify(data));
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
            quantity: 1
        });

        saveToLocalStorage('cart',cart);
    };
};

function removeCartItem(productId){
    const newCart = [];

    cart.forEach((cartItem) =>{
        if(cartItem.productId !== productId){
            newCart.push(cartItem);
        }
    });

    cart = newCart;

    saveToLocalStorage('cart',cart);
}

export {cart,addToCart,removeCartItem};