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
}

function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove();
    updateCartTotal();
}

function quantityChanged (event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
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