import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Avatar from 'material-ui/Avatar';
import { ListItem } from 'material-ui/List';

const Follower = ({ avatar_url, login, style }) => {
  return (
    <Link to={`/${login}`}>
      <ListItem
        leftAvatar={<Avatar src={avatar_url} />}
        primaryText={login}
        style={style} />
    </Link>
  );
};

Follower.PropTypes = {
  avatar_url: PropTypes.string.isRequired,
  login: PropTypes.string.isRequired,
  style: PropTypes.node.isRequired,
};

export default Follower;
