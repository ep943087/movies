
window.onload = () =>{
    clearContainer();
    title.select();
}

// DOM elements
const form = document.querySelector('form');
const title = document.querySelector('#title');
const year = document.querySelector('#year');
const movieInfo = document.querySelector("#movieInfo");
const showTitle = document.querySelector('#showTitle');
const poster = document.querySelector('#poster');
const plot = document.querySelector('#plot');
const genre = document.querySelector('#genre');
const ratings = document.querySelector('#ratings');
const urlb = "//omdbapi.com/?plot=full&apikey=";

form.onsubmit = (e) => {
    e.preventDefault();
    clearContainer();
    let url = urlb + apikey + "&t=" + title.value;
    if(year.value!=""){
        url += "&y=" + year.value;
    }
    fetch(url).then(response=>{
        response.json().then(data=>{
            data.Error? alert(data.Error) : initMovieInfo(data);
        })
    })    
}

const clearContainer = () => {
    movieInfo.style.display = "none";
}

const initMovieInfo = (data) => {
    console.log(data.Ratings);  
    movieInfo.style.display = "block";
    showTitle.textContent = data.Title;
    poster.src = data.Poster;
    plot.innerHTML = data.Plot;
    genre.innerHTML = "Genres: " + data.Genre;
    ratings.innerHTML = "Ratings: ";
    for(let rating of data.Ratings){
        ratings.innerHTML += rating.Source + " - " + rating.Value + ", ";
    }
}

