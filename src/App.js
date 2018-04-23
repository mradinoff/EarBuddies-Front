import React, { PureComponent as Component } from 'react';
//import PopOver from './playground/PopOver';
import Swipe from './components/friendships/Swipe';
import Concerts from './components/concerts/Concerts';
//import Profile from './components/Users/Profile';
import Nav from './components/nav/Nav'
import './index.css';
import axios from 'axios';
import Search from "./components/Search/Search";
//import _ from 'lodash';

class App extends Component {

  state = {
    lat: "-33.871478599999996",
    lon: "151.20472279999998",
    events: [],
    genres: [],
    genre: null
  }

  componentDidMount = async () => {
    //await this.getLocation();
    axios.get('https://earbuddies1.herokuapp.com/venues.json', {
      params: {
        latlon: `${this.state.lat},${this.state.lon}`
      }
    })
      .then(res => {
        res.data.map(item => {
          return item.events.map(event => {

            return this.setState({
              //Saving all events from all venues to this.state.events
              events: [...this.state.events, event],
              genres: [...this.state.genres, event.genre]
            })
          })
        })
      });
  }

  onInputSetState = (id, value) => {
    console.log(id)
    console.log(value)
    if (id === "genre") {
      this.setState({
        genre: value
      });

      axios.get(`https://earbuddies1.herokuapp.com/events.json?genre=${value}`)
    .then(res => {
      console.log(res)
      res.data.map(event => {
        return this.setState({
          //Saving all events from all venues to this.state.events
          events: res.data,
          genres: [...this.state.genres, event.genre]
        })
      })
    });

    }
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
    console.log(this.state.genre);
    console.log(this.state.events);

    if (this.state.events.length === 0) {
      return <h1>Loading...</h1>
    }

    return (
      <div>
        <Nav />
        <h1>This is Home page</h1>

        <Swipe />
        <Search genres={["Rock", "Jazz", "Blue"]} onSubmit={this.onInputSetState} />
        <Concerts concerts={this.state.events}
                  history={this.props.history}/>

      </div>
    )
  }
}

export default App;
