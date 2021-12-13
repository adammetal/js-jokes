function fetchJsonApi(url) {
  // HTTP GET -> <url>
  return fetch(url).then(function (response) {
    console.log(response);
    return response.json();
  }); // -> Promise
}

function fetchMyJoke() {
  return fetchJsonApi("/jokes"); // --> { text: '' }
} // --> Promise<{ text: '' }>

function fetchApiJoke() {
  const url = "https://api.chucknorris.io/jokes/random";
  return fetchJsonApi(url).then(function (joke) {
    return { text: joke.value };
  }); // --> { text: '' }
} // --> Promise<{ text: '' }>

function fetchNasaJoke() {
  let url = "https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY";
  return fetchJsonApi(url).then(function (data) {
    return { text: data.title };
  });
}

function displayJoke(joke) {
  const text = joke.text;
  const jokeDiv = document.createElement("div");
  jokeDiv.className = "joke-div";
  jokeDiv.innerText = text;
  document.querySelector("#joke-panel").append(jokeDiv);
}

function renderJokesFromMany() {
  fetchMyJoke().then(displayJoke);
  fetchApiJoke().then(displayJoke);
  fetchNasaJoke().then(displayJoke);
}

function main() {
  let jokeBtn = document.querySelector("#joke-btn");
  jokeBtn.addEventListener("click", renderJokesFromMany);
}

window.addEventListener("load", main);
