import React from 'react';
import ReactDOM from 'react-dom';
import Search from './Search';

describe('Search', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Search
        username="githubUser"
        getUser={() => Promise.resolve({})}
        getUserFollowers={() => Promise.resolve([])} />,
    div);
  });
});
