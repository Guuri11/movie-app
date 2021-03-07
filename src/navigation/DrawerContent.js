import React, { useState } from 'react'
import { DrawerContentScrollView } from "@react-navigation/drawer"
import { Drawer, Switch, TouchableRipple, Text } from "react-native-paper"
import usePreference from "../hooks/usePreferences"
import { StyleSheet, View } from 'react-native'

export default function DrawerContent(props) {

    const { navigation } = props

    const [active, setActive] = useState("home")

    const { theme, toggleTheme } = usePreference()

    const onChangeScreen = (screen) => {
        navigation.navigate(screen)
        setActive(screen)
    }

    return (
        <DrawerContentScrollView>
            <Drawer.Section>
                <Drawer.Item
                label="Inicio"
                active={active === "home"}
                onPress={() =>onChangeScreen("home")}
                />
                <Drawer.Item
                label="Películas populares"
                active={active === "popular"}
                onPress={()=> onChangeScreen("popular")}
                />
                <Drawer.Item
                label="Nuevas películas"
                active={active === "news"}
                onPress={() => onChangeScreen("news")}
                />
            </Drawer.Section>

            <Drawer.Section title="Opciones">
                <TouchableRipple>
                    <View style={styles.preferences} >
                        <Text>Tema oscuro</Text>
                        <Switch value={theme === "dark"} onValueChange={toggleTheme} />
                    </View>
                </TouchableRipple>
            </Drawer.Section>
        </DrawerContentScrollView>
    )
}

const styles = StyleSheet.create({
    preferences: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignContent: "center",
        paddingVertical: 12,
        paddingHorizontal: 16
    }
})
