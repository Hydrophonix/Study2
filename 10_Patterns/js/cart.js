import {data} from './data.js';
import {pubsub} from './pubsub.js';
import {popupFace} from './popupFace.js';

const cartElem = document.getElementById('cart');

class Cart {
  constructor() {
    this.cartData = data.getCart();
    this.settings = {
      tax: 20,
      shipping: 5

    };
    this.subtotal = 0;

    pubsub.sub('cart:add', this.addToCart.bind(this));
    pubsub.sub('vader', popupFace.vader);
    this.update();
  }

  update() {
    this.updateStorage();
    this.updateCartList();
    this.renderCart();
    this.updateCounter();
  }

  updateCartList() {
    this.cartList = this.cartData.map(elem => {
      const {id, name, imgUrl, description, price} = data.getProduct(elem.id);

      return {
        id,
        name,
        imgUrl,
        description,
        price,
        qty: elem.qty,
        total: elem.qty * price
      }
    });

    this.countSubtotal();
  }

  countSubtotal() {
    this.subtotal = this.cartList.reduce((sum, item) => sum + item.total, 0);
  }

  addToCart(id) {
    let cartData = this.cartData;

    let productObject = cartData.find(elem => elem.id === id);

    if (productObject) {
      productObject.qty += 1;
    } else {
      cartData.push({id, qty: 1});
    }

    this.update();
  }

  updateStorage() {
    data.updateCart(this.cartData);
  }

  renderCart() {
    if (!cartElem)
      return;

    const {tax, shipping} = this.settings;

    cartElem.innerHTML = Handlebars.templates.cart({
      products: this.cartList,
      subtotal: this.subtotal,
      tax,
      shipping,
      total: this.subtotal + tax + shipping
    });

    [...document.getElementsByClassName('remove')].forEach(item => {
      item.addEventListener('click', e => {
        const id = e.target.getAttribute('data-id');

        this.removeProduct(id);
      });
    });
  }

  removeProduct(id) {
    const index = this.cartData.findIndex(elem => elem.id === id);

    this.cartData.splice(index, 1);

    this.update();
  }

  updateCounter() {
    const counter = document.getElementById('cart-counter');
    if (counter) {
      let qty = this.cartData.reduce((sum, elem) => {
        return sum += elem.qty;
      }, 0);
      counter.innerText = qty;
    }
  }

}

export const cart = new Cart();
