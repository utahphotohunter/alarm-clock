// random news api


// ==================================================
// imports
// ==================================================
import { rapidApiKey } from './keys/keys.mjs';
import { capitalize, getRandomIndex, shortenText } from './utils.mjs';


// ==================================================
// global variables
// ==================================================

// create array of the news options
// -- update this if another news option is added
const newsOptions = ['varied', 'finance', 'baseball', 'basketball', 'hockey']; 


// ==================================================
// data accessiblity
// ==================================================

// allows other scripts to access the 'newsOptions' array
export function getNewsOptions() {
	return newsOptions; // return array of news options
}


// ==================================================
// make news preference dialog
// ==================================================

// create news preference dialog
export function makeNewsPreferenceDialog() {
	let main = document.querySelector('main'); // select the 'main' html element

	let newsDialog = document.createElement('dialog'); // create a dialog element
	newsDialog.id = 'news-preferrences'; // give dialog element id of 'news-preferrences'
	newsDialog.innerHTML = '<h3>What kind of news do you want to see?</h3>'; // add h3 element into dialog
	main.appendChild(newsDialog); // add the dialog element to the end of the main element

	let newsForm = document.createElement('form'); // create a form html element
	newsDialog.appendChild(newsForm); // add form to dialog element

	// for each option in the 'newsOption' array
	newsOptions.forEach(option => {
		let input = document.createElement('input'); // create an input html element
		input.type = 'checkbox'; // make the input type a checkbox
		input.id = option; // set the input id as the current option
		input.name = option; // set the input name as the current option
		input.value = option; // set the input value as the current option

		let label = document.createElement('label'); // create a label html element
		label.htmlFor = option; // set the label for attribute as the current option
		label.textContent = capitalize(option); // set the text content as the current option with, but with first letter capitalized

		let breakElement = document.createElement('br'); // create an hmtl break element
		newsForm.appendChild(input); // add input to the end of the form
		newsForm.appendChild(label); // add label element to the end of the form
		newsForm.appendChild(breakElement); // add the break element to the end of the form
	});

	let button = document.createElement('button'); // create a button 
	button.id = 'close-news-preferrences'; // give the button an id of 'close-news-preferrences'
	button.textContent = 'Close'; // set the text content of the button to "close"
	newsForm.appendChild(button); // add the button to the end of the form after all the input options have been added
}


// ==================================================
// user news preferences
// ==================================================

// get and store user news preference
export function setInitialNewsPreferences() {
	const newsDialog = document.querySelector('#news-preferrences'); // select the news dialog 

	// check if the 'news-set' item in local storage exists or is set to "false"
	if (!localStorage.getItem('news-set')) {
		newsDialog.showModal(); // show the news dialog as a modal

		// for each option in the news options array
		newsOptions.forEach(option => {
			let info = `{"name":"${option}","preferred":"False","accessedToday":"False","news":"pending"}`; // set a string of info formatted in json
			localStorage.setItem(option, info); // make a local storage item and store the string info in it
			let counter = 0; // set counter variable to 0

			// listen for any change in the html input element for each option
			document.getElementById(option).addEventListener('change', function() {
				counter = counter + 1; // increase the counter by 1

				// check if current count number is odd
				if ((counter % 2) != 0) {
					info = `{"name":"${option}","preferred":"True","accessedToday":"False","news":"pending"}`; // set preferred status to "True"
					localStorage.setItem(option, info); // store updated info string into the current option's local storage

					// check if current count number is even
				} else {
					info = `{"name":"${option}","preferred":"False","accessedToday":"False","news":"pending"}`; // leave preferred status as "Fasle"
					localStorage.setItem(option, info); // store the info string into the current option's local storage
				}
				localStorage.setItem('news-set', 'True'); // set the 'news-set' local storage item to "True"
			});
		});

		// button response for close button in news dialog
		document.getElementById('close-news-preferrences').addEventListener('click', function() {
			newsDialog.close(); // close the news dialog
		});
	}
}

