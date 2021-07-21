import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {useState, useEffect, useLayoutEffect} from "react";
import {Image, KeyboardAvoidingView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Button, Input, Text} from "react-native-elements"
import {auth, db} from "../firebase.js";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";

const RegisterScreen = ({navigation}) => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [reEnteredPassword, setReEnteredPassword] = useState("")
    const [imageUrl, setImageUrl] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")

    const registerHandler = () => {
        if (password === reEnteredPassword) {
            auth.createUserWithEmailAndPassword(email, password).then(authUser => {
                authUser.user.updateProfile({
                    displayName: name,
                    photoURL: imageUrl || "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png"})
                db.collection("phoneNumbers").doc(name).set({
                    phoneNumber: phoneNumber
                })
            }).catch(error => alert(error));
        } else {
            alert("Passwords do not match.");
        }
    }

    return (
        <KeyboardAwareScrollView contentContainerStyle={styles.container}>
            <Text h4 style={{marginBottom: 40}}>Create a gerousell account</Text>
            <Input placeholder={"Display Name"} type={"text"} onChangeText={text => setName(text)}/>
            <Input placeholder={"Email"} type={"email"} onChangeText={text => setEmail(text)}/>
            <Input placeholder={"Phone Number"} type={"text"}  onChangeText={text => setPhoneNumber(text)}/>
            <Input placeholder={"Profile Picture URL (Optional)"} type={"text"}  onChangeText={text => setImageUrl(text)}/>
            <Input placeholder={"Password"} type={"password"} secureTextEntry onChangeText={text => setPassword(text)}/>
            <Input placeholder={"Re-Enter Password"} type={"password"} secureTextEntry onChangeText={text => setReEnteredPassword(text)}/>
            <Button buttonStyle={styles.button} onPress={registerHandler} title={"Register"}/>
        </KeyboardAwareScrollView>
    )}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    button: {
        backgroundColor: '#a83232',
        width: 200,
    }

})

export default RegisterScreen;