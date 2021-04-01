import React, { useEffect, useState } from 'react'
import { View, StyleSheet, ScrollView, Text } from 'react-native'
import { Title } from 'react-native-paper';
import { getAllGenresApi, getGenreMoviesApi, getNewsMoviesApi } from '../api/movie'
import CarouselVertical from '../components/CarouselVertical';
import {map} from 'loadsh'
import CarouselMulti from '../components/CarouselMulti';

export default function Home(props) {

    const {navigation} = props
    const [newMovies, setNewMovies] = useState(null)
    const [genreList, setGenreList] = useState([])
    const [genreSelected, setGenreSelected] = useState(28)
    const [genreMovies, setGenreMovies] = useState([])


    useEffect(() => {
        // Get last movies
        getNewsMoviesApi().then(response => setNewMovies(response.results))
        // Get all genres
        getAllGenresApi().then(response => setGenreList(response.genres))
    }, [])

    useEffect(() => {
        // Get movies from a genre
        getGenreMoviesApi(genreSelected).then(response => setGenreMovies(response.results))
    }, [genreSelected])

    const onChangeGenre = (id) => {
        setGenreSelected(id)
    }

    return (
        // showsVerticalScrollIndicator -> borra la barra de scroll por defecto
        <ScrollView showsVerticalScrollIndicator={false}>
            {
                newMovies && (
                    <View style={styles.news}>
                        <Title style={styles.title}>Estamos en home</Title>
                        <CarouselVertical navigation={navigation}  data={newMovies} />
                    </View>
                )
            }

            <View style={styles.genres}>
                <Title style={styles.genres_title} >Películas por género</Title>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.genreList} >
                    {
                        map(genreList, (genre,idx) => {
                            return (
                                <Text style={[styles.genre, {color: genreSelected !== genre.id ? "#8697a5": "#fff"}]} 
                                key={idx}
                                onPress={() => onChangeGenre(genre.id)}
                                >
                                    {genre.name}
                                </Text>
                            )
                        })
                    }
                </ScrollView>
                {genreMovies && (
                    <CarouselMulti data={genreMovies} navigation={navigation} />
                )}
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    news: {
        marginVertical: 10
    },
    title: {
        marginBottom: 15,
        marginHorizontal: 20,
        fontWeight: "bold",
        fontSize: 22
    },
    genres: {
        marginTop: 20,
        marginBottom: 50
    },
    genres_title: {
        marginHorizontal: 20,
        fontWeight: "bold",
        fontSize: 22
    },
    genreList: {
        marginTop: 5,
        marginBottom: 15,
        paddingHorizontal: 20,
        padding: 10
    },
    genre: {
        marginRight: 20,
        fontSize: 16
    }
})
