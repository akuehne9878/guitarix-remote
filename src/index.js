import React from "react";
import ReactDOM from "react-dom";
import Button from "@material-ui/core/Button";

import { BrowserRouter } from "react-router-dom";
import { Route } from "react-router-dom";
import { Switch } from "react-router-dom";

import About from "./app/pages/about/About";
import Admin from "./app/pages/admin/Admin";
import Home from "./app/pages/home/Home";
import Topics from "./app/pages/topics/Topics";
import Songs from "./app/pages/songs/Songs";
import SongDetail from "./app/pages/songs/SongDetail";
import SongNew from "./app/pages/songs/SongNew";
import Banks from "./app/pages/banks/Banks";
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
              <Route exact path="/about" component={About} />
              <Route exact path="/topics" component={Topics} />
              <Route exact path="/admin/" component={Admin} />

              <Route exact path="/songs/" component={Songs} />
              <Route exact path="/songs/detail/:id" component={SongDetail} />
              <Route exact path="/songs/new" component={SongNew} />

              <Route exact path="/banks/" component={Banks} />
            </Switch>
          </BrowserRouter>
        </div>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
