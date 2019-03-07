import React from "react";
import { Link } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";

import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

const styles = {
  card: {
    width: 170,
    margin: 10
  },
  content: {
    height: 100
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

class LaunchpadTile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      iconStyles: {
        tileIcon: {
          width: 80,
          height: 80,
          color: "gray"
        }
      }
    };
  }

  render() {
    const { classes } = this.props;

    const { iconStyles } = this.state;

    return (
      <Card className={classes.card}>
        <CardActionArea component={Link} to={this.props.route}>
          <CardContent className={classes.content} />
          <AppBar position="static" color="default">
            <Toolbar>
              <Typography variant="h6" color="inherit">
                {this.props.title}
              </Typography>
            </Toolbar>
          </AppBar>
        </CardActionArea>
      </Card>
    );
  }
}

export default withStyles(styles)(LaunchpadTile);
