import React from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

async function save(key, value) {
    await SecureStore.setItemAsync(key, value);
}

const RegistroScreen = () => {
    const navigation = useNavigation();
    const validationSchema = Yup.object().shape({
        name: Yup.string().required('El nombre es obligatorio'),
        email: Yup.string().email('Correo electrónico inválido').required('El correo electrónico es obligatorio'),
        password: Yup.string().min(6, 'La contraseña debe tener al menos 6 caracteres').required('La contraseña es obligatoria'),
        RePassword: Yup.string().min(6, 'Confirmar contraseña debe tener al menos 6 caracteres').required('Confirmar contraseña es obligatoria'),
    }); 

    const handleSubmit = async (values) => {
        
        if (values.password === values.RePassword) {
            delete values.RePassword;
            if(!values.roles) values.roles = ['user'];
            const response = await axios.post('https://media-friends-check-production.up.railway.app/api/auth/signup', values);
            let {data} = response;
            save('token',data.token)

            navigation.navigate('Home');
        } else {
            alert('Contraseñas son diferentes');
        }
    };

    const handleLogin = (values) => {
        navigation.navigate('Login');
    };

    return (
        <View style={styles.container}>
            <Image source={require('../img/logo_registro.jpg')} style={styles.logo} />
            <Formik
                initialValues={{ name: '', email: '', password: '',  RePassword: ''}}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                    <View>
                        <Text style={styles.label}>Nombre:</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={handleChange('name')}
                            onBlur={handleBlur('name')}
                            value={values.name}
                            placeholder="Ingrese su nombre"
                        />
                        {errors.name && <Text style={styles.error}>{errors.name}</Text>}

                        <Text style={styles.label}>Email:</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                            placeholder="Ingrese su correo electrónico"
                        />
                        {errors.email && <Text style={styles.error}>{errors.email}</Text>}

                        <Text style={styles.label}>Contraseña:</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                            secureTextEntry={true}
                            placeholder="Ingrese su contraseña"
                        />
                        {errors.password && <Text style={styles.error}>{errors.password}</Text>}

                        <Text style={styles.label}>Confirmar Contraseña:</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={handleChange('RePassword')}
                            onBlur={handleBlur('RePassword')}
                            value={values.RePassword}
                            secureTextEntry={true}
                            placeholder="Confirme su contraseña"
                        />
                        {errors.RePassword && <Text style={styles.error}>{errors.RePassword}</Text>}

                        <TouchableOpacity style={styles.buttonStyle}>
                            <Button title="Registrarse" onPress={handleSubmit} />
                        </TouchableOpacity>

                        <View style={styles.separator}></View>

                        <TouchableOpacity style={styles.buttonStyle}>
                            <Button title="Login" onPress={handleLogin} />
                        </TouchableOpacity>
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
        marginBottom: -10,
        marginTop: -150,
    },
    label: {
        fontSize: 16,
        marginBottom: 4,
        marginBottom:5,
        marginTop:5
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
    buttonStyle: {
        backgroundColor: 'blue', // Cambia el color de fondo según tus preferencias
        borderRadius: 10, // Ajusta el valor de borderRadius para cambiar la cantidad de redondeo
        paddingVertical: 2,
        paddingHorizontal: 2,
        marginBottom:5,
        marginTop:5
      },
      separator: {
        width: 10,
        padding:2
      },
});

export default RegistroScreen;
