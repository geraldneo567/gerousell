import React, {useLayoutEffect, useEffect, useState} from 'react';
import {View, Text, StyleSheet, Button, TouchableOpacity, FlatList} from "react-native";
import {auth, db} from "../firebase.js";
import {Avatar} from "react-native-elements";
import {AntDesign, SimpleLineIcons} from '@expo/vector-icons';
import { Dimensions } from "react-native";
import ListingCard from "../components/ListingCard";

const HomeScreen = ({navigation}) => {
    const [listings, setListings] = useState([]);
    const width = Dimensions.get('window').width; //full width
    const height = Dimensions.get('window').height; //full height
    const enterListing = (listingName, userName, photo, price) => navigation.navigate('Listing', {
        listingName,
        userName,
        photo,
        price
    })
    useEffect(() => {
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
            title: "gerousell",
            headerTitleAlign: "center",
            headerTintColor: "black",
            headerRight: () => {
                return (
                    <View style={{marginRight: 10, flexDirection: "row"}}>

                        <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate("Chat")}>
                            <AntDesign name={"wechat"} size={36} color={"white"} />
                        </TouchableOpacity>
                        <View style={{width: 10}}>

                        </View>

                        <TouchableOpacity onPress={() => navigation.navigate("Sell")}>
                            <AntDesign name={"plussquareo"} size={36} color={"white"} />
                        </TouchableOpacity>

                    </View>
                )
            },
            headerLeft: () => {
                return (
                    <View style={{marginLeft: 10, flexDirection: "row"}}>
                        <TouchableOpacity style={styles.headerRight} activeOpacity={0.5} onPress={() => navigation.navigate("Profile")}>
                            <Avatar rounded source={{uri: auth.currentUser.photoURL}}/>
                        </TouchableOpacity>


                    </View>
                )
            }

        })
    }, [])

    console.log(listings)
    return (
        <View style={styles.container}>
            <FlatList
                      data={listings}
                      numColumns={2}
                      keyExtractor={(item, index) => item.id }
                      renderItem={(item) =>
                          <ListingCard
                              title={item.item.data.listingName}
                              displayName={item.item.data.userName}
                              price={item.item.data.price}
                              photo={item.item.data.photoUrl}
                              enter={enterListing}
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


})

export default HomeScreen;