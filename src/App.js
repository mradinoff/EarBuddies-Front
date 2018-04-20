import React, { PureComponent as Component } from 'react';
import PopOver from './playground/PopOver';

class App extends Component {
  render() {
    return (
      <div>
        <h1>This is Home page</h1>
        <PopOver />
      </div>
    )
  }
}

export default App;
