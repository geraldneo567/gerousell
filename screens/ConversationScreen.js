import React, {useLayoutEffect, useState} from 'react'
import {
    Text,
    StyleSheet,
    View,
    TouchableOpacity,
    SafeAreaView,
    KeyboardAvoidingView,
    ScrollView,
    TextInput, Platform, Keyboard, TouchableWithoutFeedback
} from 'react-native'
import {Avatar} from "react-native-elements";
import {Ionicons} from "@expo/vector-icons";
import {StatusBar} from "expo-status-bar";
import {db, auth} from "../firebase";
import * as firebase from "firebase";

const ConversationScreen = ( {navigation, route} ) => {

    const [input, setInput] = useState('')
    const [messages, setMessages] = useState([])


    const sendMessage = () => {
        Keyboard.dismiss();
        db.collection('Chats').doc(route.params.listingName).collection('messages').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            displayName: auth.currentUser.displayName,
            photoURL: auth.currentUser.photoURL,
        })
        setInput('')
    }


    useLayoutEffect(() => {
        const unsubscribe = db.collection('Chats').doc(route.params.listingName).collection('messages').orderBy('timestamp').onSnapshot(
            (snapshot) => setMessages(
                snapshot.docs.map(doc => ({
                        id: doc.id,
                        data: doc.data()
                    }
                ))
            ))

        return unsubscribe
    }, [])

    useLayoutEffect(() => {
        navigation.setOptions({
            title: route.params.listingName,
        })

    }, [])


    return (
        <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
            <StatusBar style={"light"} />
            <KeyboardAvoidingView behaviour={Platform.OS === "ios" ? "padding" : "height"} style={styles.container} keyboardVerticalOffset={40}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <>
                        <ScrollView contentContainerStyle={{paddingTop: 15}}>
                            {messages.map(({id, data}) => (
                                data.displayName === auth.currentUser.displayName ? (
                                    <View key={id} style={styles.receiver}>
                                        <Avatar
                                            rounded
                                            size={30}
                                            position={"absolute"}
                                            bottom={-15}
                                            right={-5}
                                            source={{
                                                uri: data.photoURL,
                                            }}
                                        />
                                        <Text style={styles.receiver}>{data.message}</Text>
                                    </View>
                                ) : (
                                    <View style={styles.sender}>
                                        <Avatar
                                            rounded
                                            size={30}
                                            position={"absolute"}
                                            bottom={-15}
                                            right={-5}
                                            source={{
                                                uri: data.photoURL,
                                            }}
                                        />
                                        <Text style={styles.senderText}>{data.message}</Text>
                                        <Text style={styles.senderName}>{data.displayName}</Text>
                                    </View>
                                )
                            ))}
                        </ScrollView>
                        <View style={styles.footer}>
                            <TextInput value={input} placeholder={'Signal Message'} style={styles.textInput} onChangeText={text => setInput(text)}

                            />
                            <TouchableOpacity activeOpacity={0.5} >
                                <Ionicons name={"send"} size={24} color={"#2B68E6"} onPress={sendMessage}/>
                            </TouchableOpacity>
                        </View>
                    </>
                </TouchableWithoutFeedback>

            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        padding: 15
    },

    textInput: {
        bottom: 0,
        height: 40,
        flex: 1,
        backgroundColor: "#ECECEC",
        marginRight: 15,
        padding: 10,
        color: "grey",
        borderRadius: 30,
        width: '90%'
    },

    receiver: {
        padding: 15,
        backgroundColor: "#ECECEC",
        alignSelf: 'flex-end',
        borderRadius: 20,
        marginRight: 15,
        marginBottom: 20,
        maxWidth: '80%',
        position: 'relative'
    },

    sender: {
        padding: 15,
        backgroundColor: '#34a1eb',
        alignSelf: 'flex-start',
        borderRadius: 20,
        marginLeft: 15,
        marginBottom: 20,
        maxWidth: '80%',
        position: 'relative'
    },

    senderName: {
        left: 10,
        paddingRight: 10,
        fontSize: 10,
        color: "white"
    },

    senderText: {
        color: "white",
        fontWeight: "500",
        marginLeft: 10,
        marginBottom: 15
    }
})

export default ConversationScreen;

