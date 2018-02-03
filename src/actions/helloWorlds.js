export const SEARCH_HELLO_WORLD = 'SEARCH_HELLO_WORLD';
export const RECEIVE_HELLO_WORLDS = 'RECEIVE_HELLO_WORLDS';

export const searchHelloWorld = () => ({
    type: SEARCH_HELLO_WORLD
});

export const receiveHelloWorlds = ({data}) => ({
    type: RECEIVE_HELLO_WORLDS,
    data
});