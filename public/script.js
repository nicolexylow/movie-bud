// everytime the page is refreshed, the movies stya on the page
window.addEventListener('load', () => {
    reloadPage()
})

//-------------------------------------------------------------
// API IMPLEMENTATION
const getApiResponse = (movieTitle, rating) => {
    const apiKey = '3defedc0' 
    const baseUrl = 'http://www.omdbapi.com/'
    const url = `${baseUrl}?apikey=${apiKey}&t=${encodeURIComponent(movieTitle)}`

    fetch(url)
    .then(response => {
        if (response.ok) {
            return response.json()
        } else {
            throw new Error('Request failed with status code: ' + response.status)
        }
    })
    .then((data) => {
        // output the data to the watched movies list
        data.Rating = rating
        let movies = JSON.parse(localStorage.getItem('movies'))

        if (movies == null) {
            movies = [data]
        } else {
            if (movies.some(movie => movie.Title === data.Title)) {
                console.log('Movie already in watched list');
            } else {
                movies.push(data)
            }
        } 
        
        localStorage.setItem('movies', JSON.stringify(movies))

        displayMovie() 
        displayShowPage()
    })
    .catch(error => {
        console.error('Error:', error)
    })
}

//-------------------------------------------------------------
// INPUT AND API RESPONSE

const form = document.querySelector('form')

form.addEventListener('submit', (event) => {
    event.preventDefault()

    const title = document.querySelector('input[name="title"]').value
    const rating = document.querySelector('input[name="rating"]').value

    getApiResponse(title, rating)
    form.reset()
})

//-------------------------------------------------------------
// CREATE IMAGE POSTER AND TITLE 

const createMovie = (movie) => {
    
    const watchedMovies = document.querySelector('.watched-movies')
    const watchedMoviesList = document.querySelectorAll('.watched-movies div')

    // check to see if the movie already exists in the DOM
    let watchedMoviesArray = Array.from(watchedMoviesList);
    let movieExists = watchedMoviesArray.some((watchedMovie) => watchedMovie.getAttribute('id') === movie.imdbID);

    if (!movieExists) {
        const div = document.createElement('div')
        div.classList.add('movie')
        div.setAttribute('id', movie.imdbID)
        div.setAttribute('data-movie-target', '#show-page')
        div.classList.add('active')

        const img = document.createElement('img')
        img.classList.add('movie-poster')
        img.src = movie.Poster
        img.alt = `${movie.Title} poster`

        const title = document.createElement('h4')
        title.innerHTML = movie.Title

        div.appendChild(img)
        div.appendChild(title)
        watchedMovies.appendChild(div)
    }
}

//-------------------------------------------------------------
// RELOAD PAGE 

const reloadPage = () => {
    const movies = JSON.parse(localStorage.getItem('movies'))
    const watchedMovies = document.querySelector('.watched-movies')
    
    if (movies !== null) {
        movies.forEach((movie) => {
            createMovie(movie)
        })
    }

    displayShowPage()
    showPageControls()
}

//-------------------------------------------------------------
// UPDATE THE TRACKER INFO
let totalMovies = 0
let totalTime = 0

const updateTracker = (movies, time) => {
    const numMovies = document.querySelector('.num-movies p')
    numMovies.innerHTML = movies

    const watchTime= document.querySelector('.watch-time p')
    watchTime.innerHTML = time
}

//-------------------------------------------------------------
// DISPLAY THE MOVIES

const displayMovie = () => {
    const numMovies = 0
    const movies = JSON.parse(localStorage.getItem('movies'))
    const movie = movies.slice(-1)[0]

    createMovie(movie)
    
    // update the tracker
    totalMovies++
    totalTime += parseInt(movie.Runtime)
    updateTracker(totalMovies, totalTime)
}

//-------------------------------------------------------------
// DISPLAY MOVIE SHOW PAGE

