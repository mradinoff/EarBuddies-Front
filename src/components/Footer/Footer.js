import React, {PureComponent as Component} from 'react';
import './Footer.css';
import { Link } from "react-router-dom";


class Footer extends Component {


  footer = () => {
    return (
      <div>
        <footer>

          <div className="links">
            <p>Privacy Policy</p>
            <a href="https://github.com/mradinoff/EarBuddies-Front" target="_blank" className ="footerLink">Contact</a>
            <Link to = "/events" className ="footerLink">Events</Link>
            <Link to = '/venues' className="footerLink">Venues</Link>
          </div>

          <div className="copyright">
            <p className="lightFont">Copyright © 2018 Earbuddies. All Rights Reserved.</p>
          </div>

          <div className="socials">
            <img height="20" width="20" src="https://unpkg.com/simple-icons@latest/icons/instagram.svg" />
            <img height="20" width="20" src="https://unpkg.com/simple-icons@latest/icons/facebook.svg" />
            <img height="20" width="20" src="https://unpkg.com/simple-icons@latest/icons/twitter.svg" />
          </div>
          <div>
          <p className="footer-small">'Project 2' for General Assembly Sydney's Web Development Immersive 26 <br />by <a href="https://github.com/mradinoff/EarBuddies-Front" target="_blank" className ="footerLink">Ryan Liu, Mac Radinoff, Joseph Ocampo, and Taryn Ewens</a>.</p>
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
