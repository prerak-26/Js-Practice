import printCartQuantity from "./utils/cartQuantityHtml.js";
import { getProduct } from "../data/products.js";
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

printCartQuantity();

const url = new URL(window.location.href);
const encodedURL = url.searchParams.get('order');
const decodedURL = decodeURIComponent(encodedURL);
const retriveData = JSON.parse(decodedURL);

const matchingProduct = getProduct(retriveData.id);

const currentYear = dayjs().year(); 
const today = dayjs().startOf('day');

const deliveryDateString = `${retriveData.date} ${currentYear}`; 
const deliveryDate = dayjs(deliveryDateString, 'D MMMM YYYY');

const orderDateString = `${retriveData.orderTime} ${currentYear}`;
const orderDate = dayjs(orderDateString, 'D MMM YYYY');
// const orderDate = dayjs().subtract(5, 'day');

const deliveryMessage = today < deliveryDate ? `Arriving on ${retriveData.date}` : `Delivered on ${retriveData.date}`; 

let productDataHTML =
  ` <div class="delivery-date">
          ${deliveryMessage}
        </div>

        <div class="product-info">
          ${matchingProduct.name}
        </div>

        <div class="product-info">
          Quantity: ${retriveData.quantity}
        </div>

        <img class="product-image" src="${matchingProduct.image}">`;

document.querySelector('.js-product-tracking-container').innerHTML = productDataHTML;

const duration = deliveryDate.diff(orderDate, 'day');
const passedDays = today.diff(orderDate, 'day');

let progress = Math.max(0, Math.min((passedDays / duration) * 100, 100));
console.log(progress)

document.querySelector('.js-progress-bar').style.width = `${progress}%`;

let progressLabel = document.querySelectorAll('.js-progress-label');

let trackingStage = [{
  label: 'Preparing',
  threshold: 33
},
{
  label: 'Shipped',
  threshold: 66
},
{
  label: 'Delivered',
  threshold: 100
}];

let currentStage = 0;

for(let i = 0; i < trackingStage.length; i++){
  if(progress >= trackingStage[i].threshold){
    currentStage = i;
  };
};

progressLabel.forEach(el => el.classList.remove('current-status'));

progressLabel[currentStage].classList.add('current-status');