// edit news preferrences after inially set
export function editNewsPreferrences() {
	const newsDialog = document.querySelector('#news-preferrences'); // get the news dialog html element
	newsDialog.showModal(); // show the news dialog as a modal

	// for each option in the options array
	newsOptions.forEach(option => {
		let info = localStorage.getItem(option); // get the current option's local storage item
		let infoJson = JSON.parse(info); // parse the stored string info into a json object
		infoJson.preferred = 'False'; // update the 'preferred' item to "False"
		let counter = 0; // set a counter at 0

		// listen for a change in each html input element for each option
		document.getElementById(option).addEventListener('change', function() {
			counter = counter + 1; // increase counter by 1

			// check if current count is odd
			if ((counter % 2) != 0) {
				infoJson.preferred = 'True'; // set current option's 'preferred' item to "True"
				infoStr = JSON.stringify(infoJson); // turn json into string
				localStorage.setItem(option, infoStr); // store string in the current option's local storage

				// check if current count is even
			} else {
				infoJson.preferred = 'False'; // set current option's 'preferred' item to "False"
				infoStr = JSON.stringify(infoJson); // turn json into string
				localStorage.setItem(option, infoStr); // store string in the current option's local storage
			}
		});
		let infoStr = JSON.stringify(infoJson); // turn info json into string
		localStorage.setItem(option, infoStr); // store string in the current option's local storage
	});

	// close button response
	document.getElementById('close-news-preferrences').addEventListener('click', function() {
		let preferred = getPreferredSources(); // get the preferred news sources in an array

		// check if array has nothing in it
		if (preferred.length === 0) {
			let variedInfo = localStorage.getItem('varied'); // get the 'varied' news option from local storage
			let variedInfoJson = JSON.parse(variedInfo); // turn 'varied' info into json object
			variedInfoJson.preferred = 'True'; // change 'preferred' item value to "True"
			let variedInfoStr = JSON.stringify(variedInfoJson); // parse updated json object into string
			localStorage.setItem('varied', variedInfoStr); // store the new string in the 'varied' local storage
			alert('Not selecting a preferred type of news means you will receive a varity of news stories.'); // trigger an alert informing user of preferrence change
		}
		newsDialog.close(); // close the news dialog
	});
}

// get number of news preferrences
function getPreferredSources() {
	let preferredSources = [] // make an array to house preferred news sources

	// for each optoin in news options array
	newsOptions.forEach(option => {
		let dataString = localStorage.getItem(option); // get each optoin's local storage info string
		let dataJson = JSON.parse(dataString); // turn info string into json object

		// check if 'preferred' item's value is "True"
		if (dataJson.preferred == 'True') {
			preferredSources.push(option); // add option to 'preferredsources' array
		}
	});
	return preferredSources; // return 'preferredSoureces' array
}


// ==================================================
// reset api lockout
// ==================================================

// reset api lockout
export function resetApiLockout() {

	// for each option in the 'newsOptions' array
	newsOptions.forEach(option => {
		let storedInfo = localStorage.getItem(option); // get the info string from current option's local storage
		let storedInfoJson = JSON.parse(storedInfo); // turn info string into json object
		storedInfoJson.accessedToday = 'False'; // set current option's 'preferred' item value to "False"
		let storedInfoString = JSON.stringify(storedInfoJson); // turn updated json object into string
		localStorage.setItem(option, storedInfoString); // store string in the current option's local storage
	});
}


// ==================================================
// retrieve data
// ==================================================

// get news source
export async function getNewsSource() {
	const url = 'https://utahphotohunter.github.io/alarm-clock/data/newsSources.json'; // set the url for the news sources info
	const response = await fetch(url); // wait for the news source info to be delivered
	const result = await response.json(); // parse delivered info into json object
	const news = result.news; // get the news array from json object
	return news; // return news array
}

