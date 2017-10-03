import React from 'react';
import PropTypes from 'prop-types';
import Search from './Search';
import { getUser, getUserFollowers } from '../services/api';
import './Search.css';

const SearchContainer = ({ history, match }) => {
  return (
    <div className="searchContainer">
      <Search
        className="searchContainer"
        getUser={getUser}
        getUserFollowers={getUserFollowers}
        history={history}
        username={match.params.username} />
    </div>
  );
};

SearchContainer.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
}

export default SearchContainer;
