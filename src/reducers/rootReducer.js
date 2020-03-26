/*
 src/reducers/rootReducer.js
*/
import { combineReducers } from 'redux';
import simpleReducer from './simpleReducer';
import fligthSearchReducer from './flight-search-reducer';

export default combineReducers({
 simpleReducer,
 fligthSearchReducer
});
