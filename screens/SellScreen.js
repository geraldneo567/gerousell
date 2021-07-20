import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput, KeyboardAvoidingView} from 'react-native'
import {auth, db} from "../firebase";
import {Button, Input} from "react-native-elements";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const SellScreen = ({navigation}) => {
    const [location, setLocation] = useState('');
    const [listingName, setListingName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [photoUrl, setPhotoUrl] = useState('')
    const user = auth.currentUser;
    const createListing = async () => {
        await db.collection('Listings').add({
            userName: user.displayName,
            location: location,
            listingName: listingName,
            description: description,
            price: price,
            photoUrl: photoUrl || 'https://i.stack.imgur.com/y9DpT.jpg'
            })
            .then(() => {
                alert("Listing: " + listingName + " successfully added!");
                navigation.goBack();
            })
            .catch(error => alert(error));
    }

    return (
        <KeyboardAwareScrollView>
            <View>
                <Input
                    style={styles.input}
                    placeholder={"What are you selling?"}
                    onChangeText={text => setListingName(text)}
                />

                <View style={styles.textAreaContainer}>
                    <TextInput
                        style={styles.textArea}
                        placeholder={"Description along with additional details"}
                        onChangeText={text => setDescription(text)}
                    />
                </View>
                <Input
                    style={styles.input}
                    placeholder={"Price"}
                    keyboardType={"number-pad"}
                    onChangeText={text => setPrice(text)}
                />
                <Input
                    style={styles.input}
                    placeholder={"Location"}
                    onChangeText={text => setLocation(text)}
                />
                <Input
                    style={styles.input}
                    placeholder={"Enter Photo URL of Item (Optional)"}
                    onChangeText={text => setPhotoUrl(text)}
                />
                <View style={styles.buttonContainer}>
                    <Button buttonStyle={styles.button} title={"Submit Listing!"} onPress={createListing} />
                </View>

            </View>

        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    textAreaContainer: {
        width: 300,
        alignSelf: 'center',
        borderColor: 'grey',
        borderWidth: 1,
        padding: 5
    },

    input: {
        height: 30,
        margin: 5,
    },

    textArea: {
        height: 200,
        justifyContent: "flex-start"
    },

    button: {
        backgroundColor: '#a83232',
        width: 200,
        height: 75,
    },

    buttonContainer: {
        justifyContent: 'flex-end',
        alignItems: 'center',
    }

})

export default SellScreen