import React from "react";
import { Route } from "react-router-dom";

import Launchpad from "../../components/Launchpad";
import LaunchpadTile from "../../components/LaunchpadTile";

class AdminLaunchpad extends React.Component {
  constructor(props) {
    super(props);

    console.log(props);

    this.state = {
      tiles: [
        { title: "Entitäten", description: "b", id: 1 },
        { title: "test2", description: "d", id: 2 }
      ]
    };
  }

  render() {
    let tiles = this.state.tiles;
    return (
      <div>
        <Launchpad>
          {tiles.map(tile => (
            <LaunchpadTile
              key={tile.id}
              title={tile.title}
              route="/admin/entity"
            />
          ))}
        </Launchpad>
      </div>
    );
  }
}

export default AdminLaunchpad;
