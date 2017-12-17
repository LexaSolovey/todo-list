import React from "react";

export default function ConfirmOfDelete ({ close }) {
	const handleSubmit = () => {
		close(false);
	};
	
	return (
		<div className="modalWindow">
			<div className="modalWindowContent">
				<p>Massage</p>
				<p>Category was deleted</p>
				<button onClick={handleSubmit}>Good!</button>
			</div>
		</div>
	);
}
