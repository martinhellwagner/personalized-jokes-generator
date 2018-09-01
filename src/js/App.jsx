import React from "react";
import Alert from "react-s-alert";

import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import AppBar from "material-ui/AppBar";
import FlatButton from "material-ui/FlatButton";
import { List, ListItem } from "material-ui/List";

import Main from "./Main.jsx";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginStatus: props.loginStatus
    };
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    // prepare Google OAuth login
    ((d, s, id, cb) => {
      const element = d.getElementsByTagName(s)[0];
      const fjs = element;
      let js = element;
      js = d.createElement(s);
      js.id = id;
      js.src = "//apis.google.com/js/client:platform.js";
      fjs.parentNode.insertBefore(js, fjs);
      js.onload = cb;
    })(document, "script", "google-login", () => {
      const params = {
        client_id: "564121675711-ud79aicca33tslfr670egavksqq2l9vl.apps.googleusercontent.com",
        cookie_policy: "single_host_origin",
        fetch_basic_profile: true,
        scope: "profile email"
      };
      window.gapi.load("auth2", () => {
        if (!window.gapi.auth2.getAuthInstance()) {
          window.gapi.auth2.init(params);
        }
      });
    });
  }

  login() {
    // execute Google OAuth login
    window.gapi.auth2.getAuthInstance().signIn()
    .then((res) => {
      const user = res.getBasicProfile();
      this.setState({
        loginStatus: "loggedIn",
        firstName: user.getGivenName(),
        lastName: user.getFamilyName()
      });
      Alert.success("Login successful");
      this.forceUpdate();
    }, (err) => {
      this.setState({
        loginStatus: "loginFailure",
        error: err
      });
      console.log(err);
      Alert.error("Login failed");
      this.forceUpdate();
    })
  }

  logout() {
    this.setState({
      loginStatus: "loggedOut"
    });
    Alert.success("Logout successful");
    this.forceUpdate();
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div>
          <AppBar
            title={
              this.state.loginStatus === "loggedIn" ?
              "Welcome, " + this.state.firstName + " " + this.state.lastName : "Welcome, friend"
            }
            iconElementRight={ <FlatButton label={ this.state.loginStatus === "loggedIn" ? "Logout" : "Login" } /> }
            onRightIconButtonTouchTap={ this.state.loginStatus === "loggedIn" ? this.logout : this.login }
            showMenuIconButton={false}
          />
          <div>{
            // display main page when user is logged in, or login message otherwise
            this.state.loginStatus === "loggedIn" ?
            <Main firstName={this.state.firstName} lastName={this.state.lastName} /> :
            <List style={{ marginLeft: "8px" }}>
              <ListItem primaryText="Please log yourself in to see all the hilarious jokes!" disabled />
            </List>
          }</div>
          <Alert position="bottom-right" />
        </div>
      </MuiThemeProvider>
    );
  }
}
