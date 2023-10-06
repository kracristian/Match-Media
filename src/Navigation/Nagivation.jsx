import React from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Navigation = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button
          title="Peliculas"
          onPress={() => navigation.navigate('Peliculas')}
        />
        <Button
          title="Series"
          onPress={() => navigation.navigate('Series')}
        />
        <Button
          title="Plataformas"
          onPress={() => navigation.navigate('Plataformas')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default Navigation;
