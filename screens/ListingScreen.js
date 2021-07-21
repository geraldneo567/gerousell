import React, {useLayoutEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from "react-native";
import {auth, db} from "../firebase.js";
import {Button} from "react-native-elements";
import {AntDesign} from "@expo/vector-icons";

const ListingScreen = ({navigation, route}) => {

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitleAlign: "center",
            headerTintColor: "black",
            headerRight: () => {
                if (auth.currentUser.displayName === route.params.userName) {
                    return (
                        <View style={{marginRight: 13, flexDirection: "row"}}>
                            <TouchableOpacity activeOpacity={0.5} onPress={deleteHandler}>
                                <AntDesign name={"delete"} size={24} color={"white"} />
                            </TouchableOpacity>
                        </View>
                    )
                }

            },
        })

    }, [])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: route.params.listingName
        })
    })

    const uri = route.params.photo
    const deleteHandler = () => {
        if (auth.currentUser.displayName === route.params.userName) {
            db.collection("Listings").doc(route.params.listingName + "-" + route.params.userName).delete().then(() => {
                navigation.replace("Home");
                alert("Deleted Listing Successfully!")
            }).catch(err => alert(err));
        } else {
            alert("Not your Listing!");
        }
    }
    const startChatHandler = () => {
        db.collection("Chats").doc(route.params.listingName).set({
            buyer: auth.currentUser.displayName,
            seller: route.params.userName,
            listingName: route.params.listingName,
            itemPhoto: uri
        }).then(() => {
            navigation.navigate("Conversation", {listingName: route.params.listingName});
        })
    }


    return (
        <View style={styles.container}>
            <Image source={{uri: uri}} style={styles.image} />
            <View style={styles.textContainer}>
                <Text style={styles.nameText}>{route.params.listingName}</Text>
                <Text style={styles.priceText}>${route.params.price}</Text>
                <Text style={styles.descriptionText}>{route.params.description}</Text>
                <Text style={styles.sellerText}>Seller: {route.params.userName}</Text>
            </View>


            <Button onPress={startChatHandler} disabled={auth.currentUser.displayName === route.params.userName} title={"Chat/Make Offer"} buttonStyle={styles.button}/>



        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1
    },
    sellerText: {
        marginLeft: 10,
    },

    nameText: {
      fontWeight: "bold",
        fontSize: 50,
        marginLeft: 10,
    },

    priceText: {
        fontWeight: "bold",
        fontSize: 35,
        marginLeft: 10,
    },

    descriptionText: {
      fontSize: 15,
        marginLeft: 10,
        height: 200
    },

    textContainer: {
        alignSelf: 'flex-start',
        alignItems: 'flex-start',
    },

    buttonContainer: {
       flexDirection: 'row',
    },
    button: {
        backgroundColor: '#a83232',
        width: 150,
        height: 50,
        marginHorizontal: 20,
        marginTop: 10,
    },
    image: {
        height: '40%',
        width: '100%',
        resizeMode: 'contain',
    }
})

export default ListingScreen;