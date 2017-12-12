import React, { Component } from "react";
import { connect } from "react-redux";
import { Icon } from "react-fa";
import { push } from "react-router-redux";
import queryString from "query-string";

import ToDoItem from "../components/ToDoItem";

import chekOnVisibleCategory from "../utils/chekOnVisibleCategory";

class NagationCategories extends Component {
	constructor(){
		super();
		this.state = {
			newCategory: '',
			isOpened: false,
		};
    
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleNewCategoryNameChange = this.handleNewCategoryNameChange.bind(this);
		this.toggleState = this.toggleState.bind(this);
	}

	handleSubmit(event) {
		this.props.addCategory('', this.state.newCategory)
		this.setState({newCategory: ''});
		event.preventDefault();
	}

	handleNewCategoryNameChange(event) {
		this.setState({newCategory: event.target.value});
	}

	toggleState() {
		this.setState({ isOpened: !this.state.isOpened });
	}

	render() {  
		const { search } = this.props.routing.location;
		const showDone = search !== '' ? queryString.parse(search).showDone : null;
		const activeCategoryName = this.props.categories.find(({ id }) => id === this.props.activeCategory);
		let classNameOfItem =  'hiddenItems';
		if(this.state.isOpened) classNameOfItem = '';

		const nestedCats = this.props.categories.map((category) => {
			if(showDone === 'true' && category.parentId === '') {
				return <li className={classNameOfItem} key={category.id}><ToDoItem {...this.props} toDoItemProps={category}/></li>;  
			} else {
				return chekOnVisibleCategory(this.props.categories, category.id, this.props.tasks) && category.parentId === ''
					? <li className={classNameOfItem} key={category.id}><ToDoItem {...this.props} toDoItemProps={category}/></li>
					: null;  
			}
		});

		return (
			<aside>
				<form className="addCategory"  onSubmit={this.handleSubmit}>
					<input 
						type="text"
						placeholder="Enter category title"
						onChange={this.handleNewCategoryNameChange}
						value={this.state.newCategory}
					/>
					<input type="submit" value="Add" onClick={this.handleSubmit} />
				</form>
				<div className="openList" onClick={this.toggleState}>
					<div>
						<p>{activeCategoryName ? activeCategoryName.name : 'Choose category'}</p>
						{this.state.isOpened 
							? <Icon name="angle-up" size = "lg" /> 
							: <Icon name="angle-down" size = "lg" /> }
					</div>
				</div>
				<ul>
					{nestedCats}
				</ul>
			</aside>
		);
	}
}

const mapStateToProps = (state) => ({
	categories: state.listOfCategoriesToState,
	tasks: state.listOfTasksToState.present,
	routing: state.routing,
	activeCategory: state.changeSelectedCategory,
	modalWindowType: state.showModalWindow,
});

const mapDispatchToProps = () => (
	dispatch => ({
		deleteCategory: (categoryIdToDelete, parentId) => dispatch({type: 'DELETE_CATEGORY', payload: categoryIdToDelete, parentId: parentId}),
		changeSelectedCategory: categoryId => dispatch({type: 'CHANGE_SELECTED_CATEGORY', payload: categoryId}),
		categoryWasDeleted: isDeleted => dispatch({type: 'CATEGORY_WAS_DELETED', payload: isDeleted}),
		showModalWindow: isOpened => dispatch({type: 'SHOW_MODAL_WINDOW', payload: isOpened}),
		pushQuery: query => dispatch(push({search: query})),
		addCategory: (parentId, categoryName) => 
			dispatch({type: 'ADD_CATEGORY', payload: categoryName, parentId: parentId}),
		editCategoryName: (categoryId, newCategoryName, parentId) => 
			dispatch({type: 'EDIT_CATEGORY_NAME', payload: newCategoryName, categoryId: categoryId, parentId: parentId}),
		changeCategoryOfTask: (taskId, selectedCategory) =>
			dispatch({type: 'CHANGE_CATEGORY_OF_TASK', payload: selectedCategory, taskId: taskId}),
	})
);
export default connect(mapStateToProps, mapDispatchToProps)(NagationCategories);