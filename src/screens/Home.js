import React, { useEffect, useState } from 'react'
import { View, StyleSheet, ScrollView, Text } from 'react-native'
import { Title } from 'react-native-paper';
import { getAllGenresApi, getNewsMoviesApi } from '../api/movie'
import CarouselVertical from '../components/CarouselVertical';
import {map} from 'loadsh'

export default function Home(props) {

    const {navigation} = props
    const [new_movies, setNewMovies] = useState(null)
    const [genreList, setGenreList] = useState([])
    const [genreSelected, setGenreSelected] = useState(28)

    useEffect(() => {
        // Get last movies
        getNewsMoviesApi().then(response => setNewMovies(response.results))
        // Get all genres
        getAllGenresApi().then(response => setGenreList(response.genres))
    }, [])

    const onChangeGenre = (id) => {
        setGenreSelected(id)
    }

    return (
        // showsVerticalScrollIndicator -> borra la barra de scroll por defecto
        <ScrollView showsVerticalScrollIndicator={false}>
            {
                new_movies && (
                    <View style={styles.news}>
                        <Title style={styles.title}>Estamos en home</Title>
                        <CarouselVertical navigation={navigation}  data={new_movies} />
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
