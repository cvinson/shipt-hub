import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import IconButton from 'material-ui/IconButton';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Follower from './Follower';

describe('<Follower />', () => {
  it('renders correctly', () => {
    const wrapper = mount(
      <MuiThemeProvider>
        <Follower
          avatar_url="https://avatars1.githubusercontent.com/u/590431?v=4"
          login="cvinson"
          onClick={jest.fn()}
          onLinkClick={jest.fn()}
          style={{ color: 'green' }} />
      </MuiThemeProvider>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('calls onClick when clicked', () => {
    const onClick = jest.fn();
    const wrapper = mount(
      <MuiThemeProvider>
        <Follower
          avatar_url="https://avatars1.githubusercontent.com/u/590431?v=4"
          login="cvinson"
          onClick={onClick}
          onLinkClick={jest.fn()}
          style={{ color: 'green' }} />
      </MuiThemeProvider>
    );

    wrapper.find('EnhancedButton.follower').simulate('click');
    expect(onClick).toHaveBeenCalled();
  })

  it('calls onLinkClick when link is clicked', () => {
    const onLinkClick = jest.fn();
    const wrapper = mount(
      <MuiThemeProvider>
        <Follower
          avatar_url="https://avatars1.githubusercontent.com/u/590431?v=4"
          login="cvinson"
          onClick={jest.fn()}
          onLinkClick={onLinkClick}
          style={{ color: 'green' }} />
      </MuiThemeProvider>
    );

    wrapper.find('button').simulate('click');
    expect(onLinkClick).toHaveBeenCalled();
  });
});
