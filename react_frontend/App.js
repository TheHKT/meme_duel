import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useState } from 'react';

export default function App() {
  const [name, setName] = useState("freegzuz");

  const clickHandler = () => {
    setName("Suck my Duck!")
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>  
      <Text style={styles.boldText}>My name is {name}</Text>
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
  }

});
