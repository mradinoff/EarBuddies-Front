import React, {PureComponent as Component} from 'react';
import Concert from './Concert'

class Concerts extends Component{
  constructor(props){
    super(props);
    this.state = {
      name: [],
      concerts:[]
    }
  }

  _handleClick = (c) => {

    const concert = {
      pathname: `/events/${c.id}`,
      state: c,
    }
    this.props.history.push(concert)
  }

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
