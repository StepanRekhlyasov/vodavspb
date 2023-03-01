import { StyleSheet } from "react-native";

export const productStyle = StyleSheet.create({
    quantityButtons: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center'
    },  
    quantityButton: {
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
        flex: 1,
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 'auto'
    },
    itemImgWrapper: {
		width: '100%',
		height: 140,
		paddingVertical: 8
    },
    itemImg: {
		flex:1, 
		resizeMode: 'contain',
	},
    infoWrapper: {
        flex: 1,
        height: '100%',
		width: '100%',
        justifyContent: 'space-between',
    },
    gridView: {
        marginTop: 10,
        flex: 1,
    },
    itemContainer: {
        justifyContent: 'space-between',
        alignItems: 'center',
		flexDirection: 'column',
		flex: 1,
		width: '100%',
		maxWidth: '49%',
        borderRadius: 16,
		backgroundColor: 'purple'
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