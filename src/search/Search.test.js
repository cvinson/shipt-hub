import React from 'react';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { MemoryRouter } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Search from './Search';

const TestMarkup = ({ getUserProp, getUserFollowersProp, username }) => (
  <MemoryRouter>
    <MuiThemeProvider>
      <Search
        username={username || 'githubUser'}
        getUser={getUserProp}
        getUserFollowers={getUserFollowersProp} />
    </MuiThemeProvider>
  </MemoryRouter>
);

describe('Search', () => {
  let getUser, getUserProp, getUserFollowers, getUserFollowersProp;

  beforeEach(() => {
    getUser = Promise.resolve({ login: 'githubUser', followers: 1, avatar_url: 'anAvatarUrl' });
    getUserProp = jest.fn(() => getUser);
    getUserFollowers = Promise.resolve([{ login: 'anotherGithubUser', avatar_url: 'anotherAvatarUrl' }]);
    getUserFollowersProp = jest.fn(() => getUserFollowers);
  });

  it('renders correctly', () => {
    const wrapper = shallow(
      <Search
        username="githubUser"
        getUser={getUserProp}
        getUserFollowers={getUserFollowersProp} />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders user info and followers', async () => {
    const wrapper = mount(<TestMarkup getUserProp={getUserProp} getUserFollowersProp={getUserFollowersProp} />);

    await Promise.all([getUser, getUserFollowers]);
    wrapper.update();
    expect(wrapper.text()).toMatch('githubUser');
    expect(wrapper.text()).toMatch('1 Follower');
    expect(wrapper.text()).toMatch('anotherGithubUser');
  });

  it('calls the given user and follower fetch function', async () => {
    const wrapper = mount(<TestMarkup getUserProp={getUserProp} getUserFollowersProp={getUserFollowersProp} />);

    await Promise.all([getUser, getUserFollowers]);
    wrapper.update();
    expect(getUserProp).toHaveBeenCalledTimes(1);
    expect(getUserFollowersProp).toHaveBeenCalledTimes(1);
  });

  it('calls the given user and follower fetch function again when new username props is passed', async () => {
    const wrapper = mount(<TestMarkup getUserProp={getUserProp} getUserFollowersProp={getUserFollowersProp} />);

    await Promise.all([getUser, getUserFollowers]);
    wrapper.setProps({ username: 'aSecondGithubUser' })

    await Promise.all([getUser, getUserFollowers]);
    expect(getUserProp).toHaveBeenCalledTimes(2);
    expect(getUserProp).toHaveBeenLastCalledWith('aSecondGithubUser');
    expect(getUserFollowersProp).toHaveBeenCalledTimes(2);
    expect(getUserFollowersProp).toHaveBeenLastCalledWith('aSecondGithubUser');
  });

  afterEach(() => {
    getUserProp.mockClear();
    getUserFollowersProp.mockClear();
  });
});
