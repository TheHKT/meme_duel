import { StatusBar } from 'expo-status-bar';
import { Text, View, Button, TextInput } from 'react-native';
import { styles } from '../styles/style.js';
import { useState } from 'react';
import config from '../config/config.json'



export const Register = ({ navigation }) => {
    const [pw, setPW] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("")


    const doLogin = () => {
        fetch(`http://${config.hostIP}:${config.port}/registerPlayer`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: `${username}`,
                email: `${email}`,
                pw: `${pw}`

            })
        }).catch(err => console.log(err));
    }
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.header}>Register</Text>
                <Text>Username:</Text>
                <TextInput style={styles.input} placeholder="{username}" onChangeText={(value) => setUsername(value)} />
                <Text>Password: </Text>
                <TextInput style={styles.input} placeholder="{pw}" onChangeText={(value) => setPW(value)} />
                <Text>E-Mail: </Text>
                <TextInput style={styles.input} placeholder="{E-Mail}" onChangeText={(value) => setEmail(value)} />
                <View style={styles.button}>
                    <Button title="Submit" onPress={doLogin} />
                </View>
            </View>
        </View>
    )
}