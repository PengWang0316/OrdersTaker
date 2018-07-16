import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import { HomePageContainer } from '../../../app/components/containers/HomePageContainer';

jest.mock('../../../app/components/Banner', () => 'Banner');
jest.mock('../../../app/components/MenuCategory', () => 'MenuCategory');
jest.mock('../../../app/components/OrderFloatingButton', () => 'OrderFloatingButton');

window.innerWidth = 800;

describe('HomePageContainer', () => {
  const defaultProps = {
    menuItems: { id: 1 },
    menus: null,
    fetchAllMenu: jest.fn()
  };
  const getShallowComponent = (props = defaultProps) => shallow(<HomePageContainer {...props} />);

  test('constructor', () => {
    window.addEventListener = jest.fn();
    const component = getShallowComponent();
    expect(defaultProps.fetchAllMenu).toHaveBeenCalledTimes(1);
    expect(window.addEventListener).toHaveBeenLastCalledWith('resize', component.instance().handleResize);
    expect(component.state('itemAmount')).toBe(6);
  });

  test('componentWillUnmount', () => {
    window.removeEventListener = jest.fn();
    const component = getShallowComponent();
    component.instance().componentWillUnmount();
    expect(window.removeEventListener).toHaveBeenCalledTimes(1);
    expect(window.removeEventListener).toHaveBeenLastCalledWith('resize', component.instance().handleResize);
  });

  test('handleResize', () => {
    const component = getShallowComponent();
    expect(component.state('itemAmount')).toBe(6);
    window.innerWidth = 850;
    component.instance().handleResize();
    expect(component.state('itemAmount')).toBe(8);
    window.innerWidth = 800;
  });

  test('getAmountNumber', () => {
    expect(HomePageContainer.getAmountNumber(800)).toBe(6);
    expect(HomePageContainer.getAmountNumber(801)).toBe(6);
    expect(HomePageContainer.getAmountNumber(900)).toBe(8);
    expect(HomePageContainer.getAmountNumber(987)).toBe(8);
    expect(HomePageContainer.getAmountNumber(1100)).toBe(10);
    expect(HomePageContainer.getAmountNumber(1200)).toBe(10);
    expect(HomePageContainer.getAmountNumber(1201)).toBe(12);
    expect(HomePageContainer.getAmountNumber(1600)).toBe(12);
  });

  test('handleDialogToggle', () => {
    const component = getShallowComponent();
    expect(component.state('isDialogOpen')).toBe(false);
    component.instance().handleDialogToggle();
    expect(component.state('isDialogOpen')).toBe(true);
  });

  test('showDetailDialog', () => {
    const component = getShallowComponent();
    expect(component.state('isDialogOpen')).toBe(false);
    component.instance().showDetailDialog('id');
    expect(component.state('isDialogOpen')).toBe(true);
    expect(component.state('currentItem')).toBe(1);
  });

  test('snapshot without menu props', () => expect(renderer.create(<HomePageContainer {...defaultProps} />).toJSON()).toMatchSnapshot());

  test('constructor did not call fetchAllMenu', () => {
    const mockFetchAllMenuFn = jest.fn();
    getShallowComponent({ fetchAllMenu: mockFetchAllMenuFn, menus: [{ _id: 1 }, { _id: 2 }] });
    expect(mockFetchAllMenuFn).not.toHaveBeenCalled();
  });

  test('snapshot with menu props', () => expect(renderer.create(<HomePageContainer {...{ ...defaultProps, menus: [{ _id: 1 }, { _id: 2 }] }} />).toJSON()).toMatchSnapshot());
});
