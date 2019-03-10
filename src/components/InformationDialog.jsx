import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

class InformationDialog extends React.Component {
  constructor(props) {
    super(props);

    this.handleButtonClose = this.handleButtonClose.bind(this);
  }

  handleButtonClose() {
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
          <DialogTitle id="alert-dialog-title">{"Rules"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
            <ol>
              <li>If someone says one of the listed words, he has to pay 50 cent for each word.</li>
              <li>You can only count a word if there are at least two other participating players in the same room.</li>
              <li>A word can only be counted if the player says the full word.</li>
              <li>It is also possible to count the word if it was said in combination with another word.</li>
              <li>If you say the word in another language, it does not count.</li>
            </ol>
          

            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={this.handleButtonClose}
              color="primary"
              variant="contained"
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default InformationDialog;
