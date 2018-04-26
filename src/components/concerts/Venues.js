import React, {PureComponent as Component} from 'react';
import axios from 'axios';
import "./Venues.css";

const SERVER_URL = 'https://earbuddies1.herokuapp.com/venues.json';





class Venues extends Component {
  constructor(props){
    super(props);
    this.state = {venues: [] };

    const fetchVenues = () => { // fat arrow functions do not break the conenction to this
      axios.get(SERVER_URL).then(results => this.setState({venues: results.data}))
      // setTimeout(fetchVenues, 6000); //
      console.log(this.state.venues);
    }
    fetchVenues();
  }
  _handleClick = v => {
    const venue = {
      pathname: `/venues/${v.id}`,
      state: v
    };
    this.props.history.push(venue);
  };


  gallery = () => {
    return this.state.venues.map(venue => {
      return (
        <div>
          {<p key={venue.name}> <a onClick = {() => this._handleClick(venue)} value ={venue} href={`/venues/${venue.id}`} className="venueListH1"> {venue.name}</a></p>}
        </div>
      );
    })
  }


  render() {
    return (
      <div>
        <div className="venuesHeader">
          <h1>Venues List.</h1>
        </div>
        {this.gallery()}
      </div>

    );
}



}



export default Venues;
