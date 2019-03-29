import React from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { unstable_Box as Box } from "@material-ui/core/Box";
import PropTypes from "prop-types";
import SaveIcon from "@material-ui/icons/Save";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";

import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import IconButton from "@material-ui/core/IconButton";

import TextField from "@material-ui/core/TextField";

import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";

import SongModel from "../../model/SongModel.js";
import GuitarixAppBar, { Left, Right, Center } from "../../components/GuitarixAppBar.js";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

class SongDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        name: "",
        artist: ""
      },
      showMsgDialog: false,
      anchorEl: null
    };

    this.handleCloseMessageDialog = this.handleCloseMessageDialog.bind(this);
  }

  static contextTypes = {
    router: PropTypes.object
  };

  componentDidMount() {
    let model = new SongModel();
    model.get(this.props.match.params.id).then(data => {
      this.setState({ data: data[0] });
    });
  }

  handleUpdate() {
    var that = this;

    let model = new SongModel();
    model
      .update(this.state.data.songID, this.state.data)
      .then(function() {
        that.context.router.history.goBack();
      })
      .catch(err => console.error("Caught error: ", err));
  }

  handleDelete() {
    var that = this;
    new SongModel()
      .delete(this.state.data.songID)
      .then(function() {
        that.context.router.history.goBack();
      })
      .catch(err => console.error("Caught error: ", err));
  }

  handleOpenMessageDialog() {
    this.setState({ anchorEl: null });
    this.setState({ showMsgDialog: true });
  }

  handleCloseMessageDialog() {
    this.setState({ showMsgDialog: false });
  }

  handleChangeName(event) {
    var data = { ...this.state.data };
    data.name = event.target.value;
    this.setState({ data });
  }

  handleChangeArtist(event) {
    var data = { ...this.state.data };
    data.artist = event.target.value;
    this.setState({ data });
  }

  handleOpenMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleCloseMenu = () => {
    this.setState({ anchorEl: null });
  };

  render() {
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
            <Typography variant="h6">Edit Song</Typography>
          </Center>
          <Right>
            <Box display="flex">
              <Menu anchorEl={this.state.anchorEl} open={Boolean(this.state.anchorEl)} onClose={this.handleCloseMenu.bind(this)}>
                <MenuItem onClick={this.handleCloseMenu.bind(this)}>Duplicate</MenuItem>
                <MenuItem onClick={this.handleOpenMessageDialog.bind(this)}>Delete</MenuItem>
              </Menu>
              <IconButton onClick={this.handleOpenMenu.bind(this)}>
                <MoreVertIcon />
              </IconButton>
              <Button variant="contained" color="primary" onClick={this.handleUpdate.bind(this)}>
                <SaveIcon />
                Update
              </Button>
            </Box>
          </Right>
        </GuitarixAppBar>

        <Dialog open={this.state.showMsgDialog} onClose={this.handleCloseMessageDialog}>
          <DialogTitle>Delete song</DialogTitle>
          <DialogContent>
            <DialogContentText>Do you really want to delete the current song?</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseMessageDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleDelete.bind(this)} color="primary" autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>

        <Box display="flex" justifyContent="center">
          <FormControl component="fieldset" margin="normal">
            <FormGroup>
              <TextField label="Name" value={this.state.data.name} onChange={this.handleChangeName.bind(this)} margin="normal" />
              <TextField label="Artist" value={this.state.data.artist} onChange={this.handleChangeArtist.bind(this)} margin="normal" />
            </FormGroup>
          </FormControl>
        </Box>
      </div>
    );
  }
}

export default SongDetail;
