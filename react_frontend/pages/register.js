import { StatusBar } from 'expo-status-bar';
import { Text, View, Button, TextInput } from 'react-native';
import { styles } from '../styles/style.js';
import { useState } from 'react';
import config from '../config/config.json'



export const Register = ({ navigation }) => {
    const [name, setName] = useState("Hektor");
    const [person, setPerson] = useState({ name: "mario", age: 40 });
    const [json, setJSON] = useState({ gzuz: "yeee" });

    const [pw, setPW] = useState("");
    const [username, setUsername] = useState("");

    const clickHandler = () => {
        setName("Paul");
        setPerson({ name: "Luigi", age: 69 })
        fetch(`http://${config.hostIP}:${config.port}/status`)
            .then(res => res.json())
            .then(response => setJSON(response))
            .catch(err => console.log(err));
    }

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
        }).catch(err => console.log(err));
    }
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.header}>LOGIN</Text>
                <Text>Username:</Text>
                <TextInput style={styles.input} placeholder="{username}" onChangeText={(value) => setUsername(value)} />
                <Text>Password: </Text>
                <TextInput style={styles.input} placeholder="{pw}" onChangeText={(value) => setPW(value)} />
                <View style={styles.button}>
                    <Button title="Submit" onPress={doLogin} />
                </View>
            </View>
            <StatusBar style="auto" />
            <View>
                <Text style={styles.boldText}>My name is {name}</Text>
                <Text style={styles.boldText}>His name is {person.name} and his age is {person.age}</Text>
                <Text>Enter your name:</Text>
                <TextInput style={styles.input} placeholder="mein Name" onChangeText={(value) => setName(value)} />
                <Text>{JSON.stringify(json)}</Text>
            </View>
            <View style={styles.button}>
                <Button title="Update state" onPress={clickHandler} />
            </View>
        </View>
    )
}