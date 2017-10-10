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

    if (this.props.username !== nextProps.username) {
      this.setState({ text: nextProps.username });
    }
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
          hintText="Search for a Github user"
          id="search-text"
          onChange={this.onChange}
          onKeyPress={this.onKeyPress}
          value={this.state.text} />
        {this.state.redirect &&
          <Redirect to={{ pathname: `/${this.state.text}`, state: { from: this.props.location } }} />
        }
      </div>
    )
  }
}
