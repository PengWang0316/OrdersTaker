import React from 'react';
import renderer from 'react-test-renderer';

import { LoginDialogSnackbar } from '../../../app/components/snackbars/LoginDialogSnackbar';

jest.mock('@material-ui/core/Snackbar', () => 'Snackbar');
jest.mock('@material-ui/core/IconButton', () => 'IconButton');
jest.mock('@material-ui/core/SnackbarContent', () => 'SnackbarContent');
jest.mock('@material-ui/icons/Close', () => 'Close');
jest.mock('@material-ui/icons/Error', () => 'Error');

describe('LoginDialogSnackbar', () => {
  const defaultProps = {
    classes: {
      messageSpan: 'messageSpan',
      message: 'message',
      snackbarContent: 'snackbarContent'
    },
    message: 'message',
    onClose: jest.fn(),
    open: true
  };
  test('Snapshot', () => expect(renderer.create(<LoginDialogSnackbar {...defaultProps} />).toJSON()).toMatchSnapshot());
});
