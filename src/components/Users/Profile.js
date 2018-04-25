import React, { PureComponent as Component } from "react";
import axios from "axios";

const USER_URL = 'https://earbuddies1.herokuapp.com/users/14.json';


class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    }
  }

  componentDidMount = () => {
    this.fetchUser();
  }

  fetchUser = () => { // Fat arrow functions do not break the connection to this
    axios({
      url: USER_URL,
      method: 'get',
      headers: {
        authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MjQ1Mjc2MDMsInN1YiI6NywiZW1haWwiOiJ0YXJ5bkB0YXJ5bi5jb2RlcyIsImFkbWluIjp0cnVlfQ.1RBD0T6qoAe0fSL9hRhvPKdEvDgjPlnPvc9yi8FHTE8`
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
  console.log(this.state.user);
    return (
      <div>
      <h2>{this.state.user.name}</h2>
      <img src={this.state.user.avatar.thumb.url} alt={this.state.user.name}/>
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
              <div>
                <p key={e.id}>{e.name} {e.date} : <a href={e.ticket_url}>Tickets</a></p>

              </div>
          )}
      </div>

      </div>
    )
  }
}

export default Profile;
