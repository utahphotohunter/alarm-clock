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
// user news preferences
// ==================================================

// get and store user news preference
export function setNewsPreferences() {
	const newsDialog = document.querySelector('#news-preferences');
	if (!localStorage.getItem('news-set')) {
		
		newsDialog.showModal();
		newsOptions.forEach(option => {
			let info = `{"name":"${option}","preferred":"False","accessedToday":"False","newsArticle1":"pending","newsArticle2":"pending","newsArticle3":"pending","newsArticle4":"pending","newsArticle5":"pending"}`;
			localStorage.setItem(option, info);
			let counter = 0;
			document.getElementById(option).addEventListener('change', function() {
				counter = counter + 1;
				if ((counter % 2) != 0) {
					info = `{"name":"${option}","preferred":"True","accessedToday":"False","newsArticle1":"pending","newsArticle2":"pending","newsArticle3":"pending","newsArticle4":"pending","newsArticle5":"pending"}`;
					localStorage.setItem(option, info);
				} else {
					info = `{"name":"${option}","preferred":"False","accessedToday":"False","newsArticle1":"pending","newsArticle2":"pending","newsArticle3":"pending","newsArticle4":"pending","newsArticle5":"pending"}`;
					localStorage.setItem(option, info);
				}
				localStorage.setItem('news-set', 'True');
			});
		});
		document.getElementById('close-news-preferences').addEventListener('click', function() {
			newsDialog.close();
		})
	}
}

// get number of news preferrences
function getPreferredSources() {
	let preferredSources = []
	newsOptions.forEach(option => {
		let dataString = localStorage.getItem(option);
		let dataJson = JSON.parse(dataString);
		if (dataJson.preferred == 'True') {
			preferredSources.push(option);
		}
	});
	return preferredSources;
}


// ==================================================
// reset api lockout
// ==================================================

// reset api lockout
export function resetApiLockout() {
	newsOptions.forEach(option => {
		let storedInfo = localStorage.getItem(option);
		let storedInfoJson = JSON.parse(storedInfo);
		storedInfoJson.accessedToday = 'False';
		let storedInfoString = JSON.stringify(storedInfoJson);
		localStorage.setItem(option, storedInfoString);
	});
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
			const newsArticleJson = await response.json();
			const newsArticleString = JSON.stringify(newsArticleJson);

			let storedData = localStorage.getItem(source);

			let storedDataJson = JSON.parse(storedData);
			storedDataJson.news = newsArticleString;
			let storedDataString = JSON.stringify(storedDataJson);

			localStorage.setItem(source, storedDataString);
			console.log('got data from api');
			console.log(newsArticleString);
			console.log(newsArticleJson);
		} else if (previouslyRun) {
			const storedDataString = localStorage.getItem(source);
			const storedDataJson = JSON.parse(storedDataString);
			console.log('got data from local storeage');
			console.log(storedDataString);
			console.log(storedDataJson)
		}
	} catch (error) {
		console.error(error);
	}
}


// ==================================================
// format data
// ==================================================

// formats the data into usable form from random news api
export function formatRandomNews() {
	let preferredSources = getPreferredSources()
	if (preferredSources.length == 1) {
		console.log(preferredSources[0]);
	} else {
		preferredSources.forEach(source => {
			
		});



	}




}



