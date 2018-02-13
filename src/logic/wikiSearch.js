import * as $ from 'jquery';
import {createLogic} from 'redux-logic';
import * as _ from 'lodash';

import {receiveWikiSearch, linkCheck, linkUncheck} from '../actions/wikiSearch';
import {LINK_UNCHECK_TO_LOGIC, LINK_CHECK_TO_LOGIC,SEARCH_WIKI} from '../actions/wikiSearch';

export const wikiSearch = createLogic({
    type: SEARCH_WIKI,
    latest: true,
    process({action}, dispatch, done) {
        $.get(`https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrsearch=${action.text.replace(/\s/g, '+')}&origin=*&prop=info&inprop=url`,
            function(data) {
                dispatch(receiveWikiSearch({data: _.values(data.query.pages)}));
                let k = _.values($.extend(true, {},data.query.pages));
                dispatch(linkUncheck({data: k}));
            }).fail(function() {
                done();
            });
    }
});

export const linksH = createLogic({
    type: LINK_CHECK_TO_LOGIC,
    latest: true,
    process({getState,action}, dispatch) {
            let k = $.extend(true, {}, getState().linku);
            let l = $.extend(true, {}, action.link_check);
            for (let i = 0; i < k.data.length; i++) {
                if (k.data[i].fullurl === action.link_check.fullurl) {
                    k.data.splice(i, 1);
                }
            }

            let c = $.extend(true, {}, getState().linkc);
            c.data.push(l);
            dispatch(function (dispatch) {
                dispatch(linkUncheck(k));
                dispatch(linkCheck(c));
            });
    }
});

export const linksS = createLogic({
    type: LINK_UNCHECK_TO_LOGIC,
    latest: true,
    process({getState,action}, dispatch) {
        let k = $.extend(true, {}, getState().linkc);
        let l = $.extend(true, {}, action.link_uncheck);
        for (let i = 0; i < k.data.length; i++) {
            if (k.data[i].fullurl === action.link_uncheck.fullurl) {
                k.data.splice(i, 1);
            }
        }
        let c = $.extend(true, {}, getState().linku);
        c.data.push(l);
        dispatch(function (dispatch) {
            dispatch(linkUncheck(c));
            dispatch(linkCheck(k));
        });
    }
});

