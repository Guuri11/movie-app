import React from 'react'
import { StyleSheet, View, Image, Dimensions, Touchable, Text, TouchableWithoutFeedback } from 'react-native'
import { Title } from 'react-native-paper'
import Carousel from 'react-native-snap-carousel'
import { BASE_PATH_IMG } from '../utils/constants'

const {width} = Dimensions.get('window')
const ITEM_WIDTH = Math.round(width * 0.7)

export default function CarouselVertical(props) {

    const {data} = props

    return (
        <Carousel 
        layout="default"
        data={data}
        renderItem={(item) => <RenderItem data={item} />}
        sliderWidth={width}
        itemWidth={ITEM_WIDTH}
        />
    )
}

function RenderItem(props) {
    const {data} = props

    const {title, poster_path} = data.item

    return (
        <TouchableWithoutFeedback onPress={()=> console.log('hola')}>
            <View style={styles.card}>
                <Image style={styles.image} source={{uri: `${BASE_PATH_IMG}/w500/${poster_path}`}} />
                <Title style={styles.title} >{title}</Title>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    card: {
        shadowColor: '#000',
        textShadowOffset: {
            width: 0, height: 10
        },
        shadowOpacity: 1,
        shadowRadius: 10
    },
    image: {
        width: "100%",
        height: 450,
        borderRadius: 20
    },
    title: {
        marginHorizontal: 10,
        marginTop: 10
    }
})