// fetch news from api on rapidapi.com
export async function fetchRapidApi(previouslyRun, url, host, source) {

	// create json object of header options for server api request formatted as Rapid ApI requires
	const options = {
		method: 'GET',
		headers: {
			'x-rapidapi-key': rapidApiKey(), // retrieve and provide protected api key 
			'x-rapidapi-host': host
		}
	};

	// check if 'previouslyRun' is "False"
	if (previouslyRun == 'False') {
		const response = await fetch(url); // wait for api response data to be delivered
		const newsArticleJson = await response.json(); // parse data into json object
		const newsArticleString = JSON.stringify(newsArticleJson); // turn data response json object into string

		let storedData = localStorage.getItem(source); // get stringified json data from source's local storage and store as 'storedData'
		let storedDataJson = JSON.parse(storedData); // parse stringified json from 'storedData' into json object
		storedDataJson.accessedToday = 'True'; // set 'storedData' item 'accessedToday' to "True"
		storedDataJson.news = newsArticleString; // update 'storedData' 'news' item to a stringed version of the updated api response json object
		let storedDataString = JSON.stringify(storedDataJson); // turn updated 'storedData' into a string formatted as json
		localStorage.setItem(source, storedDataString); // store new json string in the local storage of the news source
		return newsArticleJson; // return delivered api json data

		// check if 'previouslyRun' equals "True"
	} else if (previouslyRun == 'True') {
		const storedDataString = localStorage.getItem(source); // get local storage info string for the news option
		const storedDataJson = JSON.parse(storedDataString); // parse the stored info string into json object
		const storedNews = JSON.parse(storedDataJson.news); // take the 'news' item string from the json info and parse it into a json object as 'storedNews'

		return storedNews; // return parsed news in 'storedNews'
	}
}


// ==================================================
// format data
// ==================================================

// selects the nubmer of articles to show based on news preferrences
async function articleQty(source, articles) {
	let preferredSources = getPreferredSources(); // get the preferred news sources array as 'preferredSources'
	let count = 0; // start a counter at 0
	let selectedNews = [] // delcare 'selectedNews' array to keep track of what articles have already been chosen

	// check if 'preferredSources' has only 1 item and that it's the provided source
	if ((preferredSources.length == 1) && preferredSources.includes(source)) {

		// while 'selectedNews' array has less than 5 items in it
		while (selectedNews.length < 5) {
			count = count + 1; // increase counter by 1
			let index = await getRandomIndex(articles); // wait for a random index to be delivered from the provided articles array
			let article = articles[index]; // select the article at the randomly chosen index of the articles array

			// check if the selected article has not previously been selected
			if (!selectedNews.includes(article)) {
				selectedNews.push(article); // add the article to 'seletedNews'
			}
		}
		return selectedNews; // return the filled in 'selectedNews' array

		// check the provided source is in the 'preferredSources' array
	} else if (preferredSources.includes(source)) {

		// while 'selectedNews' array has less than 3 items in it
		while (selectedNews.length < 3) {
			count = count + 1; // increase counter by 1
			let index = await getRandomIndex(articles); // wait for a random index to be delivered from the provided articles array
			let article = articles[index]; // select the article at the randomly chosen index of the articles array

			// check if the selected article has not previously been selected
			if (!selectedNews.includes(article)) {
				selectedNews.push(article); // add the article to 'seletedNews'
			}
		}
		return selectedNews; // return the filled in 'selectedNews' array
	}
}

