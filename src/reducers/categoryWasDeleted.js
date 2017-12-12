const categoryWasDeleted = (state = false, action) => {
	if(action.type === 'CATEGORY_WAS_DELETED') return action.payload;
	return state;
}

export default categoryWasDeleted;
