import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const styles = {
  root: {
    flexGrow: 1,
  },
};

function Loading(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
        {props.loading &&
        <LinearProgress color="secondary" variant="query" />
        }
    </div>
  );
}

Loading.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Loading);
