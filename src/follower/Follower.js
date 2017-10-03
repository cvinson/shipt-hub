import React from 'react';
import PropTypes from 'prop-types';
import Avatar from 'material-ui/Avatar';
import { ListItem } from 'material-ui/List';
import LinkIcon from 'material-ui/svg-icons/content/link';
import IconButton from 'material-ui/IconButton';

const Follower = ({ avatar_url, login, onClick, onLinkClick, style }) => (
  <ListItem
    className="follower"
    leftAvatar={<Avatar src={avatar_url} />}
    onClick={onClick}
    primaryText={login}
    rightIconButton={
      <IconButton onClick={onLinkClick} tooltip={`Open on Github`} tooltipPosition="bottom-left">
        <LinkIcon />
      </IconButton>}
    style={style} />
);

Follower.PropTypes = {
  avatar_url: PropTypes.string.isRequired,
  login: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  onLinkClick: PropTypes.func.isRequired,
  style: PropTypes.node.isRequired,
};

export default Follower;
