import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import Routes from "./Routes";

const styles = {
    fontFamily: "sans-serif",
    textAlign: "center"
  };

const Root = () => (
    <div style={styles}>
      <Routes />
    </div>
  );

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
