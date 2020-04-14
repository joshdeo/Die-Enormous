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

        var addToCartButtons = document.getElementsByClassName('add-item')
        for (var i = 0; i < addToCartButtons.length; i++) {
            var button = addToCartButtons[i]
            button.addEventListener('click', addToCartClicked);
        }

        document.getElementsByClassName('checkout')[0].addEventListener('click', purchaseClicked)
    }

    function purchaseClicked() {
        alert('Thank you for your purchase');
        var cartItems = document.getElementsByClassName('product-details') //CHANGE THIS TO item-description after || 'product-details'
        while(cartItems.hasChildNodes()) {
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
        /*for (var i = 0; i < cartItemNames.length; i++) {                     // Item cannot be re-added
            if (cartItemNames[i].innerText == title) {
                alert(`Item already added to the cart`)
                return
            }
        }*/
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
        cartRow.getElementsByClassName('quantity')[0].addEventListener('change', quantityChanged)


        var set = localStorage.setItem('cartItems', cartRow);
        var get = localStorage.getItem('product-details');
        
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