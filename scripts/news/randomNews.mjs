// random news api


// ==================================================
// imports
// ==================================================
import { rapidApiKey } from "../keys/keys.mjs";


// ==================================================
// retrieve data
// ==================================================

const url = 'https://real-time-news-data.p.rapidapi.com/topic-news-by-section?topic=TECHNOLOGY&section=CAQiSkNCQVNNUW9JTDIwdk1EZGpNWFlTQldWdUxVZENHZ0pKVENJT0NBUWFDZ29JTDIwdk1ETnliSFFxQ2hJSUwyMHZNRE55YkhRb0FBKi4IACoqCAoiJENCQVNGUW9JTDIwdk1EZGpNWFlTQldWdUxVZENHZ0pKVENnQVABUAE&limit=500&country=US&lang=en';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': rapidApiKey(),
		'x-rapidapi-host': 'real-time-news-data.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}

// ==================================================
// format data
// ==================================================

// formats the data into usable form from random news api
export async function formatRandomNews() {

}



