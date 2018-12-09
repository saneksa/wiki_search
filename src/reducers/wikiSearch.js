import {RECEIVE_WIKI_SEARCH, LINKS_UPDATE} from '../actions/wikiSearch';

const initialState = {
  linksCheck: [],
  linksUncheck: [],
};

export const wikiSearch = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_WIKI_SEARCH:
      return {
        ...state,
        data: action.data,
      };

    default:
      return state;
  }
};

export const links = (state = initialState, action) => {
  switch (action.type) {
    case LINKS_UPDATE:
      return {
        ...state,
        ...action.data,
      };
    default:
      return state;
  }
};
