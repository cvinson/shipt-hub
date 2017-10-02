import React from 'react';
import PropTypes from 'prop-types';
import Search from './Search';
import { getUser, getUserFollowers } from '../services/api';
import './Search.css';

const SearchContainer = ({ match }) => {
  return (
    <div className="searchContainer">
      <Search
        className="searchContainer"
        getUser={getUser}
        getUserFollowers={getUserFollowers}
        username={match.params.username} />
    </div>
  );
};

SearchContainer.propTypes = {
  match: PropTypes.object.isRequired
}

export default SearchContainer;
