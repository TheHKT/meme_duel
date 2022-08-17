import { StatusBar } from 'expo-status-bar';
import { Text, View, Button, TextInput } from 'react-native';
import { styles } from '../styles/style.js';
import { useState } from 'react';
import config from '../config/config.json'

export const Login = ({ navigation, route }) => {
    const [pw, setPW] = useState(route.params.pw);
    const [username, setUsername] =  useState(route.params.username);
    const [input, setInput] = useState({});

    const doLogin = () => {
        fetch(`http://${config.hostIP}:${config.port}/login`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: `${username}`,
                pw: `${pw}`
            })
        })
        .then(res => res.json())
        .then(response => response.errorOccurred ? alert(response.errorMessage) : navigation.navigate('Home', response.Data))
        .catch(err => alert("An error occurred!"));
        setInput({username: username, pw: pw})
    }
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.header}>Username</Text>
                <TextInput style={styles.input} placeholder="{username}" onChangeText={(value) => setUsername(value)} />
                <Text style={styles.header}>Password</Text>
                <TextInput style={styles.input} placeholder="{pw}" onChangeText={(value) => setPW(value)} />
                <View style={styles.button}>
                    <Button title="Submit" onPress={doLogin} />
                </View>
            </View>
            <StatusBar style="auto" />
            <Button
                title="Register"
                style={styles.button}
                onPress={() =>
                    navigation.navigate('Register', input)
                }
            />
        </View>
    )
}