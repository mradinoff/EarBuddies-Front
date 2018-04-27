import React, { PureComponent as Component } from "react";
import Select from "react-select";
import "react-select/dist/react-select.css";


class Search extends Component {
  state = {
    selectedOption: "",
    options: [],
    name: ""
  };

  componentDidMount = () => {
    this.renderOptions();
  };

  handleChange = selectedOption => {
    this.setState({ selectedOption });
    this.props.onSubmit("genre", selectedOption.label);
    console.log(`Selected: ${selectedOption.label}`);
  };

  handleInputChange = e => {
    this.setState({
      name: e.target.value
    });
  };

  _handleSubmit = e => {
    e.preventDefault();
    console.log(e.target[0].value);
    console.log(window)
    if(e.target[0].value === ""){
      window.location.reload(false);
    }
    this.props.onSubmit("name", e.target[0].value);
    this.setState({
      name: ""
    });
  };

  renderOptions = () => {
    console.log("genres in Search: ", this.props.genres);
    const options = this.props.genres.map(genre => {
      return {
        value: genre,
        label: genre
      };
    });

    this.setState({
      options
    });
  };

  render() {
    return (
      <div className="hero">
        {/* <form className="form" onSubmit={this._handleSubmit}>
          <label>Name:</label>
          <input
          type="text"
          onChange={this.handleInputChange}
          value={this.state.name}
          />
          <input
          type="submit"
          className="btn btn-outline-info"
          />
        </form> */}
        <div className="searchBar">
          <form className="form fullWhite" onSubmit={this._handleSubmit}>
            <svg
              className="test"
              viewBox="0 0 24 24"
              role="presentation"
              aria-hidden="true"
              focusable="false"
            >
              <path
                d="m10.4 18.2c-4.2-.6-7.2-4.5-6.6-8.8.6-4.2 4.5-7.2 8.8-6.6 4.2.6 7.2 4.5 6.6 8.8-.6 4.2-4.6 7.2-8.8 6.6m12.6 3.8-5-5c1.4-1.4 2.3-3.1 2.6-5.2.7-5.1-2.8-9.7-7.8-10.5-5-.7-9.7 2.8-10.5 7.9-.7 5.1 2.8 9.7 7.8 10.5 2.5.4 4.9-.3 6.7-1.7v.1l5 5c .3.3.8.3 1.1 0s .4-.8.1-1.1"
                fillRule="evenodd"
              />
            </svg>
            {/* <label>name</label> */}
            <input
              className="searchInput"
              type="text"
              onChange={this.handleInputChange}
              value={this.state.name}
            />
            <input type="submit" className="btn btn-outline-info searchButton" />
          </form>
        </div>
        <div>
          <Select
            className="genreDropDown"
            id="genre"
            name="form-field-name"
            value={this.state.selectedOption}
            onChange={this.handleChange}
            options={this.state.options}
          />
        </div>
      </div>
    );
  }
}

export default Search;
