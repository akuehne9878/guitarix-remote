import React from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { unstable_Box as Box } from "@material-ui/core/Box";
import PropTypes from "prop-types";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";

import GuitarixModel from "../../model/GuitarixModel.js";
import GuitarixAppBar, { Left, Right, Center } from "../../components/GuitarixAppBar.js";
import TileContainer from "../../components/TileContainer";
import Tile from "../../components/Tile";

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

class Plugins extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      list: [],
      all: [],
      categories: []
    };
  }

  static contextTypes = {
    router: PropTypes.object
  };

  componentDidMount() {
    let model = new GuitarixModel();
    model.getPlugins().then(data => {
      var categories = [];
      var arr = data.result["sys.visible_mono_plugins"].map(function(item) {
        if (categories.indexOf(item.category) < 0) {
          categories.push(item.category);
        }

        return item;
      });

      arr.sort(function(a, b) {
        return a.name.localeCompare(b.name);
      });

      this.setState({ list: arr, all: arr, categories: categories });
    });
  }

  handleClick(obj) {
    new GuitarixModel().insertRackUnit(obj.id, "", 0);
  }

  handleMoreButton = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleCloseMenu = item => {
    this.setState({ anchorEl: null });

    if (item) {
      let filtered = this.state.all.filter(function(obj) {
        return obj.category === item;
      });

      this.setState({ list: filtered });
    }
  };

  render() {
    const { anchorEl } = this.state;

    return (
      <div>
        <GuitarixAppBar>
          <Left>
            <Button onClick={this.context.router.history.goBack}>
              <NavigateBeforeIcon />
              Back
            </Button>
          </Left>
          <Center>
            <Typography variant="h6">Plugins</Typography>
          </Center>
          <Right>
            <Button color="primary" onClick={this.handleMoreButton.bind(this)}>
              <MoreVertIcon />
            </Button>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={this.handleCloseMenu}>
              {this.state.categories.map((item, index) => (
                <MenuItem onClick={this.handleCloseMenu.bind(this, item)}>{item}</MenuItem>
              ))}
            </Menu>
          </Right>
        </GuitarixAppBar>

        <Box display="flex" justifyContent="center">
          <TileContainer>
            {this.state.list.map((item, index) => (
              <Tile key={item.name} title={item.name} description={item.category} onClick={this.handleClick.bind(this, item)} />
            ))}
          </TileContainer>
        </Box>
      </div>
    );
  }
}

export default Plugins;
