import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import appReducer from './appReducer';
import authReducer from './authReducer';
import ordersReducer from './ordersReducer';

const reducers = combineReducers({
	auth: authReducer,
	orders: ordersReducer,
	app: appReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)
));

window.store = store;

export default store;