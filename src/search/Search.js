import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { InfiniteLoader, List } from 'react-virtualized';
import Avatar from 'material-ui/Avatar';
import { ListItem } from 'material-ui/List';

class Search extends Component {
  static propTypes = {
    getUser: PropTypes.func.isRequired,
    getUserFollowers: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      isLoadingFollowers: true,
      isLoadingUser: true,
      followers: [],
      user: null
    };
  }

  async componentWillMount() {
    const user = await this.props.getUser(this.props.username);
    this.setState({ isLoadingUser: false, user });
    const followers = await this.props.getUserFollowers(this.props.username);
    this.setState({ isLoadingFollowers: false, followers });
  }

  isRowLoaded = ({ index }) => index < this.state.followers.length;

  loadMoreRows = async ({ startIndex, stopIndex }) => {
    const nextPage = Math.ceil(this.state.followers.length / 30) + 1;
    const additionalFollowers = await this.props.getUserFollowers(this.props.username, nextPage);
    this.setState({ followers: [...this.state.followers, ...additionalFollowers] });
  }

  rowRenderer = ({ key, index, isScrolling, isVisible, style }) => {
    const follower = this.state.followers[index];
    const avatarUrl = new URL(follower['avatar_url']);
    avatarUrl.searchParams.set('s', 40);
    return (
      <ListItem
        key={key}
        leftAvatar={<Avatar src={avatarUrl} />}
        primaryText={follower.login}
        style={style} />
    );
  }

  render() {
    if (this.state.isLoadingUser) {
      return <div>Loading</div>;
    }

    return (
      <div>
        <h2>{this.state.isLoadingUser ? 'Loading' : this.state.user.name}</h2>
        {!this.state.isLoadingUser && <p>{this.state.user.followers}</p>}
        <InfiniteLoader
          isRowLoaded={this.isRowLoaded}
          loadMoreRows={this.loadMoreRows}
          minimumBatchSize={30}
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
      </div>
    );
  }
}

export default Search;
