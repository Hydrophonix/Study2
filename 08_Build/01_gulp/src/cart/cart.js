import { data } from '../data/data.js';

const cartElem = document.getElementById('cart');
const totalElem = document.getElementById('total');

class Cart {
  constructor() {
    this.cartData = data.getCart();
    this.settings = {
      tax: 20,
      shipping: 5
    };
    this.subtotal = 0;
    this.update();
    this.render();
  }

  update() {
    this.updateStorage();
    this.updateCartList();
    this.renderTotal();
  }

  updateCartList() {
    this.cartList = this.cartData.map(elem => {
      const {
        id,
        name,
        imgUrl,
        description,
        price
      } = data.getProduct(elem.id);


      return {
        id,
        name,
        imgUrl,
        description,
        price,
        qty: elem.qty,
        total: elem.qty * price
      };
    });
    this.countSubtotal();
  }

  countSubtotal() {
    this.subtotal = this.cartList.reduce((sum, item) => sum + item.total, 0);
  }

  updateStorage() {
    data.updateCart(this.cartData);
  }

  addToCart(productId) {
    let cartData = this.cartData;
    let productObject = cartData.find(elem => elem.id === productId);

    if (productObject) {
      productObject.qty++;
    } else {
      cartData.push({
        id: productId,
        qty: 1
      });
    }

    this.updateStorage();
  }

  render() {
    this.renderList();
    this.renderTotal();
  }

  renderList() {
    if (!cartElem) return;


    cartElem.innerHTML = Handlebars.templates.cart({
      products: this.cartList
    });

    [...document.getElementsByClassName('remove')].forEach(item =>
      item.addEventListener('click', e => {
        const id = e.target.getAttribute('data-id');
        this.removeProduct(id);
        e.preventDefault();
      })
    );

    [...document.getElementsByClassName('qty')].forEach(item =>
      item.addEventListener('change', e => {
        const id = e.target.getAttribute('data-id');
        const index = this.cartData.findIndex(elem => elem.id === id);
        this.cartData[index].qty = e.target.value;
        document.getElementById(`p-${id}`).innerText = `$${this.cartList[index].total}`;
        this.update();
      })
    );

  }

  renderTotal() {
    if (!totalElem) return;

    const { tax, shipping} = this.settings;

    totalElem.innerHTML = Handlebars.templates.total({
      subtotal: this.subtotal,
      tax,
      shipping,
      total: this.subtotal + tax + shipping
    });

  }

  removeProduct(id) {
    this.cartData = this.cartData.filter(elem => elem.id !== id);
    document.getElementById(id).remove();

    this.update();

  }

}

export const cart = new Cart;
