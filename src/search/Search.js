import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { InfiniteLoader, List } from 'react-virtualized';
import Follower from '../follower/Follower';
import User from '../user/User';

class Search extends Component {
  static propTypes = {
    getUser: PropTypes.func.isRequired,
    getUserFollowers: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      followers: null,
      user: null
    };
  }

  async componentWillMount() {
    this.setState({
      followers: await this.props.getUserFollowers(this.props.username),
      user: await this.props.getUser(this.props.username)
    });
  }

  isRowLoaded = ({ index }) => index < this.state.followers.length;

  loadMoreRows = async ({ startIndex, stopIndex }) => {
    const nextPage = Math.ceil(this.state.followers.length / 30) + 1;
    const additionalFollowers = await this.props.getUserFollowers(this.props.username, nextPage);
    this.setState({ followers: [...this.state.followers, ...additionalFollowers] });
  }

  rowRenderer = ({ key, index, isScrolling, isVisible, style }) => (
    <Follower
      key={key}
      style={style}
      {...this.state.followers[index]} />
  );

  render() {
    if (!this.state.user) {
      return <div>Loading</div>;
    }

    return (
      <div>
        <User {...this.state.user} />
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
