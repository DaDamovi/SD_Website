// Cart
const cartIcon = document.querySelector("li.active");
const cart = document.querySelector(".cart");
const closeCart = document.querySelector("#close-cart");

// Language
let langMenu = document.querySelector(".selected-lang");
let language = document.querySelector(".languages");

// Sub-menu
let subMenuClick = document.querySelector(".smoking-accessories");
let subMenu = document.querySelector(".sub-menu");
let subMenuList = document.querySelector(".sub-menu-list")
let subMenuListItems = document.querySelector(".-sub-menu-list-items");


let product = [];
let products = [];

// Open Cart
cartIcon.onclick = () => {
    cart.classList.add("active");
};

// Close Cart
closeCart.onclick = () => {
    cart.classList.remove("active");
};

// Open/Close language menu
langMenu.onclick = () => {

    if (language.classList.contains("active")) {
        language.classList.remove("active");
    }
    else {
        language.classList.add("active");
    }
}

// Open/Close language menu
subMenuClick.onclick = () => {
    if (subMenu.classList.contains("active")) {
        subMenu.classList.remove("active");
        subMenuList.classList.remove("active");
        subMenuListItems.classList.remove("active");
    }
    else {
        subMenu.classList.add("active");
        subMenuList.classList.add("active");
        subMenuListItems.classList.remove("active");
    }
}

// Cart Working JS
if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);
} else {
    onLoadCartNumbers();
    ready();
}

// Making Function
function ready() {

    updateTotal();
    //Remove Items From Cart
    let removeCartButtons = document.getElementsByClassName("cart-remove");

    console.log(removeCartButtons)

    for (let i = 0; i < removeCartButtons.length; i++) {
        let button = removeCartButtons[i]

        button.addEventListener('click', removeCartItem)
    }

    //Quantity Changes
    let quantityInputs = document.getElementsByClassName('cart-quantity')

    for (let i = 0; i < quantityInputs.length; i++) {
        let input = quantityInputs[i]
        input.addEventListener("change", quantityChanged)
    }

    // Add To Cart
    let addCart = document.getElementsByClassName("add-cart")

    for (let i = 0; i < addCart.length; i++) {
        let button = addCart[i]
        button.addEventListener("click", addCartClicked)
    }

    // Buy Button Functionality
    document.getElementsByClassName("button-buy")[0].addEventListener("click", buyButtonClicked);

}

function buyButtonClicked () {
    window.location.href = "orderInfo_cat.html";
    let cartContent = document.getElementsByClassName("cart-content")[0];

    while (cartContent.hasChildNodes()) {
        cartContent.removeChild(cartContent.firstChild);
    }
}

// Add Cart Clicked
function addCartClicked(event) {
    let button = event.target;
    let shopProducts = button.parentElement;
    let title = shopProducts.getElementsByClassName ('product_title')[0].innerText;
    let price = shopProducts.getElementsByClassName ('price')[0].innerText;
    let productImage = shopProducts.getElementsByClassName ('product_image')[0].src;

    addProductToCart (title, price, productImage);
    updateCartNumbers();
    updateTotal();
    return;
}

function addProductToCart (title, price, productImage) {
    let cartShopBox = document.createElement ("div");
    cartShopBox.classList.add("cart-box");
    let cartItems = document.getElementsByClassName ("cart-content")[0];
    let cartItemsNames = cartItems.getElementsByClassName ("cart-product-title");
    let quantityInputs = document.getElementsByClassName('cart-quantity')

    for (let i = 0; i < cartItemsNames.length; i++) {
        if (cartItemsNames[i].innerText === title) {
            quantityInputs[i].value ++;
            updateTotal();
            product.push(title, price, productImage, +1);
            products.push(product);
            localStorage.setItem('cart', JSON.stringify(products));
            return;
        }
    }
    product.push(title, price, productImage);
    localStorage.setItem('cart', JSON.stringify(product));
    let cartBoxContent =
        `              <img src="${productImage}" alt="" class="cart-image">

                        <div class="detail_box">
                            <div class="cart-product-title">${title}</div>
                            <div class="cart-product-price">${price}</div>
                            <input type="number" value="1" class="cart-quantity">
                        </div>

                        <i class="bx bx-trash-alt cart-remove"></i>`;

    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox);
    cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener("click", removeCartItem);
    cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener("change", quantityChanged);
}

// Remove Items From Cart
function removeCartItem (event) {
    let buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updateCartNumbers();
    updateTotal();
}

// Quantity Changed
function quantityChanged (event) {
    let input = event.target

    if (isNaN (input.value) || input.value <= 0) {
        input.value = 1
    }

    updateCartNumbers();
    updateTotal ();
}

// Update Total Price
function updateTotal() {
    let cartContent = document.getElementsByClassName ('cart-content')[0];
    let cartBoxes = cartContent.getElementsByClassName ('cart-box');
    let total = 0;

    for (let i = 0; i < cartBoxes.length; i++) {
        let cartBox = cartBoxes[i];
        let priceElement = cartBox.getElementsByClassName('cart-product-price')[0];
        let quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
        let price = parseFloat(priceElement.innerText.replace("€", ""));
        let quantity = quantityElement.value;

        total = total + (price * quantity);
    }
    total = Math.round (total * 100) / 100;

    document.getElementsByClassName ("total-price")[0].innerText = total + "€";
}

function updateCartNumbers () {

    let cartNumber = document.querySelector(".cartNumber");
    let cartContent = document.getElementsByClassName ('cart-content')[0];
    let cartBoxes = cartContent.getElementsByClassName ('cart-box');

    let total = 0;

    for (let i = 0; i < cartBoxes.length; i++) {
        let cartBox = cartBoxes[i];
        let quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
        let quantity = quantityElement.value;
        total = total + (1 * quantity)
    }

    cartNumber.innerText = total;

    productNumbers = total;
    if (productNumbers) {
        localStorage.setItem("cartNumbers", productNumbers);
    }
}

function onLoadCartNumbers () {
    let productNumbers = parseInt(localStorage.getItem ("cartNumbers"));
    let productStorage = localStorage.getItem("products");

    if (productNumbers > 1) {
        document.querySelector(".cartNumber").innerText = productNumbers;
    }
    else {
        localStorage.setItem("cartNumbers", "0");
    }
}




