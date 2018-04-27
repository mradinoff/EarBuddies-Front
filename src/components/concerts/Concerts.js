import React, { PureComponent as Component } from "react";
import moment from "moment";


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
            {/* <a href={concert.ticket_url} className="btn btn-primary">Get Ticket</a> */}
          </div>
          <a onClick = {() => this._handleClick(concert)} value ={concert} href={`/events/${concert.id}`} className="seeDetails">See detail</a>
        </div>
        // {/* <div className="card" style={{width: '20rem', margin: '10px'}} key={concert.id}>
        //   <img className="card-img-top" src={concert.image} alt={concert.name} />
        //   <div className="card-body">
        //     <h3 className="card-title">{concert.name}</h3>
        //     <h5 className="card-title">{concert.genre}</h5>
        //     <p className="card-text">{concert.description}</p>
        //     {/* <a href={concert.ticket_url} className="btn btn-primary">Get Ticket</a> */}
        //   </div>
        //   <a onClick = {() => this._handleClick(concert)} value ={concert} href={`/events/${concert.id}`} className="card-text alert-link">See detail</a>
        // </div> */}
      )
    })
  }

  render() {
    return (
      <div className="gallery">
        {this.renderConcerts()}
      </div>
    );
  }
}

export default Concerts;
