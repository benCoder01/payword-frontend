import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";

const styles = theme => ({
  main: {
    position: "fixed",
    bottom: 0,
    right: 3
  },
  link: {
    margin: theme.spacing.unit
  }
});
class Footer extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.main}>
        <Grid container>
          <Typography
            component={Link}
            to="/about"
            variant="caption"
            className={classes.link}
          >
            About
          </Typography>
          <Typography
            component={Link}
            to="/privacy"
            variant="caption"
            className={classes.link}
          >
            Privacy
          </Typography>
        </Grid>
      </div>
    );
  }
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Footer);
