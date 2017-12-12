import undoable, { distinctState } from 'redux-undo';
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
const createNewTask = (parentId, name) => {
	const nameOfTask = name === '' ? 'NoName' : name;
	return {
		id: uniqueKey(),
		parentId: parentId,
		name: nameOfTask,
		description: '',
		done: false,
	};
};
const listOfTasksToState = (state = initialState, action) => {
	switch (action.type) {
		case 'ADD_NEW_TASK':
			return [createNewTask(action.parentId, action.payload), ...state];
		case 'TASK_DONE_FIELD_CHANGE':
			state.find(({ id }) => id === action.payload).done = !state.find(({ id }) => id === action.payload).done;
			return [...state];
		case 'EDIT_CURRENT_TASK':
			const currentTask = state.find(({ id }) => id === action.taskId);
			currentTask.name = action.payload;
			currentTask.description = action.description;
			currentTask.done = action.isDone;
			return [...state];
		case 'CHANGE_CATEGORY_OF_TASK':
			state.find(({ id }) => id === action.taskId).parentId = action.payload;
			return [...state];
		default: return state;
	}
};
const undoableTodos = undoable(listOfTasksToState, {
	filter: action => action.type === 'ADD_NEW_TASK'
});
export default undoableTodos;