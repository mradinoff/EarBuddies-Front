import React, {PureComponent as Component} from 'react';
import './Footer.css';


class Footer extends Component {


  footer = () => {
    return (
      <div>
        <footer>

          <div className="links">
            <p>Privacy Policy</p>
            <p>Contact</p>
            <p>Events</p>
            <p>Venues</p>
          </div>

          <div className="copyright">
            <p className="lightFont">Copyright © 2018 Earbuddies. All Rights Reserved.</p>
          </div>

          <div className="socials">
            <img height="20" width="20" src="https://unpkg.com/simple-icons@latest/icons/instagram.svg" />
            <img height="20" width="20" src="https://unpkg.com/simple-icons@latest/icons/facebook.svg" />
            <img height="20" width="20" src="https://unpkg.com/simple-icons@latest/icons/twitter.svg" />
          </div>
        </footer>
      </div>
    )
  }





  render(){
    return (
      <div>
        {this.footer()}
      </div>
    )

  }

}

export default Footer;
