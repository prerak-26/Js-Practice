function printCartQuantity() {
    let checkoutCartQuantityEl = document.querySelectorAll('.js-cart-quantity');
    if (checkoutCartQuantityEl) {
        checkoutCartQuantityEl.forEach((el) => {
            let dataValue = el.dataset.cartQuantityItems;
            if(dataValue){
                console.log("donee")
                el.innerText =
                `${JSON.parse(localStorage.getItem('cartQuantity')) || 0} items`;
            }else{
                el.innerText =
                `${JSON.parse(localStorage.getItem('cartQuantity')) || 0}`;
            };
        });
    };
}

export default printCartQuantity;