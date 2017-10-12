import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CircularProgress from 'material-ui/CircularProgress';
import Paper from 'material-ui/Paper';
import ProfileError from './ProfileError';
import Followers from '../followers/Followers';
import Search from '../search/Search';
import User from '../user/User';

const PAGE_SIZE = 30;

class Profile extends Component {
  static propTypes = {
    getUser: PropTypes.func.isRequired,
    getUserFollowers: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    username: PropTypes.string.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      followers: null,
      user: null
    };
  }

  fetchUserData = async (username) => {
    try {
      this.setState({
        error: null,
        followers: await this.props.getUserFollowers(username),
        user: await this.props.getUser(username)
      });
    } catch (err) {
      switch (err.message) {
        case '403':
          this.setState({ error: 'rateLimit', followers: null, user: null });
          break;
        default:
          this.setState({ error: 'notFound', followers: null, user: null });
      }
    }
  }

  componentDidMount() {
    return this.fetchUserData(this.props.username);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.username !== nextProps.username) {
      this.fetchUserData(nextProps.username);
    }
  }

  loadMoreFollowers = async ({ startIndex, stopIndex }) => {
    const nextPage = Math.ceil(this.state.followers.length / PAGE_SIZE) + 1;
    const additionalFollowers = await this.props.getUserFollowers(this.props.username, nextPage);
    this.setState({ followers: [...this.state.followers, ...additionalFollowers] });
  }

  render() {
    if (this.state.error) return (
      <div>
        <Search username={this.props.username} />
        <ProfileError errorType={this.state.error} />
      </div>
    );

    if (!this.state.user) return <CircularProgress size={80} />;

    return (
      <div>
        <Search username={this.props.username} />
        <Paper className="profile">
          <User {...this.state.user} />
          <Followers
            followers={this.state.followers}
            history={this.props.history}
            loadMoreFollowers={this.loadMoreFollowers}
            pageSize={PAGE_SIZE}
            totalFollowers={this.state.user.followers} />
        </Paper>
      </div>
    );
  }
}

export default Profile;
