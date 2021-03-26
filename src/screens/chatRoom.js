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
    const { chatroomId, currentUserUID } = route.params;
    console.log('chatroomId: ', chatroomId);
    const [chatItem, setChatItem] = useState([]);
    const [currentMessage, setCurrentMessage] = useState('');
    const db = firebase.firestore();

    useEffect(() => {
        let unsubscribe = db
            .collection('message')
            .doc(chatroomId.trim())
            .collection('messages')
            .orderBy('sentAt')
            .onSnapshot((querySnapshot) => {
                let messageList = [];
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

    const sendMessage = async (textMessage, sentAt, chatroomId) => {
        if (textMessage) {
            console.log(textMessage);
            const message = {
                textMessage: textMessage,
                sentAt: firebase.firestore.FieldValue.serverTimestamp(),
                sentBy: currentUserUID,
                readBy: [],
            };
            try {
                db.collection('message')
                    .doc(chatroomId.trim())
                    .collection('messages')
                    .add(message)
                    .then((docRef) => {
                        // console.info(docRef, message)
                    })
                    .catch((error) => {
                        console.error('error on sendmessage:', error);
                    });
            } catch (err) {
                console.error(err);
            }
        }
    };

    const handleSend = async () => {
        let currentTime = new Date();
        try {
            setCurrentMessage('');
            await sendMessage(currentMessage, currentTime, chatroomId);
        } catch (err) {
            alert('Error, something happened');
            console.error('Error:', err);
        }
    };

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
                <TextInput
                    style={styles.textBox}
                    value={currentMessage}
                    onChangeText={(text) => {
                        setCurrentMessage(text);
                    }}
                />
                <TouchableOpacity
                    onPress={() => {
                        handleSend();
                    }}
                >
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
