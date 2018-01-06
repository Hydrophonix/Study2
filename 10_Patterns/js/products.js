import { data } from './data.js';
import { pubsub } from './pubsub.js';
import { cart } from './cart.js';

const shopElem = document.getElementById('shop');


function renderProducts() {
    shopElem.innerHTML = Handlebars.templates.products({
        products: data.getProducts()
    });

    [...document.getElementsByClassName('addtocart')].forEach(function (item) {
        item.addEventListener('click', purchaseProduct);
    });
}

function purchaseProduct(e) {
    const elem = e.target.parentNode,
          activeClassName = 'active',
          id = elem.getAttribute('data-id');

    elem.classList.add(activeClassName);

    setTimeout(() => {
        elem.classList.remove(activeClassName);
    }, 1000);
    pubsub.pub('cart:add', id);
    pubsub.pub('vader', id);
}

renderProducts();
