import { Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Text, View, Button, TextInput, InputAccessoryView } from 'react-native';
import { styles } from '../styles/style.js';
import { useState } from 'react';
import config from '../config/config.json'
import * as React from "react";
import { Input } from "@rneui/base";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export const Home = ({ navigation, route }) => {
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
                <Text style={styles.header}>Hello Overview</Text>
                <Text>{JSON.stringify(route.params)}</Text>
        </View>
        </TouchableWithoutFeedback>
    )
}