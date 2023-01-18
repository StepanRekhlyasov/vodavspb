export function addAddress(address : string) {
    return {
        type: 'ADDRESS_ADD',
        payload: {
            address
        }
    }
}
export function removeAddress(address : string) {
    return {
        type: 'ADDRESS_REMOVE',
        payload: {
            address
        }
    }
}