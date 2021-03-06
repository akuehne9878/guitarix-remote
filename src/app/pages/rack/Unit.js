import React from "react";
import Button from "@material-ui/core/Button";
import Switch from "@material-ui/core/Switch";
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

        if (obj.name) {
          params.push(obj);
        }
      });

      that.setState({ params: params });
    });
  }

  componentDidMount() {
    this.load();
  }

  changeSliderValue = (event, val) => {
    if (this.state.currParam.step.toString().indexOf(".") > 0) {
      let decimalCount = this.state.currParam.step.toString().split(".")[1].length;
      val = val.toFixed(decimalCount);
    }

    let obj = this.state.currParam;
    obj.value = val;
    this.setState({ currParam: obj });

    new GuitarixModel().set(obj.key, obj.value);
  };

  changeSwitchValue = (event, val) => {
    let obj = this.state.currParam;
    obj.value = event.target.checked ? 1 : 0;
    this.setState({ currParam: obj });

    new GuitarixModel().set(obj.key, obj.value);
  };

  changeListValue(item) {
    let obj = this.state.currParam;
    obj.value = item[0];
    this.setState({ currParam: obj });

    new GuitarixModel().set(obj.key, obj.value);
  }

  loadParam(item) {
    this.setState({ currParam: item });
  }

  renderSlider(currParam) {
    return <Slider vertical value={currParam.value} min={currParam.lower_bound} max={currParam.upper_bound} step={currParam.step} onChange={this.changeSliderValue} />;
  }

  renderList(currParam) {
    return (
      <List style={{ maxHeight: "400px", width: "100%", overflow: "auto" }}>
        {currParam.value_names.map((item, index) => (
          <MenuItem button key={item[0]} onClick={this.changeListValue.bind(this, item)} selected={this.state.currParam.value === item[0]}>
            <Box display="flex" justifyContent="space-between" alignContent="space-between" alignItems="begin" width="100%">
              <Typography component="div">
                <Box fontWeight={this.state.currParam.value === item[0] ? 600 : 400}>{item[0]}</Box>
              </Typography>
            </Box>
          </MenuItem>
        ))}
      </List>
    );
  }

  renderSwitch(currParam) {
    return <Switch checked={currParam.value} onChange={this.changeSwitchValue} />;
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
              <MenuItem button key={item.key} onClick={this.loadParam.bind(this, item)} selected={this.state.currParam.key === item.key}>
                <Box display="flex" justifyContent="space-between" alignContent="space-between" alignItems="begin" width="100%">
                  <Typography component="div">
                    <Box fontWeight={this.state.currParam.key === item.key ? 600 : 400}>{item.name}</Box>
                  </Typography>
                  <Typography component="div">
                    <Box fontWeight={this.state.currParam.key === item.key ? 600 : 400}>{item.value}</Box>
                  </Typography>
                </Box>
              </MenuItem>
            ))}
          </List>
        </Box>
        {this.state.currParam.name && (
          <Box width="50%" display="flex" alignItems="center" justifyContent="center">
            <Box height="400px">
              {this.state.currParam.ctl_continous && this.renderSlider(this.state.currParam)}
              {this.state.currParam.ctl_enum && this.renderList(this.state.currParam)}
              {this.state.currParam.ctl_switch && this.renderSwitch(this.state.currParam)}
            </Box>
          </Box>
        )}
      </Box>
    );
  }
}

export default Unit;
