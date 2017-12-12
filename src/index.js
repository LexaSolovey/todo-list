import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { ConnectedRouter, routerMiddleware, push } from 'react-router-redux';
import { Route } from 'react-router-dom'
import createHistory from 'history/createBrowserHistory'

import reducer from './reducers';

import PrimaryLayout from './containers/PrimaryLayout';

const history = createHistory();
const middleware = routerMiddleware(history)
// const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
const store = createStore(reducer, applyMiddleware(middleware));
store.dispatch(push('/'));

ReactDOM.render(
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<Route path='/' component={PrimaryLayout} />
		</ConnectedRouter>
	</Provider>,
document.getElementById('root'));
registerServiceWorker();
