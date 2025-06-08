const cart = [];

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
        })
    };
};

export {cart,addToCart};