// global variable shared across functions
let totalMovies = 0
let totalTime = 0
let manualInput = false

// everytime the page is refreshed, the movies stay on the page
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
        // check to see if the data has a poster
        if (data.Poster === 'N/A' || data.Response === 'False') {
            createInputs()
            manualInput = true

            return

        } else {
            // output the data to the watched movies list
            data.Rating = rating
            let movies = JSON.parse(localStorage.getItem('movies'))

            if (movies == null) {
                movies = [data]
            } else {
                if (movies.some(movie => movie.Title === data.Title)) {
                    console.log('Movie already in watched list')
                } else {
                    movies.push(data)

                    // update the tracker
                    totalMovies++
                    totalTime += parseInt(data.Runtime)
                    updateTracker(totalMovies, totalTime)
                }
            } 

            localStorage.setItem('movies', JSON.stringify(movies))

            displayMovie() 
            displayShowPage()
        }
    })
    .catch(error => {
        console.error('Error:', error)
    })
}

//-------------------------------------------------------------
// MANUAL INPUT RESPONSE
const getManualResponse = () => {
    const title = document.querySelector('input[name="title"]').value
    const rating = document.querySelector('#rating').value
    const image = document.querySelector('input[name="image"]').value
    const releaseDate = document.querySelector('input[name="release-date"]').value
    const duration = document.querySelector('input[name="duration"]').value
    const rated = document.querySelector('input[name="rated"]').value
    const genre = document.querySelector('input[name="genre"]').value
    const director = document.querySelector('input[name="director"]').value
    const plot = document.querySelector('textarea[name="plot"]').value
    
    // place manual id into local storage
    let manualId = JSON.parse(localStorage.getItem('manualId'))

    if (manualId === null) {
        manualId = 1
    } else {
        manualId = parseInt(manualId)
        manualId++
    } 

    // convert date to correct format
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];

    const dateArr = releaseDate.split("-");
    const date = dateArr[2] + " " + months[Number(dateArr[1]) - 1] + " " + dateArr[0]

    // put into database
    let movies = JSON.parse(localStorage.getItem('movies'))

    const movie = {
        Title: title, Rating: rating, Poster: image, Released: date, Runtime: `${duration} min`, 
        Rated: rated, Genre: genre, Director: director, Plot: plot, imdbID: manualId.toString()
    }
    if (movies === null) {
        movies = [movie]
    } else {
        if (movies.some(movie => movie.Title === title)) {
            console.log('Movie already in watched list')
        } else {
            movies.push(movie)

            // update the tracker
            totalMovies++
            totalTime += parseInt(duration)
            updateTracker(totalMovies, totalTime)
        }
        
    }
    localStorage.setItem('movies', JSON.stringify(movies))
    localStorage.setItem('manualId', JSON.stringify(manualId))

    clearManualInputs()
    const form = document.querySelector('form')
    form.reset()

    // focus on the title input after the form is submitted
    const titleInput = document.querySelector('input[name="title"]')
    titleInput.focus()

    displayMovie()
    displayShowPage()
}


//-------------------------------------------------------------
// INPUT AND API RESPONSE

const form = document.querySelector('form')

form.addEventListener('submit', (event) => {
    event.preventDefault()

    const title = document.querySelector('input[name="title"]').value
    const rating = document.querySelector('#rating').value

    if (manualInput) {
        getManualResponse()
        manualInput = false
        return
    } else {
        getApiResponse(title, rating)
    }

    form.reset()

    // focus on the title input after the form is submitted
    const titleInput = document.querySelector('input[name="title"]')
    titleInput.focus()
})

//-------------------------------------------------------------
// CLEAR MANUAL INPUTS

const clearManualInputs = () => {
    const inputContainer = document.querySelector('.input-container')
            
    if (inputContainer.children.length > 2) {
        for (let i = 0; i < 7; i++) {
            inputContainer.lastChild.remove()
        }
    }

    // clear error message
    const errorMessage = document.querySelector('.input-container p')
    errorMessage.remove()
}

//-------------------------------------------------------------
// CREATE MANUAL INPUTS

