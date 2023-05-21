window.addEventListener('load', () => {
    updateMovies()
})

// API IMPLEMENTATION
const getApiResponse = (movieTitle) => {
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

    getApiResponse(title)
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

            const img = document.createElement('img')
            img.classList.add('movie-poster')
            img.src = movie.Poster
            img.alt = `${movie.Title} poster`

            const title = document.createElement('h4')
            title.innerHTML = movie.Title

            div.appendChild(img)
            div.appendChild(title)
            watchedMovies.appendChild(div)

            // click on the movie to go to its show page
            img.addEventListener('click', (event) => {
                console.log(`clicked ${movie.Title}`)
            })

        })
    }

    const moviesWatchedCounter = document.querySelector('.num-movies p')
    const watchTimeCounter = document.querySelector('.watch-time p')
    moviesWatchedCounter.innerHTML = moviesWatched
    watchTimeCounter.innerHTML = watchTime
}
