import React, {PureComponent as Component} from 'react';
import axios from 'axios';
import jwtDecoder from "jwt-decode";

const token = localStorage.getItem('jwtToken');
const current_user = jwtDecoder(token);


class Concert extends Component{
  constructor(props){
    super(props)
    this.state = {
      venue: [],
      concert: [this.props.location.state]
    }
    this.findVenue = this.findVenue.bind(this);
    console.log(this.state.concert[0])
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

  deleteUserFromEvent = () => {
  console.log(current_user.sub);
  console.log(this.props.location.state)
  console.log(parseInt(this.props.match.params.id));
    axios({
      url: ``,
      method: 'delete',
      data:{ users : {
        user_id: current_user.sub,
        event_id: parseInt(this.props.match.params.id)
        }
      }
    }).then(response => {
     console.log(response)
    })
    .catch(error => {
        console.log(error.response)
    });

  }


  addUserToEventList = () => {
  console.log(current_user.sub);
  console.log(parseInt(this.props.match.params.id));
    axios({
      url: 'https://earbuddies1.herokuapp.com/events_users',
      method: 'post',
      data: {
        user_id: current_user.sub,
        event_id: parseInt(this.props.match.params.id)
      }
    }).then(response => {
     console.log(response)
    })
    .catch(error => {
        console.log(error.response)
    });

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
          <button onClick={this.addUserToEventList}>attending</button>
          <button onClick={this.deleteUserFromEvent}>not attending</button>
      </div>
    )}
  }
export default Concert
