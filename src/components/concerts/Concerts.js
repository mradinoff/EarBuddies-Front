import React, {PureComponent as Component} from 'react';
import axios from 'axios';
import Concert from './Concert'

class ConcertList extends Component{
  constructor(props){
    super(props)
    this.state = {name: ''};
    //this._handleClick = this._handleClick.bind(this);
  }


  // _handleClick(e){
  //   e.preventDefault();
  //   console.log(e.target)
  //   //this.state = {name: e.target.text}
  //   // this.state.Origin, this.state.Destination
  //   // this.props.eventClick(this.state.name);
  //   // this.setState({Origin: ''})
  //   // this.setState({Destination: ''})
  // }

  render (props){
    <Concerts name = {this.props.name}/>
    return(
      <div>
        <ul>
          { this.props.concerts.map(c => <li key={c.id}> <a href= "#" onClick = {this._handleClick} value ={c}>{c.name}</a>, {c.date}, {c.genre}, <img src="{c.image}" alt= {c.name}/>
         </li>) }
        </ul>
      </div>
    )
  }
}


class Concerts extends Component{
  constructor(props){
    super(props);
    this.state = {name: []}
    this.state = {concerts: []}
    this.listConcerts = this.listConcerts.bind(this);
    console.log(this);
  }
  onEventClick(event){
    this.setState({
      name: event
    });
  }

  listConcerts(){
    axios({
      method:'GET',
      url: `https://earbuddies1.herokuapp.com/events.json`,
      responseType: 'json',

    }).then(function(c){
      let concerts = [];
      for (let i =0; i< c.data.length-1; i++){
        concerts.push(c.data[i]);
      }
      this.setState({concerts})}.bind(this))
  }
  componentDidMount= this.listConcerts
  render(){
    return(
      <div>
        <h1>Concerts</h1>
        <ConcertList
          concerts={this.state.concerts}
          eventClick = {this.onEventClick.bind(this)}/>
        <Concert event = {this.state.name}
              events = {this.state.concerts}/>
      </div>
    );
  }
}


export default Concerts
