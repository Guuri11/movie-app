import { API_HOST, API_KEY, LANG } from "../utils/constants";

export function getNewsMoviesApi(page = 1) {
    const url = `${API_HOST}/movie/now_playing?api_key=${API_KEY}&language=${LANG}&page=${page}`

    return fetch(url).then(response => response.json()).then(result => result)
}

export function getGenreMovieApi(idGenres) {
    const url = `${API_HOST}/genre/movie/list?api_key=${API_KEY}&language=${LANG}`

    return fetch(url).then(response => response.json()).then(result => {
        const arrayGenres = []
        idGenres.forEach((id) => {
            result.genres.forEach(item => {
                if (item.id === id) arrayGenres.push(item.name)
            })
        });
        return arrayGenres;
    })

}

export function getAllGenresApi() {
    const url = `${API_HOST}/genre/movie/list?api_key=${API_KEY}&language=${LANG}`
    
    return fetch(url).then(response => response.json()).then(result => result)
}

export function getGenreMoviesApi(genre) {
    const url = `${API_HOST}/discover/movie?api_key=${API_KEY}&language=${LANG}&with_genres=${genre}`
    
    return fetch(url).then(response => response.json()).then(result => result)
}

export function getMovieById(id) {
    const url = `${API_HOST}/movie/${id}?api_key=${API_KEY}&language=${LANG}`
    
    return fetch(url).then(response => response.json()).then(result => result)
}

export function getVideoMovieApi(id) {
    const url = `${API_HOST}/movie/${id}/videos?api_key=${API_KEY}&language=${LANG}`
    
    return fetch(url).then(response => response.json()).then(result => result)
}