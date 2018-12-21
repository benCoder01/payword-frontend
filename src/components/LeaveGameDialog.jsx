import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from "@material-ui/core/TextField"
class LeaveGameDialog extends React.Component {
  

  constructor(props) {
      super(props);

      this.state = {
        repeatGameText: "",
        errorMessage: ""
      }

      this.handleLeave = this.handleLeave.bind(this);
      this.handleButtonCancel= this.handleButtonCancel.bind(this);
  }

  handleLeave() {
    if (this.state.repeatGameText !== this.props.game) {
        this.setState({errorMessage: "You did not type the exact game name."})
        return;
    }
    this.props.handleLeaveGame(this.props.game, this.props.username, this.props.token)
    this.props.handleClose();
  }

  handleButtonCancel()  {
    this.setState({errorMessage: ""});
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
          <DialogTitle id="alert-dialog-title">{"Leave Game"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Do you really want to leave the game <b>{this.props.game}</b>
            </DialogContentText>
            <DialogContentText
                color = "error"
                align="center"
            >
              {this.state.errorMessage}
            </DialogContentText>
            <TextField
              margin="dense"
              id="name"
              label="Repeat game name."
              type="text"
              fullWidth
              value={this.state.repeatGameText}
              onChange={e => this.setState({repeatGameText: e.target.value})}
              error={this.props.game !== this.state.repeatGameText}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleButtonCancel} color="primary" variant="contained">
              Cancel
            </Button>
            <Button disabled={this.props.game !== this.state.repeatGameText} onClick={this.handleLeave} color="secondary">
              Leave
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default LeaveGameDialog;

