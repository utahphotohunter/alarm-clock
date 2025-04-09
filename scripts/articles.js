// main script for articles.html

// ==================================================
// imports
// ==================================================
import { formatVariedNews, fetchRapidApi, formatBaseballNews, formatBasketBallNews, formatFinanceNews, formatHockeyNews, editNewsPreferrences, makeNewsPreferenceDialog } from './news.mjs';


// ==================================================
// page load functions
// ==================================================

makeNewsPreferenceDialog(); // create dialog for news preferrences


// ==================================================
// api fetching
// ==================================================

let rapidHost = 'tank01-mlb-live-in-game-real-time-statistics.p.rapidapi.com'; // rapid api hosting url

let variedUrl = 'https://utahphotohunter.github.io/alarm-clock/data/variedTest.json' // url for varied testing files
let baseballUrl = 'https://utahphotohunter.github.io/alarm-clock/data/baseballTest.json' // url for baseball testing files
let basketballUrl = 'https://utahphotohunter.github.io/alarm-clock/data/basketballTest.json'; // url for basketball testing files
let financeUrl = 'https://utahphotohunter.github.io/alarm-clock/data/financeTest.json'; // url for finance testing files
let hockeyUrl = 'https://utahphotohunter.github.io/alarm-clock/data/hockeyTest.json'; // url for hockey testing files

let variedNews = fetchRapidApi('False', variedUrl, rapidHost, 'varied'); // fetch varied news test files
let baseballNews = fetchRapidApi('False', baseballUrl, rapidHost, 'baseball'); // fetch baseball news test files
let basketballNews = fetchRapidApi('False', basketballUrl, rapidHost, 'basketball'); // fetch basketball news test files
let financeNews = fetchRapidApi('False', financeUrl, rapidHost, 'finance'); // fetch finance news test files
let hockeyNews = fetchRapidApi('False', hockeyUrl, rapidHost, 'hockey'); // fetch hockey news test files



const editNews = document.getElementById('edit-news'); // button to open the news preferrence dialog

formatVariedNews(variedNews); // format news fetched from varied source
formatBaseballNews(baseballNews); // format news fetched from baseball source
formatBasketBallNews(basketballNews); // format news fetched from basketball source
formatFinanceNews(financeNews); // format news fetched from finance source
formatHockeyNews(hockeyNews); // format news fetched from hockey source

// response to edit news preferrences button
editNews.addEventListener('click', function() {
    editNewsPreferrences(); // open dialog and change news preferrences
});