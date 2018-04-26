import React, { PureComponent as Component } from "react";
import axios from "axios";
import jwtDecoder from "jwt-decode";


class Friends extends Component {
  constructor(props) {
    super(props);
  }
  render(){
    if (this.props.user.matched.length === 0){
      return(
        <div>
          <p>You have 0 Earbuddies, Go to an Event Page and start Matching!</p>
        </div>
      )
    }
    else{
      return(
        <div>
            { this.props.user.matched.map( f =>
                <p key={f.id}>{f.name}</p>
            )}
        </div>
      )
    }
  }
}
class Events extends Component {
  constructor(props) {
    super(props);
  }
  render(){
    if(this.props.user.events.length === 0){
    return(
      <div>
        <p>You have 0 Events lined up, Go to the Search Page and Find an Event!</p>
      </div>)
  }
    else{
      return(
        <div>
            { this.props.user.events.map( e =>
                <div>
                  <p key={e.id}>{e.name} {e.date} : <a onClick = {() => this._handleClick(e)} value ={e} href={`/events/${e.id}`}>See Event</a></p>

                </div>
            )}
        </div>
      )
    }
  }
}

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      user_id: ""
    }
  }

  _handleClick = e => {
    const event = {
      pathname: `/events/${e.id}`,
      state: e
    };
    this.props.history.push(event);
  };

  componentDidMount = () => {
    this.fetchUser();
  }

  fetchUser = () => { // Fat arrow functions do not break the connection to this

    const user = jwtDecoder(this.props.token);
    axios({
      url: `https://earbuddies1.herokuapp.com/users/${user.sub}.json`,
      method: 'get',
      headers: {
        authorization: `Bearer {this.props.token}`
      }
    })
      .then(res => this.setState({user: res.data}))
  }




  render() {

  if (!this.state.user) {
    return (
    <h2>Loading...</h2>
  )
  }
    return (
      <div>
      <h2>{this.state.user.name}</h2>
      <img src={this.state.user.avatar.url} alt={this.state.user.name}/>
      <p><strong>Hometown:</strong> {this.state.user.hometown}</p>
      <p>{this.state.user.bio}</p>
      <p><strong>Interests:</strong> {this.state.user.interests}</p>
      <h3>{this.state.user.matched.length} Friends</h3>
      <Friends user= {this.state.user}/>
      <h3>{this.state.user.events.length} Events</h3>
      <Events user= {this.state.user}/>
      </div>
    )
  }
}

export default Profile;
