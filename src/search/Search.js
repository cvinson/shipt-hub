import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import SearchIcon from 'material-ui/svg-icons/action/search';

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

  onChange = (event, text) => this.setState({ text });

  onClick = (event) => (this.state.text) && this.setState({ redirect: true });

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
        <FlatButton
          backgroundColor="#71b045"
          hoverColor="#000000"
          icon={<SearchIcon />}
          onClick={this.onClick}
          style={{ color: '#ffffff', marginLeft: '5px', minWidth: '40px' }} />
        {this.state.redirect &&
          <Redirect to={{ pathname: `/${this.state.text}`, state: { from: this.props.location } }} />
        }
      </div>
    )
  }
}
