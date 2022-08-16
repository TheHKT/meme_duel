import { StatusBar } from 'expo-status-bar';
import { Text, View, Button, TextInput } from 'react-native';
import { styles } from '../styles/style.js';
import { useState } from 'react';
import config from '../config/config.json'

export const Login = ({ navigation }) => {
    const [pw, setPW] = useState("");
    const [username, setUsername] = useState("");

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
        .then(response => response.errorOccurred ? alert(response.errorMessage) : alert (JSON.stringify(response.Data)))
        .catch(err => alert("An error occurred!"));
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
                    navigation.navigate('Register', { name: 'Jane' })
                }
            />
        </View>
    )
}