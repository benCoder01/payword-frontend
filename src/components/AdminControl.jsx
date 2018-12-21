import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import DeleteIcon from "@material-ui/icons/Delete";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import AddIcon from "@material-ui/icons/Add"
import RemoveCategoryDialog from "../containers/RemoveCategoryDialog";
import AddCategoryDialog from "../containers/AddCategoryDialog";

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

  addButton: {
    marginTop: theme.spacing.unit,
  }

});

class AdminControl extends Component {

  constructor(props) {
    super(props);

    this.state = {
      addCategoryDialog: {
        open: false,
        categoryname: "",
      },
      removeCategoryDialog: {
        open: false,
        categoryname: ""
      },
      errorAddCategoryTextField: false,  
    }
    
/*
    this.handleRemoveCategoryDialogClose = this.handleRemoveCategoryDialogClose.bind(this);
    this.handleButtonAddCategory = this.handleButtonAddCategory.bind(this);
    this.handleButtonRemoveCategory = this.handleButtonRemoveCategory.bind(this)
  */
  }

  handleRemoveCategoryDialogClose() {
    this.setState({
      removeCategoryDialog: {
        open: false,
        categoryname: ""
      }
    });
  }

  handleAddCategoryDialogClose() {
    this.setState({
      addCategoryDialog: {
        open: false,
        categoryname: "",
      }
    });
  }

  handleButtonAddCategory() {
    if (this.state.addCategoryDialog.categoryname === "") {
      this.setState({
        errorAddCategoryTextField: true,
      });
      return;
    }

    this.setState({
      errorAddCategoryTextField: false,
    });
    
    this.setState({
      addCategoryDialog: {
        open: true,
        categoryname: this.state.addCategoryDialog.categoryname,
      }
    })
  }

  handleButtonRemoveCategory(categoryname) {
    this.setState({
      removeCategoryDialog: {
        open: true,
        categoryname: categoryname,
      }
    })
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography variant="h6" className={classes.title}>
              Your current categories:
            </Typography>
            <div className={classes.list}>
              <List dense={false}>
                <Divider />
                {this.props.game.categories.map(category => (
                  <div key={category.Name}>
                    <ListItem>
                      <ListItemText primary={category.Name} />
                      <ListItemSecondaryAction>
                        <IconButton 
                          aria-label="Delete"
                          onClick={() => this.handleButtonRemoveCategory(category.Name)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                    <Divider />
                  </div>
                ))}
              </List>
            </div>
            <Divider />
            
            <Grid 
              container 
              spacing={16}
            >
              <Grid item xs={9}>
                  <TextField 
                    fullWidth
                    label="Category Name"
                    onChange={e => this.setState({addCategoryDialog: {open: this.state.addCategoryDialog.open ,categoryname: e.target.value }})}
                    value={this.state.addCategoryDialog.categoryname}
                    error={this.state.errorAddCategoryTextField}
                  />
              </Grid>
              <Grid item xs={3}>
                <Button
                  fullWidth
                  variant="contained"
                  color="secondary"
                  className={classes.addButton}
                  onClick={this.handleButtonAddCategory.bind(this)}
                >
                    <AddIcon />
                </Button>
              
              </Grid>
            </Grid>
          </Paper>
        </main>
        <AddCategoryDialog
          open={this.state.addCategoryDialog.open}
          categoryname={this.state.addCategoryDialog.categoryname}
          handleClose={this.handleAddCategoryDialogClose.bind(this)}
        />
        <RemoveCategoryDialog
          open={this.state.removeCategoryDialog.open}
          categoryname={this.state.removeCategoryDialog.categoryname}
          handleClose={this.handleRemoveCategoryDialogClose.bind(this)}
        />
      </div>
    );
  }
}

AdminControl.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AdminControl);
