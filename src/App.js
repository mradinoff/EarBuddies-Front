import React, { PureComponent as Component } from 'react';
import PopOver from './playground/PopOver';

class App extends Component {

  componentDidMount = () => {
    this.getLocation();
  }

  getLocation = () => {
    const nav = navigator.geolocation;
    nav.getCurrentPosition(position => {
      console.log("lat: ", position.coords.latitude);
      console.log("lon: ", position.coords.longitude);
    })
  }

  render() {
    return (
      <div>
        <h1>This is Home page</h1>
        <PopOver />
      </div>
    )
  }
}

export default App;
