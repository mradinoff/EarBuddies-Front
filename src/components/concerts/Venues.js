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


 gallery() {
  return(
    <div>
      {this.state.venues.map(({name, address,}) => <p>{name} | {address} </p>)}
    </div>
  );
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
