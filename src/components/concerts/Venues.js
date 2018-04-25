import React, {PureComponent as Component} from 'react';
import axios from 'axios';

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
          {<p key={venue.name}> <a onClick = {() => this._handleClick(venue)} value ={venue} href={`/venues/${venue.id}`}> {venue.name}</a> | {venue.address} | {venue.events.map((e) => e.name )} </p>}
        </div>
      );
    })
  }


  render() {
    return (
      <div>
        {this.gallery()}
      </div>

    );
}



}



export default Venues;
