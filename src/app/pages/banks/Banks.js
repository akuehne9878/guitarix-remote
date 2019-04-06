import React from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { unstable_Box as Box } from "@material-ui/core/Box";
import PropTypes from "prop-types";
import AddIcon from "@material-ui/icons/Add";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";

import GuitarixModel from "../../model/GuitarixModel.js";
import GuitarixAppBar, { Left, Right, Center } from "../../components/GuitarixAppBar.js";
import TileContainer from "../../components/TileContainer";
import Tile from "../../components/Tile";

class Banks extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      list: []
    };
  }

  static contextTypes = {
    router: PropTypes.object
  };

  componentDidMount() {
    let model = new GuitarixModel();
    model.getBanks().then(data => {
      var arr = data.result.map(function(item) {
        item.description = item.presets.join(", ");
        return item;
      });

      this.setState({ list: arr });
    });
  }

  handleClick(obj) {
    this.setState({ selectedItem: obj });
  }

  handleNewBank = () => {
    this.context.router.history.push("/banks/new");
  };

  render() {
    if (this.state.selectedItem) {
      this.context.router.history.push("/banks/detail/" + this.state.selectedItem.songID);
    }

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
            <Typography variant="h6">Banks</Typography>
          </Center>
          <Right>
            <Button variant="contained" color="primary" onClick={this.handleNewBank.bind(this)}>
              <AddIcon />
              New Bank
            </Button>
          </Right>
        </GuitarixAppBar>

        <Box display="flex" justifyContent="center">
          <TileContainer>
            {this.state.list.map((item, index) => (
              <Tile key={item.name} route={"/banks/detail/" + item.name} title={item.name} description={item.description} onClick={this.handleClick.bind(this, item)} />
            ))}
          </TileContainer>
        </Box>
      </div>
    );
  }
}

export default Banks;
