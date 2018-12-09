import * as $ from 'jquery';
import {createLogic} from 'redux-logic';
import * as _ from 'lodash';

import {linksUpdate} from '../actions/wikiSearch';
import {SEARCH_WIKI, SEND_TO_LOGIC} from '../actions/wikiSearch';
import {titleCheckButton, titleUncheckButton} from '../Const';

export const wikiSearch = createLogic({
  type: SEARCH_WIKI,
  latest: true,
  process({action}, dispatch, done) {
    $.get(
      `https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrsearch=${action.text.replace(
        /\s/g,
        '+'
      )}&origin=*&prop=info&inprop=url`,
      function(data) {
        const searchLinks = _.values($.extend(true, {}, data.query && data.query.pages));
        dispatch(linksUpdate({linksUncheck: searchLinks}));
      }
    ).fail(function() {
      done();
    });
  },
});

export const linksLogic = createLogic({
  type: SEND_TO_LOGIC,
  latest: true,
  process({getState, action}, dispatch) {
    const linksCheckStore = [...getState().links.linksCheck];
    const linksUncheckStore = [...getState().links.linksUncheck];
    switch (action.types) {
      case titleCheckButton:
        const linksUncheck = linksUncheckStore.filter(link => link.fullurl !== action.links.fullurl);
        linksCheckStore.push(action.links);
        dispatch(linksUpdate({linksCheck: linksCheckStore, linksUncheck}));
        break;
      case titleUncheckButton:
        const linksCheck = linksCheckStore.filter(link => link.fullurl !== action.links.fullurl);
        linksUncheckStore.push(action.links);
        dispatch(linksUpdate({linksCheck, linksUncheck: linksUncheckStore}));
        break;
      default:
        break;
    }
  },
});
