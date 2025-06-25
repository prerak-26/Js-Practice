import { cart, removeCartItem, updateDeliveryOption } from '../data/cart.js';
import { getProduct } from '../data/products.js';
import { formatCentPrice } from './utils/money.js';
import { deliveryOptions, getDeliveryOption } from '../data/deliveryOption.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import printCartQuantity from './utils/cartQuantityHtml.js';
import { addOrder } from '../data/order.js';
import updateCartQuantity from './utils/cartQuantity.js';
import saveToLocalStorage from './utils/saveLocalStorage.js';

let checkoutHtml = ``;

cart.forEach((cartItem) => {
  let productId = cartItem.productId;
  let matchingProduct = getProduct(productId);

  checkoutHtml += `<div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date js-delivery-date-${matchingProduct.id}">
              Delivery date: ${getDeliveryDate(cartItem.deliveryOptionId)}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingProduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                    ${matchingProduct.name}
                </div>
                <div class="product-price">
                  $${formatCentPrice(matchingProduct.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: 
                    <input 
                    class="quantity-disable quantity-input js-quantity-input" 
                    type="number" 
                    name="quantity" 
                    min="0"
                    value="${cartItem.quantity}">
                    <span class="quantity-label">${cartItem.quantity}</span>
                  </span>
                  <button class="update-quantity-link update-quantity-btn link-primary" data-product-id="${matchingProduct.id}">
                    Update
                  </button>
                  <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                ${createDeliveryOptions(matchingProduct, cartItem)}
              </div>
            </div>
          </div>`;
});

function getDeliveryDate(cartDeliveryOptionId) {
  let selectedDeliveryOption = getDeliveryOption(cartDeliveryOptionId);
  const today = dayjs();
  const deliveryDate = today.add(selectedDeliveryOption.deliveryDays, 'day');
  const dayString = deliveryDate.format('dddd, MMMM D');

  return dayString;
}

function createDeliveryOptions(matchingProduct, cartItem) {
  let deliveryOptionHtml = ``;

  deliveryOptions.forEach((option) => {
    const today = dayjs();
    const deliveryDate = today.add(option.deliveryDays, 'day');
    const dayString = deliveryDate.format('dddd, MMMM D');

    const priceString = !option.priceCents ? `FREE ` : `$${formatCentPrice(option.priceCents)} - `;

    const isChecked = option.id === cartItem.deliveryOptionId;

    deliveryOptionHtml += `<div class="delivery-option js-delivery-option" 
                            data-product-id="${matchingProduct.id}"
                            data-delivery-option-id="${option.id}">
                  <input type="radio"
                    ${isChecked ? 'checked' : ''}
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      ${dayString}
                    </div>
                    <div class="delivery-option-price">
                      ${priceString}Shipping
                    </div>
                  </div>
                </div>`
  });

  return deliveryOptionHtml;
};

document.querySelector('.js-order-summary').innerHTML = checkoutHtml;

document.querySelectorAll('.js-delete-link').forEach((link) => {

  link.addEventListener('click', () => {
    let productId = link.dataset.productId;
    removeCartItem(productId);
    document.querySelector(`.js-cart-item-container-${productId}`).remove();
    renderPaymentSummary();
    placeOrderBtnVisibility();
  });
});

document.querySelectorAll('.update-quantity-link').forEach((link) => {
  link.addEventListener('click', () => {
    const productId = link.dataset.productId;
    
    const container = document.querySelector(`.js-cart-item-container-${productId}`);
    const input = container.querySelector('.js-quantity-input');
    const label = container.querySelector('.quantity-label');

    if (link.innerText === 'Update') {
      // Switch to edit mode
      input.classList.remove('quantity-disable');
      label.classList.add('quantity-disable');
      link.innerText = 'Save';
    } else {
      // Save new quantity
      const newQuantity = parseInt(input.value);
      if (!isNaN(newQuantity) && newQuantity >= 0) {
        const cartItem = cart.find(item => item.productId === productId);
        if (cartItem) {
          cartItem.quantity = newQuantity;
          label.innerText = newQuantity;
          updateCartQuantity();
          renderPaymentSummary();
          saveToLocalStorage('cart',cart);
        }
      }

      link.innerText = 'Update';
      label.classList.remove('quantity-disable');
      input.classList.add('quantity-disable');
    }
  });
});

document.querySelectorAll('.js-delivery-option').forEach((element) => {
  element.addEventListener('change', () => {
    const { productId, deliveryOptionId } = element.dataset;
    updateDeliveryOption(productId, deliveryOptionId);
    document.querySelector(`.js-delivery-date-${productId}`).innerHTML = `Delivery date: ${getDeliveryDate(deliveryOptionId)}`;
    renderPaymentSummary();
  })
});

function renderPaymentSummary() {
  let itemsTotal = 0, shippingCharge = 0, totalBeforeTax = 0, tax = 0, orderTotal = 0;

  cart.forEach((cartItem) => {

    let matchingProduct = getProduct(cartItem.productId);

    let deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);

    itemsTotal += cartItem.quantity * matchingProduct.priceCents;
    shippingCharge += deliveryOption.priceCents;
  });

  totalBeforeTax = itemsTotal + shippingCharge;
  tax = totalBeforeTax * 0.1;
  orderTotal = totalBeforeTax + tax;

  const paymentSummaryHTML = `
          <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (<span class="js-cart-quantity">${JSON.parse(localStorage.getItem('cartQuantity')) || 0}</span>):</div>
            <div class="payment-summary-money">$${formatCentPrice(itemsTotal)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCentPrice(shippingCharge)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCentPrice(totalBeforeTax)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCentPrice(tax)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCentPrice(orderTotal)}</div>
          </div>

          <button class="place-order-button button-primary js-place-order-btn">
            Place your order
          </button>
        `;

  document.querySelector(".js-payment-summary").innerHTML = paymentSummaryHTML;
};

renderPaymentSummary();

printCartQuantity();

if (cart.length > 0) {

  document.querySelector(".js-place-order-btn").addEventListener('click', async () => {
    try {
      const response = await fetch('https://supersimplebackend.dev/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          cart
        })
      });

      const orders = await response.json();
      addOrder(orders);
    } catch (error) {
      console.log("Unexpected Error!", error);
    };

    window.location.href = 'orders.html';
  });
};

function placeOrderBtnVisibility() {
  if (cart.length === 0) {
    document.querySelector(".js-place-order-btn").disabled = true;
    document.querySelector(".js-place-order-btn").classList.add('disabled-button');
  } else {
    document.querySelector(".js-place-order-btn").disabled = false;
    document.querySelector(".js-place-order-btn").classList.remove('disabled-button');
  }
};

placeOrderBtnVisibility();