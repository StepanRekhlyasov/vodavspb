import { SET_UP_HEADER, IM_ON_SCREEN } from "../constants/index";

export function SetUpHeader(headerLeft : string, headerRight : string) {
    return {
        type: SET_UP_HEADER,
        payload: {
            headerLeft: headerLeft,
            headerRight: headerRight
        }
    }
}
export function ImOnScreen(screen : string) {
    return {
        type: IM_ON_SCREEN,
        payload: screen
    }
}