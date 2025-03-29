// random news api


// ==================================================
// imports
// ==================================================
import { rapidApiKey } from "../keys/keys.mjs";


// ==================================================
// retrieve data
// ==================================================

// get 









// fetch news from apis on rapidapi.com
export async function fetchRapidApi(previouslyRun, url, host, source) {
	const options = {
		method: 'GET',
		headers: {
			'x-rapidapi-key': rapidApiKey(),
			'x-rapidapi-host': host
		}
	};
	try {
		if (!previouslyRun) {
			const response = await fetch(url, options);
			const jsonObject = await response.json();
			const jsonString = JSON.stringify(jsonObject);
			localStorage.setItem(`${source}-news`, jsonString);
			console.log('got data from api');
			console.log(jsonObject);
			return jsonObject;
		} else if (previouslyRun) {
			const jsonString = localStorage.getItem(`${source}-news`);
			const jsonObject = JSON.parse(jsonString);
			console.log('got data from local storeage');
			console.log(jsonObject);
			return jsonObject;
		}
	} catch (error) {
		console.error(error);
	}
}


// ==================================================
// format data
// ==================================================

// formats the data into usable form from random news api
export async function formatRandomNews() {

}



