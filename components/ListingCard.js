import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from "react-native";
import {Card} from "react-native-elements";

const ListingCard = (props) => {
    return (
        <TouchableOpacity style={styles.card} onPress={() => props.enter(props.title, props.displayName, props.photo, props.price)}>
                <Card>
                    <Card.Title>{props.title} (${props.price})</Card.Title>
                    <Text style={{fontSize: 12}}>By {props.displayName}</Text>
                    <Card.Divider/>
                    <Card.Image style={styles.image} source={{uri: props.photo}}>
                    </Card.Image>
                </Card>
        </TouchableOpacity>

    )
}

const styles = StyleSheet.create({
    card: {
        width: 180,
        height: 300,
    },

    image: {
        resizeMode: 'cover'
    }
})

export default ListingCard
