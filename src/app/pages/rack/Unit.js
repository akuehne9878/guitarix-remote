import React from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { unstable_Box as Box } from "@material-ui/core/Box";
import PropTypes from "prop-types";
import AddIcon from "@material-ui/icons/Add";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";

import GuitarixModel from "../../model/GuitarixModel.js";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/Inbox";

import Slider from "@material-ui/lab/Slider";

class Unit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      params: [],
      currParam: { value: 0 }
    };
  }

  init() {
    this.setState({
      params: [],
      currParam: { value: 0 }
    });
  }

  static contextTypes = {
    router: PropTypes.object
  };

  componentDidUpdate(prevProps, prevState) {
    //console.log(this.props.match.params.unit + " - " + prevProps.match.params.unit);

    if (this.props.match.params.unit !== prevProps.match.params.unit) {
      this.init();
      this.load();
    }

    // console.log("update unit: " + JSON.stringify(prevProps) + " ---- " + JSON.stringify(prevState));
  }

  load() {
    let that = this;
    let model = new GuitarixModel();

    model.queryUnit(this.props.match.params.unit).then(data => {
      let params = [];
      Object.keys(data.result).forEach(function(key) {
        let obj = data.result[key];
        obj.key = key;

        obj.value = obj.value[key];
        params.push(obj);
      });

      that.setState({ params: params });
    });
  }

  componentDidMount() {
    this.load();
  }

  changeValue = (event, val) => {
    if (this.state.currParam.step.toString().indexOf(".") > 0) {
      let decimalCount = this.state.currParam.step.toString().split(".")[1].length;
      val = val.toFixed(decimalCount);
    }

    let obj = this.state.currParam;
    obj.value = val;
    this.setState({ currParam: obj });
  };

  loadParam(item) {
    this.setState({ currParam: item });
  }

  render() {
    const style = {
      width: "200px",
      height: "200px"
    };
    return (
      <Box flexDirection="row" display="flex">
        <Box width="50%" height="400px">
          <List style={{ maxHeight: "400px", overflow: "auto" }}>
            {this.state.params.map((item, index) => (
              <ListItem button key={item.key} onClick={this.loadParam.bind(this, item)}>
                <Box display="flex" justifyContent="space-between" alignContent="space-between" alignItems="begin" width="100%">
                  <Typography component="div">
                    <Box fontWeight={this.state.currParam.name === item.name ? 600 : 400}>{item.name}</Box>
                  </Typography>
                  <Typography component="div">
                    <Box fontWeight={this.state.currParam.name === item.name ? 600 : 400}>{item.value}</Box>
                  </Typography>
                </Box>
              </ListItem>
            ))}
          </List>
        </Box>
        {this.state.currParam.name && (
          <Box width="50%" display="flex" alignItems="center" justifyContent="center">
            <Box height="400px">
              <Slider
                vertical
                value={this.state.currParam.value}
                min={this.state.currParam.lower_bound}
                max={this.state.currParam.upper_bound}
                step={this.state.currParam.step}
                onChange={this.changeValue}
              />
            </Box>
          </Box>
        )}
      </Box>
    );
  }
}

export default Unit;
