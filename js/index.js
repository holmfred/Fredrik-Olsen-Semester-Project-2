import { baseUrl } from "./settings/api.js";
import { latest } from "./components/latest.js";

const shoesUrl = baseUrl + "products";

async function getLatest() {

    try {
        const response = await fetch(shoesUrl);
        const results = await response.json();

        console.log(results)

        latest(results)


    } catch (error) {
        console.log(error);
    }
    

};

getLatest()