import React, {useLayoutEffect} from 'react';
import {View, Text, StyleSheet, Button, TouchableOpacity} from "react-native";

const ProfileScreen = ({navigation}) => {


    return (
        <View style={styles.container}>
            <Text>Profile Screen</Text>
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

export default ProfileScreen;