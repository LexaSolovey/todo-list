import * as actions from '../actions/tasksActions';
import undoable from 'redux-undo';
import uniqueKey from '../utils/uniqueKey';
import { idToCategoty1 } from './listOfCategoriesToState';
import { idToCategoty2 } from './listOfCategoriesToState';

const initialState = [
	{
		id: uniqueKey(),
		parentId: idToCategoty1,
		name: 'task 1 1',
		description: '',
		done: false,
	},
	{
		id: uniqueKey(),
		parentId: idToCategoty1,
		name: 'task 1 2',
		description: '',
		done: false,
	},
	{
		id: uniqueKey(),
		parentId: idToCategoty2,
		name: 'task 2 1',
		description: '',
		done: false,
	},
	{
		id: uniqueKey(),
		parentId: idToCategoty2,
		name: 'task 2 2',
		description: '',
		done: true,
	},
];

const listOfTasksToState = (state = initialState, action) => {
	switch (action.type) {
		case actions.ADD_NEW_TASK:
			return [action.payload, ...state];
		case actions.TASK_DONE_FIELD_CHANGE:
			return state.map((task) => (
				task.id === action.payload
					? Object.assign({}, task, {done: !task.done})
					: task
			));
		case actions.EDIT_CURRENT_TASK:
			return state.map((task) => (
				task.id === action.taskId
					? Object.assign({}, task, {name: action.taskName, description: action.description , done: action.isDone})
					: task
			));
		case actions.CHANGE_CATEGORY_OF_TASK:
		return state.map((task) => (
			task.id === action.taskId
				? Object.assign({}, task, {parentId: action.selectedCategory})
				: task
		));
		default:
			return state;
	}
};

const undoableTodos = undoable(listOfTasksToState, {
	filter: action => action.type === actions.ADD_NEW_TASK
});
export default undoableTodos;