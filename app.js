
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

    if(year.value!="")
        url += "&y=" + year.value;

    fetch(url).then(response=>{
        response.json().then(data=>{
            data.Error? alert(data.Error) : initMovieInfo(data);
        })
    })    
}

const clearContainer = () => {
    movieInfo.style.display = "none";
}

const isNum = x => {
    if(x>="0"&&x<="9")
        return true;
    return x==".";
}

const getColor = (source,rating) => {
    let str = "";
    for(let i=0;i<rating.length;i++){
        if(isNum(rating[i])){
            str += rating[i];
        } else{
            break;
        }
    }
    let base10 = false;
    if(source[0]=="I"){
        base10 = true;
    }
    const value = parseFloat(str);
    if(value<6&&base10||value<60&&!base10)
        return "red"
    else if(value<8&&base10||value<80&&!base10)
        return "orange"
    else if(value<=10&&base10||value<=100&&!base10)
        return "green"
    return "blue";
}

const initMovieInfo = (data) => {
    movieInfo.style.display = "block";
    showTitle.textContent = data.Title;
    poster.src = data.Poster;
    plot.innerHTML = data.Plot;
    genre.innerHTML = "Genres: " + data.Genre;
    ratings.innerHTML = "Ratings: ";
    for(let i=0;i<data.Ratings.length;i++){
//    for(let rating of data.Ratings){
        const rating = data.Ratings[i];
        const color = getColor(rating.Source,rating.Value);
        const score = `<span style='color: ${color}'>${rating.Value}</span>`;
        ratings.innerHTML += rating.Source + " - " + score;
        if(i<data.Ratings.length-1)
            ratings.innerHTML += ", ";
    }
}

