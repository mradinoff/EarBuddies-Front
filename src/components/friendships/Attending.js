import React, { PureComponent as Component } from "react";
import axios from "axios";
import jwtDecoder from "jwt-decode";

const EVENT_URL = "https://earbuddies1.herokuapp.com/events.json";
const USERS_URL = 'https://earbuddies1.herokuapp.com/users.json';
const FRIENDSHIPS_URL = 'https://earbuddies1.herokuapp.com/friendships.json';

const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MjQ1MzM2NjEsInN1YiI6MTQsImVtYWlsIjoidGFyeW5AdGFyeW4uY29kZXMiLCJhZG1pbiI6bnVsbH0.U04YgxkDBjyrXpP2GBaCPHRMsfUH7H3m89m3htfwBBg";
const current_user = jwtDecoder(token);

class Attending extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      friendships: []
    }
    this._handlePatchClick = this._handlePatchClick.bind(this);
    this._handlePostClick = this._handlePostClick.bind(this);
  }

  componentDidMount = () => {
    this.fetchUsers();
    this.fetchFriendships();
  }

  fetchUsers = () => { // Fat arrow functions do not break the connection to this
    axios({
      url: USERS_URL,
      method: 'get',
      headers: {
        authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MjQ1Mjc2MDMsInN1YiI6NywiZW1haWwiOiJ0YXJ5bkB0YXJ5bi5jb2RlcyIsImFkbWluIjp0cnVlfQ.1RBD0T6qoAe0fSL9hRhvPKdEvDgjPlnPvc9yi8FHTE8`
      }
    })
      .then(res => this.setState({users: res.data}))
  }

  fetchFriendships = () => { // Fat arrow functions do not break the connection to this
    axios({
      url: FRIENDSHIPS_URL,
      method: 'get',
      headers: {
        authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MjQ1MzM2NjEsInN1YiI6MTQsImVtYWlsIjoidGFyeW5AdGFyeW4uY29kZXMiLCJhZG1pbiI6bnVsbH0.U04YgxkDBjyrXpP2GBaCPHRMsfUH7H3m89m3htfwBBg`
      }
    })
      .then(res => this.setState({friendships: res.data}))
  }

  renderButton = (id) => {
    for (let i = 0; i < this.state.friendships.length; i++) {
      console.log("run loop");

        if (this.state.friendships[i].friend_id === current_user.sub && this.state.friendships[i].user_id === id && this.state.friendships[i].active === false) {
          console.log("patchClick");
          return (<button onClick={() => this._handlePatchClick(id)}>Match</button>)
        } else if (this.state.friendships[i].friend_id !== current_user.sub && this.state.friendships[i].user_id !== current_user.sub ) {
          console.log("PostClick");
          return (<button onClick={() => this._handlePostClick(id)}>Match</button>)
        } else if (this.state.friendships[i].friend_id === current_user.sub && this.state.friendships[i].user_id === id && this.state.friendships[i].active === true) {
          console.log("Match found - friend id is current user");
          return (<p>EarBuddies!</p>)
        } else if (this.state.friendships[i].friend_id === id && this.state.friendships[i].user_id === current_user.sub && this.state.friendships[i].active === true) {
          console.log("Match found - user id is current user");
          return (<p>EarBuddies!</p>)
        } else if (this.state.friendships[i].friend_id === id && this.state.friendships[i].user_id === current_user.sub && this.state.friendships[i].active === false) {
          console.log("Pending found");
          return (<p>Already matched!</p>)
        } else {
          return (<button onClick={() => this._handlePostClick(id)}>Match</button>)
        }

      }
    }


  _handlePatchClick(id){
    console.log("Friendship Found - Active Match made!");
    axios({
      url: USERS_URL,
      method: 'patch',
      headers: {
        authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MjQ1Mjc2MDMsInN1YiI6NywiZW1haWwiOiJ0YXJ5bkB0YXJ5bi5jb2RlcyIsImFkbWluIjp0cnVlfQ.1RBD0T6qoAe0fSL9hRhvPKdEvDgjPlnPvc9yi8FHTE8`
      },
      data: {
      friendship: {
        user_id: id,
        friend_id: current_user.sub,
        active: true
        }
      }
    }).then(res => this.setState({users: res.data}))
  }

  _handlePostClick(id){
    console.log("No friendship found = Inactive Friendship Made!");
    axios({
      url: USERS_URL,
      method: 'post',
      headers: {
        authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MjQ1Mjc2MDMsInN1YiI6NywiZW1haWwiOiJ0YXJ5bkB0YXJ5bi5jb2RlcyIsImFkbWluIjp0cnVlfQ.1RBD0T6qoAe0fSL9hRhvPKdEvDgjPlnPvc9yi8FHTE8`
      },
      data: {
        friendship: {
          user_id: current_user.sub,
          friend_id: id,
          active: false
        }
      }
    }).then(res => this.setState({users: res.data}))
  }




  render() {

    return(
      <div>
        <h2>Users Attending</h2>
        <div>
            { this.state.users.map( u =>
              <div className="user-card" key={u.id}>
                <img src="{u.avatar.url}" alt={u.name}/>
                <h3>{u.name}</h3>
                <p>{u.hometown}</p>
                <p>{u.bio}</p>
                <p>{u.interests}</p>
                {this.renderButton(u.id)}

              </div>
            )}
        </div>
      </div>
    )
  }
}

export default Attending;
