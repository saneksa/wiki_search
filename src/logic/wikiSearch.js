import * as $ from 'jquery';
import {createLogic} from 'redux-logic';
import * as _ from 'lodash';

import {receiveWikiSearch, SEARCH_WIKI} from '../actions/wikiSearch';

export const wikiSearch = createLogic({
    type: SEARCH_WIKI,
    latest: true,
    process({action}, dispatch, done) {
        $.get(`https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrsearch=${action.text.replace(/\s/g, '+')}&origin=*&prop=info&inprop=url`,
            function(data) {
                dispatch(receiveWikiSearch({data: _.values(data.query.pages)}));
            }).fail(function() {
                done();
            });
    }
});