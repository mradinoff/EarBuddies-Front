import React, {PureComponent as Component} from 'react';
import icon from '../images/venue-page.png'
import { Link } from "react-router-dom";
import Footer from "../Footer/Footer";
let mapsLink = ""


class Venue extends Component{
  constructor(props){
    super(props)
    this.state = {
      venue: this.props.location.state,
      events: this.props.location.state.events
    };
    mapsLink += `https://maps.googleapis.com/maps/api/staticmap?center=${this.state.venue.latitude},+${this.state.venue.longitude}&zoom=14&scale=1&size=600x300&maptype=roadmap&key=AIzaSyCtM7U4yMBRlIwtoyOGu-AV36y7vCMk86c&format=png&visual_refresh=true&markers=size:mid%7Ccolor:0xff0000%7Clabel:%7C${this.state.venue.latitude},+${this.state.venue.longitude}`

  }


  _handleClick = c => {
    const concert = {
      pathname: `/events/${c.id}`,
      state: c
    };
    this.props.history.push(concert);
  };

  renderConcerts = () => {
    return this.state.events.map(concert => {
      return (
        <div className="crd" key={concert.id}>
          <img className="cardimg" src={concert.image} alt={concert.name} onClick = {() => this._handleClick(concert)} />
          <div className="cardBody">
            <p className="genreHeading">{concert.genre}</p>
            <h5 className="cardHeading">{concert.name}</h5>
            <div className="cardDesc">
              <p className="">{concert.description}</p>
            </div>
          </div>
          <a onClick = {() => this._handleClick(concert)} value ={concert} href={`/events/${concert.id}`} className="seeDetails">See detail</a>
        </div>
      )
    })
  }




  render() {
    return (
      <div>
        <div className="venueHero">

        </div>
          <div className="venueDetails">
            <h2>{this.state.venue.name}</h2>
            <p>{this.state.venue.address}</p>
            <a href={this.state.venue.url}>Visit Website</a>
          </div>
            <img src= {mapsLink} alt={this.state.venue.name}/>
          <div className="venueEvents">
            <h1>Events</h1>
            {this.renderConcerts()}
          </div>
          <Link to="/" className="icon-link">
            <img src={icon} alt="link to home"/>
          </Link>
          <Footer />
      </div>

    );
  }
}
export default Venue
