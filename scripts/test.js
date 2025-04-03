import { getNewsOptions, formatRandomNews } from "./news.mjs";
import { getRandomIndex } from "./utils.mjs";


async function testFetch(url, source, previouslyRun) {
    try {
            if (previouslyRun == 'False') {
                const response = await fetch(url);
                const newsArticleJson = await response.json();
                const newsArticleString = JSON.stringify(newsArticleJson);

                let storedData = localStorage.getItem(source);

                let storedDataJson = JSON.parse(storedData);
                storedDataJson.accessedToday = 'True';

                storedDataJson.newsArticles = newsArticleString;
                let storedDataString = JSON.stringify(storedDataJson);

                localStorage.setItem(source, storedDataString);
                console.log('got data from api');
                console.log(newsArticleString);
                console.log(newsArticleJson);
            } else if (previouslyRun == 'True') {
                const storedDataString = localStorage.getItem(source);
                const storedDataJson = JSON.parse(storedDataString);
                const newsArticles = storedDataJson.newsArticles;
                const newsArticlesJson = JSON.parse(newsArticles);
                console.log('got data from local storeage');
                // console.log(storedDataString);
                console.log(storedDataJson)
                // console.log(newsArticles);
                console.log(newsArticlesJson);
            }
        } catch (error) {
            console.error(error);
        }
}

let url = "https://utahphotohunter.github.io/alarm-clock/data/newsSources.json";
let testUrl = "https://utahphotohunter.github.io/alarm-clock/data/testData.json";

const options = getNewsOptions();

function go() {
    options.forEach(option => {
        let localStorageString = localStorage.getItem(option);
        let localStorageJson = JSON.parse(localStorageString);
        let status = localStorageJson.accessedToday;
        // console.log(status);
        testFetch(url, option, 'False');
    });
}

// go();


async function fetchTestData() {
    const response = await fetch(testUrl);
    const data = await response.json();
    // console.log(data);
    let selectedNews = []

    let count = 0;
    while (count < 4) {
        count = count + 1;
        let index = await getRandomIndex(data.data);
        let article = data.data[index];
        // console.log(article);
        selectedNews.push(article);

    }
    console.log(selectedNews);

}

fetchTestData();

formatRandomNews();