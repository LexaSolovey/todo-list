import React, { Component } from 'react';
import { Icon } from 'react-fa';
import { Link } from 'react-router-dom';
import queryString from 'query-string';

import ModalWindow from './ModalWindow';

import chekOnVisibleCategory from '../utils/chekOnVisibleCategory';


class ToDoItem extends Component {
	constructor(){
		super();
		this.state = {
			isOpened : false,
			modalWindowType: false,
		};
    
		this.openCategory = this.openCategory.bind(this);
		this.handleDeleteCategory = this.handleDeleteCategory.bind(this);
		this.handleAddNestedCategory = this.handleAddNestedCategory.bind(this);
		this.handleEditCategoryName = this.handleEditCategoryName.bind(this);
		this.handleChangeCategoryOfTask = this.handleChangeCategoryOfTask.bind(this);
		this.setCategory = this.setCategory.bind(this);
		this.closeModalWindow = this.closeModalWindow.bind(this)
	}

	openCategory() {
		if(Object.keys(this.props.categories.find(({ id }) => id === this.props.toDoItemProps.id).nestedCats.length !== 0)) {
			this.setState({isOpened: !this.state.isOpened});
		}
		this.props.changeSelectedCategory(this.props.toDoItemProps.id);
	}

	handleDeleteCategory(event) {
		this.props.deleteCategory(this.props.toDoItemProps.id, this.props.toDoItemProps.parentId);
		this.props.categoryWasDeleted(true);
		event.stopPropagation();
		event.preventDefault();
	}

	handleAddNestedCategory(event) {
		this.setState({modalWindowType: 'Add nested category'});
		event.stopPropagation();
		event.preventDefault();
	}

	handleEditCategoryName(event) {
		this.setState({modalWindowType: 'Edit name of category'});
		event.stopPropagation();
		event.preventDefault();
	}

	handleChangeCategoryOfTask(event) {
		const splitPath = this.props.routing.location.pathname.split('/');
		const taskId = splitPath[splitPath.length-1];
		this.props.changeCategoryOfTask(taskId, this.props.toDoItemProps.id);
		event.stopPropagation();
		event.preventDefault();  
	}

	setCategory(newCategoryName) {
		switch (this.state.modalWindowType) {
			case 'Add nested category':
				console.log(this.props.toDoItemProps.id, this.props.categories);
				this.props.addCategory(this.props.toDoItemProps.id, newCategoryName);
				break;
			case 'Edit name of category':
				this.props.editCategoryName(this.props.toDoItemProps.id, newCategoryName, this.props.toDoItemProps.parentId);
				break;
			default: break;
		}
		this.setState({modalWindowType: false})
	}

	closeModalWindow() {
		this.setState({modalWindowType: false});
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.routing.location.query &&	this.props.routing.location !== nextProps.routing.location) {
			nextProps.pushQuery(nextProps.routing.location.query);
		}
	}

	render() {
		const classNameOfItem = this.props.activeCategory === this.props.toDoItemProps.id ? 'category active' : 'category';
		const { search } = this.props.routing.location;
		const showDone = search !== '' ? queryString.parse(search).showDone : null;
		const currentCategory = this.props.categories.find(({ id }) => id === this.props.toDoItemProps.id);
		let nestedCats, buttonsOfItem, editButton;

		if(this.props.routing.location.pathname.includes('/tasks/')) {
			if(this.props.activeCategory !== this.props.toDoItemProps.id) {
				buttonsOfItem = 
					<div className="rightBtn">
						<Icon size = "lg" name="arrow-circle-o-left" onClick={this.handleChangeCategoryOfTask} />
					</div>;
			}
		} else {
			buttonsOfItem = 
				<div className="rightBtn">
					<Icon size = "lg" name="plus" onClick={this.handleAddNestedCategory} />
					<Icon size = "lg" name="trash-o" onClick={this.handleDeleteCategory}/>
				</div>;
			editButton = 
				<div>
					<Icon size = "lg" name="pencil-square-o" onClick={this.handleEditCategoryName} />
				</div>;
		}

		if(this.state.isOpened) {
			nestedCats = currentCategory.nestedCats.map((nestedCat) => {
				if(showDone === 'true') {
					return <li key={nestedCat.id} className="Catigoties"><ToDoItem {...this.props} toDoItemProps={nestedCat} /></li>;
				} else {
					return chekOnVisibleCategory(this.props.categories, nestedCat.id, this.props.tasks)
						? <li key={nestedCat.id} className="Catigoties"><ToDoItem {...this.props} toDoItemProps={nestedCat} /></li>
						: null;
				}
			});
		}

		return (
			<div className="toDoItem">
				{this.state.modalWindowType 
					? <ModalWindow 
						toDoItemProps={this.props.toDoItemProps}
						setCategory={this.setCategory}
						closeModalWindow={this.closeModalWindow}
						type={this.state.modalWindowType} 
					/> 
					: null}
				<div className="currentItem">
					<Link to={{pathname: `/category/${this.props.toDoItemProps.id}`, query: this.props.routing.location.search}} >
						<div className={classNameOfItem}  onClick={this.openCategory}>
							<div className="nameAndEdit">
								<div>
									<p>{this.props.toDoItemProps.name}</p>
								</div>
								{editButton}
							</div>
							{buttonsOfItem}
						</div>
					</Link>
				</div>
				<ul>
					{nestedCats}
				</ul>
			</div>
		);
	}
}

export default ToDoItem;
