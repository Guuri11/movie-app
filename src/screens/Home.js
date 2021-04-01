import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { getNewsMoviesApi } from '../api/movie'

export default function Home() {

    const [new_movies, setNewMovies] = useState(null)

    console.log(new_movies);
    useEffect(() => {
        getNewsMoviesApi().then(response => setNewMovies(response.results))
    }, [])

    return (
        <View>
            <Text>Estamos en home</Text>
        </View>
    )
}
