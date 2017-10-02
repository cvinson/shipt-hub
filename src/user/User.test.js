import React from 'react';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import User from './User';

describe('<User />', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(
      <User
        avatar_url="anAvatarUrl"
        followers={255}
        login="aGithubUser" />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('correctly displays singular follower count', () => {
    const wrapper = shallow(
      <User
        avatar_url="anAvatarUrl"
        followers={1}
        login="aGithubUser" />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  })
});
