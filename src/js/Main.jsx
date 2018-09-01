import React from "react";
import axios from "axios";
import shuffle from "shuffle-array";

import AppBar from "material-ui/AppBar";
import TextField from "material-ui/TextField";
import Divider from "material-ui/Divider";
import FlatButton from "material-ui/FlatButton";
import { List, ListItem } from "material-ui/List";
import RefreshIndicator from "material-ui/RefreshIndicator";

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jokes: [],
      displayedJokes: []
    };
    this.performSearch = this.performSearch.bind(this);
    // listen for enter key press event
    window.addEventListener("keypress", e => {
      if (e.keyCode === 13) {
        this.performSearch();
      }
    });
  }

  componentDidMount() {
    // fetch jokes from API and save them in state
    axios.get(`http://api.icndb.com/jokes?escape=javascript&firstName=${this.props.firstName}&lastName=${this.props.lastName}`)
    .then(res => {
      const fetchedJokes = res.data.value.map(obj => obj.joke);
      this.setState({
        jokes: fetchedJokes,
        displayedJokes: fetchedJokes
      });
    });
  }

  performSearch() {
    // this fetching of searchTerm is a hacky workaround since state managament
    // of TextField is not working properly due to buggy propagation in MaterialUI
    const searchTerm = this.refs.searchField.getValue();
    let searchedJokes = [];
    this.state.jokes.map(joke => {
      if (joke.toUpperCase().includes(searchTerm.toUpperCase())) {
        searchedJokes.push(joke);
      }
    });
    this.setState({
      displayedJokes: searchedJokes
    });
  }

  render() {
    return (
      <div>
        <AppBar
          title={
            <TextField
              ref="searchField"
              hintText={ "Search for a hilarious joke by typing anything and then click the search button or press the enter key. If nothing is typed, all the jokes are displayed." }
              fullWidth
            />
          }
          style={{ backgroundColor: "#FFFFFF" }}
          iconElementRight={
            <FlatButton
              style={{ backgroundColor: "#FFFFFF"}}
              labelStyle={{ color: "#000000" }}
              label="Search"
            />
          }
          onRightIconButtonTouchTap={ this.performSearch }
          showMenuIconButton={ false }
        />
        <List style={{ marginLeft: "8px" }}>{
          // display refresh indicator if jokes are still loading, or jokes otherwise
          this.state.jokes.length === 0 ?
          <ListItem disabled>
            <RefreshIndicator
              left={0}
              top={0}
              status="loading"
              style={{ display: "inline-block", position: "relative" }}
            />
          </ListItem> :
          shuffle(this.state.displayedJokes).map((joke, index) =>
            <div key={index}>
              <ListItem primaryText={joke} disabled />
              { index !== this.state.displayedJokes.length-1 ? <Divider /> : null }
            </div>
          )
        }</List>
      </div>
    );
  }
}
