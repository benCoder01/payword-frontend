import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Avatar from "@material-ui/core/Avatar";
import { CardHeader, IconButton } from "@material-ui/core";
import red from "@material-ui/core/colors/red";
import AddCircleOutline from "@material-ui/icons/AddCircleOutline";
import RemoveCircleOutline from "@material-ui/icons/RemoveCircleOutline";
import Grid from "@material-ui/core/Grid";
import CssBaseline from "@material-ui/core/CssBaseline"

const styles = theme => ({
  card: {
    maxWidth: 330,
    minWidth: 300,
  },
  avatar: {
    backgroundColor: red[500]
  },
  category: {
    display: "flex",
    alignItems: "left",
    flexGrow: 1,
    minMarginBottom: 5
  },
  actionbutton: {
    marginLeft: 20
  }
});

class Player extends Component {
  calculateUserSum = user => {
    let sum = 0;
    for (let key in user) {
      if (key === "username") continue;
      sum += user[key];
    }

    return sum;
  };

  convertCategoriesToArray = user => {
    let categories = [];

    for (let key in user) {
      if (key === "username") continue;
      categories.push({ name: key, value: user[key] });
    }

    return categories
  };
  render() {
    const { classes } = this.props;
    return (
      <div>
        <CssBaseline />
        <Card className={classes.card}>
          <CardHeader
            avatar={
              <Avatar className={classes.avatar}>
                {this.props.user.username.charAt(0).toUpperCase()}
              </Avatar>
            }
            title={
              <Typography component="h2" variant="h5">
                {this.props.user.username}
              </Typography>
            }
            subheader={this.calculateUserSum(this.props.user) * 0.5 + "€"}
          />

          <CardContent>
            <Divider />

            {this.convertCategoriesToArray(this.props.user).map(category => (
              <div key={category.name} className={classes.category}>
                <Grid container alignItems="center">
                  <Grid xs={6} item>
                    <Typography component="h4" variant="h6">
                      {category.name}: {category.value}
                    </Typography>
                  </Grid>
                  <Grid xs={3} item>
                    <IconButton
                      className={classes.actionbutton}
                      onClick={event =>
                        this.props.handleIncrement(
                          this.props.user.username,
                          category.name,
                          this.props.gamename,
                          this.props.token
                        )
                      }
                      disabled={this.props.user.username === this.props.username}
                    >
                      <AddCircleOutline />
                    </IconButton>
                  </Grid>
                  <Grid xs={3} item>
                    <IconButton
                      onClick={event =>
                        this.props.handleDecrement(
                          this.props.user.username,
                          category.name,
                          this.props.gamename,
                          this.props.token
                        )
                        }
                      disabled={this.props.user.username === this.props.username || category.value <= 0}

                    >
                      <RemoveCircleOutline />
                    </IconButton>
                  </Grid>
                </Grid>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    );

  }
}

Player.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Player);
