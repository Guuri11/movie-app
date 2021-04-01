import React, { useEffect, useState } from 'react'
import { View, Image, StyleSheet, ScrollView } from 'react-native'
import { IconButton } from 'react-native-paper'
import { getMovieById } from '../api/movie'
import ModalVideo from '../components/ModalVideo'
import { BASE_PATH_IMG } from '../utils/constants'

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
            <ScrollView>
            {
                movie && (
                    <>
                    <MovieImage poster_path={movie.poster_path} />
                    <MovieTrailer setShowVideo={setShowVideo} />
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
    }
})
