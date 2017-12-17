import uniqueKey from '../utils/uniqueKey';
import * as actions from '../actions/categoriesActions';

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

export function listOfCategoriesToState(state = initialState, action) {
	switch (action.type) {
		case actions.DELETE_CATEGORY:
			if (action.parentId !== '') {
				const newState = state.map((category) => (
					category.id === action.parentId
						? Object.assign({}, category, {nestedCats: category.nestedCats.filter(({ id }) => id !== action.categoryIdToDelete)})
						: category
				));
				return [...newState.filter(({ id }) => !id.includes(action.categoryIdToDelete))];
			}
			return [...state.filter(({ id }) => !id.includes(action.categoryIdToDelete))];
		case 'ADD_CATEGORY':
			if(action.parentId !== '') {
				const newState = state.map((category) => (
					category.id === action.parentId
						? Object.assign({}, category, {nestedCats: [action.payload, ...category.nestedCats]})
						: category
				));
				return [
					...newState,
					action.payload
				];
			} 
			return [action.payload, ...state];
		case actions.EDIT_CATEGORY_NAME:
			const nameOfCategory = action.newCategoryName === '' ? 'NoName' : action.newCategoryName;
			if (action.parentId !== '') {
				const newState = state.map((category) => {
					if (category.id === action.parentId) {
						return Object.assign({}, category, {
							nestedCats: category.nestedCats.map((nestedCat) => (
									nestedCat.id === action.categoryId
										? Object.assign({}, nestedCat, {name: nameOfCategory})
										: nestedCat
								))
						})
					} else return category;
				});
				return [...newState];
			}
			return state.map((category) => (
				category.id === action.categoryId
					? Object.assign({}, category, {name: nameOfCategory})
					: category
			));
		case actions.CHECK_ON_COMPLITED:
			const currentTask = action.tasks.find(({ id }) => id === action.taskId);
			const allTaskInCatComplited = action.tasks.filter(({ parentId }) => parentId === currentTask.parentId).every(({ done }) => !!done);
			if (allTaskInCatComplited) {
				return state.map((category) => (
					category.id === currentTask.parentId
						? Object.assign({}, category, {done: true})
						: category
				));
			} 
			if (!allTaskInCatComplited) {
				return state.map((category) => (
					category.id === currentTask.parentId
						? Object.assign({}, category, {done: false})
						: category
				));
			}
			break;
		default: return state;
	}
}
