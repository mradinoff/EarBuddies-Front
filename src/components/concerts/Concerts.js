import React, { PureComponent as Component } from "react";

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
    return this.props.concerts.map(concert => {
      return (
        <div className="card" style={{width: '18rem', margin: '10px'}} key={concert.id}>
          <img className="card-img-top" src={concert.image} alt={concert.name} />
          <div className="card-body">
            <h3 className="card-title">{concert.name}</h3>
            <h5 className="card-title">{concert.genre}</h5>
            <p className="card-text">{concert.description}</p>
            <a href={concert.ticket_url} className="btn btn-primary">Get Ticket</a>
          </div>
          <a href={`/concerts/${concert.id}`} className="card-text alert-link">See detail</a>
        </div>
      )
    })
  }

  render() {
    return (
      <div style={styles.main}>
        {this.renderConcerts()}
      </div>
    );
  }
}

export default Concerts;

const styles = {
  main: {
    width: '960px',
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContents: 'space-between'
  }
}
