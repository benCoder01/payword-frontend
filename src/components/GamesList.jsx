import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import red from "@material-ui/core/colors/red";
import Divider from "@material-ui/core/Divider";
import ClearIcon from "@material-ui/icons/Clear";
import LeaveGameDialog from "../containers/LeaveGameDialog";
import Button from "@material-ui/core/Button";
import EnterGameDialog from "../containers/EnterGameDialog";
import CreateGameDialog from "../containers/CreateGameDialog";
import { Grid } from "@material-ui/core";
import { Link } from "react-router-dom";

const styles = theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 752
  },
  list: {
    backgroundColor: theme.palette.background.paper
  },
  title: {
    margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`
  },
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

class GamesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leaveGameDialog: {
        open: false,
        gamename: ""
      },
      enterGameDialog: {
        open: false
      },
      createGameDialog: {
        open: false
      }
    };

    this.handleRemoveGame = this.handleRemoveGame.bind(this);
    this.handleLeaveGameDialogClose = this.handleLeaveGameDialogClose.bind(
      this
    );
    this.handleAddGame = this.handleAddGame.bind(this);
    this.handleEnterGameDialogClose = this.handleEnterGameDialogClose.bind(
      this
    );
    this.handleCreateGameDialogClose = this.handleCreateGameDialogClose.bind(
      this
    );
    this.handleButtonCreateGame = this.handleButtonCreateGame.bind(this);
  }

  componentDidMount() {
    this.props.handleCloseGameView();
    this.props.handleFetchGames(this.props.username, this.props.token);
  }

  handleButtonCreateGame() {
    this.setState({
      createGameDialog: {
        open: true
      }
    });
  }

  handleCreateGameDialogClose() {
    this.setState({
      createGameDialog: {
        open: false
      }
    });
  }

  handleRemoveGame(gamename) {
    this.setState({
      leaveGameDialog: {
        open: true,
        gamename: gamename
      }
    });
  }

  handleLeaveGameDialogClose() {
    this.setState({
      leaveGameDialog: {
        open: false,
        gamename: ""
      }
    });
  }

  handleAddGame() {
    this.setState({
      enterGameDialog: {
        open: true
      }
    });
  }

  handleEnterGameDialogClose() {
    this.setState({
      enterGameDialog: {
        open: false
      }
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography variant="h6" className={classes.title}>
              Your current running Games:
            </Typography>
            <div className={classes.list}>
              <List dense={false}>
                <Divider />
                {this.props.games.map(game => (
                  <div key={game.name}>
                    <ListItem
                      button
                      onClick={() =>
                        this.props.handleOpenGameView(
                          game.name,
                          this.props.token
                        )
                      }
                      component={Link}
                      to="/game"
                    >
                      <ListItemAvatar>
                        <Avatar className={classes.avatar}>
                          {game.name.charAt(0).toUpperCase()}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={game.name} />
                      <ListItemSecondaryAction>
                        <IconButton
                          aria-label="Delete"
                          onClick={() => this.handleRemoveGame(game.name)}
                        >
                          <ClearIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                    <Divider />
                  </div>
                ))}
              </List>
            </div>
            <Grid container spacing={16}>
              <Grid item xs={6}>
                <Button
                  type="button"
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={this.handleAddGame}
                >
                  Add existing game
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  type="button"
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  onClick={this.handleButtonCreateGame}
                >
                  Create new game
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </main>
        <LeaveGameDialog
          open={this.state.leaveGameDialog.open}
          game={this.state.leaveGameDialog.gamename}
          handleClose={this.handleLeaveGameDialogClose.bind(this)}
        />
        <EnterGameDialog
          open={this.state.enterGameDialog.open}
          handleClose={this.handleEnterGameDialogClose.bind(this)}
        />
        <CreateGameDialog
          open={this.state.createGameDialog.open}
          handleClose={this.handleCreateGameDialogClose.bind(this)}
        />
      </div>
    );
  }
}

GamesList.propTypes = {
  classes: PropTypes.object.isRequired
};

/*
{this.props.games.map( game => (
                
                ))}
*/
export default withStyles(styles)(GamesList);
