import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import LaunchpadTile from "./LaunchpadTile";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    height: 160,
    width: 160
  },
  control: {
    padding: theme.spacing.unit * 2
  }
});

class Launchpad extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <Grid container className={classes.root} spacing={16}>
        <Grid item xs={12}>
          <Grid
            container
            className={classes.control}
            justify="center"
            spacing={16}
          >
            {this.props.children}
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

Launchpad.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Launchpad);
