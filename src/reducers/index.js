import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { listOfCategoriesToState } from './listOfCategoriesToState';
import changeSelectedCategory from './changeSelectedCategory';
import listOfTasksToState from './listOfTasksToState';
import categoryWasDeleted from './categoryWasDeleted';

export default combineReducers({ 
  routing: routerReducer,
  listOfCategoriesToState, 
  listOfTasksToState,
	changeSelectedCategory,
	categoryWasDeleted,
});

