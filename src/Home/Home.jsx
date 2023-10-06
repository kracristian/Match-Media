import React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import Navigation from '../Navigation/Nagivation.jsx';

const Home = () => {

  return (
        <View style={styles.container}>
            <View >
                <Navigation />
            </View>

            <View>
                <View style={styles.contentContainer}>
                    <Text style={styles.headerText}>¡Bienvenido a la Aplicación!</Text>
                    <Text style={styles.contentText}>Este es el contenido de la vista de inicio.</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Centra el contenido verticalmente
    padding: 16,
  },
  contentContainer: {
    alignItems: 'center', // Centra el contenido horizontalmente
    marginBottom: 20, // Espacio entre el título/contenido y los botones
  },
  headerText: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 8,
  },
  contentText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row', // Alinea los botones horizontalmente
    justifyContent: 'space-around', // Espacia los botones uniformemente
  },
});

export default Home;
