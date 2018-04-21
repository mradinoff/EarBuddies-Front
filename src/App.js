import React, { PureComponent as Component } from 'react';
import PopOver from './playground/PopOver';
import Swipe from './friendships/Swipe'

class App extends Component {
  render() {
    return (
      <div>
        <h1>This is Home page</h1>
        <PopOver />
        <Swipe />
      </div>
    )
  }
}

export default App;
