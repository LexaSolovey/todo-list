export default function changeSelectedCategory(state = '', action) {
    if(action.type === 'CHANGE_SELECTED_CATEGORY') return action.payload;
    return state;
}