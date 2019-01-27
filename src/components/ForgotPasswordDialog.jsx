import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";

class ForgotPasswordDialog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errorMessage: "",
      username: "",
      mail: ""
    };

    this.handleButtonEnter = this.handleButtonEnter.bind(this);
    this.handleButtonCancel = this.handleButtonCancel.bind(this);
  }

  handleButtonEnter() {
    this.props.handleSendMail(this.state.username, this.state.mail);
    this.props.handleClose();
  }

  handleButtonCancel() {
    this.setState({ errorMessage: "" });
    this.props.handleClose();
  }

  render() {
    return (
      <div>
        <Dialog
          open={this.props.open}
          onClose={this.handleButtonCancel}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullScreen
        >
          <DialogTitle id="alert-dialog-title">{"Change Email"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              If you forgot your password, but <b>have specified your email</b>, you
              can enter your username and email in the fields below. <b>You will
              receive a new password. Be sure to change it afterwards!</b>
            </DialogContentText>
            <DialogContentText color="error" align="center">
              {this.state.errorMessage}
            </DialogContentText>
            <TextField
              margin="dense"
              id="Username"
              label="Username"
              type="text"
              fullWidth
              value={this.state.username}
              onChange={e => this.setState({ username: e.target.value })}
            />
            <TextField
              margin="dense"
              id="mail"
              label="E-Mail"
              type="email"
              fullWidth
              autoComplete="email"
              value={this.state.mail}
              onChange={e => this.setState({ mail: e.target.value })}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleButtonCancel} color="secondary">
              Cancel
            </Button>
            <Button
              onClick={this.handleButtonEnter}
              color="primary"
              variant="contained"
            >
              Send Mail
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default ForgotPasswordDialog;
