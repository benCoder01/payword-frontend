import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";

class DeleteAccountDialog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: ""
    };

    this.handleButtonDelete = this.handleButtonDelete.bind(this);
    this.handleButtonCancel = this.handleButtonCancel.bind(this);
  }

  handleButtonDelete() {
    if (this.state.username === "" || this.state.password === "") return;
    if (this.props.username !== this.state.username) return;

    this.props.handleDeleteAccount(
      this.state.username,
      this.state.password,
      this.props.token
    );

    this.props.handleClose();
  }

  handleButtonCancel() {
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
          <DialogTitle id="alert-dialog-title">{"Delete Account"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Please type in your credentials to confirm your action.
            </DialogContentText>
            <TextField
              margin="dense"
              id="name"
              label="Username"
              type="text"
              fullWidth
              value={this.state.username}
              onChange={e => this.setState({ username: e.target.value })}
            />
            <TextField
              margin="dense"
              id="password"
              label="Password"
              type="password"
              fullWidth
              value={this.state.password}
              onChange={e => this.setState({ password: e.target.value })}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleButtonCancel} color="secondary">
              Cancel
            </Button>
            <Button
              onClick={this.handleButtonDelete}
              color="primary"
              variant="contained"
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default DeleteAccountDialog;
