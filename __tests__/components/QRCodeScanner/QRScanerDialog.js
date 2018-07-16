import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import { QRScanerDialog } from '../../../app/components/QRCodeScanner/QRScanerDialog';

jest.mock('@material-ui/core/Dialog', () => 'Dialog');
jest.mock('@material-ui/core/DialogTitle', () => 'DialogTitle');
jest.mock('@material-ui/core/Typography', () => 'Typography');
jest.mock('@material-ui/core/Button', () => 'Button');
jest.mock('react-qr-reader', () => 'QrReader');

describe('QRScanerDialog', () => {
  const defaultProps = {
    classes: {
      buttonDiv: 'buttonDiv'
    },
    onClose: jest.fn(),
    isOpen: true,
    setTableNumber: jest.fn()
  };
  const getShallowComponent = (props = defaultProps) => shallow(<QRScanerDialog {...props} />);

  test('Snapshot', () => expect(renderer.create(<QRScanerDialog {...defaultProps} />).toJSON()).toMatchSnapshot());

  test('handleScan', () => {
    const component = getShallowComponent();
    component.find('QrReader').prop('onScan')();
    expect(defaultProps.onClose).not.toHaveBeenCalled();
    expect(defaultProps.setTableNumber).not.toHaveBeenCalled();

    component.find('QrReader').prop('onScan')('e');
    expect(defaultProps.onClose).not.toHaveBeenCalled();
    expect(defaultProps.setTableNumber).not.toHaveBeenCalled();

    component.find('QrReader').prop('onScan')('1');
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
    expect(defaultProps.setTableNumber).toHaveBeenCalledTimes(1);
    expect(defaultProps.setTableNumber).toHaveBeenLastCalledWith('1');
  });

  test('handleError', () => {
    window.console.error = jest.fn();
    const component = getShallowComponent();
    component.find('QrReader').prop('onError')();
    expect(window.console.error).toHaveBeenCalledTimes(1);
  });
});
