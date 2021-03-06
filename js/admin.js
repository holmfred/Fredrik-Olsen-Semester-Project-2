import displayMessage from "./components/displayMessage.js";
import createMenu from "./components/dynamicMenu.js";
import { baseUrl } from "./settings/api.js";
import { getToken } from "./utils/storage.js";

createMenu();

const form = document.querySelector("form");
const title = document.querySelector("#title");
const price = document.querySelector("#price");
const description = document.querySelector("#description");
const image = document.querySelector("#image");
const message = document.querySelector(".message-container");
const featured = document.querySelector("#featured")

form.addEventListener("submit", submitForm);

function submitForm(event) {
    event.preventDefault();
    
    message.innerHTML = "";

    const titleValue = title.value.trim();
    const priceValue = parseFloat(price.value);
    const descriptionValue = description.value.trim();
    const imageValue = image.files[0].name;
    const featuredValue = featured.options[featured.selectedIndex].value;

    if(titleValue.length < 5 || priceValue.length < 2 || descriptionValue.length < 20) {
        return displayMessage("warning", "Please Add Valid Values", ".message-container" )
    }

    if(featuredValue === "True") {
        addNewShoe(titleValue, priceValue, descriptionValue, featuredValue, imageValue);
    }

    if(featuredValue === "False") {
        addNewShoe(titleValue, priceValue, descriptionValue, featuredValue, imageValue);
    }
}

async function addNewShoe(title, price, description, featured, image) {
    const url = baseUrl + "/products";

    const data = JSON.stringify({ title: title, price: price, description: description, featured: featured, image_url: image, image: 1});

    const token = getToken();

    const options = {
        method: "POST",
        body: data,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
    };

    try {
        const response = await fetch(url, options)
        const json = await response.json();

        if(json.created_at) {
            displayMessage("success", "Product Added", ".message-container" )
            form.reset();
        }

    }
    catch(error) {
        console.log(error);
        displayMessage("error", "An Error Occured", ".message-container")
    }
}

