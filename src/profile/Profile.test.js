import React from 'react';
import PropTypes from 'prop-types';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { MemoryRouter } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Profile from './Profile';

const renderOptions = {
  context: { muiTheme: getMuiTheme() },
  childContextTypes: { muiTheme: PropTypes.object }
};

const TestWrapper = ({ getUserProp, getUserFollowersProp, username }) => (
  <MemoryRouter>
    <MuiThemeProvider>
      <Profile
        username={username || 'githubUser'}
        getUser={getUserProp}
        getUserFollowers={getUserFollowersProp}
        history={{ push: [].push }} />
    </MuiThemeProvider>
  </MemoryRouter>
);

describe('Profile', () => {
  let getUser, getUserProp, getUserFollowers, getUserFollowersProp;

  beforeEach(() => {
    getUser = Promise.resolve({ login: 'githubUser', followers: 1, avatar_url: 'anAvatarUrl' });
    getUserProp = jest.fn(() => getUser);
    getUserFollowers = Promise.resolve([{ login: 'anotherGithubUser', avatar_url: 'anotherAvatarUrl' }]);
    getUserFollowersProp = jest.fn(() => getUserFollowers);
  });

  it('renders correctly', () => {
    const wrapper = shallow(
      <Profile
        username="githubUser"
        getUser={getUserProp}
        getUserFollowers={getUserFollowersProp}
        history={{}} />
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders user info and followers', async () => {
    const wrapper = mount(<TestWrapper getUserProp={getUserProp} getUserFollowersProp={getUserFollowersProp} />);

    await Promise.all([getUser, getUserFollowers]);
    wrapper.update();

    expect(wrapper.text()).toMatch('githubUser');
    expect(wrapper.text()).toMatch('1 Follower');
    expect(wrapper.text()).toMatch('anotherGithubUser');
  });

  it('calls the given user and follower fetch function', async () => {
    const wrapper = mount(<TestWrapper getUserProp={getUserProp} getUserFollowersProp={getUserFollowersProp} />);
    wrapper.setProps({ username: 'githubUser' });
    await Promise.all([getUser, getUserFollowers]);

    expect(getUserProp).toHaveBeenCalledTimes(1);
    expect(getUserFollowersProp).toHaveBeenCalledTimes(1);
  });

  it('calls the given user and follower fetch function again when new username props is passed', async () => {
    const wrapper = mount(<TestWrapper getUserProp={getUserProp} getUserFollowersProp={getUserFollowersProp} />);
    await Promise.all([getUser, getUserFollowers]);
    wrapper.setProps({ username: 'aSecondGithubUser' })
    await Promise.all([getUser, getUserFollowers]);

    expect(getUserProp).toHaveBeenCalledTimes(2);
    expect(getUserProp).toHaveBeenLastCalledWith('aSecondGithubUser');
    expect(getUserFollowersProp).toHaveBeenCalledTimes(2);
    expect(getUserFollowersProp).toHaveBeenLastCalledWith('aSecondGithubUser');
  });

  it('loads more followers on scroll', async () => {
    const getUserWith2FollowersProp = () => Promise.resolve({
      login: 'githubUser',
      followers: 2,
      avatar_url: 'anAvatarUrl'
    });
    const wrapper = mount(
      <TestWrapper
        getUserProp={getUserWith2FollowersProp}
        getUserFollowersProp={getUserFollowersProp} />
    );
    await Promise.all([getUser, getUserFollowers]);

    expect(getUserFollowersProp).toHaveBeenLastCalledWith('githubUser', 2);
  });

  it('renders error correctly', async () => {
    const wrapper = mount(
      <Profile
        username="githubUser"
        getUser={getUserProp}
        getUserFollowers={getUserFollowersProp}
        history={{}} />,
      renderOptions
    );

    await Promise.all([getUser, getUserFollowers]);
    wrapper.setState({ error: 'rateLimit' });
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  describe('onClick', () => {
    it('pushes the follower\'s url into the history', () => {
      const wrapper = mount(<TestWrapper getUserProp={getUserProp} getUserFollowersProp={getUserFollowersProp} />);
      const profile = wrapper.find(Profile).instance();
      const onClick = profile.onClick({ login: 'aGithubUser' });
      expect(profile.props.history.length).toBeUndefined();
      onClick();
      expect(profile.props.history[0]).toEqual('/aGithubUser');
    });
  });

  describe('onLinkClick', () => {
    it('changes the window location to the correct github url', () => {
      window.location.assign = jest.fn();
      const wrapper = mount(<TestWrapper getUserProp={getUserProp} getUserFollowersProp={getUserFollowersProp} />);
      wrapper.find(Profile).instance().onLinkClick({ login: 'aGithubUser' })();
      expect(window.location.assign).toHaveBeenLastCalledWith('https://github.com/aGithubUser');
    });
  });

  afterEach(() => {
    getUserProp.mockClear();
    getUserFollowersProp.mockClear();
  });
});
