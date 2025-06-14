import { addToCart } from '../data/cart.js';
import { products } from '../data/products.js';
import { formatCentPrice } from './utils/money.js';
import updateCartQuantity from './utils/cartQuantity.js';
import printCartQuantity from './utils/cartQuantityHtml.js';

printCartQuantity();

let productHtml = ``;

products.forEach(product => {
    productHtml += `<div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${(product.rating.stars) * 10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${formatCentPrice(product.priceCents)}
          </div>

          <div class="product-quantity-container">
            <select>
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-cart" data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>`;
});

document.querySelector('.js-product-container').innerHTML = productHtml;

document.querySelectorAll('.js-add-cart').forEach(button => {
    button.addEventListener('click', () => {
        let productId = button.dataset.productId;

        addToCart(productId);
        updateCartQuantity();

    });
});
