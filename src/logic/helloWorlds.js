import * as $ from 'jquery';
import {createLogic} from 'redux-logic';

import {receiveHelloWorlds, SEARCH_HELLO_WORLD} from '../actions/helloWorlds';
import * as _ from 'lodash';

export const searchHelloWorld = createLogic({
    type: SEARCH_HELLO_WORLD,
    latest: true,
    process({action}, dispatch, done) {
        $.get('https://en.wikipedia.org/w/api.php?format=json&action=query&' +
            'generator=search&gsrsearch=Hello+World&origin=*&prop=info&inprop=url', function(data) {
            dispatch(receiveHelloWorlds({data: _.values(data.query.pages)}));
        }).fail(function() {
            done();
        });
    }
});