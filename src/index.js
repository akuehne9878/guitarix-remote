import React from "react";
import ReactDOM from "react-dom";
import Button from "@material-ui/core/Button";

import { BrowserRouter } from "react-router-dom";
import { Route } from "react-router-dom";

import Shell from "./app/shell/Shell";
import About from "./app/pages/about/About";
import Admin from "./app/pages/admin/Admin";
import Home from "./app/pages/home/Home";
import Topics from "./app/pages/topics/Topics";
import Songs from "./app/pages/songs/Songs";
import SongDetail from "./app/pages/songs/SongDetail";
import SongNew from "./app/pages/songs/SongNew";
class App extends React.Component {
  constructor(props) {
    super(props);
  }

  reload = () => {
    window.location.reload();
  };

  render() {
    return (
      <div className="App">
        <div>
          <BrowserRouter>
            <Shell>
              <Route exact path="/" component={Home} />
              <Route exact path="/about" component={About} />
              <Route exact path="/topics" component={Topics} />
              <Route exact path="/admin/" component={Admin} />
              <Route exact path="/songs/" component={Songs} />
              <Route exact path="/songs/detail/:id" component={SongDetail} />
              <Route exact path="/songs/new" component={SongNew} />
            </Shell>
          </BrowserRouter>
        </div>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
