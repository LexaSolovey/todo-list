import React, { Component } from 'react';
import { Icon } from 'react-fa';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import classNames from 'classnames';

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
		this.setCategory = this.setCategory.bind(this);
		this.closeModalWindow = this.closeModalWindow.bind(this)
	}

	openCategory() {
		const { categories } = this.props;
		const { isOpened } = this.state;
		const { id } = this.props.toDoItemProps;
		const haveNestedCats = categories.find(category => category.id === id).nestedCats.length !== 0;
		if (haveNestedCats) {
			this.setState({isOpened: !isOpened});
		}
		this.props.changeSelectedCategory(id);
	}

	handleDeleteCategory = (event) => {
		const { id, parentId } = this.props.toDoItemProps;
		this.props.deleteCategory(id, parentId);
		this.props.categoryWasDeleted(true);
		event.stopPropagation();
		event.preventDefault();
	}

	handleAddNestedCategory = (event) => {
		this.setState({modalWindowType: 'Add nested category'});
		event.stopPropagation();
		event.preventDefault();
	}

	handleEditCategoryName = (event) => {
		this.setState({modalWindowType: 'Edit name of category'});
		event.stopPropagation();
		event.preventDefault();
	}

	handleChangeCategoryOfTask = (event) => {
		const { pathname } = this.props.routing.location;
		const { id } = this.props.toDoItemProps; 
		const splitPath = pathname.split('/');
		const taskId = splitPath[splitPath.length-1];
		this.props.changeCategoryOfTask(taskId, id);
		event.stopPropagation();
		event.preventDefault();  
	}

	setCategory(newCategoryName) {
		const { modalWindowType } = this.state;
		const { id, parentId } = this.props.toDoItemProps;
		const casesOfWindowType = {
			add: 'Add nested category',
			edit:'Edit name of category'
		};
		if (modalWindowType === casesOfWindowType.add) {
			this.props.addCategory(id, newCategoryName);
		}
		if (modalWindowType === casesOfWindowType.edit) {
			this.props.editCategoryName(id, newCategoryName, parentId);
		}
		this.setState({modalWindowType: false})
	}

	closeModalWindow() {
		this.setState({modalWindowType: false});
	}

	componentWillReceiveProps(nextProps) {
		const { location } = nextProps.routing;
		if (location.query &&	this.props.routing.location !== location) {
			nextProps.pushQuery(location.query);
		}
	}

	render() {
		const { activeCategory, toDoItemProps, categories, tasks } = this.props;
		const { isOpened, modalWindowType } = this.state;
		const { search, pathname } = this.props.routing.location;
		const showDone = search !== '' ? queryString.parse(search).showDone : null;
		const checkCategoryOnActive = activeCategory !== toDoItemProps.id;
		const currentCategory = categories.find(({ id }) => id === toDoItemProps.id);
		const classNameOfItem = classNames({
			'category': true,
			'active': !checkCategoryOnActive
		});
		let nestedCats, buttonsOfItem, editButton;

		if (pathname.includes('/tasks/')) {
			if (checkCategoryOnActive) {
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

		if(isOpened) {
			nestedCats = currentCategory.nestedCats.map((nestedCat) => {
				if(showDone === 'true') {
					return <li key={nestedCat.id} className="Catigoties"><ToDoItem {...this.props} toDoItemProps={nestedCat} /></li>;
				} else {
					return chekOnVisibleCategory(categories, nestedCat.id, tasks)
						? <li key={nestedCat.id} className="Catigoties"><ToDoItem {...this.props} toDoItemProps={nestedCat} /></li>
						: null;
				}
			});
		}

		return (
			<div className="toDoItem">
				{modalWindowType 
					? <ModalWindow 
						setCategory={this.setCategory}
						closeModalWindow={this.closeModalWindow}
						type={modalWindowType} 
					/> 
					: null}
				<div className="currentItem">
					<Link to={{pathname: `/category/${toDoItemProps.id}`, query: search}} >
						<div className={classNameOfItem}  onClick={this.openCategory}>
							<div className="nameAndEdit">
								<div>
									<p>{toDoItemProps.name}</p>
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
