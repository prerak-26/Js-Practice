import {cart,removeCartItem} from '../data/cart.js';
import {products} from '../data/products.js';
import { formatCentPrice } from './utils/money.js';
import { deliveryOptions } from '../data/deliveryOption.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

let checkoutHtml = ``;

cart.forEach((cartItem) =>{
    let productId = cartItem.productId;
    let matchingProduct;
    let selectedDeliveryOption;

    products.forEach((product) =>{
        if(product.id == productId){
            matchingProduct = product;
        }
    });

    deliveryOptions.forEach((deliveryOption) => {
      if(deliveryOption.id == cartItem.deliveryOptionId){
      selectedDeliveryOption = deliveryOption;}
    })
    const today = dayjs();
    const deliveryDate = today.add(selectedDeliveryOption.deliveryDays,'day');
    const dayString = deliveryDate.format('dddd, MMMM D');

    checkoutHtml += `<div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">
              Delivery date: ${dayString}
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
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                ${createDeliveryOptions(matchingProduct,cartItem)}
              </div>
            </div>
          </div>`;
});

function createDeliveryOptions(matchingProduct,cartItem){
  let deliveryOptionHtml = ``;

  deliveryOptions.forEach((option) => {
    const today = dayjs();
    const deliveryDate = today.add(option.deliveryDays,'day');
    const dayString = deliveryDate.format('dddd, MMMM D');

    const priceString = !option.priceCents ? `FREE ` : `$${formatCentPrice(option.priceCents)} - `;

    const isChecked = option.id === cartItem.deliveryOptionId;

    deliveryOptionHtml += `<div class="delivery-option">
                  <input type="radio"
                    ${isChecked? 'checked' : ''}
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

document.querySelectorAll('.js-delete-link').forEach((link) =>{
    
    link.addEventListener('click', ()=>{
        let productId = link.dataset.productId;
        removeCartItem(productId);
        document.querySelector(`.js-cart-item-container-${productId}`).remove();
    });
})