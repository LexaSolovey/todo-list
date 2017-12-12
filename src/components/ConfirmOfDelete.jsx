import React from "react";

export default function ConfirmOfDelete ({ close }) {
	function handleSubmit() {
		close(false);
	}
	return (
		<div className="modalWindow">
			<div className="windowContent">
				<p>Massage</p>
				<p>Category was deleted</p>
				<button onClick={handleSubmit}>Good!</button>
			</div>
		</div>
	);
}
