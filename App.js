import React from 'react'
import { Text, SafeAreaView } from 'react-native'
import { Provider } from 'react-native-paper'
import { Button } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    <Provider>
      <NavigationContainer>
        <SafeAreaView>
          <Text>Hola mundo</Text>
          <Button icon="image" mode="contained" onPress={() => console.log('hola')} >Boton</Button>
        </SafeAreaView>
      </NavigationContainer>
    </Provider>
  )
}
