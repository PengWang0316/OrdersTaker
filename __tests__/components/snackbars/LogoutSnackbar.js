import React from 'react';
import renderer from 'react-test-renderer';

import { LogoutSnackbar } from '../../../app/components/snackbars/LogoutSnackbar';

jest.mock('@material-ui/core/Snackbar', () => 'Snackbar');
jest.mock('@material-ui/core/SnackbarContent', () => 'SnackbarContent');
jest.mock('@material-ui/icons/CheckCircle', () => 'CheckCircle');

describe('LogoutSnackbar', () => {
  const defaultProps = {
    open: true,
    onClose: jest.fn(),
    classes: {
      messageSpan: 'messageSpan',
      message: 'message',
      snackbarContent: 'snackbarContent'
    }
  };
  test('Snapshot', () => expect(renderer.create(<LogoutSnackbar {...defaultProps} />).toJSON()).toMatchSnapshot());
});
