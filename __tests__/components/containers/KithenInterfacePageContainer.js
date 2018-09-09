import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import { KithenInterfacePageContainer } from '../../../app/components/containers/KithenInterfacePageContainer';
import { SUPER_USER_ROLE, HOME_PAGE_URL } from '../../../app/config';

jest.mock('@material-ui/core/Typography', () => 'Typography');
jest.mock('react-live-clock', () => 'Clock');
jest.mock('../../../app/components/KithenOrderBoard', () => 'CloKithenOrderBoardck');

describe('KithenInterfacePageContainer', () => {
  const defaultProps = {
    classes: {
      root: 'root',
      titleDiv: 'titleDiv'
    },
    fetchAllMenu: jest.fn(),
    history: { push: jest.fn() },
    user: {},
    menuItems: {}
  };
  const getShallowComponent = (props = defaultProps) => shallow(<KithenInterfacePageContainer {...props} />);

  beforeAll(() => {
    window.Intl = {
      DateTimeFormat: jest.fn().mockReturnValue({ resolvedOptions: jest.fn().mockReturnValue({ timeZone: 'timeZone' }) })
    };
  });

  test('constructor and not user id', () => {
    getShallowComponent();
    expect(defaultProps.history.push).toHaveBeenCalledTimes(1);
    expect(defaultProps.history.push).toHaveBeenLastCalledWith(HOME_PAGE_URL);
    expect(defaultProps.fetchAllMenu).not.toHaveBeenCalled();
    expect(window.Intl.DateTimeFormat).not.toHaveBeenCalled();
  });

  test('constructor and not user role', () => {
    getShallowComponent({ ...defaultProps, user: { _id: 'id' } });
    expect(defaultProps.history.push).toHaveBeenCalledTimes(2);
    expect(defaultProps.history.push).toHaveBeenLastCalledWith(HOME_PAGE_URL);
    expect(defaultProps.fetchAllMenu).not.toHaveBeenCalled();
    expect(window.Intl.DateTimeFormat).not.toHaveBeenCalled();
  });

  test('constructor and has wrong role', () => {
    getShallowComponent({ ...defaultProps, user: { _id: 'id', role: SUPER_USER_ROLE - 1 } });
    expect(defaultProps.history.push).toHaveBeenCalledTimes(3);
    expect(defaultProps.history.push).toHaveBeenLastCalledWith(HOME_PAGE_URL);
    expect(defaultProps.fetchAllMenu).not.toHaveBeenCalled();
    expect(window.Intl.DateTimeFormat).not.toHaveBeenCalled();
  });

  test('constructor with correct user and not empty menuItems', () => {
    const component = getShallowComponent({ ...defaultProps, user: { _id: 'id', role: SUPER_USER_ROLE }, menuItems: { id: 'id' } });
    expect(defaultProps.history.push).toHaveBeenCalledTimes(3);
    expect(defaultProps.fetchAllMenu).not.toHaveBeenCalled();
    expect(window.Intl.DateTimeFormat).toHaveBeenCalledTimes(1);
    expect(component.instance().timezone).toBe('timeZone');
  });

  test('constructor with correct user and empty menuItems', () => {
    const component = getShallowComponent({ ...defaultProps, user: { _id: 'id', role: SUPER_USER_ROLE } });
    expect(defaultProps.history.push).toHaveBeenCalledTimes(3);
    expect(defaultProps.fetchAllMenu).toHaveBeenCalledTimes(1);
    expect(window.Intl.DateTimeFormat).toHaveBeenCalledTimes(2);
    expect(component.instance().timezone).toBe('timeZone');
  });

  test('Snapshot', () => expect(renderer.create(<KithenInterfacePageContainer {...defaultProps} />).toJSON()).toMatchSnapshot());
});
