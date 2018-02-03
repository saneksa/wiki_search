import _ from 'lodash';
import {compose, combineReducers} from 'redux'
import {autoRehydrate} from 'redux-persist'
import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import {browserHistory} from 'react-router'
import {createLogicMiddleware} from 'redux-logic';
import {reducer as formReducer} from 'redux-form';
import {routerMiddleware, routerReducer} from 'react-router-redux'
import {enableBatching} from "redux-batched-actions";
import {requireAll} from './support';

export const getStore = function() {
    return createStore(
        getReducers(),
        getMiddleware(),
        autoRehydrate({log: true})
    );
};

const getReducers = function() {
    const reducers = requireAll(require.context('./reducers', true, /^\.\/.*\.js$/));

    //Добавляет поддержку batchActions. Нужно чтобы не было перерисовки на каждый action, а только после того
    //когда все они обработаны
    //https://github.com/tshelburne/redux-batched-actions
    return enableBatching(
        //Создает из нескольких reducer'ов общий для store'а
        combineReducers({
            ...reducers,
            routing: routerReducer,
            form: formReducer
        })
    )
};

const getMiddleware = function() {
    const middleware = [
        //Нужен чтобы можно было сделать `store.dispatch(undefined)` и не упали другие `middleware`. Некоторые из них
        //не ожидают такой action.
        store => next => action => next(action || {type: '@@CROCOJS/EMPTY_ACTION'}),
        //Позволяет делать `dispatch(dispatch => dispatch({type: 'a'}); dispatch({type: 'b'}))` т.е. в качестве
        //action передавать функцию
        thunk
    ];

    if (process.env.NODE_ENV !== 'production' && !TEST) {
        //Логгирует action'ы в консоль
        middleware.push(createLogger())
    }

    middleware.push(getLogicMiddleware());

    middleware.push(routerMiddleware(browserHistory));

    //Флаг ставит расширение redux-devtools. Нужно для отладки action'ов в хроме
    //Можно поставить тут
    //https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=ru
    return window.__REDUX_DEVTOOLS_EXTENSION__
        ? compose(applyMiddleware(...middleware), window.__REDUX_DEVTOOLS_EXTENSION__())
        : compose(applyMiddleware(...middleware))
};

const getLogicMiddleware = function() {
    const logic = _.values(requireAll(require.context('./logic', true, /^\.\/.*\.js$/)));

    //Этот middleware позволяет отделить side effects от компонентов react и action'ов redux'а
    //https://github.com/jeffbski/redux-logic
    return createLogicMiddleware(logic);
};
