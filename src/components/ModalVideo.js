import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { IconButton, Modal, Title } from 'react-native-paper'
import YouTube from 'react-native-youtube'
import { getVideoMovieApi } from '../api/movie'

export default function ModalVideo(props) {

    const { show, setShow, idMovie } = props
    
    const [video, setVideo] = useState(null)

    useEffect(() => {
        getVideoMovieApi(idMovie).then(response=>{
            let id_video = null
            response.results.forEach(video => {
                if (video.site === 'YouTube' && !id_video ) id_video = video.key
            });
            setVideo(id_video)
        })
    }, [])

    return (
        <Modal visible={show} contentContainerStyle={styles.modal} >
            {
                video && <YouTube apiKey="AIzaSyCO-1qb4_AOEkOBcw_VGsP4rKlN4EO8-KM" videoId={video} style={styles.video} />
            }
            <IconButton icon="close" onPress={()=>setShow(false)} style={styles.close} />
        </Modal>
    )
}

const styles = StyleSheet.create({
    modal: {
        backgroundColor: "#000",
        height: "120%",
        alignItems: "center"
    },
    close: {
        backgroundColor: "#1ea1f2",
        width: 50,
        height: 50,
        borderRadius: 100,
        position: "absolute",
        bottom: 100
    },
    video: {
        alignSelf: "stretch",
        height: 300
    }
})
