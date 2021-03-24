import React from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

const ChatRoom = ({ navigation }) => {
    return (
        <View style={styles.inputBar}>
            <TextInput style={styles.textBox} />
            <TouchableOpacity>
                <Text style={{ margin: 10 }}>Send</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ChatRoom;

const styles = StyleSheet.create({
    inputBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 5,
    },
    textBox: {
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'grey',
        fontSize: 14,
        paddingHorizontal: 10,
        paddingVertical: 10,
        flex: 1,
    },
});
