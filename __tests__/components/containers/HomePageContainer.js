import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import { HomePageContainer } from '../../../app/components/containers/HomePageContainer';

jest.mock('../../../app/components/Banner', () => 'Banner');
jest.mock('../../../app/components/MenuCategory', () => 'MenuCategory');

describe('HomePageContainer', () => {
  const defaultProps = {
    menus: null,
    fetchAllMenu: jest.fn()
  };
  const getShallowComponent = (props = defaultProps) => shallow(<HomePageContainer {...props} />);

  test('constructor call fetchAllMenu', () => {
    getShallowComponent();
    expect(defaultProps.fetchAllMenu).toHaveBeenCalledTimes(1);
  });

  test('snapshot without menu props', () => expect(renderer.create(<HomePageContainer {...defaultProps} />).toJSON()).toMatchSnapshot());

  test('constructor did not call fetchAllMenu', () => {
    const mockFetchAllMenuFn = jest.fn();
    getShallowComponent({ fetchAllMenu: mockFetchAllMenuFn, menus: [{ _id: 1 }, { _id: 2 }] });
    expect(mockFetchAllMenuFn).not.toHaveBeenCalled();
  });

  test('snapshot with menu props', () => expect(renderer.create(<HomePageContainer {...{ ...defaultProps, menus: [{ _id: 1 }, { _id: 2 }] }} />).toJSON()).toMatchSnapshot());
});
