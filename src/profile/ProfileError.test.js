import React from 'react';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ProfileError from './ProfileError';

describe('<ProfileError />', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<ProfileError errorType="rateLimit" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
