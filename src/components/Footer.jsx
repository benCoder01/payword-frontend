import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  text: {
    paddingTop: theme.spacing.unit * 2,
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2
  },
  paper: {
    paddingBottom: 50
  },
  list: {
    marginBottom: theme.spacing.unit * 2
  },
  subHeader: {
    backgroundColor: theme.palette.background.paper
  },
  appBar: {
    top: "auto",
    bottom: 0,
    paddingBottom: 0,
    paddingTop: 0
  },
  toolbar: {
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 0,
    paddingTop: 0
  },
  button: {
    marginBottom: 0,
    marginTop: 0
  }
});
class Footer extends Component {
  render() {
    const { classes } = this.props;

    return (
      <AppBar position="fixed" color="default" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <div />
          <div>
            <Button component={Link} to="/about" className={classes.button}>
              About
            </Button>
            <Button component={Link} to="/privacy" className={classes.button}>
              Privacy
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Footer);
