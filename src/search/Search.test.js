import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Search from './Search';

describe('Search', () => {
  let getUserSuccess, getUserFollowersSuccess;

  beforeAll(() => {
    getUserSuccess = jest.fn(() => Promise.resolve({ name: 'githubUser' }));
    getUserFollowersSuccess = jest.fn(() => Promise.resolve([{ login: 'anotherGithubUser' }]));
  });

  it('renders without crashing', () => {
    const component = shallow(
      <Search
        username="githubUser"
        getUser={getUserSuccess}
        getUserFollowers={getUserFollowersSuccess} />
    );
    expect(toJson(component)).toMatchSnapshot();
  });

  afterEach(() => {
    getUserSuccess.mockClear();
    getUserFollowersSuccess.mockClear();
  });
});
