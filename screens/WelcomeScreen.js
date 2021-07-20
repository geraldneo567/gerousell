import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {useState, useEffect} from "react";
import {Image, KeyboardAvoidingView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Button, Input, Text} from "react-native-elements"
import {auth, db} from "../firebase.js";

const WelcomeScreen = ({navigation}) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                navigation.replace("Home")
            }
        });

        return unsubscribe;
    }, [])

    const loginHandler = () => {
        auth.signInWithEmailAndPassword(email, password).then(user => {
            setEmail("");
            setPassword("");
        }).catch(error => alert(error))
    }

    return (
    <KeyboardAvoidingView style={styles.container}>

        <StatusBar style={"light"} />

        <Image source={require("../assets/gerousellicon.png")} style={styles.icon} resizeMode={"contain"}/>

        <View style={styles.inputContainer}>
            <Input placeholder={"Email"} type={"email"} onChangeText={text => setEmail(text)}/>
            <Input placeholder={"Password"} type={"password"} secureTextEntry onChangeText={text => setPassword(text)}/>
        </View>
        <Button title={"Login"} buttonStyle={styles.loginButton} onPress={loginHandler}/>

        <View style={styles.forgotPassword}>
            <Text>Forgot Password? Tap </Text>
            <TouchableOpacity>
                <Text style={{textDecorationLine: "underline"}}>here</Text>
            </TouchableOpacity>
        </View>

        <View style={styles.register}>
            <Text>Don't have an account? Sign up now!</Text>
            <Button title={"Register"} buttonStyle={styles.registerButton} onPress={() => navigation.navigate("Register")}/>
        </View>

    </KeyboardAvoidingView>
)}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    inputContainer: {
        width: 300,
        marginTop: 20
    },

    icon: {
        width: 230,
        height: 230,
    },

    registerButton: {
        backgroundColor: '#a83232',
        width: 80,
        marginTop: 10
    },

    loginButton: {
        backgroundColor: '#a83232',
        width: 200,
    },

    register: {
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginTop: 40,
    },

    forgotPassword: {
        flexDirection: 'row',
        marginTop: 40
    }

})

export default WelcomeScreen;