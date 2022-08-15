import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { useState } from 'react';
import customData from './config/config.json';

export default function App() {
  const [name, setName] = useState("Hektor");
  const [person, setPerson] = useState({ name: "mario", age: 40 });
  const [json, setJSON] = useState({ gzuz: "yeee" });

  const [pw, setPW] = useState("");
  const [username, setUsername] = useState("");

  const clickHandler = () => {
    setName("Paul");
    setPerson({ name: "Luigi", age: 69 })
    fetch(`http://${customData.hostIP}:${customData.port}/status`)
      .then(res => res.json())
      .then(response => setJSON(response))
      .catch(err => console.log(err));
  }

  const doLogin = () => {
    fetch(`http://${customData.hostIP}:${customData.port}/login`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: `${username}`,
        pw: `${pw}`
      })
    });
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    backgroundColor: 'pink',
    padding: 20,
    alignItems: 'center'
  },
  boldText: {
    fontWeight: 'bold'
  },
  body: {
    backgroundColor: 'yellow',
    padding: 20
  },
  button: {
    marginTop: 20
  },
  input: {
    borderWidth: 1,
    borderColor: "#777",
    padding: 8,
    margin: 10,
    width: 200
  }

});
