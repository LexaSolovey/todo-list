import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { push } from "react-router-redux";
import { connect } from "react-redux";

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
			showDoneTasksChange,
			taskDoneFieldChange, 
			checkCategoryOnComplited,
 		} = this.props;
		return (
			<div className='primaryLayout'>
				{isDeleted ? <ConfirmOfDelete close={categoryWasDeleted} /> : null}
				<Header showDoneTasksChange={showDoneTasksChange} pushQuery={pushQuery} />
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
