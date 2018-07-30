import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';

import { OrderCard } from '../../../app/components/OrderBrowser/OrderCard';
import context from '../../../app/contexts/OrdersPageContextTestHelper';


jest.mock('@material-ui/core/Card', () => 'Card');
jest.mock('@material-ui/core/CardMedia', () => 'CardMedia');
jest.mock('@material-ui/core/CardContent', () => 'CardContent');
jest.mock('@material-ui/core/Typography', () => 'Typography');
jest.mock('@material-ui/core/IconButton', () => 'IconButton');
jest.mock('@material-ui/core/Tooltip', () => 'Tooltip');
jest.mock('@material-ui/icons/DeleteForever', () => 'DeleteForever');
jest.mock('@material-ui/icons/Link', () => 'Link');
jest.mock('../../../app/components/OrderBrowser/OrderBrowserCardHeader', () => 'OrderBrowserCardHeader');
jest.mock('../../../app/contexts/OrdersPageContext');

describe('OrderCard', () => {
  const defaultProps = {
    classes: {
      card: 'card',
      media: 'media',
      cardContent: 'cardContent',
      iconButton: 'iconButton',
      deleteButton: 'deleteButton',
      icon: 'icon'
    },
    order: {
      _id: 'ordersId',
      items: {
        orderIdA: {},
        orderIdB: {}
      },
      userId: 'userId'
    },
    menuItems: {
      orderIdA: { photo: 'orderA photo', name: 'orderA name' }
    },
    title: 'titel'
  };
  const getShallowComponent = (props = defaultProps) => mount(<OrderCard {...props} />);

  test('Snapshot with user id', () => expect(renderer.create(<OrderCard {...defaultProps} />).toJSON()).toMatchSnapshot());
  test('Snapshot without user id', () => expect(renderer.create(<OrderCard {...{
    ...defaultProps,
    order: {
      _id: 'ordersId',
      items: {
        orderIdA: {},
        orderIdB: {}
      },
      userId: null
    }
  }}
  />).toJSON()).toMatchSnapshot());

  test('Function called when click elements', () => {
    console.error = jest.fn();
    const newProps = {
      ...defaultProps,
      order: {
        _id: 'ordersId',
        items: {
          orderIdA: {},
          orderIdB: {}
        },
        userId: null
      }
    };
    const component = getShallowComponent(newProps);
    component.find('OrderBrowserCardHeader').at(0).simulate('click');
    expect(context.handleShowDetail).toHaveBeenCalledTimes(1);
    expect(context.handleShowDetail).toHaveBeenLastCalledWith(newProps.order);
    component.find('CardMedia').at(0).simulate('click');
    expect(context.handleShowDetail).toHaveBeenCalledTimes(2);
    expect(context.handleShowDetail).toHaveBeenLastCalledWith(newProps.order);
    component.find('IconButton').at(0).simulate('click');
    expect(context.handleRmoveUnloginOrder).toHaveBeenCalledTimes(1);
    expect(context.handleRmoveUnloginOrder).toHaveBeenLastCalledWith(newProps.order._id);
    component.find('IconButton').at(1).simulate('click');
    expect(context.handleLinkOrder).toHaveBeenCalledTimes(1);
    expect(context.handleLinkOrder).toHaveBeenLastCalledWith(newProps.order._id);
  });
});
