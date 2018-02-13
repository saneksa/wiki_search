export const SEARCH_WIKI = 'SEARCH_WIKI';
export const RECEIVE_WIKI_SEARCH = 'RECEIVE_WIKI_SEARCH';
export const LINK_CHECK = 'LINK_CHECK';
export const LINK_UNCHECK = 'LINK_UNCHECK';
export const LINK_CHECK_TO_LOGIC = 'LINK_CHECK_TO_LOGIC';
export const LINK_UNCHECK_TO_LOGIC = 'LINK_UNCHECK_TO_LOGIC';



export const searchWiki = (text) => ({
    type: SEARCH_WIKI,
    text
});

export const receiveWikiSearch = ({data}) => ({
    type: RECEIVE_WIKI_SEARCH,
    data
});


export const linkCheckToLogic = (link_check) => ({
    type: LINK_CHECK_TO_LOGIC,
    link_check
});



export const linkUncheckToLogic = (link_uncheck) => ({
    type: LINK_UNCHECK_TO_LOGIC,
    link_uncheck
});


export const linkCheck = (data) => ({
    type: LINK_CHECK,
    data
});

export const linkUncheck = (data) => ({
    type: LINK_UNCHECK,
    data
});