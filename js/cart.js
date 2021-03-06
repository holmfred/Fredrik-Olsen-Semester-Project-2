import { getInCart } from "./components/cart/addedInCart.js";
import createMenu from "./components/dynamicMenu.js";

const shoeCart = getInCart()

const container = document.querySelector(".cart")

const clear = document.querySelector(".clear-storage")

container.innerHTML = "";

createMenu()

if (shoeCart.length === 0) {
    container.innerHTML = "<h3>Nothing in cart</h3>";
}

shoeCart.forEach((results) => {
    container.innerHTML += `<div class="cartItem">
                                    <img src="${results.image}" alt="${results.title}">
                                    <div class="cartItemInfo">        
                                        <h2>${results.title}</h4>
                                        <h4>${results.price}$</h4>
                                    </div>
                                </div>`;
});

clear.addEventListener("click", clearAll)

function clearAll(){
    localStorage.clear()
    container.innerHTML = `<h3>No More In Cart</h3>`
}