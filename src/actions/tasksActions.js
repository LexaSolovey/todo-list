import uniqueKey from '../utils/uniqueKey';

export const ADD_NEW_TASK = 'ADD_NEW_TASK';
export const TASK_DONE_FIELD_CHANGE = 'TASK_DONE_FIELD_CHANGE';
export const EDIT_CURRENT_TASK = 'EDIT_CURRENT_TASK';
export const CHANGE_CATEGORY_OF_TASK = 'CHANGE_CATEGORY_OF_TASK';

const createNewTask = (taskName, parentId) => {
	const nameOfTask = taskName === '' ? 'NoName' : taskName;
	return {
		id: uniqueKey(),
		parentId: parentId,
		name: nameOfTask,
		description: '',
		done: false,
	};
};

export const addTask = (taskName, parentId) => ({
	type: ADD_NEW_TASK,
	payload: createNewTask(taskName, parentId)
});

export const taskDoneFieldChange = (taskId) => ({
	type: TASK_DONE_FIELD_CHANGE,
	payload: taskId
});

export const editTask = (taskId, taskName, description, isDone) => ({
	type: EDIT_CURRENT_TASK,
	taskId,
	taskName,
	description,
	isDone
});

export const changeCategoryOfTask = (taskId, selectedCategory) => ({
	type: CHANGE_CATEGORY_OF_TASK,
	taskId,
	selectedCategory
});
