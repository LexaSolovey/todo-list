import uniqueKey from '../utils/uniqueKey';

export const DELETE_CATEGORY = 'DELETE_CATEGORY';
export const ADD_CATEGORY = 'ADD_CATEGORY';
export const EDIT_CATEGORY_NAME = 'EDIT_CATEGORY_NAME';
export const CHECK_ON_COMPLITED = 'CHECK_ON_COMPLITED';


const createCategory = (categoryName, parentId) => {
	const nameOfCategory = categoryName === '' ? 'NoName' : categoryName;
	const isNested = parentId !== '' ? true : false;
	return {
		id: parentId + uniqueKey(isNested),
		parentId: parentId,
		name: nameOfCategory,
		description: '',
		done: true,
		nestedCats: [],
	};
};


export const addCategory = (categoryName, parentId) => ({
	type: ADD_CATEGORY,
	payload: createCategory(categoryName, parentId),
	parentId,
	categoryName
});

export const deleteCategory = (categoryIdToDelete, parentId) => ({
	type: DELETE_CATEGORY,
	categoryIdToDelete,
	parentId
});

export const editCategoryName = (newCategoryName, categoryId, parentId) => ({
	type: EDIT_CATEGORY_NAME,
	newCategoryName,
	categoryId,
	parentId
});

export const checkCategoryOnComplited = (tasks, taskId) => ({
	type: CHECK_ON_COMPLITED,
	tasks,
	taskId
});
