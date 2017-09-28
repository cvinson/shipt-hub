import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { InfiniteLoader, List } from 'react-virtualized';
import Avatar from 'material-ui/Avatar';
import { ListItem } from 'material-ui/List';
import { getUser, getUserFollowers } from '../services/api';

class Search extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);

    this.username = props.match.params.username;
    this.state = {
      isLoadingFollowers: true,
      isLoadingUser: true,
      followers: [],
      user: null
    };
  }

  async componentWillMount() {
    const user = await getUser(this.username);
    this.setState({ isLoadingUser: false, user });
    const followers = await getUserFollowers(this.username);
    this.setState({ isLoadingFollowers: false, followers });
  }

  isRowLoaded = ({ index }) => index < this.state.followers.length;

  loadMoreRows = async ({ startIndex, stopIndex }) => {
    const nextPage = Math.ceil(this.state.followers.length / 30) + 1;
    const additionalFollowers = await getUserFollowers(this.username, nextPage);
    this.setState({ followers: [...this.state.followers, ...additionalFollowers] });
  }

  rowRenderer = ({ key, index, isScrolling, isVisible, style }) => {
    const follower = this.state.followers[index];
    return (
      <ListItem
        key={key}
        leftAvatar={<Avatar src={follower['avatar_url']} />}
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
