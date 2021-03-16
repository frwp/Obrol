import React from 'react';
import {
    View,
    Text,
    TextInput,
    Flatlist,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';

const Chat = ({ navigation }) => {
    return (
        <View style={styles.container}>
            {/* <Flatlist /> */}
            <View style={styles.inputBar}>
                <TextInput style={styles.textBox} />
                <TouchableOpacity>
                    <Text style={{ margin: 10 }}>Send</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    inputBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 5,
        paddingVertical: 10,
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

export default Chat;
