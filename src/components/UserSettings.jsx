import React, { Component } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import Paper from "@material-ui/core/Paper";
import { Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import red from "@material-ui/core/colors/red";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import CardHeader from "@material-ui/core/CardHeader";
import DialogContentText from "@material-ui/core/DialogContentText";

import DeleteAccountDialog from "../containers/DeleteAccountDialog";
import ChangePasswordDialog from "./ChangePasswordDialog";
import ChangeMailDialog from "../containers/ChangeMailDialog"

const styles = theme => ({
  layout: {
    width: "auto",
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginTop: theme.spacing.unit * 6,
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3
    }
  },
  avatar: {
    backgroundColor: red[500]
  }
});

class UserSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      passwordChangeDialog: false,
      deleteAccountDialog: false,
      changeEmailDialog: false,
    };
  }

  handlePasswordChange = () => {
    this.setState({ passwordChangeDialog: !this.state.passwordChangeDialog });
  };

  handleChangeEmail = () => {
    this.setState({ changeEmailDialog: !this.state.changeEmailDialog });

  }

  handleDeletAccount = () => {
    this.setState({ deleteAccountDialog: !this.state.deleteAccountDialog });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Grid container spacing={16}>
              <Grid item xs={8}>
                <Typography variant={"h4"}>User Settings</Typography>
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={6}>
                <CardHeader
                  avatar={
                    <Avatar className={classes.avatar}>
                      {this.props.username.charAt(0).toUpperCase()}
                    </Avatar>
                  }
                  title={
                    <Typography component="h2" variant="h5">
                      {this.props.username}
                    </Typography>
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={12} />
              <Grid item xs={12}>
                <Typography component="h2" variant="h5">
                  Change password
                </Typography>
                <DialogContentText>
                  Click on the button below to change your password.
                </DialogContentText>
              </Grid>
              <Grid item xs={12}>
                <Button
                  color="primary"
                  fullWidth
                  variant="contained"
                  onClick={this.handlePasswordChange}
                >
                  Change Password
                </Button>
              </Grid>

              <Grid item xs={12}>
                <Typography component="h2" variant="h5">
                  Change Email
                </Typography>
                <DialogContentText>
                  Click on the button below to change your email. If you haven`t
                  set your email yet, you can also add a new one by clicking on
                  the button below.
                </DialogContentText>
              </Grid>
              <Grid item xs={12}>
                <Button
                  color="primary"
                  fullWidth
                  variant="contained"
                  onClick={this.handleChangeEmail}
                >
                  Change mail
                </Button>
              </Grid>

              <Grid item xs={12}>
                <Typography component="h2" variant="h5">
                  Delete Account
                </Typography>
                <DialogContentText>
                  Click on the button below to delete your account for ever.
                </DialogContentText>
              </Grid>
              <Grid item xs={12}>
                <Button
                  color="secondary"
                  fullWidth
                  variant="contained"
                  onClick={this.handleDeletAccount}
                >
                  Delete Account
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </main>
        <ChangePasswordDialog
          open={this.state.passwordChangeDialog}
          handleClose={this.handlePasswordChange.bind(this)}
          token={this.props.token}
          username={this.props.username}
        />
        <DeleteAccountDialog
          open={this.state.deleteAccountDialog}
          handleClose={this.handleDeletAccount.bind(this)}
        />
        <ChangeMailDialog
          open={this.state.changeEmailDialog}
          handleClose={this.handleChangeEmail.bind(this)}
        />
      </div>
    );
  }
}

UserSettings.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(UserSettings);
