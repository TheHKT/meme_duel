import { StatusBar } from 'expo-status-bar';
import { Text, View, Button, TextInput, InputAccessoryView } from 'react-native';
import { styles } from '../styles/style.js';
import { useState } from 'react';
import config from '../config/config.json'
import * as React from "react";
import { Input } from "@rneui/base";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";



export const Register = ({ navigation }) => {
    const [pw, setPW] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("")

    const inputAccessoryViewID = 'uniqueID';


    const doRegister = () => {
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
                <TextInput keyboardDismissMode="interactive" style={styles.input} placeholder="{username}" onChangeText={(value) => setUsername(value)} />
                <Text>Password: </Text>
                <TextInput style={styles.input} placeholder="{pw}" onChangeText={(value) => setPW(value)} />
                <Text>E-Mail: </Text>
                <Input
                    containerStyle={styles.input}
                    disabledInputStyle={{ background: "#ddd" }}
                    //inputContainerStyle={{}}
                    //errorMessage="Oops! that's not correct."
                    //errorProps={{}}
                    //errorStyle={{}}
                   // inputStyle={{}}
                    label="User Form"
                    labelStyle={{}}
                    labelProps={{}}
                    rightIcon={<Icon name="close" size={20} />}
                    rightIconContainerStyle={{}}
                    placeholder="Enter Email"
                    onChangeText={(value) => setEmail(value)}
                />
                <View style={styles.button}>
                    <Button title="Submit" onPress={doRegister} />
                </View>
            </View>
        </View>
    )
}



