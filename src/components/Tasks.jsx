import React, { Component } from 'react';
import { Icon } from 'react-fa';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import classNames from 'classnames';

import UndoRedo from './UndoRedo';

class Tasks extends Component {
	constructor(props){
		super(props);
		this.state = {
			newTask: '',
			isOpened: '',
		};

		this.toggleState = this.toggleState.bind(this);
	}

	handleSubmit = (event) => {
		const { newTask } = this.state;
		const { id } = this.props.match.params;
		this.props.addTask(newTask, id);
		this.setState({newTask: ''});
		event.preventDefault();
	}

	handleNewTaskChange = (event) => {
		this.setState({newTask: event.target.value});
	}

	taskIsDone(id){
		const { tasks } = this.props;
		this.props.taskDoneFieldChange(id);
		this.props.checkCategoryOnComplited(tasks, id);
	}

	toggleState(){
		const { isOpened } = this.state;
		this.setState({isOpened: !isOpened});
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.tasks.length < nextProps.tasks.length){
			this.props.checkCategoryOnComplited(nextProps.tasks, nextProps.tasks[0].id);
		}
	}

	render() {
		const { showDone, filter = '' } = queryString.parse(this.props.location.search);
		const { id } = this.props.match.params;
		const { newTask, isOpened } = this.state;
		const filterTasks = this.props.tasks.filter(({ name }) => name.includes(filter));
		const tasks = showDone === 'true' 
			? filterTasks.filter(({ parentId }) => parentId === id)
			: filterTasks.filter(({ parentId, done }) => parentId === id && done === false);
		const classNameOfItem = classNames({
			'taskItem hiddenItems': !isOpened,
			'taskItem': isOpened
		});
		let items;

		if (tasks.length !== 0) {
			items = tasks.map((task) => (
				<li key={task.id} className={classNameOfItem}>
					<input 
						type="checkbox" 
						defaultChecked={task.done}  
						onChange={this.taskIsDone.bind(this, task.id)} 
					/>
					<p>{task.name}</p>
					<Link to={{pathname: `/category/${id}/tasks/${task.id}`, currentTask: task}} >
						<Icon size = "lg" name="pencil-square-o" />
					</Link>
				</li>
			));
		}

		return (
			<main>
				<form onSubmit={this.handleSubmit}>
					<input 
						type="text"
						placeholder="Enter a task title"
						onChange={this.handleNewTaskChange}
						value={newTask}
					/>
					<input type="submit" value="Add" onClick={this.handleSubmit} />
				</form>
				<div className="openList" onClick={this.toggleState}>
					<div>
						<p>{isOpened ? 'Close list of tasks' : 'Open list of tasks'}</p>
						{isOpened 
							? <Icon name="angle-up" size = "lg" /> 
							: <Icon name="angle-down" size = "lg" /> }
					</div>
				</div>
				<ul>
					{items}
				</ul>
				<UndoRedo />
			</main>
		);
	}
}

export default Tasks;
