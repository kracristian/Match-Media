import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import Navigation from './Nagivation.jsx';

const PlatForms = () => {
    return (
        <View style={styles.container}>
            <Navigation />

            <View style={styles.header}>
                <Text style={styles.headerText}>¡Bienvenido a Plataformas!</Text>
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
    header: {
        marginBottom: 20,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    content: {
        alignItems: 'center',
    },
    contentText: {
        fontSize: 18,
    },
    buttonRow: {
        flexDirection: 'row', // Alinea los elementos en una fila horizontal
        justifyContent: 'space-between', // Espacia los elementos de manera uniforme
    },
    button: {
        marginHorizontal: 10, // Añade espacio horizontal entre los botones
    },
});

export default PlatForms;
