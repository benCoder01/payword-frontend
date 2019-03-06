import React, { Component } from "react";
import Player from "../containers/Player";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Redirect } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import GameOverview from "./GameOverview";

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: 10
  },

  adminButton: {
    marginLeft: theme.spacing.unit,
    marginTop: theme.spacing.unit
  },
  item: {
    margin: theme.spacing.unit
  },
  admin: {
    margin: theme.spacing.unit
  }
});

class Game extends Component {
  componentDidMount() {
    this.props.handleFetchGame(this.props.gamename, this.props.token);
  }

  render() {
    const { classes } = this.props;
    if (!this.props.authenticated) return <Redirect push to={"/"} />;

    if (this.props.game.users === undefined) return <div />;
    return (
      <div>
        <CssBaseline />

        <GameOverview game={this.props.game} username={this.props.username} />

        <Grid container justify="center" className={classes.root}>
          {this.props.game.users.map(user => (
            <Grid key={user.username} item className={classes.item}>
              <Player user={user} />
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }
}

Game.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Game);
