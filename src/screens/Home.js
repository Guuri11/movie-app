import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { Title } from 'react-native-paper';
import { getNewsMoviesApi } from '../api/movie'
import CarouselVertical from '../components/CarouselVertical';

export default function Home() {

    const [new_movies, setNewMovies] = useState(null)

    useEffect(() => {
        getNewsMoviesApi().then(response => setNewMovies(response.results))
    }, [])

    return (
        // showsVerticalScrollIndicator -> borra la barra de scroll por defecto
        <ScrollView showsVerticalScrollIndicator={false}>
            {
                new_movies && (
                    <View style={styles.news}>
                        <Title style={styles.title}>Estamos en home</Title>
                        <CarouselVertical  data={new_movies} />
                    </View>
                )
            }
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
    }
})
