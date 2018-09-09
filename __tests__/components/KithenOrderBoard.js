import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import { KithenOrderBoard } from '../../app/components/KithenOrderBoard';
import { SOCKETIO_URL, SOCKETIO_EVENT_ADD_NEW_ORDER, SOCKETIO_EVENT_UPDATE_ORDER_ITEM } from '../../app/config';


jest.mock('@material-ui/core/Paper', () => 'Paper');
jest.mock('@material-ui/core/ExpansionPanel', () => 'ExpansionPanel');
jest.mock('@material-ui/core/ExpansionPanelDetails', () => 'ExpansionPanelDetails');
jest.mock('@material-ui/core/ExpansionPanelSummary', () => 'ExpansionPanelSummary');
jest.mock('@material-ui/icons/ExpandMore', () => 'ExpandMore');
jest.mock('../../app/components/UnfinishedOrder/UnfinishedOrderRow', () => 'UnfinishedOrderRow');
jest.mock('../../app/components/UnfinishedOrder/UnfinishedOrderList', () => 'UnfinishedOrderList');
jest.mock('../../app//actions/OrdersActions', () => ({
  fetchUnfinishedOrders: jest.fn().mockReturnValue(Promise.resolve([{ _id: '1' }, { _id: '2' }])),
  updateFinishedItems: jest.fn()
}));
jest.mock('socket.io-client', () => jest.fn());

