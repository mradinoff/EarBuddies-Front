import React, {PureComponent as Component} from 'react';
import axios from 'axios';
import Concert from './Concert'


class Concerts extends Component{
  constructor(props){
    super(props);
    this.state = {
      name: [],
      concerts:[]
    }
    //this.state = {concerts: []}
    // this.listConcerts = this.listConcerts.bind(this);
    //this.state._handleClick = this._handleClick.bind(this);
    console.log(this);
  }

  _handleClick = (c) => {

    // this.props.eventClick(this.state.name);
    const concert = {
      pathname: `/events/${c.id}`,
      state: c,
    }
    this.props.history.push(concert)
  }



  // listConcerts(){
  //   axios({
  //     method:'GET',
  //     url: `https://earbuddies1.herokuapp.com/events.json`,
  //     responseType: 'json',
  //
  //   }).then(function(c){
  //     let concerts = [];
  //     for (let i =0; i< c.data.length-1; i++){
  //       concerts.push(c.data[i]);
  //     }
  //     this.setState({concerts})}.bind(this))
  // }
  // componentDidMount= this.listConcerts
  render(){
    console.log(this.props)
    return(
      <div>
        <h1>Concerts</h1>
          <ul>
            { this.props.concerts.map(c => <li key={c.id}> <a href= "#" onClick = {() => this._handleClick(c)} value ={c}>{c.name}</a>, {c.date}, {c.genre}, <img src="{c.image}" alt= {c.name}/></li>) }
          </ul>
      </div>
    );
  }
}


export default Concerts
