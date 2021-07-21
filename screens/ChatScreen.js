import React, {useLayoutEffect, useState} from 'react';
import {View, TouchableOpacity} from 'react-native'
import {Avatar, ListItem} from "react-native-elements";
import {auth, db} from '../firebase.js'

const ChatScreen = ({navigation}) => {
    const [buyerChats, setBuyerChats] = useState([])
    const [sellerChats, setSellerChats] = useState([])
    useLayoutEffect(() => {
        const arr = [];
        db.collection("Chats").where("buyer", '==', auth.currentUser.displayName).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                arr.push(doc.data());
            });
            setBuyerChats(arr);
        });
    }, []);
    useLayoutEffect(() => {
        const arr = [];
        db.collection("Chats").where("seller", '==', auth.currentUser.displayName).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                arr.push(doc.data());
            });
            setSellerChats(arr);
        });
    }, []);


    return (
        <View>
        {
            sellerChats.map((l, i) => (
                <TouchableOpacity onPress={() => navigation.navigate("Conversation", {listingName: l.listingName})}>
                    <ListItem key={i} bottomDivider>
                        <Avatar source={{uri: l.itemPhoto}} />
                        <ListItem.Content>
                            <ListItem.Title>{l.listingName}</ListItem.Title>
                            <ListItem.Subtitle>{l.seller}</ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                </TouchableOpacity>


            ))
        }
            {
                <View>
                    {
                        buyerChats.map((l, i) => (
                            <TouchableOpacity onPress={() => navigation.navigate("Conversation", {listingName: l.listingName})}>
                                <ListItem key={i} bottomDivider>
                                    <Avatar source={{uri: l.itemPhoto}} />
                                    <ListItem.Content>
                                        <ListItem.Title>{l.listingName}</ListItem.Title>
                                        <ListItem.Subtitle>{l.seller}</ListItem.Subtitle>
                                    </ListItem.Content>
                                </ListItem>
                            </TouchableOpacity>


                        ))
                    }
                </View>
            }
        </View>

    )
}

export default ChatScreen