// displays news and provides photo to news article if none is present in news source
async function displayNews(selectedNews, photoUrl) {
	let news = await selectedNews; // wait for the selected news array to be delivered as 'news'
	let count = 1; // start a counter at 1
	const newsBody = document.getElementById('articles'); // select the html section element with id of "articles" as 'newsBody'

	// for each item in 'news' array
	news.forEach(item => {
		let initialTitle = item[0]; // store the obejct at index 0 of the current item as 'initialTitle'
		let title = shortenText(initialTitle); // shorten the string of 'initialTitle' to 7 words and store as 'title'
		let link = item[1]; // store the object at index 1 of the current item as 'link'
		let photo; // declare 'photo' for future use

		// check if there is an object at index 2 of current item
		if (item[2]) {
			photo = item[2]; // set 'photo' to index 2 of current item

			// check if there is not an object at index 2 of current item
		} else if (!item[2]) {
			photo = photoUrl; // set 'photo' to the provided backup 'photoUrl'
		}
		count = count + 1; // increase count by 1

		const article = document.createElement('article'); // create an <article> html element as 'article'
		article.classList.add('news'); // add class "news" to 'article'
		newsBody.appendChild(article); // add 'article' to end of 'newsBody'
		const redirect = document.createElement('a'); // create an <a> html element as 'redirect'
		redirect.setAttribute('href', link); // set the 'redirect' "href" attribute to 'link'
		redirect.setAttribute('target', '_blank'); // set the 'redirect' "target" attribute to "_blank" to load in new tab
		article.appendChild(redirect); // add 'redirect' to end of 'article'
		const image = document.createElement('img'); // create <img> html element as 'image' to store larger dimension image for large screens
		image.setAttribute('src', photo); // set "src" attriubte of 'image' to 'photo'
		image.setAttribute('alt', title); // set "alt" attribute of 'image' to 'title'
		image.classList.add('large-image'); // add class of "large-image" to 'image'
		redirect.appendChild(image); // add 'image' to end of 'redirect'
		const mobileImage = document.createElement('img'); // create <img> html element as 'mobileImage' to store smaller dimension image for mobile screens
		mobileImage.setAttribute('src', photo); // set "src" attriubte of 'mobileImage' to 'photo'
		mobileImage.setAttribute('alt', title); // set "alt" attribute of 'mobileImage' to 'title'
		mobileImage.classList.add('mobile-image'); // add class of "large-image" to 'mobileImage'
		redirect.appendChild(mobileImage); // add 'mobileImage' to end of 'redirect'
		
		const articleName = document.createElement('h4'); // create <h4> html element as 'articleName'
		articleName.textContent = title; // set the text content of 'articleName' to 'title'
		redirect.appendChild(articleName); // add 'articleName' to end of 'redirect'
	});
}

// formats the data into usable form if news source is the 'baseball' option
export async function formatBaseballNews(json) {

	// check if preferred sources array includes "baseball"
	if (getPreferredSources().includes('baseball')) {
		let news = await json; // wait for baseball news to be delivered
		let articles = news.body; // get just the news articles from the delivered data
		const selectedNews = await articleQty('baseball', articles); // wait for the right number of news articles to be delivered as 'selectedNews'
		let formattedNews = []; // declare empty array for future use as 'formattedNews'

		// for each selection in 'selectedNews'
		selectedNews.forEach(selection => {
			let title = selection.title; // store the current selections "title" item as 'title'
			let link = selection.link; // store the current selections "link" item as 'link'
			let photoUrl = selection.image; // store the current selections "image" item as 'photoUrl'
			let articleInfo = [title, link, photoUrl]; // create an array called 'articleInfo' that stores 'title', 'link', and 'photoUrl'
			formattedNews.push(articleInfo); // add the 'articleInfo' array as an item to the end of 'formattedNews'
		});
		displayNews(formattedNews, 'https://utahphotohunter.github.io/alarm-clock/data/images/baseball.webp'); // display the chosen news on the articles.html page
	}
}

// formats the data into usable form if news source is the 'varied' option
export async function formatVariedNews(json) {

	// check if preferred sources array includes "varied"
	if (getPreferredSources().includes('varied')) {
		let news = await json; // wait for varied news to be delivered
		let articles = news.data; // get just the news articles from the delivered data
		const selectedNews = await articleQty('varied', articles); // wait for the right number of news articles to be delivered as 'selectedNews'
		let formattedNews = []; // declare empty array for future use as 'formattedNews'

		// for each selection in 'selectedNews'
		selectedNews.forEach(selection => {
			let title = selection.title; // store the current selections "title" item as 'title'
			let link = selection.link; // store the current selections "link" item as 'link'
			let photoUrl = selection.photo_url; // store the current selections "photo_url" item as 'photoUrl'
			let articleInfo = [title, link, photoUrl]; // create an array called 'articleInfo' that stores 'title', 'link', and 'photoUrl'
			formattedNews.push(articleInfo); // add the 'articleInfo' array as an item to the end of 'formattedNews'
		});
		displayNews(formattedNews, 'https://utahphotohunter.github.io/alarm-clock/data/images/varied.webp'); // display the chosen news on the articles.html page
	}
}

