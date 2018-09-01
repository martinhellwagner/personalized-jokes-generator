import React from "react";
import ReactDOM from "react-dom";
import ReactTestUtils from "react-addons-test-utils";
import injectTapEventPlugin from "react-tap-event-plugin";

import { expect } from "chai";
import { mount, shallow } from "enzyme";
import sinon from "sinon";

import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import AppBar from "material-ui/AppBar";
import FlatButton from "material-ui/FlatButton"
import { List } from "material-ui/List";

import App from "../js/App.jsx";

injectTapEventPlugin();

describe("App component", () => {
  it("should render itself", () => {
    const wrapper = shallow(<App />);
    expect(wrapper).to.have.length(1);
  });
  it("should render AppBar component", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(AppBar)).to.have.length(1);
  });
  it("should render List component", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(List)).to.have.length(1);
  });
  it("should call login function when button is clicked", () => {
    const login = sinon.spy();
    const muiTheme = getMuiTheme();
    const mountwWithContext = (node) => mount(node, { context: { muiTheme }});
    const wrapper = mountwWithContext(
      <AppBar
        onRightIconButtonTouchTap={ login }
        iconElementRight={ <FlatButton label="Login" /> }
      />
    );
    const button = wrapper.find(FlatButton);
    ReactTestUtils.Simulate.touchTap(ReactDOM.findDOMNode(button.node));
    expect(login).to.have.property("callCount", 1);
  });
})
