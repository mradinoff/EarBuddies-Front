import React, {PureComponent as Component} from 'react';
import axios from 'axios';




class Concert extends Component{
    render (){
      console.log(this.props)
      console.log(this.props.events[1])
      console.log(this.props.event)
      let thisEvent = [];
      // for (let i = 0; i < this.props.events; i++){
      //   if(this.props.event === this.props.events[i].name){
      //     thisEvent.push(this.props.events[i])
      //   }
      // }
      console.log(thisEvent);
      return(
      <div>
      <p>{this.props.event}</p>
      </div>
    )}
  }
export default Concert
