import React, { Component } from "react";
import Player from "../containers/Player";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Sum from "./Sum";
import { Button, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";

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
  isAdmin = () => {
    return this.props.username === this.props.game.admin;
  };

  componentDidMount() {
    this.props.handleFetchGame(this.props.gamename, this.props.token)
  }

  render() {
    const { classes } = this.props;
    if (this.props.game.users === undefined) return (<div></div>);
    return (
      <div>
        <CssBaseline />

        <Sum game={this.props.game} />
        <Grid container alignItems="center" justify="space-between">
          <Grid item xs={3} >
            <Typography variant="subtitle1">
              Admin: {this.props.game.admin}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            {this.isAdmin() && (
              <Button
                component={Link}
                to="/game/manage"
                variant="contained"
              >
                Manage
              </Button>
            )}
          </Grid>
          
        </Grid>

        <Divider />
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
