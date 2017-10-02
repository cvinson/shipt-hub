import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import SearchContainer from './SearchContainer';

describe('Search', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<SearchContainer match={{ params: { username: 'githubUser' } }} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
