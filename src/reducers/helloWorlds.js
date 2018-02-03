import {RECEIVE_HELLO_WORLDS} from '../actions/helloWorlds';

export const helloWorlds = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_HELLO_WORLDS:
            return {
                ...state,
                data: action.data
            };
        default:
            return state;
    }
};