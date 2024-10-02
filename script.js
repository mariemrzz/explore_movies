// https://developer.themoviedb.org/reference/configuration-details 

import { populateGenreDropdown, getSelectedGenre, getRandomMovie, displayMovie, clearCurrentMovie } from './helpers.js'

const tmdbKey = '';
const tmdbBaseUrl = 'https://api.themoviedb.org/3';
const playBtn = document.getElementById('playBtn');
const likeBtn = document.getElementById('likeBtn');
const dislikeBtn = document.getElementById('dislikeBtn');

const getGenres = async () => {
    const genreRequestEndpoint = '/genre/movie/list'
    const requestParams = `?api_key=${tmdbKey}`
    const urlToFetch = `${tmdbBaseUrl}${genreRequestEndpoint}${requestParams}`
    try {
        const response = await fetch(urlToFetch)
        if (response.ok) {
            const jsonResponse = await response.json()
            const genres = jsonResponse.genres
            return genres
        }
    }
    catch (error) {
        console.log(error)
    }
};

const getMovies = async () => {
    const selectedGenre = getSelectedGenre();
    const discoverMovieEndpoint = '/discover/movie'
    const requestParams = `?api_key=${tmdbKey}&with_genres=${selectedGenre}`
    const urlToFetch = `${tmdbBaseUrl}${discoverMovieEndpoint}${requestParams}`
    try {
        const response = await fetch(urlToFetch)
        if (response.ok) {
            const jsonResponse = await response.json()
            console.log(jsonResponse)
            const movies = jsonResponse.results
            return movies
        }
    }
    catch (error) {
        console.log(error)
    }
};

const getMovieInfo = async (movie) => {
    const movieId = movie.id
    const movieEndpoint = `/movie/${movieId}`
    const requestParams = `?api_key=${tmdbKey}`
    const urlToFetch = `${tmdbBaseUrl}${movieEndpoint}${requestParams}`
    try {
        const response = await fetch(urlToFetch)
        if (response.ok) {
            const movieInfo = await response.json()
            return movieInfo;
        }
    }
    catch (error) {
        console.log(error)
    }
};

// Gets a list of movies and ultimately displays the info of a random movie from the list
const showRandomMovie = async () => {
    const movies = await getMovies()
    const randomMovie = getRandomMovie(movies)
    const info = await getMovieInfo(randomMovie)
    clearCurrentMovie();
    displayMovie(info);
};


// After liking a movie, clears the current movie from the screen and gets another random movie
const likeMovie = () => {
    clearCurrentMovie(() => {
        alert("Great!");
        showRandomMovie();
    });

};

// After disliking a movie, clears the current movie from the screen and gets another random movie
const dislikeMovie = () => {
    clearCurrentMovie(() => { alert("Let's try another one") });
    showRandomMovie();
};

getGenres().then(populateGenreDropdown);
playBtn.onclick = showRandomMovie;
likeBtn.onclick = likeMovie;
dislikeBtn.onclick = dislikeMovie;


