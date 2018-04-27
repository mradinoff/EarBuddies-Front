import React, { PureComponent as Component } from "react";
import moment from "moment";
import icon from '../images/events.png'
import { Link } from "react-router-dom";

class Concerts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: [],
      concerts: []
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
    console.log(this.state)
    return this.props.concerts.map(concert => {
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
      <div className="gallery">
        {this.renderConcerts()}
      </div>
      <Link to="/" className="icon-link">
        <img src={icon} alt="link to home"/>
      </Link>
      </div>
    );
  }
}

export default Concerts;
