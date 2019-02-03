import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

export default class ChangPasswordDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      oldPassword: "",
      newPasswordOne: "",
      newPasswordTwo: "",
      errorMessage: "",
      succesMessage: false
    };

    this.handleChangePassword = this.handleChangePassword.bind(this);
  }
  
  getAddress = () => {
    if (process.env.NODE_ENV === "production") {
      return "https://payword.benediktricken.de/api"
    }else {
      return "http://localhost:3333"
    }
  }
  
  handleSuccesMessageClose() {}

  async handleChangePassword() {
    if (this.state.newPasswordOne !== this.state.newPasswordTwo) {
      this.setState({ errorMessage: "Please type your new password twice." });
      return;
    }


    const response = await fetch(
      this.getAddress() + "/users/change-password",
      {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: " BEARER " + this.props.token
        },
        body: JSON.stringify({
          username: this.props.username,
          oldpassword: this.state.oldPassword,
          newpassword: this.state.newPasswordOne
        })
      }
    );

    const reqStatus = await response.status;

    if (reqStatus !== 200) {
      this.setState({
        errorMessage: "Oohps! Something went wrong!"
      });

      return;
    }

    this.props.handleClose();
    this.setState({ succesMessage: true });
  }

  render() {
    return (
      <div>
        <Dialog
          open={this.props.open}
          onClose={this.props.handleClose}
          aria-labelledby="form-dialog-title"
          fullScreen
        >
          <DialogTitle id="form-dialog-title">Change Password.</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please fill in the fields below to change your password.
            </DialogContentText>
            <Typography color="error" align="center" variant="h6">
              {this.state.errorMessage}
            </Typography>
            <TextField
              autoFocus
              margin="dense"
              id="old-password"
              label="Old Password"
              type="password"
              fullWidth
              value={this.state.oldPassword}
              onChange={e => this.setState({ oldPassword: e.target.value })}
            />
            <TextField
              margin="dense"
              id="new-password-one"
              label="New Password"
              type="password"
              fullWidth
              value={this.state.newPasswordOne}
              onChange={e => this.setState({ newPasswordOne: e.target.value })}
            />
            <TextField
              margin="dense"
              id="new-password-two"
              label="Repeat new Password"
              type="password"
              fullWidth
              value={this.state.newPasswordTwo}
              onChange={e => this.setState({ newPasswordTwo: e.target.value })}
              error={this.state.newPasswordOne !== this.state.newPasswordTwo}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.handleClose} color="secondary">
              Cancel
            </Button>
            <Button onClick={this.handleChangePassword} color="primary">
              Change
            </Button>
          </DialogActions>
        </Dialog>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={this.state.succesMessage}
          autoHideDuration={6000}
          onClose={() => this.setState({ succesMessage: false })}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={<span id="message-id">Changed Password</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              //className={classes.close}
              onClick={() => this.setState({ succesMessage: false })}
            >
              <CloseIcon />
            </IconButton>
          ]}
        />
      </div>
    );
  }
}
