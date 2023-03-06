import constants from "../constants/index";

export function SetUpHeader(headerLeft : string, headerRight : string) {
    return {
        type: constants.SET_UP_HEADER,
        payload: {
            headerLeft: headerLeft,
            headerRight: headerRight
        }
    }
}
export function ImOnScreen(screen : string) {
    return {
        type: constants.IM_ON_SCREEN,
        payload: screen
    }
}
export function BottomSheetHandler(payload : string) {
    return {
        type: constants.BOTTOM_SHEET,
        payload: payload
    }
}
export function BottomSheetToggler(payload: boolean){
	return {
        type: constants.BOTTOM_SHEET_TOGGLE,
        payload: payload
    }
}