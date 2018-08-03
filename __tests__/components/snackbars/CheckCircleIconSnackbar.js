import React from 'react';
import renderer from 'react-test-renderer';

import { CheckCircleIconSnackbar } from '../../../app/components/snackbars/CheckCircleIconSnackbar';

jest.mock('@material-ui/core/Snackbar', () => 'Snackbar');
jest.mock('@material-ui/core/SnackbarContent', () => 'SnackbarContent');
jest.mock('@material-ui/icons/CheckCircle', () => 'CheckCircle');

describe('CheckCircleIconSnackbar', () => {
  const defaultProps = {
    open: true,
    onClose: jest.fn(),
    classes: {
      messageSpan: 'messageSpan',
      message: 'message',
      snackbarContent: 'snackbarContent'
    },
    message: 'message'
  };
  test('Snapshot', () => expect(renderer.create(<CheckCircleIconSnackbar {...defaultProps} />).toJSON()).toMatchSnapshot());
});
