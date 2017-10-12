import React from 'react';
import PropTypes from 'prop-types';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { MemoryRouter } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Followers from './Followers';

const renderOptions = {
  context: { muiTheme: getMuiTheme() },
  childContextTypes: { muiTheme: PropTypes.object }
};

const getTestComponent = (loadMoreFollowers) => (
  <Followers
    followers={[{ login: 'anotherGithubUser', avatar_url: 'anotherAvatarUrl' }]}
    history={{ push: [].push }}
    loadMoreFollowers={loadMoreFollowers}
    pageSize={10}
    totalFollowers={30} />
);

describe('<Followers />', () => {
  let loadMoreFollowers, loadMoreFollowersProp;

  beforeEach(() => {
    loadMoreFollowers = Promise.resolve({ login: 'githubUser', followers: 1, avatar_url: 'anAvatarUrl' });
    loadMoreFollowersProp = jest.fn(() => loadMoreFollowers);
  });

  it('renders correctly', () => {
    const wrapper = mount(getTestComponent(loadMoreFollowersProp), renderOptions);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  describe('onClick', () => {
    it('pushes the follower\'s url into the history', () => {
      const wrapper = mount(getTestComponent(loadMoreFollowersProp), renderOptions);
      const followers = wrapper.instance();
      const onClick = followers.onClick({ login: 'aGithubUser' });
      expect(followers.props.history.length).toBeUndefined();
      onClick();
      expect(followers.props.history[0]).toEqual('/aGithubUser');
    });
  });

  describe('onLinkClick', () => {
    it('changes the window location to the correct github url', () => {
      window.location.assign = jest.fn();
      const wrapper = mount(getTestComponent(loadMoreFollowersProp), renderOptions);
      wrapper.instance().onLinkClick({ login: 'aGithubUser' })();
      expect(window.location.assign).toHaveBeenLastCalledWith('https://github.com/aGithubUser');
    });
  });

  afterEach(() => {
    loadMoreFollowersProp.mockClear();
  });
});
