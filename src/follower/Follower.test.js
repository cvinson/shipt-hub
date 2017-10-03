import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Follower from './Follower';

describe('<Follower />', () => {
  it('renders correctly', () => {
    const wrapper = mount(
      <MemoryRouter>
        <MuiThemeProvider>
          <Follower
            avatar_url="https://avatars1.githubusercontent.com/u/590431?v=4"
            login="cvinson"
            style={{ color: 'green' }} />
        </MuiThemeProvider>
      </MemoryRouter>
    );
    expect(toJson(wrapper.find('.follower').first())).toMatchSnapshot();
  });
});
