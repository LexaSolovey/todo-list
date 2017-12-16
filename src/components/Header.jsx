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
		this.clearSearchLine = this.clearSearchLine.bind(this);
	}

	handleSubmit = (event) => {
		const { searchLine, showDoneTasks } = this.state;
		const searchLineToChange = queryString.stringify({filter : searchLine, showDone: showDoneTasks});
		this.props.pushQuery(searchLineToChange);
		event.preventDefault();
	}

	handleShowDoneTasksChange = () => {
		const { searchLine, showDoneTasks } = this.state;
		this.setState({showDoneTasks: !showDoneTasks});
		const checkboxChange = queryString.stringify({filter : searchLine, showDone: !showDoneTasks});
		this.props.pushQuery(checkboxChange);
	}

	handleSearchLineChange = (event) => {
		this.setState({searchLine: event.target.value});
	}

	clearSearchLine() {
		const { showDoneTasks } = this.state;
		this.setState({searchLine: ''});
		const searchLine = queryString.stringify({filter : '', showDone: showDoneTasks});
		this.props.pushQuery(searchLine);
	}

	render() {
		const { searchLine } = this.state;
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
							value={searchLine}
							onChange={this.handleSearchLineChange}
						/>
						<Icon size = "lg" name="times" onClick={this.clearSearchLine} />
					</form>
				</div>
			</header>
		);
	}
}

export default Header;
