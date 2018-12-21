import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Typography, Paper, Grid } from "@material-ui/core";

const styles = theme => ({
  content: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  sumInformation: {
    marginTop: theme.spacing.unit,
    //textAlign: "center",
    padding: theme.spacing.unit
  },
  gametitle: {
    marginLeft: 10
  }
});

function calculateSum(game) {
  let sum = 0;
  for (let i = 0; i < game.categories.length; i++) {
    for (let j = 0; j < game.categories[i].Usercounter.length; j++) {
      sum += game.categories[i].Usercounter[j].Value;
    }
  }
  return sum * 0.5;
}

function Sum(props) {
  const { classes } = props;

  return (
    <div className={classes.content}>
      <CssBaseline />
      <Paper className={classes.sumInformation}>
        <Grid container alignItems={"center"} justify="space-between">
          <Grid item xs={4}>
            <Typography variant="h4" className={classes.gametitle}>
              {props.game.name}
            </Typography>
          </Grid>
          <Grid item xs />

          <Grid item xs={4}>
            <Typography component="h5" variant="h5">
              Sum: {calculateSum(props.game)}€
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

Sum.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Sum);