// formats the data into usable form if news source is the 'varied' option
export async function formatBasketBallNews(json) {

	// check if preferred sources array includes "basketball"
	if (getPreferredSources().includes('basketball')) {
		let news = await json; // wait for varied news to be delivered
		let articles = news; // get just the news articles from the delivered data
		const selectedNews = await articleQty('basketball', articles); // wait for the right number of news articles to be delivered as 'selectedNews'
		let formattedNews = []; // declare empty array for future use as 'formattedNews'

		// for each selection in 'selectedNews'
		selectedNews.forEach(selection => {
			let title = selection.title; // store the current selections "title" item as 'title'
			let link = selection.url; // store the current selections "url" item as 'link'
			let photoUrl = selection.photo_url; // store the current selections "photo_url" item as 'photoUrl'
			let articleInfo = [title, link, photoUrl]; // create an array called 'articleInfo' that stores 'title', 'link', and 'photoUrl'
			formattedNews.push(articleInfo); // add the 'articleInfo' array as an item to the end of 'formattedNews'
		});
		displayNews(formattedNews, 'https://utahphotohunter.github.io/alarm-clock/data/images/basketball.webp'); // display the chosen news on the articles.html page
	}
}

// formats the data into usable form if news source is the 'finance' option
export async function formatFinanceNews(json) {

	// check if preferred sources array includes "finance"
	if (getPreferredSources().includes('finance')) {
		let news = await json; // wait for varied news to be delivered
		let articles = news.news; // get just the news articles from the delivered data
		const selectedNews = await articleQty('finance', articles); // wait for the right number of news articles to be delivered as 'selectedNews'
		let formattedNews = []; // declare empty array for future use as 'formattedNews'

		// for each selection in 'selectedNews'
		selectedNews.forEach(selection => {
			let title = selection.title; // store the current selections "title" item as 'title'
			let link = selection.link; // store the current selections "link" item as 'link'
			let photoUrl; // declare 'photoUrl' for future use

			// check if there is a "thumbnail" object in the current selection
			if (selection.thumbnail) {
				photoUrl = selection.thumbnail.resolutions[0].url; // set 'photoUrl' to "thumbnail" object's "url" item

				// check if there is not a "thumbnail" object in the current selection
			} else if (!selection.thumbnail) {
				photoUrl = 'https://utahphotohunter.github.io/alarm-clock/data/images/finance.webp'; // set 'photoUrl' to the finance backup image
			}
			let articleInfo = [title, link, photoUrl]; // create an array called 'articleInfo' that stores 'title', 'link', and 'photoUrl'
			formattedNews.push(articleInfo); // add the 'articleInfo' array as an item to the end of 'formattedNews'
		});
		displayNews(formattedNews, 'https://utahphotohunter.github.io/alarm-clock/data/images/finance.webp'); // display the chosen news on the articles.html page
	}
}

// formats the data into usable form if news source is the 'hockey' option
export async function formatHockeyNews(json) {

	// check if preferred sources array includes "hockey"
	if (getPreferredSources().includes('hockey')) {
		let news = await json; // wait for varied news to be delivered
		let articles = news.body; // get just the news articles from the delivered data
		const selectedNews = await articleQty('hockey', articles); // wait for the right number of news articles to be delivered as 'selectedNews'
		let formattedNews = []; // declare empty array for future use as 'formattedNews'

		// for each selection in 'selectedNews'
		selectedNews.forEach(selection => {
			let title = selection.title; // store the current selections "title" item as 'title'
			let link = selection.link; // store the current selections "link" item as 'link'
			let photoUrl = 'https://utahphotohunter.github.io/alarm-clock/data/images/hockey.webp'; // set 'photoUrl' to the hockey backup image
			let articleInfo = [title, link, photoUrl]; // create an array called 'articleInfo' that stores 'title', 'link', and 'photoUrl'
			formattedNews.push(articleInfo); // add the 'articleInfo' array as an item to the end of 'formattedNews'
		});
		displayNews(formattedNews, 'https://utahphotohunter.github.io/alarm-clock/data/images/hockey.webp'); // display the chosen news on the articles.html page
	}
}

// -- if another option is added to the 'newsOptions' array, another 'format_____News()' function will need to be made to account for api specific data formatting