const cart = [{
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 3
},
{
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 1
}];

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