import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

class RemoveCategoryDialog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errorMessage: ""
    };

    this.handleButtonEnter = this.handleButtonEnter.bind(this);
    this.handleButtonCancel = this.handleButtonCancel.bind(this);
  }

  handleButtonEnter() {
    this.props.handleRemoveCategory(this.props.categoryname, this.props.gamename, this.props.token)
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
          <DialogTitle id="alert-dialog-title">{"Remove Category"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Do really want to remove the category <b>{this.props.categoryname}</b>?
            </DialogContentText>
            <DialogContentText color="error" align="center">
              {this.state.errorMessage}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleButtonCancel} variant="contained" color="primary">
              Cancel
            </Button>
            <Button
              onClick={this.handleButtonEnter}
              color="secondary"
            >
              Remove
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default RemoveCategoryDialog;
