import React from 'react';
import { Text, Pressable, StyleSheet } from 'react-native';
export default function MyButton ({text = 'Кнопочка', options = {}, action, disabled = false} : {
    text?: string,
    options?: {
        fontSize?: number,
        backGroundColor?: string,
        backGroundColorDisabled?: string,
        textColor?: string,
        height?: number,
        borderRadius?: number,
        shadow?: boolean,
        width?: string | number,
        textAlign?: "center" | "auto" | "left" | "right" | "justify" | undefined,
        paddingLeft?: number
    },
    action?: any,
    disabled?: boolean,
}){
    const defaultOption = {
        fontSize: 17,
        height: 55,
        backGroundColor: '#1197F8',
        borderRadius: 9,
        textColor: '#fff',
        backGroundColorDisabled: '#ababab',
        shadow: false,
        width: '100%',
        textAlign: options.textAlign?options.textAlign:'center',
        paddingLeft: 0
    }
    const prepOptions = {
        ...defaultOption,
        ...options
    };
    const styles = StyleSheet.create({
        'default__button' : {
            backgroundColor: prepOptions.backGroundColor,
            width: prepOptions.width,
            borderRadius: prepOptions.borderRadius,
            paddingLeft: prepOptions.paddingLeft,
        },
        'default__text' : {
            color: prepOptions.textColor,
            textAlign: prepOptions.textAlign,
            fontSize: prepOptions.fontSize,
            lineHeight: prepOptions.height,
        },
        'default__button_disabled' : {
            backgroundColor: prepOptions.backGroundColorDisabled,
        },
        'shadowProp': {
            shadowColor: '#171717',
            shadowOffset: {width: -1, height: 1},
            shadowOpacity: 0.2,
            shadowRadius: 1,
            elevation: 5,
        },
        'default__text_disabled' : {

        }
    });
    const type = {
        button : styles.default__button,
        text : styles.default__text,
        button_disabled: styles.default__button_disabled,
        text_disabled: styles.default__text_disabled,
    }
    const classes = {
        button: !disabled?options.shadow?[styles.shadowProp, type.button]:[type.button]:[type.button, type.button_disabled],
        text: !disabled?[type.text]:[type.text, type.text_disabled]
    }
    return (
        <Pressable 
            pointerEvents={'auto'}
            onPress={action} style={classes.button} 
            disabled={disabled}
        >
            <Text style={classes.text} numberOfLines={1}>{text}</Text>
        </Pressable>
    )
}
