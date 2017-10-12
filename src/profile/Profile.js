import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { InfiniteLoader, List } from 'react-virtualized';
import CircularProgress from 'material-ui/CircularProgress';
import Paper from 'material-ui/Paper';
import ProfileError from './ProfileError';
import Follower from '../follower/Follower';
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

  isRowLoaded = ({ index }) => index < this.state.followers.length;

  onClick = (follower) => () => this.props.history.push(`/${follower.login}`);

  onLinkClick = (follower) => () => window.location.assign(`https://github.com/${follower.login}`);

  loadMoreRows = async ({ startIndex, stopIndex }) => {
    const nextPage = Math.ceil(this.state.followers.length / PAGE_SIZE) + 1;
    const additionalFollowers = await this.props.getUserFollowers(this.props.username, nextPage);
    this.setState({ followers: [...this.state.followers, ...additionalFollowers] });
  }

  rowRenderer = ({ key, index, isScrolling, isVisible, style }) => {
    const follower = this.state.followers[index];
    return (
      <Follower
        key={key}
        onClick={this.onClick(follower)}
        onLinkClick={this.onLinkClick(follower)}
        style={style}
        {...follower} />
    )
  };

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
          <InfiniteLoader
            isRowLoaded={this.isRowLoaded}
            loadMoreRows={this.loadMoreRows}
            minimumBatchSize={PAGE_SIZE}
            rowCount={this.state.user.followers}>
            {({ onRowsRendered, registerChild }) => (
              <List
                height={300}
                width={300}
                onRowsRendered={onRowsRendered}
                ref={registerChild}
                rowCount={this.state.followers.length}
                rowHeight={56}
                rowRenderer={this.rowRenderer} />
            )}
          </InfiniteLoader>
        </Paper>
      </div>
    );
  }
}

export default Profile;
