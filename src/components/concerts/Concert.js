import React, { PureComponent as Component } from "react";
import axios from "axios";
import Attending from "../friendships/Attending.js";
import jwtDecoder from "jwt-decode";
import "./Concerts.css";
import CircularProgress from "material-ui/CircularProgress";
import moment from "moment";

let mapsLink = "";
let user_name = "";

class AttendingButton extends Component {
  render() {
    console.log(this.props.user.sub === undefined);
    let check = 0;
    for (let i = 0; i < this.props.attending.length; i++) {
      if (
        this.props.user.sub === this.props.attending[i].id &&
        this.props.user.sub > 0
      ) {
        check++;
        user_name = this.props.attending[i].name;
      }
    }
    if (this.props.user.sub === undefined) {
      return "";
    }
    // else if (check > 0) {
    //   return (
    //     <button
    //       className="attendingBtn"
    //       onClick={() => this.props.chatJoin(user_name)}
    //       value={this.props.users}
    //     >
    //       Join Chat
    //     </button>
    //   );
    // }
    else {
      return (
        <div>
          <button
            className="attendingBtn"
            onClick={this.props.attendingFunction}
          >
            Attending
          </button>
          <button className="attendingBtn" id="opaque">
            Join Chat
          </button>
        </div>
      );
    }
  }
}

class Concert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      venue: "",
      concert: this.props.location.state,
      current_user: {},
      users: [],
      loading: false,
      isAttending: false
    };
    this.findVenue = this.findVenue.bind(this);
    console.log(this.props);

    mapsLink += `https://maps.googleapis.com/maps/api/staticmap?center=${
      this.state.venue.latitude
    },+${
      this.state.venue.longitude
    }&zoom=14&scale=1&size=700x400&maptype=roadmap&key=AIzaSyCtM7U4yMBRlIwtoyOGu-AV36y7vCMk86c&format=png&visual_refresh=true&markers=size:med%7Ccolor:0xff0000%7Clabel:1%7C${
      this.state.venue.latitude
    },+${this.state.venue.longitude}`;
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
        this.setState({ loading: false });
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
        this.setState({
          isAttending: true
        });
      })
      .catch(error => {
        console.log(error.response);
        this.setState({
          isAttending: true
        });
      });
  };

  onJoinChatroom = () => {

    const location = {
      pathname: `/events/${this.state.concert.id}/chatroom`,
      state: this.state.concert,
    };

    this.props.history.push(location);
  };

  render() {
    console.log(mapsLink);
    if (this.state.loading || this.state.venue[0] === undefined) {
      return <CircularProgress size={60} thickness={7} />;
    }
    return (
      <div>
        <div className="concertHeader">
          <div className="concertHeaderInner">
            <h1 className="concertH1">{this.state.concert.name}</h1>
          </div>
        </div>

        <div className="concertContainer">
<<<<<<< HEAD


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
                <AttendingButton user={this.state.current_user} attending={this.state.users} attendingFunction={this.addUserToEventList} chatJoin={this.onJoinChatroom}/>
                {/* <p>{this.state.concert.genre}</p> */}
=======
          <div className="concertMain">
            <img
              className="concertImg"
              src={this.state.concert.image}
              alt={this.state.concert.name}
            />

            <section className="eventDetails">
              <h2>Details</h2>
              <p className="descriptionP">{this.state.concert.description}</p>
              <div className="dateLocation">
                <h5>DATE AND TIME</h5>
                <p>
                  {moment(this.state.concert.date).format(
                    "dddd, MMMM Do YYYY, h:mm:ss a"
                  )}
                </p>
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

                  {!this.state.isAttending && (
                    <button
                    className="attendingBtn"
                    onClick={this.addUserToEventList}
                  >
                    Attending
                  </button>
                  )}
                  {this.state.isAttending && (
                    <button
                    className="attendingBtn"
                    onClick={this.onJoinChatroom}
                  >
                    Join Chat
                  </button>
                  )}
                </div>
>>>>>>> d303acd0a917023b389cc0f44c1f3b301c807484
              </div>
            </section>
          </div>
          <section className="map">
            <h2>Map</h2>
            <img src={mapsLink} alt={this.state.venue.name} />
          </section>
          {window.localStorage.jwtToken ? (
            <div className="attendees">
              <Attending users={this.state.users} token={this.props.token} />
            </div>
          ) : (
            <div />
          )}
        </div>
      </div>
    );
  }
}
export default Concert;
