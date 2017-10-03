import React from 'react';
import PropTypes from 'prop-types';
import Profile from './Profile';
import { getUser, getUserFollowers } from '../services/api';
import './Profile.css';

const ProfileContainer = ({ history, match }) => {
  return (
    <div className="profileContainer">
      <Profile
        className="profileContainer"
        getUser={getUser}
        getUserFollowers={getUserFollowers}
        history={history}
        username={match.params.username} />
    </div>
  );
};

ProfileContainer.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
}

export default ProfileContainer;
