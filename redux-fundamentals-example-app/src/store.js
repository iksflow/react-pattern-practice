import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import rootReducer from './reducer';
import thunkMiddleware from 'redux-thunk';

const middlewareEnhancer = applyMiddleware(thunkMiddleware);
const composedEnhancer = composeWithDevTools(middlewareEnhancer);

// Pass enhancer as the second arg, since there's no preloadedState
const store = createStore(rootReducer, composedEnhancer);

export default store;
