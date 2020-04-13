console.log('Hello World!');

var removeItem = document.getElementsByClassName('remove-item');

for (var i = 0; i < removeItem.length; i++) {
    var button = removeItem[i];
    button.addEventListener('click', function(event){
        var buttonClicked = event.target
        buttonClicked.parentElement.parentElement.remove();
    })
}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('store-container')[0];
    var cartRows = cartItemContainer.getElementsByClassName('item-description');

    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]; 
        var priceElement = cartRow.getElementsByClassName('price')[0];
        var quantityElement = cartRow.getElementsByClassName('quantity')[0];
        console.log(quantityElement, priceElement);
    }

}