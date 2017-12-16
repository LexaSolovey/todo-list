import React, { Component } from "react";

class ModalWindow extends Component {
	constructor(){
		super();
		this.state = {
			newCategory: '',
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleNewCategoryChange = this.handleNewCategoryChange.bind(this);
		this.handleCloseModalWindow = this.handleCloseModalWindow.bind(this);
	}

	handleSubmit(event) {
		this.props.setCategory(this.state.newCategory);
		this.setState({newCategory: ''});
		event.preventDefault();
	}

	handleNewCategoryChange(event){
		this.setState({newCategory: event.target.value});
	}

	handleCloseModalWindow() {
		this.props.closeModalWindow();
	}

	render() {
		return (
			<div className="modalWindow">
				<div className="modalWindowContent">
					<p className="modalWindowClose" onClick={this.handleCloseModalWindow}>CLOSE</p>
					<p>{this.props.type}</p>
					<form onSubmit={this.handleSubmit}>
						<input 
							type="text"
							placeholder="Enter category title"
							onChange={this.handleNewCategoryChange}
							value={this.state.newCategory}
						/>
						<input type="submit" value="Submit" onClick={this.handleSubmit} />
					</form>
				</div>
			</div>
		);
	}
}

export default ModalWindow;
