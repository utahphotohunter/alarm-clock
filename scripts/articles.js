// main script for articles.html


// ==================================================
// imports
// ==================================================
import { getNewsOptions, getNewsSource, fetchRapidApi } from "./news.mjs";
import { checkDate } from './utils.mjs';


// ==================================================
// variables
// ==================================================

// data variables
let accessedToday = checkDate(); // checks date page was last accessed
const newsOptions = getNewsOptions(); // array of news topic options
const news = getNewsSource(); // json of api host's and url's in newsSources.json