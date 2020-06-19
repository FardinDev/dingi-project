import React from 'react';
import { shallow } from 'enzyme';
import AppNavbar from './AppNavbar';

describe('AppNavbar', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<AppNavbar />);
    expect(wrapper).toMatchSnapshot();
  });
});
