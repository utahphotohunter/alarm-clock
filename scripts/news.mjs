// random news api


// ==================================================
// imports
// ==================================================
import { rapidApiKey } from "./keys/keys.mjs";
import { capitalize, getRandomIndex } from "./utils.mjs";


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
			let info = `{"name":"${option}","preferred":"False","accessedToday":"False","news":"pending"}`;
			localStorage.setItem(option, info);
			let counter = 0;
			document.getElementById(option).addEventListener('change', function() {
				counter = counter + 1;
				if ((counter % 2) != 0) {
					info = `{"name":"${option}","preferred":"True","accessedToday":"False","news":"pending"}`;
					localStorage.setItem(option, info);
				} else {
					info = `{"name":"${option}","preferred":"False","accessedToday":"False","news":"pending"}`;
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
		if (previouslyRun == 'False') {
			// const response = await fetch(url, options); // fetch data from api
			const response = await fetch(url); // temp line for testing
			const newsArticleJson = await response.json(); // make data into json
			const newsArticleString = JSON.stringify(newsArticleJson); // make json string

			let storedData = localStorage.getItem(source); // get local storage for news source
			let storedDataJson = JSON.parse(storedData); // turn local storeage string into json
			storedDataJson.accessedToday = 'True'; // sets accessedToday to True
			storedDataJson.news = newsArticleString; // edit stored json to update news element
			let storedDataString = JSON.stringify(storedDataJson); // turn edited json into string
			localStorage.setItem(source, storedDataString); // store new json string in local storage
			
			return newsArticleJson; // return json news element

		} else if (previouslyRun == 'True') {
			const storedDataString = localStorage.getItem(source); // get local storage for news source
			// console.log(storedDataString);
			const storedDataJson = JSON.parse(storedDataString); // turn local storage string into json
			const storedNews = JSON.parse(storedDataJson.news); // turn news string element from local storage json object into json

			return storedNews; // return parsed news element from local storage
		}
	} catch (error) {
		console.error(error);
	}
}


// ==================================================
// format data
// ==================================================

// selects the nubmer of articles to show based on news preferrences
async function articleQty(source, articles) {
	let preferredSources = getPreferredSources();
	let count = 0;
	let selectedNews = []
	if ((preferredSources.length == 1) && preferredSources.includes(source)) {
		while (count < 5) {
			count = count + 1;
			let index = await getRandomIndex(articles);
			let article = articles[index];
			selectedNews.push(article);
		}
		return selectedNews;
	} else if (preferredSources.includes(source)) {
		while (count < 3) {
			count = count + 1;
			let index = await getRandomIndex(articles);
			let article = articles[index];
			selectedNews.push(article);
		}
		return selectedNews;
	}
}

// displays news and provides photo to news article if none is present in news source
async function displayNews(selectedNews, photoUrl) {
	let news = await selectedNews;
	console.log(news);
	let count = 1;
	news.forEach(item => {
		let title = item[0];
		let link = item[1];
		let photo;
		if (item[2]) {
			photo = item[2];
		} else if (!item[2]) {
			photo = photoUrl;
		}
		count = count + 1;


		// code to create elements and populate them with news

	});
}

// formats the data into usable form if news source is the 'baseball' option
export async function formatBaseballNews(json) {
	let news = await json;
	let articles = news.body;
	const selectedNews = await articleQty('baseball', articles);

	let formattedNews = [];
	selectedNews.forEach(selection => {
		let title = selection.title;
		let link = selection.link;
		let photoUrl = selection.image;
		let articleInfo = [title, link, photoUrl];
		formattedNews.push(articleInfo);
	});
	displayNews(formattedNews, "https://utahphotohunter.github.io/alarm-clock/data/images/baseball.jpg");
}

// formats the data into usable form if news source is the 'varied' option
export async function formatVariedNews(json) {
	let news = await json;
	let articles = news.data;
	const selectedNews = await articleQty('varied', articles);
	let formattedNews = [];
	selectedNews.forEach(selection => {
		let title = selection.title;
		let link = selection.link;
		let photoUrl = selection.photo_url;
		let articleInfo = [title, link, photoUrl];
		formattedNews.push(articleInfo);
	});
	displayNews(formattedNews, "https://utahphotohunter.github.io/alarm-clock/data/images/varied.jpg");
}

// formats the data into usable form if news source is the 'varied' option
export async function formatBasketBallNews(json) {
	let news = await json;
	let articles = news;
	const selectedNews = await articleQty('basketball', articles);
	let formattedNews = [];
	selectedNews.forEach(selection => {
		let title = selection.title;
		let link = selection.url;
		let photoUrl = selection.photo_url;
		let articleInfo = [title, link, photoUrl];
		formattedNews.push(articleInfo);
	});
	displayNews(formattedNews, 'https://utahphotohunter.github.io/alarm-clock/data/images/basketball.jpg');
}

// formats the data into usable form if news source is the 'finance' option
export async function formatFinanceNews(json) {
	let news = await json;
	let articles = news.news;
	const selectedNews = await articleQty('finance', articles);
	let formattedNews = [];
	selectedNews.forEach(selection => {
		let title = selection.title;
		let link = selection.link;
		let photoUrl;
		if (selection.thumbnail) {
			photoUrl = selection.thumbnail.resolutions[0].url;
		} else if (!selection.thumbnail) {
			photoUrl = "https://utahphotohunter.github.io/alarm-clock/data/images/finance.jpg";
		}
		let articleInfo = [title, link, photoUrl];
		formattedNews.push(articleInfo);
	});
	displayNews(formattedNews, 'https://utahphotohunter.github.io/alarm-clock/data/images/finance.jpg');
}

// formats the data into usable form if news source is the 'hockey' option
export async function formatHockeyNews(json) {
	let news = await json;
	let articles = news.body;
	const selectedNews = await articleQty('hockey', articles);
	let formattedNews = [];
	selectedNews.forEach(selection => {
		let title = selection.title;
		let link = selection.link;
		let photoUrl = "https://utahphotohunter.github.io/alarm-clock/data/images/hockey.jpg";
		let articleInfo = [title, link, photoUrl];
		formattedNews.push(articleInfo);
	});
	displayNews(formattedNews, 'https://utahphotohunter.github.io/alarm-clock/data/images/hockey.jpg');

}