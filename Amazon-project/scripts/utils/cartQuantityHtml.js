function printCartQuantity() {
    let checkoutCartQuantityEl = document.querySelectorAll('.js-cart-quantity');
    if (checkoutCartQuantityEl) {
        checkoutCartQuantityEl.forEach((el) => {
            el.innerText =
                `${JSON.parse(localStorage.getItem('cartQuantity')) || 0}`;
        });
    };

}

export default printCartQuantity;