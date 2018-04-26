import React, { PureComponent as Component } from "react";
import axios from "axios";
import jwtDecoder from "jwt-decode";
import _ from 'lodash';

const EVENT_URL = "https://earbuddies1.herokuapp.com/events.json";
const USERS_URL = 'https://earbuddies1.herokuapp.com/users.json';
const FRIENDSHIPS_URL = 'https://earbuddies1.herokuapp.com/friendships.json';

const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MjQ3MTY3NTksInN1YiI6MTEsImVtYWlsIjoicnlhbkB1c2VyLmNvbSIsImFkbWluIjpudWxsfQ.0nyEL0lQtd0gr2JeLtT8K_TR860i5EYHBLNVzDVcfF8";
const current_user = jwtDecoder(token);

class Attending extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: props.users,
      friendships: [],
      current_user: {}
    }
    this._handlePatchClick = this._handlePatchClick.bind(this);
    this._handlePostClick = this._handlePostClick.bind(this);
  }

  componentDidMount = () => {
    this.fetchFriendships();
    this.fetchUser();
  }

  fetchUser = () => {
    console.log(this.state.users);
    console.log(`https://earbuddies1.herokuapp.com/users/${current_user.sub}.json`);
    axios({
      url: `https://earbuddies1.herokuapp.com/users/${current_user.sub}.json`,
      method: 'get',
      headers: {
        authorization: `Bearer ${token}`
      }
    })
      .then(res => this.setState({current_user: res.data}))
  }


  fetchFriendships = () => { // Fat arrow functions do not break the connection to this
    console.log(token);
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
            return (<button className="attendingBtn" onClick={() => this._handlePatchClick(id)}>Like EarBuddy!</button>)

          } if (this.state.friendships[i].friend_id === current_user.sub && this.state.friendships[i].user_id === id && this.state.friendships[i].active === true) {
            console.log("Match found - friend id is current user");
            return (<button className="attendingBtn" onClick={() => this._handleDeleteFriendCurrentClick(id)}>EarBuddies! Disconnect Buddy?</button>)

          } if (this.state.friendships[i].friend_id === id && this.state.friendships[i].user_id === current_user.sub && this.state.friendships[i].active === true) {
            console.log("Match found - user id is current user");
            return (<button className="attendingBtn" onClick={() => this._handleDeleteUserCurrentClick(id)}>EarBuddies! Disconnect Buddy?</button>)

          } if (this.state.friendships[i].friend_id === id && this.state.friendships[i].user_id === current_user.sub && this.state.friendships[i].active === false) {
            console.log("Pending found");
            return (<button className="attendingBtn" onClick={() => this._handleDeleteUserCurrentClick(id)}>Dislike EarBuddy</button>)

          } if (current_user.sub === id){
            return (<button className="attendingBtn">The best EarBuddy!</button>)
            console.log("User")
          }
        }

    } if (this.state.friendships.length < 1 && current_user.sub === id){
      console.log("User")
      return (<button className="attendingBtn">The best EarBuddy!</button>)

    }
    else {
      console.log("patchClick");
      return (<button className="attendingBtn" onClick={() => this._handlePostClick(id)}>Like EarBuddy!</button>)
    }
    }


  _handlePatchClick(id){
    console.log("Friendship Found - Active Match made!");

    const user = _.find(this.state.users, (user) => {
      return user.id === id
    })
console.log(user);
    const friendship = _.find(this.state.current_user.friendships, (friendship) => {
      return friendship.friend_id === current_user.sub
    })
console.log(friendship);
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
    console.log("Inactive friendship found - Cancel Request");

    const user = _.find(this.state.users, (user) => {
      return user.id === current_user.sub
    })
    console.log(user);

    const friendship = _.find(this.state.current_user.friendships, (friendship) => {
      return friendship.friend_id === id
    })
    console.log(id);
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
    console.log("Active friendship found - Delete friendship");

    const user = _.find(this.state.users, (user) => {
      return user.id === id
    })
    console.log(user);

    const friendship = _.find(this.state.user.friendships, (friendship) => {
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
        <h2>Attending</h2>
        <div className="gallery">

            { this.state.users.map( u =>
              <div className="crd crd-user" key={u.id}>
                <img className="cardimg" src={u.avatar.thumb.url} alt={u.name}/>
                <div className="cardBody">
                  <h5 className="cardHeading">{u.name}</h5>
                  <p className="genreHeading">From {u.hometown}</p>
                  <div className="cardDesc">
                    <p className="">{u.bio}</p>
                  </div>
                  <p className=""><strong>Interested in:</strong> {u.interests}</p>
                  {this.renderButton(u.id)}
                </div>
              </div>
            )}

        </div>
      </div>
    )
  }
  }

export default Attending;
