import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { push } from "react-router-redux";
import { connect } from "react-redux";

import Header from '../components/Header';
import NagationCategories from './NagationCategories';
import Tasks from '../components/Tasks';
import EditTask from '../components/EditTask';
import ProgressBar from '../components/ProgressBar';
import ConfirmOfDelete from '../components/ConfirmOfDelete'

import '../styles/App.css';
import '../styles/media.css';


class PrimaryLayout extends Component {
	render() {
		return (
			<div className='primaryLayout'>
				{this.props.isDeleted ? <ConfirmOfDelete close={this.props.categoryWasDeleted} /> : null}
				<Header showDoneTasksChange={this.props.showDoneTasksChange} pushQuery={this.props.pushQuery} />
				<ProgressBar categories={this.props.categories} />
				<NagationCategories />
				<Switch>
					<Route exact path="/category/:id"
						render={ (props) => (
							<Tasks 
								{...props} 
								tasks={this.props.tasks}	
								addTask={this.props.addTask}	
								taskDoneFieldChange={this.props.taskDoneFieldChange}
								pushQuery={this.props.pushQuery}
								checkCategoryOnComplited={this.props.checkCategoryOnComplited}
							/>
						)}
					/>
					<Route path="/category/:id/tasks/:id"
						render={ (props) => (
							<EditTask 
								{...props} 
								tasks={this.props.tasks}	
								editTask={this.props.editTask}	
								checkCategoryOnComplited={this.props.checkCategoryOnComplited} 
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
		showDoneTasksChange: changedValue => dispatch({type: 'SHOW_DONE_TASKS', payload: changedValue}),
		pushQuery: query => dispatch(push({search: query})),
		checkCategoryOnComplited: (tasks, taskId) => dispatch({type: 'CHECK_ON_COMPLITED', payload: taskId, tasks: tasks}),
		addTask: (taskName, parentId) => dispatch({type: 'ADD_NEW_TASK', payload: taskName, parentId: parentId}),
		taskDoneFieldChange: taskId => dispatch({type: 'TASK_DONE_FIELD_CHANGE', payload: taskId}),
		categoryWasDeleted: isDeleted => dispatch({type: 'CATEGORY_WAS_DELETED', payload: isDeleted}),
		editTask: (taskId, taskName, description, isDone) =>
			dispatch({ type: 'EDIT_CURRENT_TASK', payload: taskName, taskId: taskId, description: description, isDone: isDone }),
	})
);

export default connect(mapStateToProps, mapDispatchToProps)(PrimaryLayout);
