import React from 'react';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Follower from './Follower';

describe('<Follower />', () => {
  it('renders correctly', () => {
    const wrapper = shallow(
      <Follower
        avatar_url="https://avatars1.githubusercontent.com/u/590431?v=4"
        login="cvinson"
        style={{ color: 'green' }} />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
