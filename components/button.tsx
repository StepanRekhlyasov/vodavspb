import React from 'react';
import { Text, Pressable } from 'react-native';
export default function MyButton ({text, style, action} : any){
    return (
        <Pressable onPress={action} style={style}>
            <Text>{text}</Text>
        </Pressable>
    )
}