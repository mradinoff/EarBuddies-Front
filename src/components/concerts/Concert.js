import React, { PureComponent as Component } from "react";
import axios from "axios";
import Attending from "../friendships/Attending.js";
import jwtDecoder from "jwt-decode";
import "./Concerts.css";
import Anime from 'react-anime';

let mapsLink = ""

// const token = localStorage.getItem('jwtToken');
// const current_user = jwtDecoder(token);

class Concert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      venue: '',
      concert: this.props.location.state,
      current_user: {},
      users: [],
      loading: false
    };
    this.findVenue = this.findVenue.bind(this);
    console.log(this.props.location.state);


    mapsLink += `https://maps.googleapis.com/maps/api/staticmap?center=${this.state.venue.latitude},+${this.state.venue.longitude}&zoom=14&scale=1&size=700x400&maptype=roadmap&key=AIzaSyCtM7U4yMBRlIwtoyOGu-AV36y7vCMk86c&format=png&visual_refresh=true&markers=size:med%7Ccolor:0xff0000%7Clabel:1%7C${this.state.venue.latitude},+${this.state.venue.longitude}`
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

  _venueClick = v => {
    const venue = {
      pathname: `/venues/${v.id}`,
      state: v
    };
    this.props.history.push(venue);
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
        console.log(venue);
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

  onJoinChatroom = () => {
    const location = {
      pathname: `/events/${this.state.concert.id}/chatroom`,
      state: this.state.concert
    };

    this.props.history.push(location);
  }



  render() {
    if (this.state.loading || this.state.venue[0] === undefined) {
      return <h2>Loading...</h2>;
    }
    return (
      <div>

        <div className="concertHeader">
          <div className="concertHeaderInner">
            <h1 className="concertH1">{this.state.concert.name}</h1>
          </div>
        </div>


        <div className="concertContainer">


        <div className="concertMain">
          <img className="concertImg" src={this.state.concert.image} alt={this.state.concert.name} />

          <section className="eventDetails">
            <h2>Details</h2>
            <p className="descriptionP">{this.state.concert.description}</p>
            <div className="dateLocation">
              <h5>DATE AND TIME</h5>
              <p>Fri. 25 May 2018</p>
              <p>9:00 am – 3:00 pm AEST</p>
              <p>{this.state.concert.date}</p>
              <div className="location">
                <h5>LOCATION</h5>
                <a
                  onClick={() => this._venueClick(this.state.venue[0])}
                  value={this.state.venue[0]}
                  href={`/venues/${this.state.venue[0].id}`}
                >
                  {this.state.venue[0].name}
                </a>
                <p>{this.state.venue[0].address}</p>
                <button className="attendingBtn" onClick={this.addUserToEventList}>Attending</button>
                <button className="attendingBtn" onClick={this.onJoinChatroom}>Join Chat</button>
                {/* <p>{this.state.concert.genre}</p> */}
              </div>
            </div>
          </section>




        </div>
      <section className="map">
        <h2>Map</h2>
        <img src= {mapsLink} alt={this.state.venue.name}/>
      </section>
          <div className="attendees">
            <Attending users={this.state.users} />
          </div>
          </div>
        </div>
    );
  }
}
export default Concert;
