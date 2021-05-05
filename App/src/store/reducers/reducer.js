import { combineReducers } from 'redux';

import sugokuReducer from './sugoku.reducer';

const rootReducer = combineReducers({
  sugoku: sugokuReducer,
});

export default rootReducer;
