import React from 'react';
import { Text, Pressable } from 'react-native';
export default function MyButton ({text, style, action, textStyle, disabled = false} : any){
    return (
        <Pressable onPress={action} style={style} disabled={disabled}>
            <Text style={textStyle}>{text}</Text>
        </Pressable>
    )
}