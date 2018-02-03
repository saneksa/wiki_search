import _ from 'lodash';
import React from 'react'
import 'jquery-migrate';
import {persistStore, createTransform} from 'redux-persist'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {Router, browserHistory} from 'react-router'
import {syncHistoryWithStore} from 'react-router-redux'

import * as routes from './routes';
import App from './app';
import {getStore} from './store';

const renderApp = function() {
    const store = getStore();
    render((
        <App
            store={store}
            persistStore={persistStore}
            //Фильтры, что из store сохранить в localStorage, а что - нет
            persistStoreOptions={{
                whitelist: ['auth'],
                transforms: [
                    createTransform(inboundState => _.pick(['email', 'password']), null, {whitelist: ['auth']})
                ]
            }}>
            <Provider store={store}>
                <Router history={getHistory(store)}>
                    {_(routes).values().map((routeFn) => routeFn(store)).flatten().value()}
                </Router>
            </Provider>
        </App>
    ), document.getElementById('root'));
};

const getHistory = function(store) {
    //История, котороя будет синхронизировать изменения в истории браузера с состоянием в store
    return syncHistoryWithStore(browserHistory, store);
};

renderApp();