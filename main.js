/*
$(document).ready(function () {
    console.log("ready!");

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

        var quantityInputs = document.getElementsByClassName('quantity')
        for (var i = 0; i < quantityInputs.length; i++) {
            var input = quantityInputs[i];
            input.addEventListener('change', quantityChanged)
        }

        var cart = document.getElementsByClassName('add-item') //addToCartButtons
        for (var i = 0; i < cart.length; i++) {
            var button = cart[i]
            button.addEventListener('click', addToCartClicked);
        }

        document.getElementsByClassName('checkout')[0].addEventListener('click', purchaseClicked)
    }

    function purchaseClicked() {
        alert('Thank you for your purchase');
        var cartItems = document.getElementsByClassName('product-details') //CHANGE THIS TO item-description after || 'product-details'
        while (cartItems.hasChildNodes()) {
            cartItems.removeChild(cartItems.firstChild)
        }
        updateCartTotal();
    }

    function removeCartItem(event) {
        var buttonClicked = event.target
        buttonClicked.parentElement.parentElement.remove();
        updateCartTotal();
    }

    function quantityChanged(event) {
        var input = event.target
        if (isNaN(input.value) || input.value <= 0) {
            input.value = 1
        }
        updateCartTotal()
    }

    function addToCartClicked(event) {
        var button = event.target
        var shopItem = button.parentElement.parentElement.parentElement.parentElement;
        var title = shopItem.getElementsByClassName('shop-item')[0].innerText;
        var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText;
        var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src;
        console.log(title, price, imageSrc);
        addItemToCart(title, price, imageSrc);
        updateCartTotal();
    }

    function addItemToCart(title, price, imageSrc) {
        var cartRow = document.createElement('div');
        cartRow.classList.add('cart-row')
        var cartItems = document.getElementsByClassName('product-details')[0]; // OR product-details item-description
        var cartItemNames = cartItems.getElementsByClassName('shop-item');
        //for (var i = 0; i < cartItemNames.length; i++) {                     // Item cannot be re-added
           // if (cartItemNames[i].innerText == title) {
           //     alert(`Item already added to the cart`)
          //      return
          //  }
        
        var cartRowContents = `
        <div class="item-description">
        <span class="flex-grow-1">
            <img class="item-image" src="${imageSrc}" alt="">
            <button class="remove-item">REMOVE</button>
        </span>
        <span class="flex-grow-1">${title}</span>
        <span class="price">${price}</span>
        <input type="number" name="quantity" class="quantity" value="">
        <!-- <span class="total"></span>-->
    </div>`
        cartRow.innerHTML = cartRowContents
        cartItems.append(cartRow);
        cartRow.getElementsByClassName('remove-item')[0].addEventListener('click', removeCartItem);
        cartRow.getElementsByClassName('quantity')[0].addEventListener('change', quantityChanged);

    }

    function updateCartTotal() {
        var cartItemContainer = document.getElementsByClassName('store-container')[0];
        var cartRows = cartItemContainer.getElementsByClassName('item-description');
        var total = 0;
        for (var i = 0; i < cartRows.length; i++) {
            var cartRow = cartRows[i];
            var priceElement = cartRow.getElementsByClassName('price')[0];
            var quantityElement = cartRow.getElementsByClassName('quantity')[0];
            var price = parseFloat(priceElement.innerText.replace('$', ' '));
            var quantity = quantityElement.value
            total = total + (price * quantity)
        }
        total = Math.round(total * 100) / 100;
        document.getElementsByClassName('total-amount')[0].innerText = '$' + total;
    }
});
*/

//SECOND ITERATION OF JAVASCRIPT


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
        name: 'PERICO WHITE TEE',
        tag: 'tsaf1',
        price: 50,
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
        document.querySelector('.fa-shopping-cart span').textContent = productNumbers;
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


function displayCart() {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems)
    let productContainer = document.querySelector('.item-description');

    let cartCost = localStorage.getItem('totalCost');

    if (cartItems && productContainer) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML +=
                `<div class="item-description">
            <span class="flex-grow-1">
                <img class="item-image" src="./resources/images/${item.tag}.png" alt="">
                <button class="remove-item">REMOVE</button>
            </span>
            <span class="flex-grow-1">${item.name}</span>
            <span class="price">${item.price}</span>
            <input type="number" name="quantity" class="quantity" value="">
            <!-- <span class="total"></span>-->
        </div>
        <span class="total">$${item.inCart * item.price}.00</span>
        `
        });

        productContainer.innerHTML +=
            ` <div class="checkout-details">
            <div class="total-cost">
                <span>Total</span>
            </div>
            <span class="total-amount">$${cartCost}.00</span>
        </div>
        `
    }
}

onLoadCartNumbers();
displayCart();