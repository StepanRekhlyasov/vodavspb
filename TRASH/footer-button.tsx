import React from "react";
import { Text, StyleSheet, Pressable } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

type Props = {
    title: String,
    name: String
}

export default function Button(props : Props) {
  const { title, name } = props;
  
  const route = useRoute();
  const navigation : any = useNavigation();
  const current = route.name == name?1:0
  
  return (
    <Pressable style={current?styles.buttonCurrent:styles.button} onPress={ ()=> { navigation.navigate(name) }}>
        <Text style={current?styles.textCurrent:styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderColor: '#999',
    borderWidth: 2,
    width: '60px',
    height: '60px',
    borderRightWidth: 1,
    borderLeftWidth: 1
  },
  buttonCurrent: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue',
    borderColor: '#999',
    borderWidth: 2,
    width: '60px',
    height: '60px',
    borderRightWidth: 1,
    borderLeftWidth: 1
  },
  textCurrent: {
    fontSize: 12,
    lineHeight: 21,
    fontWeight: 'bold',
    color: 'white',
  },
  text: {
    fontSize: 12,
    lineHeight: 21,
    fontWeight: 'bold',
    color: 'black',
  },
});