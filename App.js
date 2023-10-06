import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import LoginScreen from './src/login/Components_Login.jsx';
import NuevaVista from './src/sign/Components_Sign.jsx';
import Home from './src/Home/Home.jsx';
import Peliculas from './src/Navigation/FilmsScreen.jsx';
import Series from './src/Navigation/SeriesCreen.jsx';
import Plataformas from './src/Navigation/PlatForms.jsx';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="NuevaVista" component={NuevaVista} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />

        <Stack.Screen name="Peliculas" component={Peliculas} options={{ headerShown: false }} />
        <Stack.Screen name="Series" component={Series} options={{ headerShown: false }} />
        <Stack.Screen name="Plataformas" component={Plataformas} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
