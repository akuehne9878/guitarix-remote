import React from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { unstable_Box as Box } from "@material-ui/core/Box";
import PropTypes from "prop-types";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";

import GuitarixModel from "../../model/GuitarixModel.js";
import GuitarixAppBar, { Left, Right, Center } from "../../components/GuitarixAppBar.js";

import List from "@material-ui/core/List";
import MenuItem from "@material-ui/core/MenuItem";

import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/Inbox";

import Unit from "./Unit";

import { Route } from "react-router-dom";
import { Switch } from "react-router-dom";

import Menu from "@material-ui/core/Menu";

class Rack extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rack: {
        units: [],
        loadUnit: ""
      },
      currentBank: "",
      currentPreset: ""
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
        rack.units.push({ unitName: unit });
      });

      let pathname = this.props.location.pathname;
      let chunks = pathname.split("/");

      that.setState({ rack: rack, currUnit: chunks[chunks.length - 1] });
    });

    model.getCurrentBank().then(data => {
      that.setState({ currentBank: data["system.current_bank"] });
    });

    model.getCurrentPreset().then(data => {
      that.setState({ currentPreset: data["system.current_preset"] });
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

  handleAddPlugin = () => {
    this.context.router.history.push("/plugins");
  };

  handleMoreButton = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleCloseMenu = item => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;

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
            <Typography variant="h6">
              Rack - {this.state.currentPreset} ({this.state.currentBank})
            </Typography>
          </Center>
          <Right>
            <Button color="primary" onClick={this.handleMoreButton.bind(this)}>
              <MoreVertIcon />
            </Button>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={this.handleCloseMenu}>
              <MenuItem onClick={this.handleAddPlugin.bind(this)}>Add Plugin</MenuItem>
            </Menu>
          </Right>
        </GuitarixAppBar>

        <Box display="flex" justifyContent="begin" width="100%" height="400px" maxHeight="400px">
          <Box justifyContent="begin" width="30%" height="100%">
            <List height="400px">
              {this.state.rack.units.map((item, index) => (
                <MenuItem button key={item.unitName} onClick={this.loadUnit.bind(this, item)} selected={this.state.currUnit === item.unitName}>
                  <Box display="flex" justifyContent="space-between" alignContent="space-between" alignItems="begin" width="100%">
                    <Typography component="div">
                      <Box fontWeight={this.state.currUnit === item.unitName ? 600 : 400}>{item.unitName}</Box>
                    </Typography>
                    <Typography component="div">
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
