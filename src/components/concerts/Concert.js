import React, {PureComponent as Component} from 'react';
import axios from 'axios';


class List extends Component{
  render(){
    return(
    <div>
      {this.props.concert.map(c => <li key={c.id}> {c.name}</li>)}
      {this.props.concert.map(c => <li key={c.id}> {c.description}</li>)}
      {this.props.concert.map(c => <li key={c.id}> {c.date}</li>)}
      {this.props.concert.map(c => <li key={c.id}> {c.genre}</li>)}
      {this.props.concert.map(c => <li key={c.id}> {c.ticket_url}</li>)}
      {this.props.concert.map(c => <img key={c.id} src={c.image} alt={c.name}/>)}
      {/* {this.state.venue.map (v => <li key={v.id}> {v.name}</li>)} */}
    </div>)
  }
}


class Concert extends Component{
  constructor(props){
    super(props)
    this.state = {venue: []}
    this.state = {concert: []}
  }
    render (){

      axios({
        method:'GET',
        url: `https://earbuddies1.herokuapp.com/events/${this.props.match.params.id}.json`,
        responseType: 'json',
      }).then(function(c){
        let concert = []
        concert.push(c.data)
        console.log(concert)
        this.setState({concert})}.bind(this))

        console.log(this.state.concert);
        if (this.state.concert.length === 0){return ""}
        axios({
          method:'GET',
          url: `https://earbuddies1.herokuapp.com/venues/${this.state.concert[0].venue_id}.json`,
          responseType: 'json',
        }).then(function(v){
          let venue = []
          venue.push(v.data)
          console.log(v.data)
          this.setState({venue})}.bind(this))

      return(
      <div>
        <List concert = {this.state.concert}
              venue = {this.state.venue}/>
      </div>
    )}
  }
export default Concert
