import React, { useEffect, useState } from 'react'
import { View, Image, StyleSheet, ScrollView } from 'react-native'
import { IconButton, Title, Text } from 'react-native-paper'
import { getMovieById } from '../api/movie'
import ModalVideo from '../components/ModalVideo'
import { BASE_PATH_IMG } from '../utils/constants'
import { map } from 'loadsh'

export default function Movie(props) {

    const { route } = props

    const { id } = route.params
    const [movie, setMovie] = useState(null)
    const [showVideo, setShowVideo] = useState(false)


    useEffect(() => {
        getMovieById(id).then(response => setMovie(response))
    }, [])

    return (
        <>
            <ScrollView showsVerticalScrollIndicator={false}>
            {
                movie && (
                    <>
                    <MovieImage poster_path={movie.poster_path} />
                    <MovieTrailer setShowVideo={setShowVideo} />
                    <MovieTitle movie={movie} />
                    <MovieRating voteCount={movie.vote_count} voteAverage={movie.vote_average} />
                    <Text style={styles.overview} >{movie.overview}</Text>
                    <Text style={[styles.overview, {marginBottom: 30}]} >Fecha de lanzamiento: {movie.release_date}</Text>
                    </>
                )
            }
            </ScrollView>
            <ModalVideo show={showVideo} setShow={setShowVideo} idMovie={id} />
        </>
    )
}


function MovieImage(props) {
    const { poster_path } = props

    return (
        <View style={styles.viewPoster} >
            <Image style={styles.poster} source={{uri: `${BASE_PATH_IMG}/w500/${poster_path}`}} />
        </View>
    )
}

function MovieTrailer(props) {
    const { setShowVideo } = props

    return (
        <View style={styles.viewPlay} >
            <IconButton icon="play" color={"#000"} size={30} style={styles.play} onPress={()=>setShowVideo(true)} />
        </View>
    )
}

function MovieTitle(props) {
    const { movie } = props

    return (
        <View style={styles.viewInfo} >
            <Title>{movie.title}</Title>
            <View style={styles.viweGenres} >
                {
                    map(movie.genres, (genre, idx) => {
                        return (
                            <Text key={idx} style={styles.genre} >{genre.name}</Text>
                        )
                    })
                }
            </View>
        </View>
    )
}

function MovieRating(props) {
    const { voteCount, voteAverage } = props
    const media = voteAverage / 2

    return (
        <View style={styles.viewRating} >
            <Text style={ {fontSize: 16, marginRight: 5} }>Puntuación: {media} / 5 ({voteCount} votos)</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    viewPoster: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 1,
        shadowRadius: 10
    },
    poster: {
        width: "100%",
        height: 500,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30
    },
    viewPlay: {
        justifyContent: "flex-end",
        alignItems: "flex-end"
    },
    play: {
        backgroundColor: "#fff",
        marginTop: -40,
        marginRight: 30,
        width: 60,
        height: 60,
        borderRadius: 1000
    },
    viewInfo: {
        marginHorizontal: 30,
    },
    viweGenres: {
        flexDirection: "row"
    },
    genre: {
        marginRight: 10,
        color: "#8697a5"
    },
    viewRating: {
        marginHorizontal: 30,
        marginTop: 10,
        flexDirection: "row",
        alignItems: "center"
    },
    overview: {
        marginHorizontal: 30,
        marginTop: 20,
        textAlign: "justify",
        color: "#8697a5"
    }
})
