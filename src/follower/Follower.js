import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Avatar from 'material-ui/Avatar';
import { ListItem } from 'material-ui/List';
import LinkIcon from 'material-ui/svg-icons/content/link';
import IconButton from 'material-ui/IconButton';

const Follower = ({ avatar_url, history, login, style }) => {
  const onExternalClick = () => window.location = `https://github.com/${login}`;

  const onClick = () => history.push(`/${login}`);

  return (
    <ListItem
      className="follower"
      leftAvatar={<Avatar src={avatar_url} />}
      onClick={onClick}
      primaryText={login}
      rightIconButton={<IconButton onClick={onExternalClick}><LinkIcon /></IconButton>}
      style={style} />
  );
};

Follower.PropTypes = {
  avatar_url: PropTypes.string.isRequired,
  login: PropTypes.string.isRequired,
  style: PropTypes.node.isRequired,
};

export default withRouter(Follower);
