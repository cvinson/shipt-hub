import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import TextField from 'material-ui/TextField';

export default class Search extends React.Component {
  static props = {
    username: PropTypes.string
  }

  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      text: ''
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ redirect: false });
  }

  onChange = (event, text) => {
    this.setState({ text });
  }

  onKeyPress = (event) => {
    if (event.key === 'Enter' && this.state.text) {
      this.setState({ redirect: true });
    }
  }

  render() {
    return (
      <div>
        <TextField
          defaultValue={this.props.username}
          hintText="Search for a Github user"
          id="search-text"
          onChange={this.onChange}
          onKeyPress={this.onKeyPress} />
        {this.state.redirect &&
          <Redirect to={{ pathname: `/${this.state.text}`, state: { from: this.props.location } }} />
        }
      </div>
    )
  }
}
