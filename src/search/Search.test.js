import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import toJson from 'enzyme-to-json';
import Search from './Search';

describe('Search', () => {
  let getUserSuccess, getUserFollowersSuccess;

  beforeAll(() => {
    getUserSuccess = sinon.stub();
    getUserSuccess.resolves({ name: 'githubUser' });
    getUserFollowersSuccess = sinon.stub();
    getUserFollowersSuccess.resolves([{ login: 'anotherGithubUser' }]);
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
    getUserSuccess.reset();
    getUserFollowersSuccess.reset();
  });
});
