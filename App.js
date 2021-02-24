import React from 'react'
import { Text, SafeAreaView } from 'react-native'
import { Provider } from 'react-native-paper'
import { Card, Button } from 'react-native-paper';


export default function App() {
  return (
    <Provider>
      <SafeAreaView>
        <Text>Hola mundo</Text>
        <Button icon="image" mode="contained" onPress={()=>console.log('hola')} >Boton</Button>
      </SafeAreaView>
    </Provider>
  )
}