const displayShowPage = () => {

    // find which movie has been clicked on
    const watchedMovies = document.querySelectorAll('.watched-movies div')
    const pageContents = document.querySelectorAll('[data-page-content]')
    const movies = JSON.parse(localStorage.getItem('movies')) 
    let movieInDatabase = ''

    watchedMovies.forEach((movie) => {
        movie.addEventListener('click', () => {

            const movieId = movie.getAttribute('id')
            movies.forEach((movie) => {
                if (movie.imdbID === movieId) {
                    movieInDatabase = movie
                }
            })
            
            const target = document.querySelector(movie.dataset.movieTarget)

            pageContents.forEach((page) => {
                page.classList.remove('active')
            })

            target.classList.add('active')

            // specific show page based on the movie clicked
            const content = document.querySelector('#show-page .img-title')
            const img = document.createElement('img')

            // delete the previous append to parent HTML element
            content.innerHTML = ''

            img.src = movieInDatabase.Poster
            img.alt = `${movieInDatabase.Title} Poster`
            const figcaption = document.createElement('figcaption')
            figcaption.innerHTML = movieInDatabase.Title
            content.appendChild(img)
            content.appendChild(figcaption)

            const rating = document.querySelector('#show-page .rating p')
            const genre = document.querySelector('#show-page .genre p')
            const releaseDate = document.querySelector('#show-page .release-date p')
            const director = document.querySelector('#show-page .director p')
            const rated = document.querySelector('#show-page .rated p')
            const duration = document.querySelector('#show-page .duration p')
            const plot = document.querySelector('#show-page .plot p')

            rating.innerHTML = movieInDatabase.Rating
            genre.innerHTML = movieInDatabase.Genre
            releaseDate.innerHTML = movieInDatabase.Released
            director.innerHTML = movieInDatabase.Director
            rated.innerHTML = movieInDatabase.Rated
            duration.innerHTML = movieInDatabase.Runtime
            plot.innerHTML = movieInDatabase.Plot 
        })
    })

    showPageControls()
}

//-------------------------------------------------------------
// SHOW PAGE CONTROLS

const showPageControls = () => {
    const watchedMovies = document.querySelectorAll('.watched-movies div')
    const movies = JSON.parse(localStorage.getItem('movies')) 

    // find which movie was clicked on in the local storage
    watchedMovies.forEach((watchedMovie) => {
        watchedMovie.addEventListener('click', () => {
            movies.forEach((movie) => {
                if (movie.imdbID === watchedMovie.getAttribute('id')) {

                    // cancel and delete button functions
                    const pageContents = document.querySelectorAll('[data-page-content]')
                    const buttonContainer = document.querySelector('#show-page .button-container')
                    buttonContainer.classList.remove('active')
                
                    const backBtn = document.querySelector('#show-page .back-btn')

                    backBtn.addEventListener('click', () => {
                        pageContents.forEach((page) => {
                        page.classList.remove('active')
                        })

                        const mainPage = document.querySelector('#main-page')
                        mainPage.classList.add('active')
                    })
                
                    const deleteBtn = document.querySelector('#show-page .delete-btn')

                    deleteBtn.addEventListener('click', () => {
                        showDeleteConfirmation(movie)
                    })
                }
            })
            
        })
    }) 
}

//-------------------------------------------------------------
// SHOW DELETE CONFIRMATION MODAL

let handleConfirmClick;

const showDeleteConfirmation = (movie) => {

    const deleteModal = document.querySelector('#delete-modal')
    deleteModal.classList.add('active')

    const buttonContainer = document.querySelector('#show-page .button-container')
    buttonContainer.classList.add('active')

    const cancelBtn = document.querySelector('#delete-modal .cancel-btn')

    cancelBtn.addEventListener('click', () => {
        buttonContainer.classList.remove('active')

        const modal = document.querySelector('#delete-modal')
        modal.classList.remove('active')
    })

    const confirmBtn = document.querySelector('#delete-modal .confirm-btn')

    // ensures that 1 event listener is only active at a time
    if(typeof handleConfirmClick === 'function'){
        confirmBtn.removeEventListener('click', handleConfirmClick);
    }
    
    handleConfirmClick = () => deleteMovie(movie);
    confirmBtn.addEventListener('click', handleConfirmClick);
}

//-------------------------------------------------------------
// DELETE MOVIE

const deleteMovie = (movie) => {

    const pageContents = document.querySelectorAll('[data-page-content]')
    pageContents.forEach((page) => {
        page.classList.remove('active')
    })

    const movies = JSON.parse(localStorage.getItem('movies'))
    const movieIndex = movies.findIndex((movieItem) => movieItem.imdbID === movie.imdbID)
    
    // remove movie from local storage
    if (movieIndex !== -1) {
        // Remove the movie from the array
        movies.splice(movieIndex, 1)
        localStorage.setItem('movies', JSON.stringify(movies))
    } 

    // remove movie from DOM
    const watchedMovies = document.querySelectorAll('.watched-movies div')
    watchedMovies.forEach((watchedMovie) => {
        if (watchedMovie.getAttribute('id') === movie.imdbID) {
            watchedMovie.remove()

            // update the tracker
            totalMovies--
            totalTime -= parseInt(movie.Runtime)
            updateTracker(totalMovies, totalTime)
        }
    })
    

    const modal = document.querySelector('#delete-modal')
    modal.classList.remove('active')
  
    const mainPage = document.querySelector('#main-page')
    mainPage.classList.add('active') 
}