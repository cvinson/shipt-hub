import React from 'react';
import PropTypes from 'prop-types';
import { InfiniteLoader, List } from 'react-virtualized';
import Follower from './Follower';

export default class Followers extends React.Component {
  static propTypes = {
    followers: PropTypes.array.isRequired,
    history: PropTypes.object.isRequired,
    loadMoreFollowers: PropTypes.func.isRequired,
    pageSize: PropTypes.number.isRequired,
    totalFollowers: PropTypes.number.isRequired
  }

  isRowLoaded = ({ index }) => index < this.props.followers.length;

  onClick = (follower) => () => this.props.history.push(`/${follower.login}`);

  onLinkClick = (follower) => () => window.location.assign(`https://github.com/${follower.login}`);

  rowRenderer = ({ key, index, isScrolling, isVisible, style }) => {
    const follower = this.props.followers[index];
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
    return (
      <InfiniteLoader
        isRowLoaded={this.isRowLoaded}
        loadMoreRows={this.props.loadMoreFollowers}
        minimumBatchSize={this.props.pageSize}
        rowCount={this.props.totalFollowers}>
        {({ onRowsRendered, registerChild }) => (
          <List
            height={300}
            width={300}
            onRowsRendered={onRowsRendered}
            ref={registerChild}
            rowCount={this.props.followers.length}
            rowHeight={56}
            rowRenderer={this.rowRenderer} />
        )}
      </InfiniteLoader>
    );
  }
}
