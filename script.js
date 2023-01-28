const containerSection = document.querySelector('.container-section');
const productList = document.createElement('ul');
productList.classList.add('product-list');
productList.classList.add('empty-container');

function createCards(cards) {
    const productCard = document.createElement('li');
    const productImg = document.createElement('img');
    const productInformation = document.createElement('div');
    const productTag = document.createElement('span');
    const productTitle = document.createElement('h2');
    const productDescription = document.createElement('p');
    const productPrice = document.createElement('p');
    const productAdd = document.createElement('a');

    productCard.classList.add('product-card');
    productImg.classList.add('product-img');
    productInformation.classList.add('product-information');
    productTag.classList.add('product-tag');
    productTitle.classList.add('product-title');
    productDescription.classList.add('product-description');
    productPrice.classList.add('product-price');
    productAdd.classList.add('product-add');
    productAdd.setAttribute('id', `${cards.id}`);

    productImg.src = `${cards.img}`;
    productImg.alt = `${cards.nameItem}`;
    productTag.innerText = `${cards.tag}`;
    productTitle.innerText = `${cards.nameItem}`;
    productDescription.innerText = `${cards.description}`;
    productPrice.innerText = `${cards.value}`.replace(`${cards.value}`, `R$ ${cards.value},00`);
    productAdd.innerText = `${cards.addCart}`;

    productInformation.append(productTag, productTitle, productDescription, productPrice, productAdd);
    productCard.append(productImg, productInformation);
    productList.appendChild(productCard);

    return productList;
}

function renderCards(data) {
    for (let i = 0; i < data.length; i++) {
        const ul = createCards(data[i]);
        containerSection.appendChild(ul);
    }
}
renderCards(data);

let cart = [];
const cartList = document.querySelector('.cart-list');
const footerNumber = document.querySelector('.footer-number');
const footerPrice = document.querySelector('.footer-price');
const cartFooter = document.querySelector('.cart-footer');

productList.addEventListener('click', function (event) {
    let btnBuy = event.target;
    if (btnBuy.tagName == "A") {
        let idProduct = btnBuy.id;
        let product = data.find(function (product) {
            if (product.id == idProduct) {
                return product;
            }
        })
        cart.push(product);
        renderCart(cart);
    }
})

function emptyCart(){
    cartList.innerHTML = '';
    let textCart = document.createElement('h3');
    textCart.classList.add('text-inside');
    textCart.innerText = 'Carrinho Vazio';
    let textCart2 = document.createElement('h4');
    textCart2.classList.add('text-bottom');
    textCart2.innerText = 'Adicione Itens';
    let divText = document.createElement('div');
    divText.classList.add('div-text');
    divText.append(textCart, textCart2);
    cartList.append(divText);
    cartFooter.style.backgroundColor = 'white';
    footerNumber.innerText = '0';
    footerPrice.innerText = 'R$ 0,00';    
}
emptyCart();

function renderCart(cartItens) {
    cartList.innerHTML = '';
    if(cartItens.length == 0){
        emptyCart();
    }else{
        for (let i = 0; i < cartItens.length; i++) {
            const li = createCartCard(cartItens[i], i);
            cartList.appendChild(li);
        }
        cartFooter.style.backgroundColor = '#292929';
    }
}

function createCartCard(produto, index) {
    const cartCard = document.createElement('li');
    const cartImg = document.createElement('img');
    const cartDescription = document.createElement('div');
    const cartTitle = document.createElement('h2');
    const cartPrice = document.createElement('p');
    const cartRemove = document.createElement('span');

    cartCard.classList.add('cart-card');
    cartImg.classList.add('cart-img');
    cartDescription.classList.add('cart-description');
    cartTitle.classList.add('cart-title');
    cartPrice.classList.add('cart-price');
    cartRemove.classList.add('cart-remove');

    cartImg.src = `${produto.img}`;
    cartImg.alt = `${produto.nameItem}`;
    cartTitle.innerText = `${produto.nameItem}`;
    cartPrice.innerText = `${produto.value}`.replace(`${produto.value}`, `R$ ${produto.value},00`);
    cartRemove.innerText = `Remover Produto`;
    footerNumber.innerText = `${[cart.length]}`;
    footerPrice.innerText = `R$ ${somaTotal(cart)}`;
    
    cartDescription.append(cartTitle, cartPrice, cartRemove);
    cartCard.append(cartImg, cartDescription);

    cartRemove.addEventListener("click", function () {
        cart.splice(index, 1);
        renderCart(cart);
    })
    return cartCard
}

function somaTotal() {
    let soma = 0;
    for (let i = 0; i < cart.length; i++) {
        soma += cart[i].value;
    }
    return soma;
}

let inputBusca = document.querySelector('#search-input');
let btnBusca = document.querySelector('#search-button');
btnBusca.addEventListener('click', function (e) {
    e.preventDefault();
    productList.innerHTML = '';
    let search = [];
    for (let i = 0; i < data.length; i++) {
        let searchValue = inputBusca.value.toUpperCase().trim();
        let dataName = data[i].nameItem.toUpperCase();
        let dataTag = data[i].tag[0].toUpperCase().replace('Ó', 'O');
        if (searchValue === dataName || dataName.includes(searchValue) || searchValue.replace('Ó', 'O') === dataTag || dataTag.includes(searchValue.replace('Ó', 'O'))) {
            search.push(data[i]);
        }
    }
    renderCards(search);
})

const headerList = document.querySelector('.header-list');
function selectTag (mainObject){
    headerList.addEventListener('click', function(e){
        if (e.target.innerText === 'Acessórios'){
            productList.innerHTML = '';
           let arrSelect = mainObject.filter(function (Object){
                if(Object.tag[0] === "Acessórios"){
                    return Object;
                }
            })
            renderCards(arrSelect)
        }else if (e.target.innerText === 'Calçados'){
            productList.innerHTML = '';
            let arrSelect = mainObject.filter(function (Object){
                if(Object.tag[0] === "Calçados"){
                    return Object;
                }else{
                    productList.innerHTML = 'Nenhum produto disponível..';
                }
            })
            renderCards(arrSelect);
        }else if (e.target.innerText === 'Camisetas'){
            productList.innerHTML = '';
            let arrSelect = mainObject.filter(function (Object){
                if(Object.tag[0] === "Camisetas"){
                    return Object;
                } 
            })
            renderCards(arrSelect);
        }else{
            productList.innerHTML = '';
            renderCards(data);
        }
    })
}
selectTag (data);