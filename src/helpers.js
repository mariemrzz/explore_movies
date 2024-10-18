const moviePosterDiv = document.getElementById('moviePoster');
const movieTitleDiv = document.getElementById('movieTitle');
const movieRatingContainer = document.getElementById('movieRatingContainer');
const movieRating = document.getElementById('movieImdbRating');
const overviewTextDiv = document.getElementById('movieOverview');

// Populate dropdown menu with all the available genres
const populateGenreDropdown = (genres) => {
    const select = document.getElementById('genres')

    for (const genre of genres) {
        let option = document.createElement("option");
        option.value = genre.id;
        option.text = genre.name;
        select.appendChild(option);
    }
};

// Returns the current genre selection from the dropdown menu
const getSelectedGenre = () => {
    const selectedGenre = document.getElementById('genres').value;

    return selectedGenre;
};

// Displays the like and dislike buttons on the page
const showBtns = () => {
    const btnDiv = document.getElementById('likeOrDislikeBtns');
    btnDiv.removeAttribute('hidden');
};

// Clear the current movie from the screen
const clearCurrentMovie = (action = () => { }) => {
    action()
    moviePosterDiv.innerHTML = '';
    movieTitleDiv.innerHTML = '';
    movieRating.innerHTML = '';
    overviewTextDiv.innerHTML = '';
}

// Create HTML for movie poster
const createMoviePoster = (posterPath) => {
    const moviePosterUrl = `https://image.tmdb.org/t/p/original/${posterPath}`;

    const posterImg = document.createElement('img');
    posterImg.setAttribute('src', moviePosterUrl);
    posterImg.setAttribute('id', 'moviePoster');
    posterImg.setAttribute('data-testid', 'moviePosterId');

    return posterImg;
};

// Create HTML for movie title
const createMovieTitle = (title) => {
    const titleHeader = document.createElement('h1');
    titleHeader.innerHTML = title;

    return titleHeader;
};


// Create HTML for movie overview
const createMovieOverview = (overview) => {
    const overviewParagraph = document.createElement('p');
    if (overview.length === 0) {
        overviewParagraph.innerHTML = " <b>Description: currently there is no description for this movie</b> "
    } else {
        overviewParagraph.innerHTML = " <b>Description:</b> " + overview;
    }

    return overviewParagraph;
};

// Returns a random movie from the first page of movies
const getRandomMovie = (movies) => {
    const randomIndex = Math.floor(Math.random() * movies.length);
    const randomMovie = movies[randomIndex];

    return randomMovie;
};

// Uses the DOM to create HTML to display the movie
const displayMovie = (movieInfo) => {
    movieRatingContainer.style.visibility = '';

    // Create HTML content containing movie info
    const moviePoster = createMoviePoster(movieInfo.poster_path);
    const titleHeader = createMovieTitle(`${movieInfo.title} (${movieInfo.release_date.slice(0, 4)})`);
    const overviewText = createMovieOverview(movieInfo.overview);
    const movieRatingText = `${movieInfo.vote_average.toString().slice(0, 3)}`;

    // Append title, poster, rating, and overview to page
    moviePosterDiv.appendChild(moviePoster);
    movieTitleDiv.appendChild(titleHeader);
    movieRating.innerHTML = movieRatingText;
    overviewTextDiv.appendChild(overviewText);

    showBtns();
};

export { populateGenreDropdown, getSelectedGenre, getRandomMovie, displayMovie, showBtns, clearCurrentMovie };