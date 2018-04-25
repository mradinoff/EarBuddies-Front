import React, { PureComponent as Component } from "react";
import axios from "axios";
import Attending from "../friendships/Attending.js";
import jwtDecoder from "jwt-decode";

// const token = localStorage.getItem('jwtToken');
// const current_user = jwtDecoder(token);

class Concert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      venue: [],
      concert: this.props.location.state,
      current_user: {},
      users: [],
      loading: false
    };
    this.findVenue = this.findVenue.bind(this);
  }

  componentDidMount = () => {
    this.findVenue();
    this.findUsers();
    const token = localStorage.getItem("jwtToken");
    if (token) {
      const user = jwtDecoder(token);
      this.setState({
        current_user: user
      });
    }
  };

  findVenue(state) {
    axios({
      method: "GET",
      url: `https://earbuddies1.herokuapp.com/venues/${
        this.state.concert.venue_id
      }.json`,
      responseType: "json"
    }).then(
      function(v) {
        console.log(v);
        let venue = [];
        venue.push(v.data);
        this.setState({ venue });
      }.bind(this)
    );
  }

  findUsers = async () => {
    await this.setState({
      loading: true
    });

    axios({
      method: "GET",
      url: `https://earbuddies1.herokuapp.com/events/${
        this.state.concert.id
      }.json`,
      responseType: "json"
    })
      .then(
        function(res) {
          console.log(res);
          this.setState({ current_concert: res });
        }.bind(this)
      )
      .then(() =>
        this.setState({ users: this.state.current_concert.data.users })
      )
      .then(() => {
        this.setState({ loading: false })
        console.log(this.state.users)
      });
  };

  deleteUserFromEvent = () => {
    console.log(this.state.current_user.sub);
    console.log(parseInt(this.props.match.params.id, 10));
    axios({
      url: ``,
      method: "delete",
      data: {
        user_id: this.state.current_user.sub,
        event_id: parseInt(this.props.match.params.id, 10)
      }
    })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error.response);
      });
  };

  addUserToEventList = () => {
    console.log(this.state.current_user.sub);
    console.log(parseInt(this.props.match.params.id, 10));
    axios({
      url: "https://earbuddies1.herokuapp.com/events_users.json",
      method: "post",
      data: {
        events_user: {
          user_id: this.state.current_user.sub,
          event_id: parseInt(this.props.match.params.id, 10)
        }
      }
    })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error.response);
      });
  };
  render() {
    console.log(this.state.venue);
    if (this.state.loading) {
      return <h2>Loading...</h2>;
    }
    return (
      <div>
        <img src={this.state.concert.image} alt={this.state.concert.name} />
        <h2>{this.state.concert.name}</h2>
        <p>{this.state.concert.description}</p>
        <p>{this.state.concert.date}</p>
        <a
          onClick={() => this._venueClick(this.state.venue)}
          value={this.state.venue}
          href={`/venues/${this.state.venue.id}`}
        >
          {" "}
          {this.state.venue.name}
        </a>
        <p>{this.state.concert.genre}</p>
        <button onClick={this.addUserToEventList}>attending</button>
        <button onClick={this.deleteUserFromEvent}>not attending</button>
        <Attending users={this.state.users} token={this.props.token}/>  
      </div>
    );
  }
}
export default Concert;
