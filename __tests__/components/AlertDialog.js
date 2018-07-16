import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import { AlertDialog } from '../../app/components/AlertDialog';

jest.mock('@material-ui/core/Dialog', () => 'Dialog');
jest.mock('@material-ui/core/DialogTitle', () => 'DialogTitle');
jest.mock('@material-ui/core/DialogContent', () => 'DialogContent');
jest.mock('@material-ui/core/DialogContentText', () => 'DialogContentText');
jest.mock('@material-ui/core/DialogActions', () => 'DialogActions');
jest.mock('@material-ui/core/Button', () => 'Button');

describe('AlertDialog', () => {
  const defalutProps = {
    open: true,
    onClose: jest.fn(),
    title: 'title',
    content: 'content',
    onFirstButton: jest.fn(),
    onSecondButton: jest.fn(),
    firstButtonText: 'firstButtonText',
    secondButtonText: 'comfirmButtonText'
  };
  const getShallowComponent = (props = defalutProps) => shallow(<AlertDialog {...props} />);

  test('Snapshot', () => expect(renderer.create(<AlertDialog {...defalutProps} />).toJSON()).toMatchSnapshot());

  test('Buttons click', () => {
    const component = getShallowComponent();
    const buttons = component.find('Button');
    buttons.at(0).simulate('click');
    expect(defalutProps.onFirstButton).toHaveBeenCalledTimes(1);
    buttons.at(1).simulate('click');
    expect(defalutProps.onSecondButton).toHaveBeenCalledTimes(1);
  });
});
