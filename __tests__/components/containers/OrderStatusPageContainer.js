import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import { OrderStatusPageContainer } from '../../../app/components/containers/OrderStatusPageContainer';

describe('OrderStatusPageContainer', () => {
  const defaultProps = {
    match: {
      params: {
        orderId: 'orderId'
      }
    }
  };
  const getShallowComponent = (props = defaultProps) => shallow(<OrderStatusPageContainer {...props} />);

  test('Inistial state', () => {
    const component = getShallowComponent();
    expect(component.state('orderId')).toBe('orderId');
  });

  test('Snapshot', () => expect(renderer.create(<OrderStatusPageContainer {...defaultProps} />).toJSON()).toMatchSnapshot());
});
