import React, { Component } from 'react';
import { Icon } from 'react-fa';
import { Link } from 'react-router-dom';
import queryString from 'query-string';

import UndoRedo from '../containers/UndoRedo';

class Tasks extends Component {
	constructor(props){
		super(props);
		this.state = {
			newTask: '',
			isOpened: '',
		};
		
		this.handleNewTaskChange = this.handleNewTaskChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.toggleState = this.toggleState.bind(this);
	}

	handleSubmit(event) {
		this.props.addTask(this.state.newTask, this.props.match.params.id);
		this.setState({newTask: ''});
		event.preventDefault();
	}

	handleNewTaskChange(event) {
		this.setState({newTask: event.target.value});
	}

	taskIsDone(id){
		this.props.taskDoneFieldChange(id);
		this.props.checkCategoryOnComplited(this.props.tasks, id);
	}

	toggleState(){
		this.setState({ isOpened: !this.state.isOpened });
	}

	componentWillReceiveProps(nextProps) {
		if(this.props.tasks.length < nextProps.tasks.length){
			this.props.checkCategoryOnComplited(nextProps.tasks, nextProps.tasks[0].id);
		}
	}

	render() {
		const { showDone, filter = '' } = queryString.parse(this.props.location.search);
		const { id } = this.props.match.params;
		const filterTasks = this.props.tasks.filter(({ name }) => name.includes(filter));
		const tasks = showDone === 'true' 
			? filterTasks.filter(({ parentId }) => parentId === id)
			: filterTasks.filter(({ parentId, done }) => parentId === id && done === false);
		let items, classNameOfItem = 'taskItem hiddenItems';

		if(this.state.isOpened) classNameOfItem = 'taskItem';
		if(tasks.length !== 0) {
			items = tasks.map((task) => (
				<li key={task.id} className={classNameOfItem}>
					<input 
						type="checkbox" 
						defaultChecked={task.done}  
						onChange={this.taskIsDone.bind(this, task.id)} 
					/>
					<p>{task.name}</p>
					<Link to={`/category/${id}/tasks/${task.id}`} >
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
						value={this.state.newTask}
					/>
					<input type="submit" value="Add" onClick={this.handleSubmit} />
				</form>
				<div className="openList" onClick={this.toggleState}>
					<div>
						<p>{this.state.isOpened ? 'Close list of tasks' : 'Open list of tasks'}</p>
						{this.state.isOpened 
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
