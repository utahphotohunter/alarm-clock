// main script for articles.html

// ==================================================
// imports
// ==================================================
import { formatVariedNews, fetchRapidApi, formatBaseballNews, formatBasketballNews, formatFinanceNews, formatHockeyNews, editNewsPreferrences, makeNewsPreferenceDialog } from './news.mjs';

// ==================================================
// page load functions
// ==================================================

makeNewsPreferenceDialog(); // create dialog for news preferrences

// ==================================================
// variables
// ==================================================

//buttons
const editNews = document.getElementById('edit-news'); // button to open the news preferrence dialog

// ==================================================
// listening events
// ==================================================

// response to edit news preferrences button
editNews.addEventListener('click', function() {
    editNewsPreferrences(); // open dialog and change news preferrences
});

// ==================================================
// news variables and display functions
// ==================================================

const variedUrl = 'https://real-time-news-data.p.rapidapi.com/topic-news-by-section?topic=TECHNOLOGY&section=CAQiSkNCQVNNUW9JTDIwdk1EZGpNWFlTQldWdUxVZENHZ0pKVENJT0NBUWFDZ29JTDIwdk1ETnliSFFxQ2hJSUwyMHZNRE55YkhRb0FBKi4IACoqCAoiJENCQVNGUW9JTDIwdk1EZGpNWFlTQldWdUxVZENHZ0pKVENnQVABUAE&limit=500&country=US&lang=en'; // url for varied news api
const variedHost = 'real-time-news-data.p.rapidapi.com'; // host url for vaired news api
let variedStatus = JSON.parse(localStorage.getItem('varied')).accessedToday; // true or false of accessed today
let variedNews = await fetchRapidApi(variedStatus, variedUrl, variedHost, 'varied'); // fetches news for varied source
formatVariedNews(variedNews); // formats and displays varied news

const financeUrl = 'https://yahoo-finance166.p.rapidapi.com/api/autocomplete?query=AA'; // url for finance news api
const financeHost = 'yahoo-finance166.p.rapidapi.com'; // host url for finance news api
let financeStatus = JSON.parse(localStorage.getItem('finance')).accessedToday; // true or false of accessed today
let financeNews = await fetchRapidApi(financeStatus, financeUrl, financeHost, 'finance'); // fetches news for finance source
formatFinanceNews(financeNews); // formats and displays finance news

const baseballUrl = 'https://tank01-mlb-live-in-game-real-time-statistics.p.rapidapi.com/getMLBNews?recentNews=true&maxItems=10'; // url for baseball news api
const baseballHost = 'tank01-mlb-live-in-game-real-time-statistics.p.rapidapi.com'; // host url for baseball news api
const baseballStatus = JSON.parse(localStorage.getItem('baseball')).accessedToday; // true or false of accessed today
let baseballNews = await fetchRapidApi(baseballStatus, baseballUrl, baseballHost, 'baseball'); // fetches news for baseball source
formatBaseballNews(baseballNews); // formats and displays baseball news

const hockeyUrl = 'https://tank01-nhl-live-in-game-real-time-statistics-nhl.p.rapidapi.com/getNHLNews?fantasyNews=true'; // url for hockey news api
const hockeyHost = 'tank01-nhl-live-in-game-real-time-statistics-nhl.p.rapidapi.com'; // host url for hockey news api
const hockeyStatus = JSON.parse(localStorage.getItem('hockey')).accessedToday; // true or false of accessed today
let hockeyNews = await fetchRapidApi(hockeyStatus, hockeyUrl, hockeyHost, 'hockey'); // fetches news for hockey source
formatHockeyNews(hockeyNews); // formats and displays hockey news

const basketballUrl = 'https://nba-latest-news.p.rapidapi.com/articles'; // url for basketball news api
const basketballHost = 'nba-latest-news.p.rapidapi.com'; // host url for basketball news api
const basketballStatus = JSON.parse(localStorage.getItem('basketball')).accessedToday; // true or false of accessed today
let basketballNews = await fetchRapidApi(basketballStatus, basketballUrl, basketballHost, 'basketball'); // fetches news for basketball source
formatBasketballNews(basketballNews); // formats and displays basketball news