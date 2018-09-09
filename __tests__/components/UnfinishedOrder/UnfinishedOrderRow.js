import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import { UnfinishedOrderRow } from '../../../app/components/UnfinishedOrder/UnfinishedOrderRow';

jest.mock('@material-ui/core/Typography', () => 'Typography');
jest.mock('@material-ui/core/IconButton', () => 'IconButton');
jest.mock('@material-ui/core/CircularProgress', () => 'CircularProgress');
jest.mock('@material-ui/icons/DoneAll', () => 'DoneAll');
jest.mock('@material-ui/icons/Delete', () => 'Delete');

describe('UnfinishedOrderRow', () => {
  const defaultProps = {
    classes: {
      root: 'root',
      flexDiv: 'flexDiv',
      finishPercentage: 'finishPercentage',
      progress: 'progress',
      circleIcon: 'circleIcon'
    },
    order: {
      dateStamp: '2018-07-27T22:22:53.647Z'
    },
    deleteOrderCallback: jest.fn()
  };
  const getShallowComponent = (props = defaultProps) => shallow(<UnfinishedOrderRow {...props} />);

  test('Snapshot without finishedItems', () => expect(renderer.create(<UnfinishedOrderRow {...defaultProps} />).toJSON()).toMatchSnapshot());
  test('Snapshot with finishedItems and different length', () => expect(renderer.create(<UnfinishedOrderRow {...{ ...defaultProps, order: { items: { a: true, b: true }, finishedItems: { a: true }, dateStamp: '2018-07-27T22:22:53.647Z' } }} />).toJSON()).toMatchSnapshot());
  test('Snapshot with finishedItems and same length', () => expect(renderer.create(<UnfinishedOrderRow {...{ ...defaultProps, order: { items: { a: true, b: true }, finishedItems: { a: true, b: true }, dateStamp: '2018-07-27T22:22:53.647Z' } }} />).toJSON()).toMatchSnapshot());

  test('deleteOrderCallback', () => {
    const component = getShallowComponent({ ...defaultProps, order: { _id: 'orderId', items: { a: true, b: true }, finishedItems: { a: true, b: true }, dateStamp: '2018-07-27T22:22:53.647Z' } });
    component.find('IconButton').simulate('click');
    expect(defaultProps.deleteOrderCallback).toHaveBeenCalledTimes(1);
    expect(defaultProps.deleteOrderCallback).toHaveBeenLastCalledWith('orderId');
  });
});
