import React, {PureComponent as Component} from 'react';
import axios from 'axios';

class Venue extends Component{
  constructor(props){
    super(props)
    this.state = {
      venue: this.props.location.state,
      events: this.props.location.state.events
    };
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
          <h2>{this.state.venue.name}</h2>
          <p>{this.state.venue.address}</p>
          <a href={this.state.venue.url}>Visit Website</a>
          {this.renderConcerts()}
      </div>

    );
  }
}
export default Venue
