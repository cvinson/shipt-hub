import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import ProfileContainer from './ProfileContainer';

describe('Profile', () => {
  it('renders correctly', () => {
    const wrapper = shallow(
      <ProfileContainer history={{}} match={{ params: { username: 'githubUser' } }} />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
