import React, { PureComponent as Component } from "react";
import axios from "axios";
import jwtDecoder from "jwt-decode";
import _ from "lodash";
import "./Profile.css";
import { Link } from "react-router-dom";
import Footer from "../Footer/Footer";
import CircularProgress from "material-ui/CircularProgress";
import icon from '../images/profile.png'
import moment from "moment";

class Friends extends Component {
  render() {
    console.log(_.flatten(this.props.friends));
    let flatten = _.flatten(this.props.friends);
    if (this.props.friends.length === 0) {
      return (
        <div>
          <p>You have 0 Earbuddies, Go to an Event Page and start Matching!</p>
        </div>
      );
    } else {
      return <div>{flatten.map(f => <p key={f.id}>{f.name} from {f.hometown}</p>)}</div>;
    }
  }
}

class Events extends Component {
  render() {
    if (this.props.user.events.length === 0) {
      return (
        <div>
          <p>
            You have 0 Events lined up, Go to the Search Page and Find an Event!
          </p>
        </div>
      );
    } else {
      return (
        <div>
            { this.props.user.events.map( e => {
              const event = {
                pathname: `/events/${e.id}`,
                state: e
              }
              return (
                <div key={e.id}>
                  <Link to={event}><h5>{e.name} - {moment(e.date).format(
                    "dddd, MMMM Do YYYY, h:mm:ss a"
                  )}</h5></Link>
                  <img className="profileEventImg" src={e.image} alt=""/>
                  <p>
                    <Link to={event}>See Event</Link>
                  </p>
                </div>
              )
            }

            )}
        </div>
      );
    }
  }
}

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      friendships: [],
      matched: [],
      all_users: [],
      friends: []
    };
  }

  componentDidMount = async () => {
    await this.fetchUser();
    await this.fetchUsers();
    //await this.findMatches();
  };

  fetchUser = () => {
    // Fat arrow functions do not break the connection to this

    const user = jwtDecoder(this.props.token);

    axios({
      url: `https://earbuddies1.herokuapp.com/users/${user.sub}.json`,
      method: "get",
      headers: {
        authorization: `Bearer {this.props.token}`
      }
    })
      .then(res => this.setState({ user: res.data }))
      .then(() => this.fetchFriendships());
  };

  fetchUsers = () => {
    // Fat arrow functions do not break the connection to this
    axios({
      url: `https://earbuddies1.herokuapp.com/users.json`,
      method: "get",
      headers: {
        authorization: `Bearer ${this.props.token}`
      }
    }).then(res => this.setState({ all_users: res.data }));
  };

  fetchFriendships = () => {
    // Fat arrow functions do not break the connection to this

    axios({
      url: `https://earbuddies1.herokuapp.com/friendships.json`,
      method: "get",
      headers: {
        authorization: `Bearer ${this.props.token}`
      }
    })
      .then(res => this.setState({ friendships: res.data }))
      .then(() => this.findMatches());
  };

  findMatches = async () => {
    const user = _.filter(this.state.friendships, user => {
      return user.user_id === this.state.user.id && user.active === true;
    });
    const other = _.filter(this.state.friendships, user => {
      return user.friend_id === this.state.user.id && user.active === true;
    });
    await this.setState({ matched: [...user, ...other] });

    let array = this.state.matched.map(m => {
      if (m.user_id === this.state.user.id) {
        return _.filter(this.state.all_users, { id: m.friend_id });
      }
      if (m.friend_id === this.state.user.id) {
        return _.filter(this.state.all_users, { id: m.user_id });
      }
    });
    console.log(array);
    this.setState({ friends: array });
  };

  render() {
    if (!this.state.user) {
      return <CircularProgress size={60} thickness={7} />;
    }
    return (
      <div className="profile" key={this.state.user.id}>
        <div className="venuesHeader"></div>

        <div className="profileWrapper">
          <section className="profileContainerLeft">
            <img
              className="dp"
              src={this.state.user.avatar.url}
              alt={this.state.user.name}
            />
            <div className="leftInner">
              <h2>{this.state.user.name}</h2>
              <Link to="/editprofile">
                <button>Edit Profile</button>
              </Link>
            </div>
          </section>
          <section className="profileRight">
            <p><strong>Hometown:</strong> {this.state.user.hometown}</p>
            <p>{this.state.user.bio}</p>
            <p><strong>Interests:</strong> {this.state.user.interests}</p>
            <hr />
            <p><strong>{this.state.matched.length} Buddies </strong></p>
            <Friends matched={this.state.matched} users={this.state.all_users} friends={this.state.friends}/>
            <hr />
            <p style={{marginBottom: '1em'}}><strong>{this.state.user.events.length} Events</strong></p>
            <Events user={this.state.user}/>
          </section>
        </div>
        <Link to="/" className="icon-link">
          <img src={icon} alt="link to home"/>
        </Link>
       <Footer />
      </div>
    );
  }
}

export default Profile;
