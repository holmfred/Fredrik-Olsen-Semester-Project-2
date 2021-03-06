import createMenu from "./components/dynamicMenu.js";
import { specificShoe } from "./components/spesific/getShoe.js";
import { baseUrl } from "./settings/api.js";

const queryString = document.location.search;

const parms = new URLSearchParams(queryString)

const id = parms.get("id")

const shoeUrl = baseUrl + "/products" + "/" + id

createMenu()

async function getSpecific(){

    try {
        const response = await fetch(shoeUrl);
        const results = await response.json();
        console.log(results)
        specificShoe(results)
           
        }

        catch(error){
            console.log(error);
        }

    }

getSpecific()