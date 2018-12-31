import React, { Component } from "react";
import GamesList from "../containers/GamesList";
import SignIn from "../containers/SignIn";
import UserSettings from "../containers/UserSettings";
import Game from "../containers/Game";
import AdminControl from "../containers/AdminControl";
import SignUp from "../containers/SignUp";
import About from "./About";
import Privacy from "./Privacy";

import { Route, Switch, Redirect } from "react-router-dom";

class Main extends Component {
  isAdmin = () => {
    if (this.props.game === {}) return false;
    else {
      return this.props.game.admin === this.props.username;
    }
  };

  render() {
    return (
      <div>
        
        <Switch>
          <Route path="/sign-in" component={SignIn} />
          <Route path="/sign-in" component={SignIn} />

          <Route path="/sign-up" component={SignUp} />
          <Route path="/about" component={About} />
          <Route path="/privacy" component={Privacy} />
        </Switch>

        {this.props.authenticated && (
          <div>
            <Switch>
              <Route path="/games" component={GamesList} />
              <Route path="/user-settings" component={UserSettings} />
              {this.props.ingame && (
                <Route path="/game" exact={true} component={Game} />
              )}
              {this.isAdmin() && (
                <Route
                  path="/game/manage"
                  exact={true}
                  component={AdminControl}
                />
              )}
            </Switch>
          </div>
        )}

        {!this.props.authenticated && <Redirect push to={"/sign-in"} />}
      </div>
    );
  }
}

export default Main;
