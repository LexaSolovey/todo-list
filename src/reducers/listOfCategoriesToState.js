import uniqueKey from '../utils/uniqueKey';

export const idToCategoty1 = uniqueKey();
export const idToCategoty2 = uniqueKey();
const idToCategoty3 = uniqueKey();

const initialState = [
	{
		id: idToCategoty1,
		parentId: '',
		name: 'Category 1',
		done: false,
		nestedCats: [
			{
				id: idToCategoty1 + '_1',
				parentId: idToCategoty1,
				name: 'Category 1 1',
				done: true,
				nestedCats: [],
			},
			{
				id: idToCategoty1 + '_2',
				parentId: idToCategoty1,
				name: 'Category 1 2',
				done: true,
				nestedCats: [],
			},
		],
	},
	{
		id: idToCategoty2,
		parentId: '',
		name: 'Category 2',
		done: false,
		nestedCats: [
			{
				id: idToCategoty2 + '_1',
				parentId: idToCategoty2,
				name: 'Category 2 1',
				done: true,
				nestedCats: [],
			},
			{
				id: idToCategoty2 + '_2',
				parentId: idToCategoty2,
				name: 'Category 2 2',
				done: true,
				nestedCats: [],
			},
		],
	},
	{
		id: idToCategoty3,
		parentId: '',
		name: 'Category 3',
		done: true,
		nestedCats: [],
	},
	{
		id: idToCategoty1 + '_1',
		parentId: idToCategoty1,
		name: 'Category 1 1',
		done: true,
		nestedCats: [],
	},
	{
		id: idToCategoty1 + '_2',
		parentId: idToCategoty1,
		name: 'Category 1 2',
		done: true,
		nestedCats: [],
	},
	{
		id: idToCategoty2 +'_1',
		parentId: idToCategoty2,
		name: 'Category 2 1',
		done: true,
		nestedCats: [],
	},
	{
		id: idToCategoty2 + '_2',
		parentId: idToCategoty2,
		name: 'Category 2 2',
		done: true,
		nestedCats: [],
	},
];
const createCategory = (categoryId, name, isNested) => {
	const nameOfCategory = name === '' ? 'NoName' : name;
	return {
		id: categoryId + uniqueKey(isNested),
		parentId: categoryId,
		name: nameOfCategory,
		description: '',
		done: true,
		nestedCats: [],
	};
};

export function listOfCategoriesToState(state = initialState, action) {
	switch (action.type) {
		case 'DELETE_CATEGORY':
			if (action.parentId !== '') {
				const indexItemToDelete = state.find(({ id }) => id === action.parentId).nestedCats.findIndex(({ id }) => id === action.payload);
				state.find(({ id }) => id === action.parentId).nestedCats.splice(indexItemToDelete, 1);
			}
			return [...state.filter(({ id }) => !id.includes(action.payload))];
		case 'ADD_CATEGORY':
			if(action.parentId === '') {
				return [createCategory('', action.payload, false), ...state];
			} else {
				const nestedCategory = createCategory(action.parentId, action.payload, true);
				state.find(({ id }) => id === action.parentId).nestedCats.splice(0, 0, nestedCategory);
				return [...state, nestedCategory];
			}
		case 'EDIT_CATEGORY_NAME':
			const nameOfCategory = action.payload === '' ? 'NoName' : action.payload;
			if (action.parentId) {
				const indexItemToDelete = state.find(({ id }) => id === action.parentId).nestedCats.findIndex(({ id }) => id === action.categoryId);
				state.find(({ id }) => id === action.parentId).nestedCats[indexItemToDelete].name = nameOfCategory;
			}
			state.find(({ id }) => id === action.categoryId).name = nameOfCategory;
			return [...state];
		case 'CHECK_ON_COMPLITED':
			const currentTask = action.tasks.find(({ id }) => id === action.payload);
			const allTaskInCatComplited = action.tasks.filter(({ parentId }) => parentId === currentTask.parentId).every(({ done }) => !!done);
			if(allTaskInCatComplited) state.find(({ id }) => id === currentTask.parentId).done = true;
			if(!allTaskInCatComplited) state.find(({ id }) => id === currentTask.parentId).done = false;
			return[...state]
		default: return state;
	}
}
