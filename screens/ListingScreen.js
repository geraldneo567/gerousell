import React, {useLayoutEffect} from 'react';
import {View, Text, StyleSheet, Button, TouchableOpacity, Image} from "react-native";

const ListingScreen = ({navigation, route}) => {

    const uri = route.params.photo

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: route.params.listingName
        })
    })

    return (
        <View style={styles.container}>
            <Text>{route.params.userName}</Text>
            <Text>{route.params.price}</Text>
            <Image source={{uri: uri}} style={{height: 50, width: 50}} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    }
})

export default ListingScreen;