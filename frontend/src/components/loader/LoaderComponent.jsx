import * as React from "react";

import './_styles.scss';

export default function() {
	return (
		<div className="d-flex align-items-center justify-content-center flex-column loader-container">
			<svg className="spinner" width="120px" height="120px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
				<circle className="path" fill="none" strokeWidth="6" strokeLinecap="round" cx="33" cy="33" r="30"></circle>
			</svg>
		</div> 
		);
}