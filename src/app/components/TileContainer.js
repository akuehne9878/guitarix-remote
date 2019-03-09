import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { unstable_Box as Box } from "@material-ui/core/Box";

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

class TileContainer extends React.Component {
  render() {
    const style = {
      marginRight: -50 /* maximum width of scrollbar */,
      paddingRight: 50 /* maximum width of scrollbar */,
      overflowY: "scroll",
      height: 400
    };

    return (
      <div>
        <Box display="flex" style={style} justifyContent="center" flexWrap="wrap" flexDirection="row">
          {this.props.children}
        </Box>
      </div>
    );
  }
}

TileContainer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TileContainer);
