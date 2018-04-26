import React, { PureComponent as Component } from "react";
import axios from "axios";
import jwtDecoder from "jwt-decode";
import _ from 'lodash';

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
      user_id: "",
      friendships: []
    }
  }

  _handleClick = e => {
    const event = {
      pathname: `/events/${e.id}`,
      state: e
    };
    this.props.history.push(event);
  };

  componentDidMount = async () => {
    await this.fetchUser();
    await this.fetchFriendships();
    //await this.findMatches();
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

  fetchFriendships = () => { // Fat arrow functions do not break the connection to this
    const user = jwtDecoder(this.props.token);
    axios({
      url: `http://earbuddies1.herokuapp.com/friendships.json`,
      method: 'get',
      headers: {
        authorization: `Bearer ${this.props.token}`
      }
    })
      .then(res => this.setState({friendships: res.data}))
      .then(() => this.findMatches())
  }

  findMatches = () => {
    console.log("finding matches");
    console.log(this.state.friendships);
    const user = _.find(this.state.friendships, (user) => {
      return user.id === this.state.user_id
    })
    console.log(user);
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
      <h3>Friends</h3>
      <div>
          { this.state.user.matched.map( f =>
              <p key={f.id}>{f.name}</p>
          )}
      </div>
      <h3>Events</h3>
      <div>
          { this.state.user.events.map( e =>
              <div key={e.id}>
                <p >{e.name} {e.date} : <a onClick = {() => this._handleClick(e)} value ={e} href={`/events/${e.id}`}>See Event</a></p>

              </div>
          )}
      </div>

=======
      <h3>{this.state.user.matched.length} Friends</h3>
      <Friends user= {this.state.user}/>
      <h3>{this.state.user.events.length} Events</h3>
      <Events user= {this.state.user}/>
>>>>>>> 7c8a6908e29afb789c9d2af6d46f78ecd7002092
      </div>
    )
  }
}

export default Profile;
