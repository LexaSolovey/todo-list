import React from "react";
import Progress from "react-progressbar";

function ProgressBar({ categories }) {
	const countOfCategories = categories.length;
	const completedCategories = categories.filter(({ done }) => !!done).length;
	const percent = completedCategories / countOfCategories * 100;
	return (
		<div className="progressBar">
			<Progress completed={percent} />
		</div>
	);
}

export default ProgressBar;
