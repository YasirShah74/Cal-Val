import React, { useState } from 'react';
import { useHistory } from 'react-router-native';
import * as SecureStore from 'expo-secure-store';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Platform,
    Keyboard,
    ActivityIndicator,
} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#5F4B8BFF',
        color:'white',
    },
    contentContainerStyle: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 50,
        paddingRight: 50,
    },
    inputContainer: {
        width: '100%',
        borderColor: 'black',
        borderWidth: 1,
        padding: 10,
        marginTop: 10,
        borderRadius: 20,
    },
    button: {
        padding: 10,
        marginTop: 10,
        backgroundColor: '#E69A8DFF',
        width: '70%',
        borderRadius: 50,

    },
    buttonText: {
        textAlign: 'center',
        color: '#fff',
        fontSize:28,  
    },
   
    heading: {
        fontWeight: 'bold',
        marginBottom: 20,
        fontSize: 32,
        color:'white',
    },
});

const Login = function() {
    SecureStore.getItemAsync('accessToken').then((value) => {
      if (value) {
        history.push('/pass');
      }
    });

    const history = useHistory();
    const [password, setPassword] = useState('abcd');
    const [loading, setLoading] = useState(false);

    const shif = () => {
       if (password == 'abcd') {
          history.push('/pass');
        }
        else{
        alert('Invalid Username or Password!')
      }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.contentContainerStyle}>

                    <Text style={styles.heading}>Val Cal</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
         value={password}
                            onChangeText={setPassword}
                            secureTextEntry={true}
                            />
                    </View>
                    <TouchableOpacity style={styles.button} onPress={shif} disabled={loading}>
                        {
                            loading
                            ? <ActivityIndicator/>
                            : <Text style={styles.buttonText}>Password</Text>
                        }
                    </TouchableOpacity>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
};

export default Login;
