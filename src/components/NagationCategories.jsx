import React, { Component } from "react";
import { connect } from "react-redux";
import { Icon } from "react-fa";
import { push } from "react-router-redux";
import queryString from "query-string";
import classNames from 'classnames';

import ToDoItem from "../components/ToDoItem";

import { addCategory, deleteCategory, editCategoryName } from '../actions/categoriesActions';
import { changeCategoryOfTask } from '../actions/tasksActions';
import chekOnVisibleCategory from "../utils/chekOnVisibleCategory";

class NagationCategories extends Component {
	constructor(){
		super();
		this.state = {
			newCategory: '',
			isOpened: false,
		};

		this.toggleState = this.toggleState.bind(this);
	}

	handleSubmit = (event) => {
		this.props.addCategory(this.state.newCategory, '');
		this.setState({newCategory: ''});
		event.preventDefault();
	}

	handleNewCategoryNameChange = (event) => {
		this.setState({newCategory: event.target.value});
	}

	toggleState() {
		this.setState({ isOpened: !this.state.isOpened });
	}

	render() {
		const { categories, activeCategory, tasks } = this.props;
		const { newCategory, isOpened } = this.state;
		const { search } = this.props.routing.location;
		const showDone = search !== '' ? queryString.parse(search).showDone : null;
		const activeCategoryName = categories.find(({ id }) => id === activeCategory);
		const classNameOfItem = classNames({
			'': true,
			'hiddenItems': isOpened
		});
		const nestedCats = categories.map((category) => {
			if(showDone === 'true' && category.parentId === '') {
				return <li className={classNameOfItem} key={category.id}><ToDoItem {...this.props} toDoItemProps={category}/></li>;  
			} else {
				return chekOnVisibleCategory(categories, category.id, tasks) && category.parentId === ''
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
						value={newCategory}
					/>
					<input type="submit" value="Add" onClick={this.handleSubmit} />
				</form>
				<div className="openList" onClick={this.toggleState}>
					<div>
						<p>{activeCategoryName ? activeCategoryName.name : 'Choose category'}</p>
						{isOpened 
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
});

const mapDispatchToProps = () => (
	dispatch => ({
		deleteCategory: (categoryIdToDelete, parentId) => dispatch(deleteCategory(categoryIdToDelete, parentId)),
		changeSelectedCategory: categoryId => dispatch({type: 'CHANGE_SELECTED_CATEGORY', payload: categoryId}),
		categoryWasDeleted: isDeleted => dispatch({type: 'CATEGORY_WAS_DELETED', payload: isDeleted}),
		showModalWindow: isOpened => dispatch({type: 'SHOW_MODAL_WINDOW', payload: isOpened}),
		pushQuery: query => dispatch(push({search: query})),
		addCategory: (categoryName, parentId) => dispatch(addCategory(categoryName, parentId)),
		editCategoryName: (categoryId, newCategoryName, parentId) => dispatch(editCategoryName(newCategoryName, categoryId, parentId)),
		changeCategoryOfTask: (taskId, selectedCategory) => dispatch(changeCategoryOfTask(taskId, selectedCategory))
	})
);
export default connect(mapStateToProps, mapDispatchToProps)(NagationCategories);