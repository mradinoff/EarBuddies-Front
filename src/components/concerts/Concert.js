import React, {PureComponent as Component} from 'react';
import axios from 'axios';
import Attending from '../friendships/Attending.js'

class Concert extends Component{
  constructor(props){
    super(props)
    this.state = {
      venue: [],
      concert: [this.props.location.state],
    }
    this.findVenue = this.findVenue.bind(this);
    console.log(this.state.concert[0])
    console.log(this.props.location.state);

  }
  componentDidMount = () => {
    this.findVenue();
  }

  findVenue(state){

      axios({
        method:'GET',
        url: `https://earbuddies1.herokuapp.com/venues/${this.state.concert[0].venue_id}.json`,
        responseType: 'json',

      }).then(function(v){
        let venue = []
        venue.push(v.data)
        this.setState({venue})}.bind(this))

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
          {this.state.venue.map (v => <li key={v.id}> {v.name}</li>)}
          {/* will go to venue page */}
          <Attending />
      </div>
    )}
  }
export default Concert
