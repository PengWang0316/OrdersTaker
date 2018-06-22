import React from 'react';
import renderer from 'react-test-renderer';

import { CheckingIndicator } from '../../../app/components/LoginDialog/CheckingIndicator';

jest.mock('@material-ui/core/CircularProgress', () => 'CircularProgress');
jest.mock('@material-ui/core/Tooltip', () => 'Tooltip');
jest.mock('@material-ui/icons/CheckCircle', () => 'CheckCircle');
jest.mock('@material-ui/icons/Error', () => 'Error');

const defaultProps = {
  classes: {
    circularProgress: 'circularProgress',
    checkCircle: 'checkCircle',
    error: 'error'
  }
};

describe('CheckingIndicator', () => {
  test('Snapshot isCheck true', () => expect(renderer.create(<CheckingIndicator {...{ ...defaultProps, isChecking: true, isAvaliable: true }} />).toJSON()).toMatchSnapshot());
  test('Snapshot isCheck false isAvaliable true', () => expect(renderer.create(<CheckingIndicator {...{ ...defaultProps, isChecking: false, isAvaliable: true }} />).toJSON()).toMatchSnapshot());
  test('Snapshot isCheck false isAvaliable false', () => expect(renderer.create(<CheckingIndicator {...{ ...defaultProps, isChecking: false, isAvaliable: false }} />).toJSON()).toMatchSnapshot());
});
