// src/components/ui/alert.js

import React from "react";
import PropTypes from "prop-types";

// Alert 组件
export const Alert = ({ variant, children, className }) => {
	const variantClasses = {
		destructive: "bg-red-100 border-red-400 text-red-700",
		warning: "bg-yellow-100 border-yellow-400 text-yellow-700",
		info: "bg-blue-100 border-blue-400 text-blue-700",
		success: "bg-green-100 border-green-400 text-green-700",
	};

	return (
		<div
			className={`border-l-4 p-4 ${variantClasses[variant]} ${className}`}
			role="alert">
			{children}
		</div>
	);
};

Alert.propTypes = {
	variant: PropTypes.oneOf(["destructive", "warning", "info", "success"]),
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
};

Alert.defaultProps = {
	variant: "info",
	className: "",
};

// AlertDescription 组件
export const AlertDescription = ({ children, className }) => {
	return <div className={`ml-4 ${className}`}>{children}</div>;
};

AlertDescription.propTypes = {
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
};

AlertDescription.defaultProps = {
	className: "",
};
