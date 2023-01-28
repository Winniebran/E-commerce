const containerSection = document.querySelector(".container-section");

const productList = document.createElement("ul");
productList.classList.add("product-list");
productList.classList.add("empty-container");


function createCards(cards) {
  const productCard = document.createElement("li");
  productCard.classList.add("product-card");
  productCard.innerHTML = `
      <img class="product-img" src="${cards.img}" alt="${cards.nameItem}">
      <div class="product-information">
        <span class="product-tag">${cards.tag}</span>
        <h2 class="product-title">${cards.nameItem}</h2>
        <p class="product-description">${cards.description}</p>
        <p class="product-price">R$ ${cards.value},00</p>
        <a class="product-add" id="${cards.id}">${cards.addCart}</a>
      </div>
    `;
  productList.appendChild(productCard);
  return productList;
}


function renderCards(data) {
  data.forEach((card) => containerSection.appendChild(createCards(card)));
}
renderCards(data);


let cart = [];
const cartList = document.querySelector(".cart-list");
const footerNumber = document.querySelector(".footer-number");
const footerPrice = document.querySelector(".footer-price");
const cartFooter = document.querySelector(".cart-footer");
productList.addEventListener("click", (event) => {
  if (event.target.tagName == "A") {
    const product = data.find((product) => product.id == event.target.id);
    cart.push(product);
    renderCart(cart);
  }
});


function emptyCart() {
  cartFooter.style.backgroundColor = "white";
  footerNumber.innerText = "0";
  footerPrice.innerText = "R$ 0,00";
  return `<div class="div-text">
    <h3 class="text-inside">Carrinho Vazio</h3>
    <h4 class="text-bottom">Adicione Itens</h4>
    </div>`;
}
emptyCart();


function renderCart(cartItens) {
  cartList.innerHTML = "";
  if (!cartItens.length) {
    emptyCart();
  }
  cartItens.map((iten, i) => {
    cartList.appendChild(createCartCard(iten, i));
    cartFooter.style.backgroundColor = "#292929";
  });
}


function createCartCard(produto, index) {
  const cartCard = document.createElement("li");
  cartCard.classList.add("cart-card");
  cartCard.innerHTML = `
  <img class="cart-img" src="${produto.img}" alt="${produto.nameItem}"> 
  <div class="cart-description"> 
    <h2 class="cart-title">${produto.nameItem}</h2> 
    <p class="cart-price">R$ ${produto.value},00</p> 
    <span class="cart-remove">Remover Produto</span> 
  </div> `;
  footerNumber.innerText = `${[cart.length]}`;
  footerPrice.innerText = `R$ ${somaTotal(cart)}`;

  cartCard.querySelector(".cart-remove").addEventListener("click", () => {
    cart.splice(index, 1);
    renderCart(cart);
  });
  return cartCard;
}

function somaTotal() {
  return cart.reduce((acc, { value }) => acc + value, 0);
}

const inputBusca = document.querySelector("#search-input");
const btnBusca = document.querySelector("#search-button");
btnBusca.addEventListener("click", (event) => {
  event.preventDefault();
  productList.innerHTML = "";
  const search = data.filter( product =>
    product.nameItem
        .toUpperCase()
        .normalize("NFD")
        .replace(/[^a-zA-Z\s]/g, "")
        .includes(inputBusca.value.toUpperCase().normalize("NFD").replace(/[^a-zA-Z\s]/g, "")) ||
    product.tag[0]
        .toUpperCase()
        .normalize("NFD")
        .replace(/[^a-zA-Z\s]/g, "")
        .includes(inputBusca.value.toUpperCase().normalize("NFD").replace(/[^a-zA-Z\s]/g, ""))
  );
  renderCards(search);
});

const headerList = document.querySelector(".header-list");
headerList.addEventListener("click", (e) => {
    productList.innerHTML = "";
    let arrSelect = data.filter((product) => {
        if (product.tag[0] === e.target.innerText) {
            return product;
        }
    });
    if ("Todos" === e.target.innerText){
        return renderCards(data)
    }
    renderCards(arrSelect.length ? arrSelect : productList.innerHTML = "Nenhum produto disponível..");
});