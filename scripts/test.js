import { formatVariedNews, fetchRapidApi, formatBaseballNews } from "./news.mjs";

// formatVariedNews();

let variedUrl = "https://utahphotohunter.github.io/alarm-clock/data/variedTest.json"
let rapidHost = "tank01-mlb-live-in-game-real-time-statistics.p.rapidapi.com";
let variedNews = fetchRapidApi('True', variedUrl, rapidHost, 'varied');

let baseballUrl = "https://utahphotohunter.github.io/alarm-clock/data/baseballTest.json"
let baseballNews = fetchRapidApi('True', baseballUrl, rapidHost, 'baseball');

formatVariedNews(variedNews);
formatBaseballNews(baseballNews);