describe('KithenOrderBoard', () => {
  const defaultProps = {
    classes: {
      paper: 'paper'
    },
    user: {
      jwt: 'jwt'
    }
  };
  const getShallowComponent = (props = defaultProps) => shallow(<KithenOrderBoard {...defaultProps} />);

  test('componentDidMount', () => {
    const mockOnFn = jest.fn();
    const OrdersActions = require('../../app//actions/OrdersActions');
    const socketio = require('socket.io-client');
    socketio.mockReturnValue({ on: mockOnFn });
    const component = getShallowComponent();
    expect(OrdersActions.fetchUnfinishedOrders).toHaveBeenCalledTimes(1);
    expect(socketio).toHaveBeenCalledTimes(1);
    expect(socketio).toHaveBeenLastCalledWith(SOCKETIO_URL, {
      extraHeaders: {
        'Access-Control-Allow-Credentials': 'omit'
      }
    });
    expect(mockOnFn).toHaveBeenCalledTimes(2);
    expect(mockOnFn).toHaveBeenNthCalledWith(1, SOCKETIO_EVENT_ADD_NEW_ORDER, component.instance().addNewOrderCallback);
    expect(mockOnFn).toHaveBeenNthCalledWith(2, SOCKETIO_EVENT_UPDATE_ORDER_ITEM, component.instance().updateOrderItemCallback);
    expect(component.instance().socket).toEqual({ on: mockOnFn });
    expect(component.instance().deletedOrders).toEqual({});
    // expect(component.state('unfinishedOrders')).toEqual({ 1: { _id: '1' }, 2: { _id: '2' } });
  });

  test('getObjectFromArray', () => expect(KithenOrderBoard.getObjectFromArray([{ _id: '1' }, { _id: '2' }])).toEqual({ 1: { _id: '1' }, 2: { _id: '2' } }));

  test('handleItemClick without finishedItems', () => {
    const OrdersActions = require('../../app//actions/OrdersActions'); 
    const component = getShallowComponent();
    component.instance().state = { unfinishedOrders: { orderId1: { _id: 'orderId1', items: { idA: 'a' } }, orderId2: { _id: 'orderId2', items: { idA: 'a' } } } };
    component.instance().handleItemClick('orderId1', 'itemId1');

    expect(component.state('unfinishedOrders')).toEqual({ orderId1: { _id: 'orderId1', finishedItems: { itemId1: true }, items: { idA: 'a' } }, orderId2: { _id: 'orderId2', items: { idA: 'a' } } });
    expect(OrdersActions.updateFinishedItems).toHaveBeenCalledTimes(1);
    expect(OrdersActions.updateFinishedItems).toHaveBeenLastCalledWith({
      orderId: 'orderId1', itemId: 'itemId1', isItemFinished: true, jwt: defaultProps.user.jwt, isOrderFinished: true
    });
  });

  test('handleItemClick with finishedItems and itemId', () => {
    const OrdersActions = require('../../app//actions/OrdersActions'); 
    const component = getShallowComponent();
    component.setState({ unfinishedOrders: { orderId1: { _id: 'orderId1', finishedItems: { itemId1: true }, other: 'other', items: { idA: 'a' } }, orderId2: { _id: 'orderId2', items: { idA: 'a' } } } });
    component.instance().handleItemClick('orderId1', 'itemId1');

    expect(component.state('unfinishedOrders')).toEqual({ orderId1: { _id: 'orderId1', finishedItems: {}, other: 'other', items: { idA: 'a' } }, orderId2: { _id: 'orderId2', items: { idA: 'a' } } });
    expect(OrdersActions.updateFinishedItems).toHaveBeenCalledTimes(2);
    expect(OrdersActions.updateFinishedItems).toHaveBeenLastCalledWith({
      orderId: 'orderId1', itemId: 'itemId1', isItemFinished: undefined, jwt: defaultProps.user.jwt, isOrderFinished: false
    });
  });

  test('handleItemClick with finishedItems without itemId', () => {
    const OrdersActions = require('../../app//actions/OrdersActions'); 
    const component = getShallowComponent();
    component.instance().state = { unfinishedOrders: { orderId1: { _id: 'orderId1', finishedItems: {}, other: 'other', items: { idA: 'a' } }, orderId2: { _id: 'orderId2', items: { idA: 'a' } } } };
    component.instance().handleItemClick('orderId1', 'itemId1');

    expect(component.state('unfinishedOrders')).toEqual({ orderId1: { _id: 'orderId1', finishedItems: { itemId1: true }, other: 'other', items: { idA: 'a' } }, orderId2: { _id: 'orderId2', items: { idA: 'a' } } });
    expect(OrdersActions.updateFinishedItems).toHaveBeenCalledTimes(3);
    expect(OrdersActions.updateFinishedItems).toHaveBeenLastCalledWith({
      orderId: 'orderId1', itemId: 'itemId1', isItemFinished: true, jwt: defaultProps.user.jwt, isOrderFinished: true
    });
  });

  test('addNewOrderCallback', () => {
    const timer = sinon.useFakeTimers(new Date('2018/09/04').getTime());
    const component = getShallowComponent();
    const oldState = { orderId1: { _id: 'orderId1', finishedItems: {}, other: 'other' }, orderId2: { _id: 'orderId2' } };
    const newState = {
      _id: 'orderId3', finishedItems: {}, other: 'other', dateStamp: new Date()
    };
    component.instance().state = { unfinishedOrders: oldState };
    component.instance().addNewOrderCallback(newState);
    expect(component.state('unfinishedOrders')).toEqual({ ...oldState, [newState._id]: { ...newState } });
    timer.restore();
  });

  test('updateOrderItemCallback isFinished', () => {
    const component = getShallowComponent();
    const oldState = { orderId1: { _id: 'orderId1', finishedItems: { itemId1: true, itemId2: true }, other: 'other' }, orderId2: { _id: 'orderId2' } };
    // component.setState({ unfinishedOrders: oldState });
    component.instance().state = { unfinishedOrders: oldState };
    component.instance().updateOrderItemCallback({ orderId: 'orderId1', itemId: 'itemId3', isItemFinished: true });
    expect(component.state('unfinishedOrders')).toEqual({ orderId1: { _id: 'orderId1', finishedItems: { itemId1: true, itemId2: true, itemId3: true }, other: 'other' }, orderId2: { _id: 'orderId2' } });
  });

  test('updateOrderItemCallback isFinished with undefined finishedItems', () => {
    const component = getShallowComponent();
    const oldState = { orderId1: { _id: 'orderId1', finishedItems: { itemId1: true, itemId2: true }, other: 'other' }, orderId2: { _id: 'orderId2' } };
    // component.setState({ unfinishedOrders: oldState });
    component.instance().state = { unfinishedOrders: oldState };
    component.instance().updateOrderItemCallback({ orderId: 'orderId2', itemId: 'itemId3', isItemFinished: true });
    expect(component.state('unfinishedOrders')).toEqual({ orderId1: { _id: 'orderId1', finishedItems: { itemId1: true, itemId2: true }, other: 'other' }, orderId2: { _id: 'orderId2', finishedItems: { itemId3: true } } });
  });

  test('updateOrderItemCallback isFinished is false', () => {
    const component = getShallowComponent();
    const oldState = { orderId1: { _id: 'orderId1', finishedItems: { itemId1: true, itemId2: true }, other: 'other' }, orderId2: { _id: 'orderId2' } };
    component.setState({ unfinishedOrders: oldState });
    component.instance().updateOrderItemCallback({ orderId: 'orderId1', itemId: 'itemId2', isFinished: false });
    expect(component.state('unfinishedOrders')).toEqual({ orderId1: { _id: 'orderId1', finishedItems: { itemId1: true }, other: 'other' }, orderId2: { _id: 'orderId2' } });
  });

  test('updateOrderItemCallback no order in the state', () => {
    const component = getShallowComponent();
    const oldState = { orderId2: { _id: 'orderId2' } };
    component.setState({ unfinishedOrders: oldState });
    component.instance().deletedOrders = { orderId1: { _id: 'orderId1', finishedItems: { itemId1: true, itemId2: true }, other: 'other' } };
    component.instance().updateOrderItemCallback({ orderId: 'orderId1', itemId: 'itemId2', isFinished: false });
    expect(component.state('unfinishedOrders')).toEqual({ orderId1: { _id: 'orderId1', finishedItems: { itemId1: true }, other: 'other' }, orderId2: { _id: 'orderId2' } });
  });

  test('handleDeleteClickCallback', () => {
    const component = getShallowComponent();
    const oldState = { orderId1: { _id: 'orderId1', finishedItems: { itemId1: true, itemId2: true }, other: 'other' }, orderId2: { _id: 'orderId2' } };
    component.setState({ unfinishedOrders: oldState });
    component.instance().handleDeleteClickCallback('orderId1');
    expect(component.state('unfinishedOrders')).toEqual({ orderId2: { _id: 'orderId2' } });
    expect(component.instance().deletedOrders).toEqual({ orderId1: { _id: 'orderId1', finishedItems: { itemId1: true, itemId2: true }, other: 'other' } });
  });

  test('Snapshot', () => {
    const component = getShallowComponent();
    component.setState({ unfinishedOrders: { orderId1: { _id: 'orderId1', finishedItems: { itemId1: true }, other: 'other' }, orderId2: { _id: 'orderId2' } } });
    expect(renderer.create(component).toJSON()).toMatchSnapshot();
  });

});
