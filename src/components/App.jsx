import React, { Component } from "react";

import Header from "../containers/Header";
import CssBaseline from "@material-ui/core/CssBaseline";
import Main from "./Main";
import ErrorSnackbar from "./ErrorSnackbar";
import Footer from "./Footer";
import withStyles from "@material-ui/core/styles/withStyles";

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

const styles = theme => ({
  main: {
    paddingBottom: 80
  }
});

class App extends Component {
  isAdmin = () => {
    if (this.props.game === {}) return false;
    else {
      return this.props.game.admin === this.props.username;
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <CssBaseline />
        <Router>
          <div className={classes.main}>
            <Route path="/" component={Header} />

            <div>
              <Route
                path="/"
                exact={true}
                render={() => <Redirect push to={"/sign-in"} />}
              />
              <Main
                authenticated={this.props.authenticated}
                ingame={this.props.ingame}
                game={this.props.game}
                username={this.props.username}
              />
              {this.props.authenticated && (
                <ErrorSnackbar
                  handleClose={this.props.handleCloseErrorMessage}
                  errorMessage={this.props.errorMessage}
                />
              )}
              <Route path="/" component={Footer} />
            </div>
          </div>
        </Router>
      </div>
    );
  }
}

export default withStyles(styles)(App);
