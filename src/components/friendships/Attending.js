import React, { PureComponent as Component } from "react";
import axios from "axios";
import jwtDecoder from "jwt-decode";
import _ from 'lodash';

const EVENT_URL = "https://earbuddies1.herokuapp.com/events.json";
const USERS_URL = 'https://earbuddies1.herokuapp.com/users.json';
const FRIENDSHIPS_URL = 'https://earbuddies1.herokuapp.com/friendships.json';

const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MjQ2MTEyNTEsInN1YiI6MTQsImVtYWlsIjoidGFyeW5AdGFyeW4uY29kZXMiLCJhZG1pbiI6bnVsbH0.owYVjK7yMwdXPnbxblZ7ODyWxrXtwlwBW14KBF7Znpo";
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
        authorization: `Bearer ${token}`
      }
    })
      .then(res => this.setState({users: res.data}))
  }

  fetchFriendships = () => { // Fat arrow functions do not break the connection to this
    axios({
      url: FRIENDSHIPS_URL,
      method: 'get',
      headers: {
        authorization: `Bearer ${token}`
      }
    })
      .then(res => this.setState({friendships: res.data}))
  }

  renderButton = (id) => {
    if (this.state.friendships.length >= 1) {

      for (let i = 0; i < this.state.friendships.length; i++) {

          if (this.state.friendships[i].friend_id === current_user.sub && this.state.friendships[i].user_id === id && this.state.friendships[i].active === false) {
            console.log("patchClick");
            return (<button onClick={() => this._handlePatchClick(id)}>Like this Buddy!</button>)

          } if (this.state.friendships[i].friend_id === current_user.sub && this.state.friendships[i].user_id === id && this.state.friendships[i].active === true) {
            console.log("Match found - friend id is current user");
            return (<button onClick={() => this._handleDeleteFriendCurrentClick(id)}>Buddies! Disconnect Buddy?</button>)

          } if (this.state.friendships[i].friend_id === id && this.state.friendships[i].user_id === current_user.sub && this.state.friendships[i].active === true) {
            console.log("Match found - user id is current user");
            return (<button onClick={() => this._handleDeleteUserCurrentClick(id)}>Buddies! Disconnect Buddy?</button>)

          } if (this.state.friendships[i].friend_id === id && this.state.friendships[i].user_id === current_user.sub && this.state.friendships[i].active === false) {
            console.log("Pending found");
            return (<button onClick={() => this._handleDeleteUserCurrentClick(id)}>Cancel Buddy Request?</button>)

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
      return (<button onClick={() => this._handlePostClick(id)}>Like this Buddy!</button>)
    }
    }


  _handlePatchClick(id){
    console.log("Friendship Found - Active Match made!");
    const user = _.find(this.state.users, (user) => {
      return user.id === id
    })

    const friendship = _.find(user.friendships, (friendship) => {
      return friendship.friend_id === current_user.sub
    })

  let CURRENT_URL = `https://earbuddies1.herokuapp.com/friendships/${friendship.id}.json`;



    axios({
      url: CURRENT_URL,
      method: 'patch',
      headers: {
        authorization: `Bearer ${token}`
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
        authorization: `Bearer ${token}`
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

  _handleDeleteUserCurrentClick(id){
    console.log("No friendship found = Inactive Friendship Made!");

    const user = _.find(this.state.users, (user) => {
      return user.id === current_user.sub
    })
    console.log(user);

    const friendship = _.find(user.friendships, (friendship) => {
      return friendship.friend_id === id
    })
    console.log(friendship);

  let CURRENT_URL = `https://earbuddies1.herokuapp.com/friendships/${friendship.id}.json`;


    axios({
      url: CURRENT_URL,
      method: 'delete',
      headers: {
        authorization: `Bearer ${token}`
      }
    }).then(res => console.log(res))
  }

  _handleDeleteFriendCurrentClick(id){
    console.log("No friendship found = Inactive Friendship Made!");

    const user = _.find(this.state.users, (user) => {
      return user.id === id
    })
    console.log(user);

    const friendship = _.find(user.friendships, (friendship) => {
      return friendship.friend_id === current_user.sub
    })
    console.log(friendship);

  let CURRENT_URL = `https://earbuddies1.herokuapp.com/friendships/${friendship.id}.json`;


    axios({
      url: CURRENT_URL,
      method: 'delete',
      headers: {
        authorization: `Bearer ${token}`
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
