import React, {PureComponent as Component} from 'react';
import axios from 'axios';

class Concert extends Component{
  constructor(props){
    super(props)
    this.state = {venue: []}
    this.state = {concert: []}
    this.findVenue = this.findVenue.bind(this);
    console.log(this.props)
  }

  findVenue(){
    this.setState({concert: this.props.location.state.id}).bind(this)
      axios({
        method:'GET',
        url: `https://earbuddies1.herokuapp.com/venues/${this.props.location.state.venue_id}.json`,
        responseType: 'json',

      }).then(function(v){
        let venue = []
        venue.push(v.data)
        console.log(venue)
        this.setState({venue})}.bind(this))
        console.log(this)

        }
    render (){
      return(
      <div>

          {this.state.concert.map(c => <li key={c.id}> {c.name}</li>)}
          {this.state.concert.map(c => <li key={c.id}> {c.description}</li>)}
          {this.state.concert.map(c => <li key={c.id}> {c.date}</li>)}
          {this.state.concert.map(c => <li key={c.id}> {c.genre}</li>)}
          {this.state.concert.map(c => <li key={c.id}> {c.ticket_url}</li>)}
          {this.state.concert.map(c => <img key={c.id} src={c.image} alt={c.name}/>)}
          {/* {this.state.venue.map (v => <li key={v.id}> {v.name}</li>)} */}

      </div>
    )}
  }
export default Concert
