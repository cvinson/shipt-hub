import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import ProfileError from './ProfileError';

describe('<ProfileError />', () => {
  it('renders the default error type correctly', () => {
    const wrapper = shallow(<ProfileError />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders Not Found error type correctly', () => {
    const wrapper = shallow(<ProfileError errorType="notFound" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders Rate Limit error type correctly', () => {
    const wrapper = shallow(<ProfileError errorType="rateLimit" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
