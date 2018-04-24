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

  handleInputChange = (e) => {
    this.setState({
      name: e.target.value
    })
  }

  _handleSubmit = e => {
    e.preventDefault();
    console.log(e.target[0].value)
    this.props.onSubmit("name", e.target[0].value);
    this.setState({
      name:""
    });
  };

  renderOptions = () => {
    console.log("genres in Search: ", this.props.genres)
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
      <div>
        <Select
          id="genre"
          name="form-field-name"
          value={this.state.selectedOption}
          onChange={this.handleChange}
          options={this.state.options}
        />
        <form className="form" onSubmit={this._handleSubmit}>
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
        </form>
      </div>
    );
  }
}

export default Search;
