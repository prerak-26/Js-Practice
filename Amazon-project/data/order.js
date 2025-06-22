import saveToLocalStorage from "../scripts/utils/saveLocalStorage.js";

let orders = JSON.parse(localStorage.getItem('orders')) || [];

function addOrder(order) {
    orders.unshift(order);
    saveToLocalStorage('orders', orders);
};

export { orders, addOrder };