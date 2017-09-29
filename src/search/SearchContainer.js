import React from 'react';
import PropTypes from 'prop-types';
import Search from './Search';
import { getUser, getUserFollowers } from '../services/api';

const SearchContainer = ({ match }) => {
  return (
    <Search
      getUser={getUser}
      getUserFollowers={getUserFollowers}
      username={match.params.username} />
  );
};

SearchContainer.propTypes = {
  match: PropTypes.object.isRequired
}

export default SearchContainer;
