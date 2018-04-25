import React, {PureComponent as Component} from 'react';
import axios from 'axios';

class Venue extends Component{
  constructor(props){
    super(props)
    this.state = {
      venue: this.props.location.state,
    };
  }
  render() {

    return (
      <div>
          <h2>{this.state.venue.name}</h2>
          <p>{this.state.venue.address}</p>
          <a href={this.state.venue.url}>Visit Webiste</a>

      </div>
    );
  }
}
export default Venue
