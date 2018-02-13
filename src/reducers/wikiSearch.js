import {RECEIVE_WIKI_SEARCH , LINK_CHECK, LINK_UNCHECK} from '../actions/wikiSearch';

export const wikiSearch = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_WIKI_SEARCH:
            return {
                ...state,
                data: action.data
            };

        default:
            return state;
    }
};


export const linkc = (state = {data: []}, action) => {
    switch (action.type) {
        case LINK_CHECK:
            return {
                ...state,
                ...action.data

            };
        default:
            return state;
    }
};

export const linku = (state = {data: []}, action) => {
    switch (action.type) {
        case LINK_UNCHECK:
            return {
                ...state,
                ...action.data
            };
        default:
            return state;
    }
};
