import React, { PureComponent as Component } from "react";
import Select from "react-select";
import "react-select/dist/react-select.css";

class Search extends Component {
  state = {
    selectedOption: "",
    options: []
  };

  componentDidMount = () => {
      this.renderOptions();
  }

  handleChange = selectedOption => {
    this.setState({ selectedOption });
    this.props.onSubmit("genre", selectedOption.label)
    console.log(`Selected: ${selectedOption.label}`);
  };

  renderOptions = () => {
    const options = this.props.genres.map(genre => {
      return (
        {
            value: genre,
            label: genre
        }
      );
    });

    this.setState({
        options
    });
  };

  render() {
    console.log(this.props.genres);
    return (
      <Select
        id="genre"
        name="form-field-name"
        value={this.state.selectedOption}
        onChange={this.handleChange}
        options={this.state.options}
      />
    );
  }
}

export default Search;
