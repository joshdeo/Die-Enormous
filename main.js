let carts = document.getElementsByClassName('add-item');

let products = [{
        name: 'PERICO WHITE TEE',
        tag: 'tsaf1',
        price: 50,
        inCart: 0
    },

    {
        name: 'PERICO WHITE TEE',
        tag: 'tsaf1',
        price: 50,
        inCart: 0
    },

    {
        name: 'OBSIDIAN 1s',
        tag: 'OBSIDIAN',
        price: 390,
        inCart: 0
    },
]

for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i]);
    })
}


function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');
    if (productNumbers) {
        var test = document.querySelector('.fa-shopping-cart span').textContent = productNumbers;
    }
}

function cartNumbers(product) {
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);

    if (productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.fa-shopping-cart span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.fa-shopping-cart span').textContent = 1;
    }

    setItems(product)
}

function setItems(product) {

    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems)
    console.log("My cartItems are", cartItems);

    if (cartItems != null) {

        if (cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1;
    } else {
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        }
    }
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(product) {
    // console.log("price is", products.price);
    let cartCost = localStorage.getItem('totalCost');
    console.log("My Cart Cost is", cartCost);
    console.log(typeof cartCost);

    if (cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);
    } else {
        localStorage.setItem("totalCost", product.price);
    }
}

let cartCost; // was in function below v

function displayCart() {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems)
    let productContainer = document.querySelector('.item-description');

    cartCost = localStorage.getItem('totalCost');

    if (cartItems && productContainer) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML +=
                `
            <span class="flex-grow-1">
                <img class="item-image" src="./resources/images/${item.tag}.png" alt="">
                <button class="remove-item">REMOVE</button>
            </span>
            <span class="flex-grow-1">${item.name}</span>
            <span class="price">$${item.price}</span>
            <input type="number" name="quantity" class="quantity" value="">
            <span class="total">$${item.inCart * item.price}</span> 
            `
        });
        document.getElementsByClassName('total-amount')[0].innerText = '$' + cartCost;
    }
}


onLoadCartNumbers();
displayCart();

/* REMOVE CART ITEM - NEEDS WORK */

if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready();
}

function ready() {
    var removeItem = document.getElementsByClassName('remove-item');
    for (var i = 0; i < removeItem.length; i++) {
        var button = removeItem[i];
        button.addEventListener('click', removeCartItem)
    }
}

function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove();
    document.getElementsByClassName('total-amount')[0].innerText = '$', products.price - cartCost;
    localStorage.clear();
}
// END OF REMOVE CART ITEM - NEEDS WORK