import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import SettingIcon from "@material-ui/icons/Settings";

const styles = theme => ({
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
    //paddingTop: theme.spacing.unit
  },
  settings: {
    margin: 0,
    padding: 0
  }
});

class GameOverview extends Component {
  calculateSum(game) {
    let sum = 0;
    for (let i = 0; i < game.categories.length; i++) {
      for (let j = 0; j < game.categories[i].Usercounter.length; j++) {
        sum += game.categories[i].Usercounter[j].Value;
      }
    }
    return sum * 0.5;
  }
  isAdmin = () => {
    return this.props.username === this.props.game.admin;
  };

  render() {
    const { classes } = this.props;
    return (
      <Paper square elevation={2}>
        <Grid container>
          <Grid item xs={this.isAdmin() ? 10 : 11}>
            <div className={classes.content}>
              <Typography component="h2" variant="h4" align="center">
                {this.props.game.name}
              </Typography>

              <Typography
                component="h1"
                variant="h6"
                align="right"
                color={"textSecondary"}
              >
                {this.calculateSum(this.props.game)}€
              </Typography>
            </div>
          </Grid>
          <Grid item xs={this.isAdmin() ? 1 : 0} className={classes.settings}>
            {this.isAdmin() && (
              <Typography>
                <IconButton
                  component={Link}
                  to="/game/manage"
                  variant="contained"
                >
                  <SettingIcon />
                </IconButton>
              </Typography>
            )}
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

export default withStyles(styles)(GameOverview);

/*
return (
      <Grid container justify="center">
        <Grid item xs={3} alignContent="center">
          <Paper className={classes.paper} elevation={1} alignContent="center">
            <Typography variant="subheading" align="left" className={classes.titleText}>
              Gametitle
            </Typography>
            <Divider />
            <Typography variant="h6" className={classes.contentText}>
              {this.props.game.name}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper} elevation={1} alignContent="center">
            <Typography variant="subheading" align="left" className={classes.titleText}>
              <EuroSymbol />Sum
            </Typography>
            <Divider />
            <Typography variant="h6" className={classes.contentText}>
              {this.calculateSum(this.props.game)}€
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper} elevation={1} alignContent="center">
            <Typography variant="subheading" align="left" className={classes.titleText}>
              Admin
            </Typography>
            <Divider />
            <Typography variant="h6" className={classes.contentText}>
              {this.props.game.admin}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={1}>
          {this.isAdmin() && (
            <Button component={Link} to="/game/manage" variant="contained">
              Manage
            </Button>
          )}
        </Grid>
      </Grid>
    );
*/
