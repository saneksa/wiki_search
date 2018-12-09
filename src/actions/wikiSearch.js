export const SEARCH_WIKI = 'SEARCH_WIKI';
export const LINKS_UPDATE = 'LINKS_UPDATE';
export const SEND_TO_LOGIC = 'SEND_TO_LOGIC';

export const searchWiki = text => ({
  type: SEARCH_WIKI,
  text,
});

export const sendToLogic = (links, types) => ({
  type: SEND_TO_LOGIC,
  links,
  types,
});

export const linksUpdate = data => ({
  type: LINKS_UPDATE,
  data,
});
