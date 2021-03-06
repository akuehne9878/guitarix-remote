import React from "react";
import ReactDOM from "react-dom";
import Button from "@material-ui/core/Button";

import { BrowserRouter } from "react-router-dom";
import { Route } from "react-router-dom";
import { Switch } from "react-router-dom";

import Admin from "./app/pages/admin/Admin";
import Home from "./app/pages/home/Home";

import Songs from "./app/pages/songs/Songs";
import SongDetail from "./app/pages/songs/SongDetail";
import SongNew from "./app/pages/songs/SongNew";
import Banks from "./app/pages/banks/Banks";
import Rack from "./app/pages/rack/Rack";
import Plugins from "./app/pages/plugins/Plugins";

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  reload = () => {
    window.location.reload();
  };

  render() {
    const appStyle = {
      height: 480,
      maxHeight: 480,
      width: 800,
      maxWidth: 800,
      backgroundColor: "linen",
      overflow: "hidden"
    };

    const body = {
      marginTop: 70,
      marginLeft: 8
    };

    return (
      <div className="App" style={appStyle}>
        <div style={body}>
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/admin/" component={Admin} />

              <Route exact path="/songs/" component={Songs} />
              <Route exact path="/songs/detail/:id" component={SongDetail} />
              <Route exact path="/songs/new" component={SongNew} />

              <Route exact path="/banks/" component={Banks} />

              <Route path="/rack/" component={Rack} />

              <Route path="/plugins/" component={Plugins} />
            </Switch>
          </BrowserRouter>
        </div>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
