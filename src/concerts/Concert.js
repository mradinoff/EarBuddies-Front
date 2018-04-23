import React, {PureComponent as Component} from 'react';
import axios from 'axios';


class Concert extends Component{
  constructor(props){
    super(props)
    this.state = {venue: []}
  }
    render (){
      if (this.props.events.length === 0){return ""}
      console.log(this)

      console.log(this.props.events[1].name)


      console.log(this.props.event)
      let thisEvent = [];
      for (let i = 0; i < this.props.events.length; i++){
        if(this.props.event === this.props.events[i].name){
          thisEvent.push(this.props.events[i])
        }
      }
      console.log(thisEvent);
      if (thisEvent.length === 0){return ""}
      axios({
        method:'GET',
        url: `https://earbuddies1.herokuapp.com/venues/${thisEvent[0].venue_id}.json`,
        responseType: 'json',
      }).then(function(v){
        let venue = []
        venue.push(v.data)
        console.log(v.data)
        this.setState({venue})}.bind(this))

      return(
      <div>
        {thisEvent.map(c => <li key={c.id}> {c.name}</li>)}
        {thisEvent.map(c => <li key={c.id}> {c.description}</li>)}
        {thisEvent.map(c => <li key={c.id}> {c.date}</li>)}
        {thisEvent.map(c => <li key={c.id}> {c.genre}</li>)}
        {thisEvent.map(c => <li key={c.id}> {c.ticket_url}</li>)}
        {thisEvent.map(c => <img key={c.id} src={c.image} alt={c.name}/>)}
        {this.state.venue.map (v => <li key={v.id}> {v.name}</li>)}
      </div>
    )}
  }
export default Concert
