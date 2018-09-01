import React from "react";
import ReactDOM from "react-dom";
import ReactTestUtils from "react-addons-test-utils";

import axios from "axios";
import { expect } from "chai";
import { mount, shallow } from "enzyme";
import sinon from "sinon";

import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import AppBar from "material-ui/AppBar";
import FlatButton from "material-ui/FlatButton"
import { List } from "material-ui/List";

import Main from "../js/App.jsx";

describe("Main component", () => {
  it("should render itself", () => {
    const wrapper = shallow(<Main />);
    expect(wrapper).to.have.length(1);
  });
  it("should render AppBar component", () => {
    const wrapper = shallow(<Main />);
    expect(wrapper.find(AppBar)).to.have.length(1);
  });
  it("should render List component", () => {
    const wrapper = shallow(<Main />);
    expect(wrapper.find(List)).to.have.length(1);
  });
  it("should fetch all jokes", () => {
    axios.get("http://api.icndb.com/jokes")
    .then(res => {
      const jokes = res.data.value;
       // at the time of coding, 539 jokes were fetched from the API
      expect(jokes).to.have.length.above(500);
    });
  });
  it("should call performSearch function when button is clicked", () => {
    const performSearch = sinon.spy();
    const muiTheme = getMuiTheme();
    const mountwWithContext = (node) => mount(node, { context: { muiTheme }});
    const wrapper = mountwWithContext(
      <AppBar
        onRightIconButtonTouchTap={ performSearch }
        iconElementRight={ <FlatButton label="Search" /> }
      />
    );
    const button = wrapper.find(FlatButton);
    ReactTestUtils.Simulate.touchTap(ReactDOM.findDOMNode(button.node));
    expect(performSearch).to.have.property("callCount", 1);
  });
})
