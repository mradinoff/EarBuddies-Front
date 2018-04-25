import React, { PureComponent as Component } from "react";
import Search from "../Search/Search";
import _ from "lodash";

class Hero extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: "-33.871478599999996",
      lon: "151.20472279999998",
      // lat: null,
      // lon: null,
      events: [],
      genres: [],
      loading: false,
      watchID: "",
      user: {},
      token: null
    };
  }



  render() {
    return (
      <div className="hero">

        <form className="form fullWhite" onSubmit={this._handleSubmit}>
          <svg className="test" viewBox="0 0 24 24" role="presentation" aria-hidden="true" focusable="false"><path d="m10.4 18.2c-4.2-.6-7.2-4.5-6.6-8.8.6-4.2 4.5-7.2 8.8-6.6 4.2.6 7.2 4.5 6.6 8.8-.6 4.2-4.6 7.2-8.8 6.6m12.6 3.8-5-5c1.4-1.4 2.3-3.1 2.6-5.2.7-5.1-2.8-9.7-7.8-10.5-5-.7-9.7 2.8-10.5 7.9-.7 5.1 2.8 9.7 7.8 10.5 2.5.4 4.9-.3 6.7-1.7v.1l5 5c .3.3.8.3 1.1 0s .4-.8.1-1.1" fill-rule="evenodd"></path></svg>
          {/* <label>name</label> */}
          <input className="searchInput"
          type="text"
          onChange={this.handleInputChange}
          value={this.state.name}
          />
          <input
          type="submit"
          className="btn btn-outline-info searchButton"
          />
        </form>
      </div>
    );
  }
}

export default Hero;
