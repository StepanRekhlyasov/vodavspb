import constants from "../constants/index";

export function setAuth( status : boolean ) {
    return {
        type: constants.SET_AUTH,
        payload: status
    }
}