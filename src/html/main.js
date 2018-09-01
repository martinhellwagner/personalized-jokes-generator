import React from "react";
import ReactDOM from "react-dom";
import injectTapEventPlugin from "react-tap-event-plugin";

import App from "../js/App.jsx";

injectTapEventPlugin();
ReactDOM.render(
	<App loginStatus="initialize" />,
	document.getElementById("app")
);
