import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import { QRCodeScanner } from '../../../app/components/QRCodeScanner/QRCodeScanner';

jest.mock('@material-ui/core/Button', () => 'Button');
jest.mock('@material-ui/core/Typography', () => 'Typography');
jest.mock('@material-ui/icons/PhotoCamera', () => 'PhotoCamera');
jest.mock('../../../app/components/QRCodeScanner/QRScanerDialog', () => 'QRScanerDialog');

describe('QRCodeScanner', () => {
  const defaultProps = {
    classes: {
      tableNumber: 'tableNumber'
    },
    orders: {}
  };
  const getShallowComponent = (props = defaultProps) => shallow(<QRCodeScanner {...props} />);

  test('Initial state and toggleDialog function', () => {
    const component = getShallowComponent();
    expect(component.state('isDialogOpen')).toBe(false);
    component.instance().toggleDialog();
    expect(component.state('isDialogOpen')).toBe(true);
  });

  test('Snapshot without tableNumber', () => expect(renderer.create(<QRCodeScanner {...defaultProps} />).toJSON()).toMatchSnapshot());
  test('Snapshot with tableNumber', () => expect(renderer.create(<QRCodeScanner {...{ ...defaultProps, orders: { tableNumber: 1 } }} />).toJSON()).toMatchSnapshot());
});
