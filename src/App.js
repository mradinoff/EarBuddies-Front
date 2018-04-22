import React, { PureComponent as Component } from 'react';
import PopOver from './playground/PopOver';
import Swipe from './friendships/Swipe';
import Concerts from './concerts/Concerts';
import axios from 'axios';

class App extends Component {

  state = {
    lat: "",
    lon: ""
  }

  componentDidMount = async () => {
    await this.getLocation();
    axios.get('https://earbuddies1.herokuapp.com/venues.json', {
      params: {
        latlon: `${this.state.lat},${this.state.lon}`
      }
    })
      .then(res => console.log(res));
  }

  getLocation = () => {
    const nav = navigator.geolocation;
    nav.getCurrentPosition(position => {
      console.log("lat: ", position.coords.latitude)
      console.log("lon: ", position.coords.longitude)
      this.setState({
        lat: position.coords.latitude,
        lon: position.coords.longitude
      })
    })
  }

  render() {

    return (
      <div>
        <h1>This is Home page</h1>
        <PopOver />
        <Swipe />
        <Concerts/>
      </div>
    )
  }
}

export default App;
