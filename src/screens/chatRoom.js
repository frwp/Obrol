import React, { useEffect, useState } from 'react';
import {
    View,
    TextInput,
    TouchableOpacity,
    Text,
    StyleSheet,
    FlatList,
} from 'react-native';
import * as firebase from 'firebase';

const ChatRoom = ({ navigation, route }) => {
    const { messageId, currentUserUID } = route.params;
    console.log('messageID: ', messageId);
    const [chatItem, setChatItem] = useState([]);

    useEffect(() => {
        const db = firebase.firestore();
        let messageList = [];
        let unsubscribe = db
            .collection('message')
            .doc(messageId.trim())
            .collection('messages')
            .orderBy('sentAt')
            .onSnapshot((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    if (doc) {
                        messageList.push(doc.data());
                    }
                });
                setChatItem(messageList);
            });
        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.chatBox}>
                <FlatList
                    data={chatItem}
                    keyExtractor={(item) => item.sentBy + item.sentAt}
                    renderItem={({ item, index, separator }) => {
                        return (
                            <View>
                                <Text>{item.textMessage}</Text>
                            </View>
                        );
                    }}
                />
            </View>
            <View style={styles.inputBar}>
                <TextInput style={styles.textBox} />
                <TouchableOpacity>
                    <Text style={{ margin: 10 }}>Send</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default ChatRoom;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        margin: 5,
        backgroundColor: '#fff',
    },
    inputBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 5,
    },
    chatBox: {
        flex: 1,
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
