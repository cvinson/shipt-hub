import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { InfiniteLoader, List } from 'react-virtualized';
import CircularProgress from 'material-ui/CircularProgress';
import Paper from 'material-ui/Paper';
import Follower from '../follower/Follower';
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
      followers: null,
      user: null
    };
  }

  fetchUserData = async (username) => {
    this.setState({
      followers: await this.props.getUserFollowers(username),
      user: await this.props.getUser(username)
    });
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

  loadMoreRows = async ({ startIndex, stopIndex }) => {
    const nextPage = Math.ceil(this.state.followers.length / PAGE_SIZE) + 1;
    const additionalFollowers = await this.props.getUserFollowers(this.props.username, nextPage);
    this.setState({ followers: [...this.state.followers, ...additionalFollowers] });
  }

  rowRenderer = ({ key, index, isScrolling, isVisible, style }) => {
    const follower = this.state.followers[index];
    const onClick = () => this.props.history.push(`/${follower.login}`);
    const onLinkClick = () => window.location = `https://github.com/${follower.login}`;
    return (
      <Follower
        key={key}
        onClick={onClick}
        onLinkClick={onLinkClick}
        style={style}
        {...follower} />
    )
  };

  render() {
    if (!this.state.user) {
      return <CircularProgress size={80} />;
    }

    return (
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
    );
  }
}

export default Profile;
