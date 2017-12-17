import React from "react";
import Progress from "react-progressbar";

function ProgressBar({ categories }) {
	const countOfCategories = categories.length;
	const completedCategories = categories.filter(({ done }) => !!done).length;
	const percent = completedCategories / countOfCategories * 100;
	return (
		<section className="progressBar">
			<Progress completed={percent} />
		</section>
	);
}

export default ProgressBar;