const createInputs = () => {
    const inputContainer = document.querySelector('.input-container')

    // ensures that another set of inputs do not get appended
    if (document.querySelector('input[name="image"]')) {
        return
    }

    // image
    const imageLabel = document.createElement('label')
    imageLabel.classList.add('input-image')
    imageLabel.innerHTML = 'Image'
    const imageInput = document.createElement('input')
    imageInput.setAttribute('type', 'url')
    imageInput.setAttribute('name', 'image')
    imageInput.setAttribute('placeholder', 'https://www.example.com/image.jpg')
    imageInput.setAttribute('required', '')
    imageLabel.appendChild(imageInput)
    inputContainer.append(imageLabel)

    // release date
    const releaseDateLabel = document.createElement('label')
    releaseDateLabel.classList.add('input-release-date')
    releaseDateLabel.innerHTML = 'Release Date'
    const releaseDateInput = document.createElement('input')
    releaseDateInput.setAttribute('type', 'date')
    releaseDateInput.setAttribute('name', 'release-date')
    releaseDateInput.setAttribute('required', '')
    releaseDateLabel.appendChild(releaseDateInput)
    inputContainer.append(releaseDateLabel)

    // duration
    const durationLabel = document.createElement('label')
    durationLabel.classList.add('input-duration')
    durationLabel.innerHTML = 'Duration (min)'
    const durationInput = document.createElement('input')
    durationInput.setAttribute('type', 'number')
    durationInput.setAttribute('name', 'duration')
    durationInput.setAttribute('placeholder', '126')
    durationInput.setAttribute('required', '')
    durationLabel.appendChild(durationInput)
    inputContainer.append(durationLabel)
    
    // rated
    const ratedLabel = document.createElement('label')
    ratedLabel.classList.add('input-rated')
    ratedLabel.innerHTML = 'Rated'
    const ratedInput = document.createElement('input')
    ratedInput.setAttribute('type', 'text')
    ratedInput.setAttribute('name', 'rated')
    ratedInput.setAttribute('placeholder', 'PG-13')
    ratedInput.setAttribute('required', '')
    ratedLabel.appendChild(ratedInput)
    inputContainer.append(ratedLabel)

    // genre
    const genreLabel = document.createElement('label')
    genreLabel.classList.add('input-genre')
    genreLabel.innerHTML = 'Genre'
    const genreInput = document.createElement('input')
    genreInput.setAttribute('type', 'text')
    genreInput.setAttribute('name', 'genre')
    genreInput.setAttribute('placeholder', 'Action, Adventure')
    genreInput.setAttribute('required', '')
    genreLabel.appendChild(genreInput)
    inputContainer.append(genreLabel)

    // director
    const directorLabel = document.createElement('label')
    directorLabel.classList.add('input-director')
    directorLabel.innerHTML = 'Director'
    const directorInput = document.createElement('input')
    directorInput.setAttribute('type', 'text')
    directorInput.setAttribute('name', 'director')
    directorInput.setAttribute('placeholder', 'Tim Burton')
    directorInput.setAttribute('required', '')
    directorLabel.appendChild(directorInput)
    inputContainer.append(directorLabel)

    // plot
    const plotLabel = document.createElement('label')
    plotLabel.classList.add('input-plot')
    plotLabel.innerHTML = 'Plot'
    const plotInput = document.createElement('textarea')
    plotInput.setAttribute('name', 'plot')
    plotInput.setAttribute('placeholder', 'Short description of the movie')
    plotInput.setAttribute('required', '')
    plotLabel.appendChild(plotInput)
    inputContainer.append(plotLabel)

    // error message
    const errorMessage = document.createElement('p')
    errorMessage.innerHTML = 'Movie not found. Please manually input.'
    inputContainer.prepend(errorMessage)
}

//-------------------------------------------------------------
// CREATE IMAGE POSTER AND TITLE 

const createMovie = (movie) => {
    
    const watchedMovies = document.querySelector('.watched-movies')
    const watchedMoviesList = document.querySelectorAll('.watched-movies div')

    // check to see if the movie already exists in the DOM
    let watchedMoviesArray = Array.from(watchedMoviesList)
    let movieExists = watchedMoviesArray.some((watchedMovie) => watchedMovie.getAttribute('id') === movie.imdbID)

    let manualId = JSON.parse(localStorage.getItem('manualId'))

    if (!movieExists) {
        const div = document.createElement('div')
        div.classList.add('movie')

        if (manualInput) {
            div.setAttribute('id', manualId)
        } else {
            div.setAttribute('id', movie.imdbID)
        }
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
    
    // reset tracker
    totalMovies = 0
    totalTime = 0

    if (movies !== null) {
        movies.forEach((movie) => {
            createMovie(movie)
            totalMovies++
            totalTime += parseInt(movie.Runtime)
        })
    }

    updateTracker(totalMovies, totalTime)
    displayShowPage()
    showPageControls()
}

//-------------------------------------------------------------
// UPDATE THE TRACKER INFO

const updateTracker = (movies, time) => {
    const numMovies = document.querySelector('.num-movies p')
    numMovies.innerHTML = movies

    const watchTime= document.querySelector('.watch-time p')
    watchTime.innerHTML = time
}

//-------------------------------------------------------------
// DISPLAY THE MOVIES

const displayMovie = () => {
    const movies = JSON.parse(localStorage.getItem('movies'))
    const movie = movies.slice(-1)[0]

    createMovie(movie)
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

            if (manualInput) {


            } else {
                img.src = movieInDatabase.Poster
                img.alt = `${movieInDatabase.Title} Poster`
                const h2 = document.createElement('h2')
                h2.innerHTML = movieInDatabase.Title
                content.appendChild(h2)
                content.appendChild(img)

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
            }
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