import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import Fade from "@material-ui/core/Fade";

const styles = {
  root: {
    flexGrow: 1
  }
};

function Loading(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Fade in={props.loading}>
        <LinearProgress color="secondary" variant="query" />
      </Fade>
    </div>
  );
}

Loading.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Loading);
