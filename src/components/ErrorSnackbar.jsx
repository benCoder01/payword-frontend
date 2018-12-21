import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { CssBaseline } from '@material-ui/core';

const styles = theme => ({
  close: {
    padding: theme.spacing.unit / 2,
  },
});

class ErrorSnackbar extends React.Component {

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.props.handleClose();
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <CssBaseline />
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.props.errorMessage !== ""}
          autoHideDuration={6000}
          onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{this.props.errorMessage}</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={this.handleClose}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </div>
    );
  }
}

ErrorSnackbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ErrorSnackbar);
