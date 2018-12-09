import {LINKS_UPDATE} from '../actions/wikiSearch';

const initialState = {
  linksCheck: [],
  linksUncheck: [],
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
