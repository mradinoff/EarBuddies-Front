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
    if (this.state.friendships.length >= 1) {

      for (let i = 0; i < this.state.friendships.length; i++) {
        console.log("run loop");
        console.log(this.state.friendships[i].friend_id === id);
        console.log(this.state.friendships[i].user_id === current_user.sub);
        console.log(this.state.friendships[i].active === false)
        console.log(this.state.friendships[i].friend_id);
        console.log(this.state.friendships[i].user_id);
        console.log(current_user.sub)
        console.log(id)

          if (this.state.friendships[i].friend_id === current_user.sub && this.state.friendships[i].user_id === id && this.state.friendships[i].active === false) {
            console.log("patchClick");
            return (<button onClick={() => this._handlePatchClick(id)}>Match</button>)

          } if (this.state.friendships[i].friend_id === current_user.sub && this.state.friendships[i].user_id === id && this.state.friendships[i].active === true) {
            console.log("Match found - friend id is current user");
            return (<button onClick={() => this._handleDeleteClick(id)}>Buddies! Disconnect Buddy?</button>)

          } if (this.state.friendships[i].friend_id === id && this.state.friendships[i].user_id === current_user.sub && this.state.friendships[i].active === true) {
            console.log("Match found - user id is current user");
            return (<button onClick={() => this._handleDeleteClick(id)}>Buddies! Disconnect Buddy?</button>)

          } if (this.state.friendships[i].friend_id === id && this.state.friendships[i].user_id === current_user.sub && this.state.friendships[i].active === false) {
            console.log("Pending found");
            return (<button onClick={() => this._handleDeleteClick(id)}>Cancel Buddy Request?</button>)

          } if (current_user.sub === id){
            return (<button onClick={() => this._handleCancelAttendingClick(id)}>Not attending anymore?</button>)
            console.log("User")
          }
        }

    } if (this.state.friendships.length < 1 && current_user.sub === id){
      console.log("User")
      return (<button onClick={() => this._handleCancelAttendingClick(id)}>Not attending anymore?</button>)

    }
    else {
      console.log("patchClick");
      return (<button onClick={() => this._handlePatchClick(id)}>Match</button>)
    }
    }


  _handlePatchClick(id){
    console.log("Friendship Found - Active Match made!");
    axios({
      url: FRIENDSHIPS_URL,
      method: 'patch',
      headers: {
        authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MjQ2MTEyNTEsInN1YiI6MTQsImVtYWlsIjoidGFyeW5AdGFyeW4uY29kZXMiLCJhZG1pbiI6bnVsbH0.owYVjK7yMwdXPnbxblZ7ODyWxrXtwlwBW14KBF7Znpo`
      },
      data: {
      friendship: {
        user_id: id,
        friend_id: current_user.sub,
        active: true
        }
      }
    }).then(res => console.log(res))
  }

  _handlePostClick(id){
    console.log("No friendship found = Inactive Friendship Made!");
    console.log(id);
    axios({
      url: FRIENDSHIPS_URL,
      method: 'post',
      headers: {
        authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MjQ2MTEyNTEsInN1YiI6MTQsImVtYWlsIjoidGFyeW5AdGFyeW4uY29kZXMiLCJhZG1pbiI6bnVsbH0.owYVjK7yMwdXPnbxblZ7ODyWxrXtwlwBW14KBF7Znpo`
      },
      data: {
        friendship: {
          user_id: current_user.sub,
          friend_id: id,
          active: false
        }
      }
    }).then(res => console.log(res))
  }

  _handleDeleteClick(id){
    console.log("No friendship found = Inactive Friendship Made!");
    console.log(id);
    axios({
      url: USERS_URL,
      method: 'delete',
      headers: {
        authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MjQ2MTEyNTEsInN1YiI6MTQsImVtYWlsIjoidGFyeW5AdGFyeW4uY29kZXMiLCJhZG1pbiI6bnVsbH0.owYVjK7yMwdXPnbxblZ7ODyWxrXtwlwBW14KBF7Znpo`
      },
      data: {
        friendship: {
          friend_id: id,
          active: false
        }
      }
    }).then(res => console.log(res))
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
