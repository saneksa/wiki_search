export const SEARCH_WIKI = 'SEARCH_WIKI';
export const RECEIVE_WIKI_SEARCH = 'RECEIVE_WIKI_SEARCH';

export const searchWiki = (text) => ({
    type: SEARCH_WIKI,
    text
});

export const receiveWikiSearch = ({data}) => ({
    type: RECEIVE_WIKI_SEARCH,
    data
});