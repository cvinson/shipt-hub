import React from 'react';
import PropTypes from 'prop-types';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Search from './Search';

const renderOptions = {
  context: { muiTheme: getMuiTheme() },
  childContextTypes: { muiTheme: PropTypes.object }
};

describe('<Search />', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<Search username="githubUser" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders a redirect when appropriate', () => {
    const wrapper = shallow(<Search username="githubUser" />, renderOptions);
    wrapper.setState({ redirect: true });
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('updates state when onChange is called', () => {
    const wrapper = shallow(<Search username="githubUser" />, renderOptions);
    const search = wrapper.instance();
    search.onChange({}, 'new text');
    expect(wrapper.state(['text'])).toEqual('new text');
  });

  it('updates redirect state when Enter is pressed', () => {
    const wrapper = shallow(<Search username="githubUser" />, renderOptions);
    const search = wrapper.instance();
    wrapper.setState({ text: 'some text' });
    search.onKeyPress({ key: 'Enter' });
    expect(wrapper.state(['redirect'])).toBe(true);
  });

  it('does not update redirect state when a non-Enter key is pressed', () => {
    const wrapper = shallow(<Search username="githubUser" />, renderOptions);
    const search = wrapper.instance();
    wrapper.setState({ text: 'some text' });
    search.onKeyPress({ key: 'a' });
    expect(wrapper.state(['redirect'])).toBe(false);
  });
});
