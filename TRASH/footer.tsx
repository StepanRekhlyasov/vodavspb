import React from "react";
import { gStyle } from "../styles/style";
import { View } from 'react-native';
import Button from './footer-button'

export default function Footer() {
    return (
        <View style={gStyle.footer}>
            <Button name="Main" title="Главная"/>
            <Button name="Orders" title="Заказы"/>
            <Button name="Cart" title="Корзина"/>
            <Button name="Profile" title="Профиль"/>
        </View>
    )
}