import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';

const ProfileError = ({ errorType }) => {
  let message;

  switch (errorType) {
    case 'notFound':
      message = {
        headline: 'Oh no! We couldn\'t find that user!',
        subtext: 'Please update your search and try again.'
      };
      break;
    case 'rateLimit':
      message = {
        headline: 'Oh no! We\'ve been rate limited!',
        subtext: 'Please try again in a few minutes.'
      };
      break;
    default:
      message = {
        headline: 'An error occurred!',
        subtext: ''
      };
  }

  return (
    <Paper className="errorContainer" zDepth={2}>
      <h3>{message.headline}</h3>
      <p>{message.subtext}</p>
    </Paper>
  );
};

ProfileError.propTypes = {
  errorType: PropTypes.string
};

export default ProfileError;
