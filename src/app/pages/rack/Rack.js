import React from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { unstable_Box as Box } from "@material-ui/core/Box";
import PropTypes from "prop-types";
import AddIcon from "@material-ui/icons/Add";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";

import GuitarixModel from "../../model/GuitarixModel.js";
import GuitarixAppBar, { Left, Right, Center } from "../../components/GuitarixAppBar.js";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import MenuItem from "@material-ui/core/MenuItem";

import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/Inbox";

import Unit from "./Unit";
import { BrowserRouter } from "react-router-dom";
import { Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import { Link } from "react-router-dom";

import { withRouter } from "react-router";

class Rack extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rack: {
        units: [],
        loadUnit: ""
      }
    };
  }

  static contextTypes = {
    router: PropTypes.object
  };

  componentDidMount() {
    let model = new GuitarixModel();
    let that = this;

    let rack = { units: [] };
    model.getRackUnitOrder().then(data => {
      let unitLength = data.result.length;
      let queryLength = 0;

      data.result.forEach(function(unit) {
        /*let unitModel = new GuitarixModel();
        unitModel.queryUnit(unit).then(data => {
          let obj = data.result;
          obj.unitName = unit;
          rack.units.push(obj);

          queryLength++;
          if (queryLength === unitLength) {
            that.setState({ rack: rack });
            console.log(JSON.stringify(rack));
          }
        });
       
        */
        rack.units.push({ unitName: unit });
      });

      let pathname = this.props.location.pathname;
      let chunks = pathname.split("/");

      that.setState({ rack: rack, currUnit: chunks[chunks.length - 1] });
    });
  }

  handleAddPlugin(obj) {
    this.setState({ selectedItem: obj });
  }

  loadUnit(obj) {
    this.context.router.history.push("/rack/" + obj.unitName);
    this.setState({ currUnit: obj.unitName });
  }

  componentDidUpdate() {}

  onBack() {
    this.context.router.history.push("/");
  }

  /*
  handleNewSong = () => {
    this.context.router.history.push("/songs/new");
  };
  */

  render() {
    //  if (this.state.selectedItem) {
    //    this.context.router.history.push("/songs/detail/" + this.state.selectedItem.songID);
    //  }

    return (
      <div>
        <GuitarixAppBar>
          <Left>
            <Button onClick={this.onBack.bind(this)}>
              <NavigateBeforeIcon />
              Back
            </Button>
          </Left>
          <Center>
            <Typography variant="h6">Rack</Typography>
          </Center>
          <Right>
            <Button variant="contained" color="primary" onClick={this.handleAddPlugin.bind(this)}>
              <AddIcon />
              Add Plugin
            </Button>
          </Right>
        </GuitarixAppBar>

        <Box display="flex" justifyContent="begin" width="100%" height="400px" maxHeight="400px">
          <Box justifyContent="begin" width="30%" height="100%">
            <List height="400px">
              {this.state.rack.units.map((item, index) => (
                <MenuItem primary button key={item.unitName} onClick={this.loadUnit.bind(this, item)}>
                  <Box display="flex" justifyContent="space-between" alignContent="space-between" alignItems="begin" width="100%">
                    <Typography>
                      <Box fontWeight={this.state.currUnit === item.unitName ? 600 : 400}>{item.unitName}</Box>
                    </Typography>
                    <Typography>
                      <Box fontWeight={this.state.currUnit === item.unitName ? 600 : 400}>{item.value}</Box>
                    </Typography>
                  </Box>
                </MenuItem>
              ))}
            </List>
          </Box>
          <Box justifyContent="begin" width="70%" height="100%">
            <Switch>
              <Route exact path="/rack/:unit" component={Unit} />
            </Switch>
          </Box>
        </Box>
      </div>
    );
  }
}

export default Rack;
