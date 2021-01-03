// selected elements from DOM
const quoteContainer = document.getElementById("quote-container");
const quote = document.getElementById("quote");
const author = document.getElementById("author");
const twitterButton = document.getElementById("twitter");
const newQuoteButton = document.getElementById("new-quote");
const loader = document.getElementById("loader");

//API URLs
const proxyUrl = "https://blooming-plains-93648.herokuapp.com/";
const apiUrl =
  "https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";

function displayLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}

//getting a quote from API
async function getQuote() {
  displayLoadingSpinner();

  try {
    const response = await fetch(proxyUrl + apiUrl);
    const data = await response.json();
    //handling the absence of the author
    author.innerHTML = data.quoteAuthor === "" ? "Unknown" : data.quoteAuthor;
    //handling the sitation if quote is too long
    modifyStyleOfTooLongQuote(data.quoteText.length);
    quote.innerHTML = data.quoteText;
    removeLoadingSpinner();
  } catch (error) {
    let attempt = 3;
    while (attempt >= 0) {
      getQuote();
      attempt--;
    }
    quoteContainer.innerText = "unable to get a quote";
  }
}

function modifyStyleOfTooLongQuote(stringOfQuote) {
  if (stringOfQuote > 120) {
    quote.classList.add("long-quote");
  }
  quote.classList.remove("long-quote");
}
getQuote();
//to tweet quote in a new window
function tweetQuote() {
  const quoteText = quote.innerText;
  const authorOfQuote = author.innerText;
  const tweeterUrl = `https://twitter.com/intent/tweet?text=${quoteText}-${authorOfQuote}`;
  window.open(tweeterUrl, "_blank");
}
//adding event listeners to buttons
newQuoteButton.addEventListener("click", getQuote);
twitterButton.addEventListener("click", tweetQuote);
