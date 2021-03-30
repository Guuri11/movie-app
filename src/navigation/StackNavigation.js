import React from 'react'
import { createStackNavigator } from "@react-navigation/stack"
import Home from "../screens/Home"
import Movie from "../screens/Movie"
import News from "../screens/News"
import Popular from "../screens/Popular"
import Search from "../screens/Search"
import { IconButton } from 'react-native-paper'

const Stack = createStackNavigator()

export default function StackNavigation(props) {

    // este objeto tiene distintas propiedades relacionadas con el routing de la app (por ejemplo la funcion de goBack)
    const { navigation } = props

    const buttonLeft = (screen) => {

        return screen === "movie" || screen === "search" ?
            <IconButton icon="arrow-left" onPress={() => navigation.goBack()} />
            :
            <IconButton icon="menu" onPress={() => navigation.openDrawer()} />
    }

    const buttonRight = () => {
        return (
            <IconButton icon="magnify" onPress={() => navigation.navigate("search")} />
        )
    }

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="home"
                component={Home}
                options={{ title: "The movie app", headerLeft: () => buttonLeft("home"), headerRight: buttonRight }} />
            <Stack.Screen
                name="movie"
                component={Movie}
                options={{ title: "", headerLeft: () => buttonLeft("movie"), headerRight: buttonRight }} />
            <Stack.Screen
                name="news"
                component={News}
                options={{ title: "Nuevas películas", headerLeft: () => buttonLeft("news"), headerRight: buttonRight }} />
            <Stack.Screen
                name="popular"
                component={Popular}
                options={{ title: "Películas populares", headerLeft: () => buttonLeft("popular"), headerRight: buttonRight }} />
            <Stack.Screen
                name="search"
                component={Search}
                options={{ title: "", headerLeft: () => buttonLeft("search") }} />
        </Stack.Navigator>
    )
}
