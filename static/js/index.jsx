import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import Thunk from 'redux-thunk';

import { ConnectedApp } from 'static/js/components/App';

import { RootReducer } from 'static/js/reducer';

const store = createStore(RootReducer, applyMiddleware(Thunk))

ReactDOM.render(
    <Provider store={ store }>
        <ConnectedApp />
    </Provider>,
    document.getElementById('mount-point')
);
