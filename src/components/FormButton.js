import { DefaultTheme } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { windowHeight, windowWidth } from '../utils/Dimensions';

const FormButton = ({ buttonTitle, ...rest }) => {
    return (
        <TouchableOpacity style={styles.buttonContainer} {...rest}>
            <Text style={styles.buttonText}>{buttonTitle}</Text>
        </TouchableOpacity>
    );
};

export default FormButton;

const styles = StyleSheet.create({
    buttonContainer: {
        marginTop: 10,
        width: '50%',
        height: windowHeight / 15,
        backgroundColor: '#f9fafd',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 30,
        borderWidth: 1
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#6B48DE',
    },
});
