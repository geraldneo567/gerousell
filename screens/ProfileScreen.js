import React, {useLayoutEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image, FlatList} from "react-native";
import {auth, db} from "../firebase.js";
import ListingCard from "../components/ListingCard";
import {AntDesign} from "@expo/vector-icons";

const ProfileScreen = ({navigation}) => {
    const [listings, setListings] = useState([])
    const [newListings, setNewListings] = useState([])


    const enterListing = (listingName, userName, photo, price, listings, id) => navigation.navigate('Listing', {
        listingName,
        userName,
        photo,
        price,
        listings,
        id
    })

    useLayoutEffect(() => {
        const unsubscribe = db.collection('Listings').onSnapshot(snapshot =>
            setListings(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        )
        return unsubscribe
    }, [])


    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitleAlign: "center",
            headerTintColor: "black",
            headerRight: () => {
                return (
                    <View style={{marginRight: 13, flexDirection: "row"}}>
                        <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate("Edit")}>
                            <AntDesign name={"edit"} size={24} color={"white"} />
                        </TouchableOpacity>
                        <View style={{width: 15}}>

                        </View>
                        <TouchableOpacity activeOpacity={0.5} onPress={()  => auth.signOut().then(() => navigation.navigate("Welcome"))}>
                            <AntDesign name={"logout"} size={24} color={"white"} />
                        </TouchableOpacity>

                    </View>
                )
            },
        })

    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.profile}>
                <Image source={{uri: auth.currentUser.providerData[0].photoURL}} style={styles.image}/>
                <Text style={{fontWeight: "bold", fontSize: 30}}>{auth.currentUser.displayName}</Text>
            </View>

            <Text style={{alignSelf: "flex-start", marginLeft: 15}}>Your listings: </Text>
            <FlatList
                data={listings.filter(x => x.data.userName === auth.currentUser.displayName)}
                numColumns={2}
                keyExtractor={(item, index) => item.id }
                renderItem={(item) =>
                    <ListingCard
                        title={item.item.data.listingName}
                        displayName={item.item.data.userName}
                        price={item.item.data.price}
                        photo={item.item.data.photoUrl}
                        id={item.item.id}
                        enter={enterListing}
                        deleteAvailable={true}
                    />
                }
            />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    image: {
        height: 100,
        width: 100
    },
    profile: {
        height: 200,
        justifyContent: 'center',
        alignItems: 'center'
    }

})

export default ProfileScreen;