import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import { KithenOrderBoard } from '../../app/components/KithenOrderBoard';


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
    const OrdersActions = require('../../app//actions/OrdersActions');
    const component = getShallowComponent();
    expect(OrdersActions.fetchUnfinishedOrders).toHaveBeenCalledTimes(1);
    // expect(component.state('unfinishedOrders')).toEqual({ 1: { _id: '1' }, 2: { _id: '2' } });
  });

  test('getObjectFromArray', () => expect(KithenOrderBoard.getObjectFromArray([{ _id: '1' }, { _id: '2' }])).toEqual({ 1: { _id: '1' }, 2: { _id: '2' } }));

  test('handleItemClick without finishedItems', () => {
    const OrdersActions = require('../../app//actions/OrdersActions'); 
    const component = getShallowComponent();
    component.instance().state = { unfinishedOrders: { orderId1: { _id: 'orderId1' }, orderId2: { _id: 'orderId2' } } };
    component.instance().handleItemClick('orderId1', 'itemId1');

    expect(component.state('unfinishedOrders')).toEqual({ orderId1: { _id: 'orderId1', finishedItems: { itemId1: true } }, orderId2: { _id: 'orderId2' } });
    expect(OrdersActions.updateFinishedItems).toHaveBeenCalledTimes(1);
    expect(OrdersActions.updateFinishedItems).toHaveBeenLastCalledWith({
      orderId: 'orderId1', itemId: 'itemId1', isFinished: true, jwt: defaultProps.user.jwt
    });
  });

  test('handleItemClick with finishedItems and itemId', () => {
    const OrdersActions = require('../../app//actions/OrdersActions'); 
    const component = getShallowComponent();
    component.setState({ unfinishedOrders: { orderId1: { _id: 'orderId1', finishedItems: { itemId1: true }, other: 'other' }, orderId2: { _id: 'orderId2' } } });
    component.instance().handleItemClick('orderId1', 'itemId1');

    expect(component.state('unfinishedOrders')).toEqual({ orderId1: { _id: 'orderId1', finishedItems: {}, other: 'other' }, orderId2: { _id: 'orderId2' } });
    expect(OrdersActions.updateFinishedItems).toHaveBeenCalledTimes(2);
    expect(OrdersActions.updateFinishedItems).toHaveBeenLastCalledWith({
      orderId: 'orderId1', itemId: 'itemId1', isFinished: undefined, jwt: defaultProps.user.jwt
    });
  });

  test('handleItemClick with finishedItems without itemId', () => {
    const OrdersActions = require('../../app//actions/OrdersActions'); 
    const component = getShallowComponent();
    component.instance().state = { unfinishedOrders: { orderId1: { _id: 'orderId1', finishedItems: {}, other: 'other' }, orderId2: { _id: 'orderId2' } } };
    component.instance().handleItemClick('orderId1', 'itemId1');

    expect(component.state('unfinishedOrders')).toEqual({ orderId1: { _id: 'orderId1', finishedItems: { itemId1: true }, other: 'other' }, orderId2: { _id: 'orderId2' } });
    expect(OrdersActions.updateFinishedItems).toHaveBeenCalledTimes(3);
    expect(OrdersActions.updateFinishedItems).toHaveBeenLastCalledWith({
      orderId: 'orderId1', itemId: 'itemId1', isFinished: true, jwt: defaultProps.user.jwt
    });
  });

  test('Snapshot', () => {
    const component = getShallowComponent();
    component.setState({ unfinishedOrders: { orderId1: { _id: 'orderId1', finishedItems: { itemId1: true }, other: 'other' }, orderId2: { _id: 'orderId2' } } });
    expect(renderer.create(component).toJSON()).toMatchSnapshot();
  });
});
