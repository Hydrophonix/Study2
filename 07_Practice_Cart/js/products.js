import  {data}  from './data.js';
import  {cart}  from './cart.js';

const shopElem = document.getElementById('shop');

function renderProducts() {
  shopElem.innerHTML = Handlebars.templates.products({
    products: data.getProducts
  });

  [...document.getElementsByClassName('addtocart')].forEach(item =>
    item.addEventListener('click', purchaseProducts)
  );

}


function purchaseProducts(e) {
    const elem = e.target.parentNode;
    const activeClassName = 'active';
    const id = elem.getAttribute('data-id');

    elem.classList.add(activeClassName);
    setTimeout(() => elem.classList.remove(activeClassName), 1000);

    cart.addToCart(id);
}
renderProducts();
