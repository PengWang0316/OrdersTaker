import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import { UnfinishedOrderList } from '../../../app/components/UnfinishedOrder/UnfinishedOrderList';

jest.mock('@material-ui/core/List', () => 'List');
jest.mock('@material-ui/core/ListItem', () => 'ListItem');
jest.mock('@material-ui/core/ListItemText', () => 'ListItemText');
jest.mock('@material-ui/core/ListItemSecondaryAction', () => 'ListItemSecondaryAction');
jest.mock('@material-ui/core/Avatar', () => 'Avatar');
jest.mock('@material-ui/core/Typography', () => 'Typography');
jest.mock('@material-ui/icons/CheckCircle', () => 'CheckCircle');

describe('UnfinishedOrderList', () => {
  const defaultProps = {
    classes: {
      root: 'root',
      avatar: 'avatar',
      checkIcon: 'checkIcon'
    },
    order: {
      _id: '1',
      items: {
        123: {
          qty: {
            small: 1
          }
        }
      }
    },
    menuItems: {
      123: {
        name: '123name'
      }
    },
    onClick: jest.fn()
  };
  const getShallowComponent = (props = defaultProps) => shallow(<UnfinishedOrderList {...defaultProps} />);

  test('Snapshot without the CheckCircleIcon', () => expect(renderer.create(<UnfinishedOrderList {...defaultProps} />).toJSON()).toMatchSnapshot());
  test('Snapshot with the CheckCircleIcon', () => expect(renderer.create(<UnfinishedOrderList {...{ ...defaultProps, order: { _id: '1', items: { 123: { qty: { _onePrice: 2 } } }, finishedItems: { 123: true } } }} />).toJSON()).toMatchSnapshot());

  test('Click ListItem', () => {
    const component = getShallowComponent();
    component.find('ListItem').simulate('click');
    expect(defaultProps.onClick).toHaveBeenCalledTimes(1);
    expect(defaultProps.onClick).toHaveBeenLastCalledWith('1', '123');
  });
});
