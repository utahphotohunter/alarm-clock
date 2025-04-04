import { formatVariedNews, fetchRapidApi, formatBaseballNews, formatBasketBallNews, formatFinanceNews, formatHockeyNews } from "./news.mjs";

// formatVariedNews();

let variedUrl = "https://utahphotohunter.github.io/alarm-clock/data/variedTest.json"
let rapidHost = "tank01-mlb-live-in-game-real-time-statistics.p.rapidapi.com";
let variedNews = fetchRapidApi('False', variedUrl, rapidHost, 'varied');

let baseballUrl = "https://utahphotohunter.github.io/alarm-clock/data/baseballTest.json"
let baseballNews = fetchRapidApi('False', baseballUrl, rapidHost, 'baseball');

let basketballUrl = 'https://utahphotohunter.github.io/alarm-clock/data/basketballTest.json';
let basketballNews = fetchRapidApi('False', basketballUrl, rapidHost, 'basketball');

let financeUrl = 'https://utahphotohunter.github.io/alarm-clock/data/financeTest.json';
let financeNews = fetchRapidApi('False', financeUrl, rapidHost, 'finance');

let hockeyUrl = 'https://utahphotohunter.github.io/alarm-clock/data/hockeyTest.json';
let hockeyNews = fetchRapidApi('False', hockeyUrl, rapidHost, 'hockey');

formatVariedNews(variedNews);
formatBaseballNews(baseballNews);
formatBasketBallNews(basketballNews);
formatFinanceNews(financeNews);
formatHockeyNews(hockeyNews);
