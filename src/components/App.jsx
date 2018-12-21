import React, { Component } from "react";

import Header from "../containers/Header";
import CssBaseline from "@material-ui/core/CssBaseline";
import Main from "./Main";
import ErrorSnackbar from "./ErrorSnackbar";

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

class App extends Component {
  isAdmin = () => {
    if (this.props.game === {}) return false;
    else {
      return this.props.game.admin === this.props.username;
    }
  };

  render() {
    return (
      <div>
        <CssBaseline />
        <Router>
          <div>
            <Route path="/" component={Header} />
            <Route
              path="/"
              render={props => (
                <Main
                  {...props}
                  authenticated={this.props.authenticated}
                  ingame={this.props.ingame}
                  game={this.props.game}
                  username={this.props.username}
                />
              )}
            />
            {this.props.ingame && this.props.authenticated && (
              <Redirect push to={"/game"} />
            )}
            {!this.props.ingame && this.props.authenticated && (
              <Redirect push to={"/games"} />
            )}
            {!this.props.authenticated && <Redirect push to={"/sign-in"} />}

            {this.props.authenticated && (
              <ErrorSnackbar
                handleClose={this.props.handleCloseErrorMessage}
                errorMessage={this.props.errorMessage}
              />
            )}
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
