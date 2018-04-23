import React, {PureComponent as Component} from 'react';
import axios from 'axios';




class Concert extends Component{
    render (){
      if (this.props.events.length === 0){return ""}
      console.log(this.props)

      console.log(this.props.events[1].name)


      console.log(this.props.event)
      let thisEvent = [];
      for (let i = 0; i < this.props.events.length; i++){
        if(this.props.event === this.props.events[i].name){
          thisEvent.push(this.props.events[i])
        }
      }
      console.log(thisEvent);
      return(
      <div>
        {thisEvent.map(c => <li key={c.id}> {c.name}</li>)}
        {thisEvent.map(c => <li key={c.id}> {c.description}</li>)}
        {thisEvent.map(c => <li key={c.id}> {c.date}</li>)}
        {thisEvent.map(c => <li key={c.id}> {c.genre}</li>)}
        {thisEvent.map(c => <li key={c.id}> {c.ticket_url}</li>)}
        {thisEvent.map(c => <img key={c.id} src={c.image} alt={c.name}/>)}
      </div>
    )}
  }
export default Concert
