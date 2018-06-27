import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import { LoginDialog } from '../../../app/components/LoginDialog/LoginDialog';

// import LoginDialogFull from '../../../app/components/LoginDialog/index'; // Cover the index.js


jest.mock('@material-ui/core/Dialog', () => 'Dialog');
jest.mock('@material-ui/core/DialogContent', () => 'DialogContent');
jest.mock('@material-ui/core/IconButton', () => 'IconButton');
jest.mock('@material-ui/icons/Close', () => 'Close');

jest.mock('../../../app/components/LoginDialog/LoginPanel', () => 'LoginPanel');
jest.mock('../../../app/components/LoginDialog/RegisterPanel', () => 'RegisterPanel');

window.console.error = jest.fn(); // Silence the unuseful error information causes by test.

describe('LoginDialog', () => {
  const defaultProps = {
    classes: {
      dialogPaper: 'dialogPaper',
      dialogContent: 'dialogContent',
      dialogCloseButton: 'dialogCloseButton',
      dialogCloseIcon: 'dialogCloseIcon'
    },
    open: true,
    onClose: jest.fn()
  };
  const getShallowComponent = (props = defaultProps) => shallow(<LoginDialog {...defaultProps} />);

  test('Initial state value and togglePanels', () => {
    const component = getShallowComponent();
    expect(component.state('isLogin')).toBe(true);
    component.instance().togglePanels();
    expect(component.state('isLogin')).toBe(false);
  });

  test('onClose call when click', () => {
    const component = getShallowComponent();
    component.find('IconButton').simulate('click');
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });

  test('Snapshot isLogin true', () => expect(renderer.create(<LoginDialog {...defaultProps} />).toJSON()).toMatchSnapshot());

  test('Snapshot isLogin false', () => {
    const component = getShallowComponent();
    component.setState({ isLogin: false });
    expect(renderer.create(component).toJSON()).toMatchSnapshot();
  });
});
