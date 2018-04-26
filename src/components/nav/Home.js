import React, { PureComponent as Component } from "react";
import Footer from '../Footer/Footer'
import './Home.css';

class Home extends Component {
  render() {
    return (
      <div>
        <div id="home-container">
        <div id="home-hero">
        <div id="home-banner"></div>
          <h1>EarBuddies</h1>
          <h2>Find an event. Match with a buddy to go with.</h2>
        </div>

        </div>
        <Footer />
      </div>
    )
  }
}

export default Home;
