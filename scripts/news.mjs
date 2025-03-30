// random news api


// ==================================================
// imports
// ==================================================
import { rapidApiKey } from "./keys/keys.mjs";
import { capitalize } from "./utils.mjs";


// ==================================================
// global variables
// ==================================================
const newsOptions = ['varied', 'finance', 'baseball', 'basketball', 'hockey'];


// ==================================================
// data accessiblity
// ==================================================

export function getNewsOptions() {
	return newsOptions;
}


// ==================================================
// make news preference dialog
// ==================================================

// create news preference dialog
export function makeNewsPreferenceDialog() {
	let main = document.querySelector('main');
	let newsDialog = document.createElement('dialog');
	newsDialog.id = 'news-preferences';
	newsDialog.innerHTML = '<h3>What kind of news do you want to see?</h3>';
	main.appendChild(newsDialog);

	let newsForm = document.createElement('form');
	newsDialog.appendChild(newsForm);

	newsOptions.forEach(option => {
		let input = document.createElement('input');
		input.type = 'checkbox';
		input.id = option;
		input.name = option;
		input.value = option;

		let label = document.createElement('label');
		label.htmlFor = option;
		label.textContent = capitalize(option);

		let breakElement = document.createElement('br');
		newsForm.appendChild(input);
		newsForm.appendChild(label);
		newsForm.appendChild(breakElement);
	});

	let button = document.createElement('button');
	button.id = 'close-news-preferences';
	button.textContent = 'Close';
	newsForm.appendChild(button);
}


// ==================================================
// set user news preferences
// ==================================================

// get and store user news preference
export function setNewsPreferences() {
	const newsDialog = document.querySelector('#news-preferences');
	if (!localStorage.getItem('news-set')) {
		newsDialog.showModal();
		newsOptions.forEach(option => {
			localStorage.setItem(option, 'False');
			document.getElementById(option).addEventListener('change', function() {
				localStorage.setItem(option, 'True');
				localStorage.setItem('news-set', 'True');
			});
		});
		document.getElementById('close-news-preferences').addEventListener('click', function() {
			newsDialog.close();
		})
	}
}


// ==================================================
// retrieve data
// ==================================================

// get news source
export async function getNewsSource() {
	const url = "https://utahphotohunter.github.io/alarm-clock/data/newsSources.json";
	const response = await fetch(url);
	const result = await response.json();
	const news = result.news;
	console.log(news)
	return news;
}

// fetch news from api on rapidapi.com
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



