import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

async function save(key, value) {
  await SecureStore.setItemAsync(key, value);
}

const validationSchema = Yup.object().shape({
  email: Yup.string()
              .email('Correo electrónico inválido')
              .required('El correo electrónico es obligatorio'),
  password: Yup.string()
                  .min(6, 'La contraseña debe tener al menos 6 caracteres')
                  .required('La contraseña es obligatoria'),
});

const LoginScreen = () => {
  
  const navigation = useNavigation();

  const handleSubmit = async (values) => {
    const response = await axios.post('https://media-friends-check-production.up.railway.app/api/auth/signin', values);
    let {data} = response;

    if (data.signin == true) {
      save('token',data.token)
      navigation.navigate('Home');
    }else {
      alert('Credenciales incorrectas');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../img/logo.png')} style={styles.logo} />
      <Text style={styles.labelCenter}>Match Media</Text>

      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View>
            <Text style={styles.label}>Email:</Text>
            <TextInput
              style={styles.input}
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              placeholder="Ingrese su correo electrónico"
            />
            {errors.email && touched.email && <Text style={styles.error}>{errors.email}</Text>}

            <Text style={styles.label}>Contraseña:</Text>
            <TextInput
              style={styles.input}
              value={values.password}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              secureTextEntry={true}
              placeholder="Ingrese su contraseña"
            />
            {errors.password && touched.password && <Text style={styles.error}>{errors.password}</Text>}

            <View style={styles.buttonContainer}>

              <TouchableOpacity style={styles.buttonStyle}>
                <Button style={styles.buttonStyle} title="Iniciar sesión" onPress={handleSubmit} />
              </TouchableOpacity>
              <View style={styles.separator}></View>

              <TouchableOpacity style={styles.buttonStyle}>
                <Button title="Crear Usuario" onPress={() => navigation.navigate('NuevaVista')} />
              </TouchableOpacity>

            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 40,
    marginTop: -150,
    alignSelf: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  labelCenter: {
    fontSize: 20,
    marginTop: -40,
    marginBottom: 20,
    alignSelf:'center',
    color:'red'
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 2,
    marginBottom: 5,
    paddingLeft: 4,
    paddingRight: 4,
    width: 300,
},
  error: {
    color: 'red',
    fontSize: 12,
  },
  buttonContainer: {
    justifyContent: 'space-between',    
  },
  separator: {
    width: 10,
    padding:2
  },
  buttonStyle: {
    backgroundColor: 'blue', // Cambia el color de fondo según tus preferencias
    borderRadius: 10, // Ajusta el valor de borderRadius para cambiar la cantidad de redondeo
    paddingVertical: 2,
    paddingHorizontal: 2,
    marginBottom:5,
    marginTop:5
  },
});

export default LoginScreen;

