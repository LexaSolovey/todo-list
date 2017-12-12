import React, { Component } from "react";
import { Icon } from "react-fa";
import { Link } from "react-router-dom";
import queryString from "query-string";

class Header extends Component {
	constructor(){
		super();
		this.state = {
			searchLine: '',
			showDoneTasks: false,
			redirect: false,
		};

		this.handleShowDoneTasksChange = this.handleShowDoneTasksChange.bind(this);
		this.handleSearchLineChange = this.handleSearchLineChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.clearSearchLine = this.clearSearchLine.bind(this);
	}

	handleSubmit(event) {
		const searchLine = queryString.stringify({filter : this.state.searchLine, showDone: this.state.showDoneTasks});
		this.props.pushQuery(searchLine);
		event.preventDefault();
	}

	handleShowDoneTasksChange(){
		this.setState({showDoneTasks: !this.state.showDoneTasks});
		const checkboxChange = queryString.stringify({filter : this.state.searchLine, showDone: !this.state.showDoneTasks});
		this.props.pushQuery(checkboxChange);
	}

	handleSearchLineChange(event) {
		this.setState({searchLine: event.target.value});
	}

	clearSearchLine() {
		this.setState({searchLine: ''});
		const searchLine = queryString.stringify({filter : '', showDone: this.state.showDoneTasks});
		this.props.pushQuery(searchLine);
	}

	render() {
		return (
			<header >
				<Link to="/">
					<h1 className="nameOfServise">To-Do List</h1>
				</Link>
				<div className="inputs">
					<div className="checkboxShowDoneTasks">
						<input 
							type="checkbox" 
							id="showDoneTasks"
							defaultChecked={this.props.showDoneTasks} 
							onChange={this.handleShowDoneTasksChange} 
						/>
						<label htmlFor="showDoneTasks">Show done</label>
					</div>
					<form className="searchForm"  onSubmit={this.handleSubmit}>
						<input 
							type="text"
							placeholder="Search"
							value={this.state.searchLine}
							onChange={this.handleSearchLineChange}
							onFocus={this.onFocusInput}
							onBlur={this.onBlurInput} />
						<Icon size = "lg" name="times" onClick={this.clearSearchLine} />
					</form>
				</div>
			</header>
		);
	}
}

export default Header;
