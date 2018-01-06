import {products} from './productsData.js';
import {Local} from './localstorage.js';

class Data {
  constructor() {
    this.cart = new Local('cart');
  }

  getProducts() {
    const productItems = Object.keys(products);

    return productItems.map(id => {
      return this.getProduct(id);
    });
  }

  getProduct(id) {
    const [name, description, price, imgUrl] = products[id];

    return {id, name, description, price, imgUrl};
  }

  getCart() {
    return this.cart.getField();
  }

  updateCart(data) {
    this.cart.setField(data);
  }
}

export const data = new Data();
