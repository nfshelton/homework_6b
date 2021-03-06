if (document.readyState == "loading") {
	document.addEventListener("DOMContentLoaded", ready)
} else {
	ready()
}
function ready() {
	//removing item from the cart
	var removeCartItemButtons = document.getElementsByClassName("remove-button");
	for (var i = 0; i < removeCartItemButtons.length; i++) {
		var button = removeCartItemButtons[i];
		button.addEventListener("click", removeCartItem);
	}
	//
	var quantityInputs = document.getElementsByClassName("cart-quantity-input");
	for (var i = 0; i < quantityInputs.length; i++) {
		var input = quantityInputs[i];
		input.addEventListener("change", quantityChanged)
	}
	//noting that the "add to cart" button has been pushed and calling different functions
	var addToCartButtons = document.getElementsByClassName("shop-item-button");
		var noti = parseFloat(document.getElementsByClassName("dot")[0].innerText);
		for (var i = 0; i < addToCartButtons.length; i++) {
			var button = addToCartButtons[i];
			var button2 = addToCartButtons[i];
			button.addEventListener("click", addToCartClicked);
			button2.addEventListener("click", addNotification);
		}
	updateCartNoti();
}

//notification popping up when pressing "Add to Cart" button
var n = 0;


var notification = 0
function addNotification(event) {

	n = n + 1;
	document.getElementsByClassName("dot")[0].innerText = n;
	notification = document.getElementsByClassName("dot")[0].innerText;
	localStorage.setItem("noti", notification);

}
function updateCartNoti() {
	var noti = localStorage.getItem("noti");

	if (noti != null) {
		document.getElementsByClassName("dot")[0].innerText = noti;
	}
	else {
		noti = 0;
		document.getElementsByClassName("dot")[0].innerText = noti;
	}
}
//removing item from the cart when pressing button remove
function removeCartItem(event) {
	var buttonClicked = event.target;
	buttonClicked.parentElement.parentElement.remove();
	updateCartTotal()
}
//noting that the quanity has been changed
function quantityChanged(event){
	var input = event.target;
	if (isNaN(input.value) || input.value <= 0) {
		input.value = 1;
	}
	updateCartTotal();
}
//adding Item to the cart pt.1
function addItemToCart(title, price, imageSrc) {

	var titles = JSON.parse(localStorage.getItem("titles"));
	var prices = JSON.parse(localStorage.getItem("prices"));
	var imageSrcs = JSON.parse(localStorage.getItem("imageSrcs"));
	if (titles == undefined || titles == null){
		titles = [];
	}
	if (prices == undefined || prices == null){
		prices = [];
	}
	if (imageSrcs == undefined || imageSrcs == null){
		imageSrcs = [];
	}
	titles.push(title);
	prices.push(price);
	imageSrcs.push(imageSrc);

	localStorage.setItem("titles", JSON.stringify(titles));
	localStorage.setItem("prices", JSON.stringify(prices));
	localStorage.setItem("imageSrcs", JSON.stringify(imageSrcs));

	//var cartRow = document.createElement('div');
	//cartRow.innerText = title;
	//var cartItems = document.getElementsByClassName("cart-items")[0];
	//var cartContents = document.getElementsByClassName("cart-contents")[0];
	//console.log(document.getElementsByClassName("cart-contents")[0]);
	//console.log("HERE I AM cart items:", cartItems, "CART CONTENTS:", cartContents);
	//cartItems.append(cartRow);
	//console.log("yeah yeah i got here")

}
function loadCart(){
	addItemToCart();
	var cartDiv = document.getElementsByClassName("cart-contents")[0];
//	console.log(document.getElementsByClassName("cart-contents")[0]);
	//console.log("HERE I AM cart items:", cartItems, "CART CONTENTS:", cartContents);
	
	//cartItems.append(cartRow);
	var titles = JSON.parse(localStorage.getItem("titles"));
	var prices = JSON.parse(localStorage.getItem("prices"));
	var imageSrcs = JSON.parse(localStorage.getItem("imageSrcs"));
	if (titles == undefined || titles == null){
		titles = [];
	}
	if (prices == undefined || prices == null){
		prices = [];
	}
	if (imageSrcs == undefined || imageSrcs == null){
		imageSrcs = [];
	}
	for (let i = 0; i < titles.length; i++) {
		var cartRow = document.createElement('div');
		cartRow.innerText = titles[i];
		cartDiv.append(cartRow);
	}
	for (let i = 0; i < prices.length; i++) {
		var cartRow = document.createElement('div');
		cartRow.innerText = prices[i];
		cartDiv.append(cartRow);
	}
	for (let i = 0; i < imageSrcs.length; i++) {
		var cartRow = document.createElement('div');
		cartRow.innerText = titles[i];
		cartDiv.append(cartRow);
	}
	console.log(titles)
	var cartRowContents = `
			<div class="item-column">
				<h3>Item</h3>
			</div>
			<img class="image-of-pillow" src="images/item.jpg" alt="pillow choice in cart">
			<div class="item-column">
				<h3 class="item-title">Accented Green Pillow</h3>
				<div class="inner-txt">
					<p id="details-underline">Details</p>
					<select class="size-option" name="size" id="size" value="--size--">
						<option value="standard">Standard</option>
						<option value="large">Large</option>
						<option value="xL">Extra Large</option>
					</select>
					<select class="pillow stuffing" name="pillow-stuffing" id="pillow-stuffing" value="--pillow stuffing--">
						<option value="duck-down">Duck Down</option>
						<option value="hypoallergenic">Hypoallergenic poly-blend</option>
						<option value="memory-foam">Memory Foam</option>
					</select>
					<select class="pillow-color" name="pillow-color" id="pillow-color" value="--color--">
						<option value="after-school-special">After School Special</option>
						<option value="morning-haze">Morning Haze</option>
						<option value="cozy-denim">Cozy Denim</option>
						<option value="rainy-day">Rainy Day</option>
				</select>
				</div>
			</div>
			<div class="item-column">
				<h3>Quantity</h3>
				<input class="cart-quantity-input" type="number" value="1">
			</div>
			<div class="item-column">
				<div class="price-pt">
					<h3>Price</h3>
					<p class="cart-price">$112</p>
				</div>
				<button class="remove-button" type="button">REMOVE</button>
			</div>`
	cartRow.innerHTML = cartRowContents;
//	cartRow.setAttribute("class","item-title");
//	console.log(cartRow.setAttribute("class","item-title"))
	
	//cartRow.setAttribute one is a parameter/value , class should be key and the value is whatever class in 
	// css code u want it to be image.setAttribute then it would use that style
}
//adding Item to the cart pt.2 
function addToCartClicked(event) {
	var button = event.target;
	var shopItem = button.parentElement.parentElement;
	var title = shopItem.getElementsByClassName("shop-item-title")[0].innerText;
	var price = shopItem.getElementsByClassName("shop-item-price")[0].innerText;
	var imageSrc = shopItem.getElementsByClassName("shop-item-image")[0].src;
	console.log(title, price, imageSrc);
	addItemToCart(title, price, imageSrc);
}

//updating the cart total when item quantity is changed
function updateCartTotal(){
	var cartItemContainer = document.getElementsByClassName("cart-contents")[0];
	var cartRows = cartItemContainer.getElementsByClassName("first-cart-row");
	var total = 0;
	for (var i = 0; i < cartRows.length; i++) {
		var cartRow = cartRows[i];
		var priceElement = cartRow.getElementsByClassName("cart-price")[0];
		var quantityElement = cartRow.getElementsByClassName("cart-quantity-input")[0];
		var price = parseFloat(priceElement.innerText.replace("$",""));
		var quantity = quantityElement.value;
		total = total + (price * quantity);
	}
	total = Math.round(total * 100) / 100;
	document.getElementsByClassName("cart-total-price")[0].innerText = "$" + total;
}
