import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import { QRCodeScaner } from '../../../app/components/QRCodeScaner/QRCodeScaner';

jest.mock('@material-ui/core/Button', () => 'Button');
jest.mock('@material-ui/core/Typography', () => 'Typography');
jest.mock('@material-ui/icons/PhotoCamera', () => 'PhotoCamera');
jest.mock('../../../app/components/QRCodeScaner/QRScanerDialog', () => 'QRScanerDialog');

describe('QRCodeScaner', () => {
  const defaultProps = {
    classes: {
      tableNumber: 'tableNumber'
    },
    orders: {}
  };
  const getShallowComponent = (props = defaultProps) => shallow(<QRCodeScaner {...props} />);

  test('Initial state and toggleDialog function', () => {
    const component = getShallowComponent();
    expect(component.state('isDialogOpen')).toBe(false);
    component.instance().toggleDialog();
    expect(component.state('isDialogOpen')).toBe(true);
  });

  test('Snapshot without tableNumber', () => expect(renderer.create(<QRCodeScaner {...defaultProps} />).toJSON()).toMatchSnapshot());
  test('Snapshot with tableNumber', () => expect(renderer.create(<QRCodeScaner {...{ ...defaultProps, orders: { tableNumber: 1 } }} />).toJSON()).toMatchSnapshot());
});
