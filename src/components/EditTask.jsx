import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class EditTask extends Component {
	constructor(){
		super();
		this.state = {
			parentId: '',
			taskName: '',
			description: '',
			taskIsDone: false,
			redirect: false,
		};
		this.taskIsDone = this.taskIsDone.bind(this);
		this.handleTaskDescriptionChange = this.handleTaskDescriptionChange.bind(this);
		this.handleTaskNameChange = this.handleTaskNameChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleCancel = this.handleCancel.bind(this);
	}

	handleSubmit() {
		this.props.editTask(this.props.match.params.id, this.state.taskName, this.state.description, this.state.taskIsDone);
		this.setState({redirect: true});
	}
  
	handleTaskDescriptionChange(event) {
		this.setState({description: event.target.value});
	}

	handleTaskNameChange(event) {
		this.setState({taskName: event.target.value});
	}

	taskIsDone() {
		this.setState({taskIsDone: !this.state.taskIsDone});
	}

	handleCancel() {
		this.setState({redirect: true});
	}

	componentDidMount(){
		const currentTask = this.props.tasks.find(({ id }) => id === this.props.match.params.id);
		if(currentTask && this.state.parentId === '' && this.state.taskName === '') {
			this.setState({ 
				parentId: currentTask.parentId,
				taskName: currentTask.name,
				description: currentTask.description,
				taskIsDone: currentTask.done
			});
		}
	}

	render() {
		if(this.state.redirect) return <Redirect push to={`/category/${this.state.parentId}`} />; 
		return (
			<section className="editTask">
				<form onSubmit={this.handleSubmit}>
					<div>
						<input type="button" value="Cancel" onClick={this.handleCancel} />
						<input type="button" value="Save Changes" onClick={this.handleSubmit} />
					</div>
					<div>
						<input type="text" onChange={this.handleTaskNameChange} value={this.state.taskName} />
						<div>
							<input type="checkbox" id="complited" defaultChecked={this.state.taskIsDone} onChange={this.taskIsDone} />
							<label htmlFor="complited">Done</label>
						</div>
					</div>
					<textarea 
						name="description" 
						placeholder="Description" 
						cols="30" 
						rows="10"
						value={this.state.description}
						onChange={this.handleTaskDescriptionChange}
					/>
				</form>
			</section>
		);
	}
}

export default EditTask;
