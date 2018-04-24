import React, {PureComponent as Component} from 'react';
import axios from 'axios';
import jwtDecoder from "jwt-decode";

const token = localStorage.getItem('jwtToken');
const current_user = jwtDecoder(token);


class Concert extends Component{
  constructor(props){
    super(props)
    this.state = {
      venue: '' ,
      concert: this.props.location.state
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
        url: `https://earbuddies1.herokuapp.com/venues/${this.state.concert.venue_id}.json`,
        responseType: 'json',

      }).then(function(v){
        console.log(v);
        let venue = []
        venue.push(v.data.name)
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
          <img src={this.state.concert.image} alt=""/>
          <h2>{this.state.concert.name}</h2>
          <p>{this.state.concert.description}</p>
          <p>{this.state.concert.date}</p>
          <p>{this.state.venue}</p>
          <p>{this.state.concert.genre}</p>
          <button onClick={this.addUserToEventList}>attending</button>
          {/* <button onClick={this.deleteUserFromEvent}>not attending</button> */}
      </div>
    )}
  }
export default Concert
