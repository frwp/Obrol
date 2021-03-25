import * as React from 'react';
import { View, TouchableOpacity, StyleSheet, Image, Text } from 'react-native';

const Card = ({ imageUri, title, lastMessage }) => {
    return (
        <View style={styles.card}>
            {imageUri !== '' ? (
                <Image style={styles.image} source={{ uri: imageUri }} />
            ) : (
                <View style={styleBlankFP.box}>
                    <Text style={styleBlankFP.text}>{title[0]}</Text>
                </View>
            )}
            <View style={styles.innerCard}>
                <Text style={{ fontWeight: 'bold' }}>{title}</Text>
                <Text>{lastMessage}</Text>
            </View>
        </View>
    );
};

/**
 *
 * @param {item} param0 -> object to be rendered,
 * @param {onPress} param1 -> function callback
 *
 */
const ChatItem = ({ item, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View>
                <Card
                    imageUri={item.photoURL}
                    title={item.title}
                    lastMessage={item.recentMessage.messageText}
                />
            </View>
        </TouchableOpacity>
    );
};

export default ChatItem;

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        width: '100%',
        height: 50,
        margin: 5,
    },
    innerCard: {
        flexDirection: 'column',
        paddingTop: 5,
    },
    image: {
        margin: 5,
        height: 50,
        width: 50,
        borderRadius: 25,
    },
});

const styleBlankFP = StyleSheet.create({
    box: {
        margin: 5,
        height: 50,
        width: 50,
        borderRadius: 25,
        justifyContent: 'center',
        backgroundColor: 'purple',
    },
    text: {
        fontWeight: 'bold',
        fontSize: 35,
        color: 'white',
        textAlign: 'center',
    },
});
