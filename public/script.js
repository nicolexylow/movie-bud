window.addEventListener('load', () => {
    updateMovies()
})

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
                console.log('includes');
            } else {
                movies.push(data)
            }
        } 
        
        localStorage.setItem('movies', JSON.stringify(movies))
        updateMovies() 
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

const updateMovies = () => {
    const movies = JSON.parse(localStorage.getItem('movies'))
    const watchedMovies = document.querySelector('.watched-movies')
    watchedMovies.innerHTML = ''
    let id = 0
    let moviesWatched = 0
    let watchTime = 0

    if (movies != null) {
        movies.forEach((movie) => {
            id++
            moviesWatched++
            watchTime += parseInt(movie.Runtime)
            
            // creating a container for the movies to show
            const div = document.createElement('div')
            div.setAttribute('id', id)

            // creates a new image and title
            const img = document.createElement('img')
            img.classList.add('movie-poster')
            img.setAttribute('data-movie-target', '#show-page')
            img.classList.add('active')
            img.src = movie.Poster
            img.alt = `${movie.Title} poster`

            const title = document.createElement('h4')
            title.innerHTML = movie.Title

            div.appendChild(img)
            div.appendChild(title)
            watchedMovies.appendChild(div)

                     
            // click on the movie to go to its show page
            const pageContents = document.querySelectorAll('[data-page-content]')   

            img.addEventListener('click', (event) => {
                console.log(`clicked ${movie.Title}`)
                const target = document.querySelector(img.dataset.movieTarget)

                pageContents.forEach((page) => {
                    page.classList.remove('active')
                })

                target.classList.add('active')

                // specific show page based on the movie clicked
                const posterImg = document.querySelector('#show-page .img-title')
                const imgPoster = document.createElement('img')

                // delete the previous append to parent HTML element
                posterImg.innerHTML = ''

                imgPoster.src = movie.Poster
                imgPoster.alt = `${movie.Title} Poster`
                const figcaption = document.createElement('figcaption')
                figcaption.innerHTML = movie.Title
                posterImg.appendChild(imgPoster)
                posterImg.appendChild(figcaption)

                const rating = document.querySelector('#show-page .rating p')
                const genre = document.querySelector('#show-page .genre p')
                const releaseDate = document.querySelector('#show-page .release-date p')
                const director = document.querySelector('#show-page .director p')
                const rated = document.querySelector('#show-page .rated p')
                const duration = document.querySelector('#show-page .duration p')
                const plot = document.querySelector('#show-page .plot p')

                rating.innerHTML = movie.Rating
                genre.innerHTML = movie.Genre
                releaseDate.innerHTML = movie.Released
                director.innerHTML = movie.Director
                rated.innerHTML = movie.Rated
                duration.innerHTML = movie.Runtime
                plot.innerHTML = movie.Plot  

               
            })
            controls(movie)
        })
    }

    const moviesWatchedCounter = document.querySelector('.num-movies p')
    const watchTimeCounter = document.querySelector('.watch-time p')
    moviesWatchedCounter.innerHTML = moviesWatched
    watchTimeCounter.innerHTML = watchTime
}

const controls = (movie) => {
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
  
const showDeleteConfirmation = (movie) => {
    const deleteModal = document.querySelector('#delete-modal')
    deleteModal.classList.add('active')

    const buttonContainer = document.querySelector('#show-page .button-container')
    buttonContainer.classList.add('active')

    const confirmBtn = document.querySelector('#delete-modal .confirm-btn')
    const cancelBtn = document.querySelector('#delete-modal .cancel-btn')

    confirmBtn.addEventListener('click', () => {
        deleteMovie(movie)
    })

    cancelBtn.addEventListener('click', () => {
        buttonContainer.classList.remove('active')

        const modal = document.querySelector('#delete-modal')
        modal.classList.remove('active')
    })
}
  
const deleteMovie = (movie) => {
    const movies = JSON.parse(localStorage.getItem('movies'))
  
    // Find the index of the movie to be removed
    const movieIndex = movies.findIndex((movieItem) => movieItem.Title === movie.Title)
  
    if (movieIndex !== -1) {
        // Remove the movie from the array
        movies.splice(movieIndex, 1)
        localStorage.setItem('movies', JSON.stringify(movies))
        updateMovies()
    }
  
    const pageContents = document.querySelectorAll('[data-page-content]')
    pageContents.forEach((page) => {
        page.classList.remove('active')
    })
  
    const modal = document.querySelector('#delete-modal')
    modal.classList.remove('active')
  
    const mainPage = document.querySelector('#main-page')
    mainPage.classList.add('active')
}
