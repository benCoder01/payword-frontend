import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from "@material-ui/core/TextField"

class CreateGameDialog extends React.Component {
  

  constructor(props) {
      super(props);

      this.state = {
        gamename: "",
        errorMessage: ""
      }

      this.handleButtonEnter = this.handleButtonEnter.bind(this);
      this.handleButtonCancel= this.handleButtonCancel.bind(this);
  }

  handleButtonEnter() {
    this.props.handleCreateGame(this.state.gamename, this.props.username, this.props.token)
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
          <DialogTitle id="alert-dialog-title">{"Create Game"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Type the name of the game you want to create.
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
              label="Enter the name."
              type="text"
              fullWidth
              value={this.state.gamenname}
              onChange={e => this.setState({gamename: e.target.value})}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleButtonCancel} color="secondary" >
              Cancel
            </Button>
            <Button onClick={this.handleButtonEnter} color="primary" variant="contained">
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default CreateGameDialog;

