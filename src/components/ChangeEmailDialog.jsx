import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";

class ChangeEmailDialog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errorMessage: "",
      mail: ""
    };

    this.handleButtonEnter = this.handleButtonEnter.bind(this);
    this.handleButtonCancel = this.handleButtonCancel.bind(this);
  }

  emailValid() {
    return this.state.mail.match(
      // eslint-disable-next-line
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  }

  handleButtonEnter() {
    if (!this.emailValid()) {
      this.setState({ errorMessage: "Email is not valid!" });
      return;
    }

    this.props.handleChangeMail(
      this.props.username,
      this.state.mail,
      this.props.token
    );
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
        >
          <DialogTitle id="alert-dialog-title">{"Change Email"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              To change your mail, please type in your new mail address.
            </DialogContentText>
            <DialogContentText color="error" align="center">
              {this.state.errorMessage}
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="mail"
              label="New Mail address"
              type="email"
              fullWidth
              autoComplete="email"
              value={this.state.mail}
              onChange={e => this.setState({ mail: e.target.value })}
              error={!this.emailValid()}
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
              Update
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default ChangeEmailDialog;
