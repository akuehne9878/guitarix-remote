import React from "react";
import { Link } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";

import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Icon from "@material-ui/core/Icon";

import { unstable_Box as Box } from "@material-ui/core/Box";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";

const styles = {
  card: {
    width: 160,
    margin: 5,
    marginTop: 10
  },
  content: {
    height: 130
  },
  icon: {
    width: 10,
    height: 60
  },
  media: {
    // ⚠️ object-fit is not supported by IE 11.
    //objectFit: "cover"
  }
};

class Tile extends React.Component {
  constructor(props) {
    super(props);
  }

  createIcon() {
    const style = {
      height: 60,
      width: 60,
      color: "gray"
    };
    return (
      <Box display="flex" justifyContent="flex-end" alignItems="flex-end" alignContent="flex-end" width="100%" height="70%">
        {this.props.icon(style)}
      </Box>
    );
  }

  render() {
    const { classes } = this.props;

    return (
      <Card className={classes.card}>
        <CardActionArea component={Link} to={this.props.route}>
          <CardContent className={classes.content}>
            <Typography variant="h6">{this.props.title}</Typography>
            {this.props.icon ? this.createIcon() : null}
          </CardContent>
        </CardActionArea>
      </Card>
    );
  }
}

export default withStyles(styles)(Tile);
