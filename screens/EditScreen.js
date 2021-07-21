import React, {useState} from 'react';
import {View, Text, StyleSheet, Modal} from 'react-native'
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {Button, Input} from "react-native-elements";
import {auth, db} from "../firebase"

const EditScreen = ({navigation}) => {
    const [name, setName] = useState(auth.currentUser.displayName)
    const [email, setEmail] = useState(auth.currentUser.email)
    const [password, setPassword] = useState("")
    const [reEnteredPassword, setReEnteredPassword] = useState("")
    const [imageUrl, setImageUrl] = useState(auth.currentUser.photoURL)
    const [phoneNumber, setPhoneNumber] = useState('')
    const [passwordMode, setPasswordMode] = useState(false)


    db.collection('phoneNumbers').doc(name).get().then((doc) => {
        if (doc.exists) {
            setPhoneNumber(doc.data().phoneNumber)
        }
    })


    const saveHandler = () => {
        auth.currentUser.updateProfile({
            displayName: name,
            photoURL: imageUrl,
        }).then(() => {
            auth.currentUser.updateEmail(email).then(() => {
                db.collection("phoneNumbers").doc(name).set({
                    phoneNumber: phoneNumber
                })
            }).catch(err => alert(err))
            alert("Successfully updated details")
            setTimeout(() => navigation.navigate("Home"), 1000);
        }).catch((error) => {
            alert(error)
        });
    }

    const passwordChangeHandler = () => {
        if (password === reEnteredPassword) {
            auth.currentUser.updatePassword(password).then(() => {
                alert("Password successfully updated.")
                setPassword('');
                setReEnteredPassword('');
                setPasswordMode(false)
            }).catch(err => alert(err))
        } else {
            alert("Entered passwords do not match, please try again!")
        }
    }

    return (
            <KeyboardAwareScrollView >
                <Text style={{marginLeft: 10, marginTop: 25}}>
                    Current Display Name: {name}
                </Text>
                <Text style={{marginLeft: 10, marginTop: 25}}>
                    Current Email: {email}
                </Text>
                <Text style={{marginLeft: 10, marginTop: 25}}>
                    Current Phone Number: {phoneNumber}
                </Text>
                <Text style={{marginLeft: 10, marginTop: 25}}>
                    Current Photo URL: {imageUrl}
                </Text>
                <View style={{marginTop: 10}}>
                    <Input placeholder={"Display Name"} type={"text"} onChangeText={text => setName(text)} />
                    <Input placeholder={"Email"} type={"email"} onChangeText={text => setEmail(text)} />
                    <Input placeholder={"Phone Number"} keyboardType={'number-pad'} type={"text"} onChangeText={text => setPhoneNumber(text)}/>
                    <Input placeholder={"Profile Picture URL (Optional)"} type={"text"} onChangeText={text => setImageUrl(text)}/>

                    <Modal visible={passwordMode}>
                        <Text style={{marginLeft: 10}}>Change Your Password</Text>
                        <Input placeholder={"Password"} type={"password"} secureTextEntry onChangeText={text => setPassword(text)}/>
                        <Input placeholder={"Re-Enter Password"} type={"password"} secureTextEntry onChangeText={text => setReEnteredPassword(text)}/>
                        <View>
                            <Button buttonStyle={styles.button} title={"Cancel"} onPress={() => setPasswordMode(false)}/>
                            <Button buttonStyle={styles.button} title={"Save New Password"} onPress={passwordChangeHandler} />
                        </View>
                    </Modal>
                </View>
                    <Button buttonStyle={styles.button} title={"Change Password"} onPress={() => setPasswordMode(true)}/>
                    <Button buttonStyle={styles.button} title={"Save Changes"} onPress={saveHandler}/>

            </KeyboardAwareScrollView>
    )
}

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
        alignSelf: 'center',
        marginTop: 25
    }

})

export default EditScreen