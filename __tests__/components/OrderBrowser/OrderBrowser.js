import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import { OrderBrowser } from '../../../app/components/OrderBrowser/OrderBrowser';

jest.mock('@material-ui/core/Card', () => 'Card');
jest.mock('@material-ui/core/CardMedia', () => 'CardMedia');
jest.mock('@material-ui/core/CardContent', () => 'CardContent');
jest.mock('@material-ui/core/Typography', () => 'Typography');
jest.mock('@material-ui/core/IconButton', () => 'IconButton');
jest.mock('@material-ui/core/Tooltip', () => 'Tooltip');
jest.mock('@material-ui/icons/DeleteForever', () => 'DeleteForever');
jest.mock('@material-ui/icons/Link', () => 'Link');
jest.mock('../../../app/components/OrderBrowser/OrderBrowserCardHeader', () => 'OrderBrowserCardHeader');

describe('OrderBrowser', () => {
  const defaultProps = {
    classes: {
      root: 'root',
      title: 'title',
      cardDiv: 'cardDiv',
      card: 'card',
      media: 'media',
      cardContent: 'cardContent',
      iconButton: 'iconButton',
      deleteButton: 'deleteButton',
      icon: 'icon'
    },
    orders: [{
      _id: 'ordersId',
      items: {
        orderIdA: {},
        orderIdB: {}
      },
      userId: 'userId'
    }],
    menuItems: {
      orderIdA: { photo: 'orderA photo', name: 'orderA name' }
    },
    title: 'titel',
    onShowDetail: jest.fn(),
    onRemoveOrder: jest.fn(),
    onLinkOrder: jest.fn()
  };
  const getShallowComponent = (props = defaultProps) => shallow(<OrderBrowser {...props} />);

  test('Snapshot with user id', () => expect(renderer.create(<OrderBrowser {...defaultProps} />).toJSON()).toMatchSnapshot());
  test('Snapshot without user id', () => expect(renderer.create(<OrderBrowser {...{
    ...defaultProps,
    orders: [{
      _id: 'ordersId',
      items: {
        orderIdA: {},
        orderIdB: {}
      },
      userId: null
    }]
  }}
  />).toJSON()).toMatchSnapshot());

  test('Function called when click elements', () => {
    const newProps = {
      ...defaultProps,
      orders: [{
        _id: 'ordersId',
        items: {
          orderIdA: {},
          orderIdB: {}
        },
        userId: null
      }]
    };
    const component = getShallowComponent(newProps);
    component.find('OrderBrowserCardHeader').at(0).simulate('click');
    expect(defaultProps.onShowDetail).toHaveBeenCalledTimes(1);
    expect(defaultProps.onShowDetail).toHaveBeenLastCalledWith(newProps.orders[0]);
    component.find('CardMedia').at(0).simulate('click');
    expect(defaultProps.onShowDetail).toHaveBeenCalledTimes(2);
    expect(defaultProps.onShowDetail).toHaveBeenLastCalledWith(newProps.orders[0]);
    component.find('IconButton').at(0).simulate('click');
    expect(defaultProps.onRemoveOrder).toHaveBeenCalledTimes(1);
    expect(defaultProps.onRemoveOrder).toHaveBeenLastCalledWith(newProps.orders[0]._id);
    component.find('IconButton').at(1).simulate('click');
    expect(defaultProps.onLinkOrder).toHaveBeenCalledTimes(1);
    expect(defaultProps.onLinkOrder).toHaveBeenLastCalledWith(newProps.orders[0]._id);
  });
});
