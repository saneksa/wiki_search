import * as $ from 'jquery';
import {createLogic} from 'redux-logic';
import * as _ from 'lodash';

import {receiveWikiSearch, linksUpdate} from '../actions/wikiSearch';
import {LINK_UNCHECK_TO_LOGIC, LINK_CHECK_TO_LOGIC,SEARCH_WIKI} from '../actions/wikiSearch';

export const wikiSearch = createLogic({
    type: SEARCH_WIKI,
    latest: true,
    process({action}, dispatch, done) {
        $.get(`https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrsearch=${action.text.replace(/\s/g, '+')}&origin=*&prop=info&inprop=url`,
            function(data) {
                dispatch(receiveWikiSearch({data: _.values(data.query.pages)}));
                let k = _.values($.extend(true, {},data.query.pages));
                dispatch(linksUpdate({linksUncheck: k}));
            }).fail(function() {
                done();
            });
    }
});

export const linksH = createLogic({
    type: LINK_CHECK_TO_LOGIC,
    latest: true,
    process({getState,action}, dispatch) {
        let k = $.extend(true, [], getState().links.linksUncheck);
        let l = $.extend(true, {}, action.link_check);
        for (let i = 0; i < k.length; i++) {
            if (k[i].fullurl === action.link_check.fullurl) {
                k.splice(i, 1);
            }
        }

        let c = $.extend(true, [], getState().links.linksCheck);
        c.push(l);

        let v = {
                linksCheck: c,
                linksUncheck: k
        };
        dispatch(linksUpdate(v));
    }
});

export const linksS = createLogic({
    type: LINK_UNCHECK_TO_LOGIC,
    latest: true,
    process({getState,action}, dispatch) {
        let k = $.extend(true, [], getState().links.linksCheck);
        let l = $.extend(true, {}, action.link_uncheck);
        for (let i = 0; i < k.length; i++) {
            if (k[i].fullurl === action.link_uncheck.fullurl) {
                k.splice(i, 1);
            }
        }

        let c = $.extend(true, [], getState().links.linksUncheck);
        c.push(l);

        let v = {
            linksCheck: k,
            linksUncheck: c
        };
        dispatch(linksUpdate(v));
    }
});


