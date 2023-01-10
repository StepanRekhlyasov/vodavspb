import { StyleSheet } from "react-native";

export const productStyle = StyleSheet.create({
    quantityButtons: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center'
    },  
    quantityButton: {
        display: 'flex',
        width: 60,
        height: 30,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#beffb4'
    },
    button: {
        height: 30,
        borderRadius: 10,
        backgroundColor: '#b4b4ff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
    },
    quantity : {
        display: 'flex',
        flex: 1,
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 'auto'
    },
    itemImgWrapper: {
    },
    infoWrapper: {
        flex: 1,
        height: '100%',
        justifyContent: 'flex-start',
    },
    gridView: {
        marginTop: 10,
        flex: 1,
    },
    itemImg: {
        width: 100,
        height: 100,
    },
    itemContainer: {
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        flexDirection: 'row',
        flex: 1,
        borderRadius: 5,
        padding: 10,
        gap: 10,
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
    }
})