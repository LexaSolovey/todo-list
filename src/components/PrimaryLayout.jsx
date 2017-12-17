import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { push } from "react-router-redux";
import { connect } from "react-redux";

import { addTask, taskDoneFieldChange, editTask } from '../actions/tasksActions';
import { checkCategoryOnComplited } from '../actions/categoriesActions';

import Header from './Header';
import NagationCategories from './NagationCategories';
import Tasks from './Tasks';
import EditTask from './EditTask';
import ProgressBar from './ProgressBar';
import ConfirmOfDelete from './ConfirmOfDelete'

import '../styles/App.css';
import '../styles/media.css';


class PrimaryLayout extends Component {
	render() {
		const { 
			isDeleted,
			tasks, 
			categories, 
			addTask,
			editTask,
			pushQuery, 
			categoryWasDeleted, 
			taskDoneFieldChange, 
			checkCategoryOnComplited,
		} = this.props;
		return (
			<div className='primaryLayout'>
				{isDeleted ? <ConfirmOfDelete close={categoryWasDeleted} /> : null}
				<Header pushQuery={pushQuery} />
				<ProgressBar categories={categories} />
				<NagationCategories />
				<Switch>
					<Route exact path="/category/:id"
						render={ (props) => (
							<Tasks 
								{...props} 
								tasks={tasks}	
								addTask={addTask}	
								taskDoneFieldChange={taskDoneFieldChange}
								pushQuery={pushQuery}
								checkCategoryOnComplited={checkCategoryOnComplited}
							/>
						)}
					/>
					<Route path="/category/:id/tasks/:id"
						render={ (props) => (
							<EditTask 
								{...props} 
								tasks={tasks}	
								editTask={editTask}	
								checkCategoryOnComplited={checkCategoryOnComplited} 
							/>
						)}
					/>
				</Switch>
			</div>
		);
	}
	
}

const mapStateToProps = (state) => ({
	categories: state.listOfCategoriesToState,
	tasks: state.listOfTasksToState.present,
	isDeleted: state.categoryWasDeleted,
});

const mapDispatchToProps = () => (
	dispatch => ({
		pushQuery: query => dispatch(push({search: query})),
		checkCategoryOnComplited: (tasks, taskId) => dispatch(checkCategoryOnComplited(tasks, taskId)),
		addTask: (taskName, parentId) => dispatch(addTask(taskName, parentId)),
		taskDoneFieldChange: taskId => dispatch(taskDoneFieldChange(taskId)),
		categoryWasDeleted: isDeleted => dispatch({type: 'CATEGORY_WAS_DELETED', payload: isDeleted}),
		editTask: (taskId, taskName, description, isDone) => dispatch(editTask(taskId, taskName, description, isDone)),
	})
);

export default connect(mapStateToProps, mapDispatchToProps)(PrimaryLayout);
