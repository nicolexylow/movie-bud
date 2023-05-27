window.addEventListener('load', () => {
    updateMovies()
})

// API IMPLEMENTATION
const getApiResponse = (movieTitle, ratingInput) => {
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
        console.log(data)
        let movies = JSON.parse(localStorage.getItem('movies'))

        if (movies == null) {
            movies = [data]
        } else {
            movies.push(data)
        }

        localStorage.setItem('movies', JSON.stringify(movies))
        updateMovies(ratingInput)        
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
    const ratingInput = document.querySelector('input[name="rating"]').value

    getApiResponse(title, ratingInput)
    form.reset()
})

const updateMovies = (ratingInput) => {
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

                rating.innerHTML = `${ratingInput}`
                genre.innerHTML = movie.Genre
                releaseDate.innerHTML = movie.Released
                director.innerHTML = movie.Director
                rated.innerHTML = movie.Rated
                duration.innerHTML = movie.Runtime
                plot.innerHTML = movie.Plot
            })

            

        })
    }

    const moviesWatchedCounter = document.querySelector('.num-movies p')
    const watchTimeCounter = document.querySelector('.watch-time p')
    moviesWatchedCounter.innerHTML = moviesWatched
    watchTimeCounter.innerHTML = watchTime
}
