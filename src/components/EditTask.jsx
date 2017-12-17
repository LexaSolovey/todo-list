import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class EditTask extends Component {
	constructor(props){
		super(props);
		const { currentTask } = props.location;
		this.state = {
			parentId: currentTask.parentId,
			taskName: currentTask.name,
			description: currentTask.description,
			taskIsDone: currentTask.done,
			redirect: false,
		};
		this.cancel = this.cancel.bind(this);
	}

	handleSubmit = () => {
		const { taskName, description, taskIsDone } = this.state;
		const { id } = this.props.match.params;
		this.props.editTask(id, taskName, description, taskIsDone);
		this.setState({redirect: true});
	}
  
	handleTaskDescriptionChange = (event) => {
		this.setState({description: event.target.value});
	}

	handleTaskNameChange = (event) => {
		this.setState({taskName: event.target.value});
	}

	handleTaskDone = () => {
		this.setState({taskIsDone: !this.state.taskIsDone});
	}

	cancel() {
		this.setState({redirect: true});
	}

	render() {
		const { parentId, taskName, description, taskIsDone, redirect } = this.state;
		if (redirect) {
			return <Redirect push to={`/category/${parentId}`} />; 
		}

		return (
			<section className="editTask">
				<form onSubmit={this.handleSubmit}>
					<div>
						<input type="button" value="Cancel" onClick={this.cancel} />
						<input type="button" value="Save Changes" onClick={this.handleSubmit} />
					</div>
					<div>
						<input type="text" onChange={this.handleTaskNameChange} value={taskName} />
						<div>
							<input type="checkbox" id="complited" defaultChecked={taskIsDone} onChange={this.handleTaskDone} />
							<label htmlFor="complited">Done</label>
						</div>
					</div>
					<textarea 
						name="description" 
						placeholder="Description" 
						cols="30" 
						rows="10"
						value={description}
						onChange={this.handleTaskDescriptionChange}
					/>
				</form>
			</section>
		);
	}
}

export default EditTask;
