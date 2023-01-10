import { CART_ADD } from '../store/constants';

const INITIAL_STATE : [] = []
const reducer = (state = INITIAL_STATE, action : any) => {
    switch(action.type) {
        case CART_ADD:
            return [...state, action.payload];
        default:
            return state;
    }
}

export default reducer