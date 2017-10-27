import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader } from 'material-ui/Card';
import plur from 'plur';

const User = ({ avatar_url, followers, login }) => (
  <Card>
    <CardHeader
      title={<a href={`https://github.com/${login}`}>{login}</a>}
      subtitle={`${followers} ${plur('Follower', followers)}`}
      avatar={avatar_url} />
  </Card>
);

User.PropTypes = {
  avatar_url: PropTypes.string.isRequired,
  followers: PropTypes.number.isRequired,
  login: PropTypes.string.isRequired
};

export default User;
