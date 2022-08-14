import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { useState } from 'react';

export default function App() {
  const [name, setName] = useState("Hektor");
  const [person, setPerson] = useState({name:"mario", age: 40});

  const clickHandler = () => {
    setName("Paul");
    setPerson({name: "Luigi", age: 69})
  }

  return (
    <View style={styles.container}>
      <View>  
      <Text style={styles.boldText}>My name is {name}</Text>
      <Text style={styles.boldText}>His name is {person.name} and his age is {person.age}</Text>
      <Text>Enter your name:</Text>
      <TextInput style={styles.input} placeholder="mein Name" onChangeText={(value) => setName(value)}/>
      </View>
      <View style={styles.button}>
        <Button title="Update state" onPress={clickHandler}/>
      </View>
      
      <StatusBar style="auto" />
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
  },
  boldText: {
    fontWeight: 'bold'
  },
  body: {
    backgroundColor: 'yellow',
    padding: 20
  },
  button :{
    marginTop: 20
  },
  input : {
    borderWidth: 1,
    borderColor: "#777",
    padding: 8,
    margin: 10,
    width: 200
  }

});
