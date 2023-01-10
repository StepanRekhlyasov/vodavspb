import { StyleSheet } from "react-native";

export const gridStyle = StyleSheet.create({
    itemImgWrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    gridView: {
        marginTop: 10,
        flex: 1,
    },
    itemImg: {
        width: 50,
        height: 50,
    },
    itemContainer: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        borderRadius: 5,
        padding: 10,
        height: 150,
        borderWidth: 1,
    },
    itemName: {
        fontSize: 16,
        color: '#fff',
        fontWeight: '600',
    },
    itemCode: {
        fontWeight: '600',
        fontSize: 12,
        color: '#fff',
    },
})