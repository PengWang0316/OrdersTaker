import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import { ItemDetailDialog } from '../../app/components/ItemDetailDialog';

jest.mock('@material-ui/core/Dialog', () => 'Dialog');
jest.mock('@material-ui/core/Avatar', () => 'Avatar');
jest.mock('@material-ui/core/Typography', () => 'Typography');
jest.mock('@material-ui/core/DialogContent', () => 'DialogContent');
jest.mock('@material-ui/core/IconButton', () => 'IconButton');
jest.mock('@material-ui/core/Button', () => 'Button');
jest.mock('@material-ui/icons/Close', () => 'Close');
jest.mock('../../app/components/PriceItem', () => 'PriceItem');
jest.mock('../../app/components/RecipePanel', () => 'RecipePanel');

describe('ItemDetailDialog', () => {
  const defaultProps = {
    onClose: jest.fn(),
    open: true,
    item: { photo: 'photo', recipes: 'recipes' },
    classes: {
      root: 'root',
      dialogPaper: 'dialogPager',
      flexBox: 'flexBox',
      avatar: 'avatar',
      title: 'title',
      description: 'description',
      buttonDiv: 'buttonDiv',
      closeButton: 'closeButton',
      closeIcon: 'closeIcon'
    }
  };
  const getShallowComponent = (props = defaultProps) => shallow(<ItemDetailDialog {...props} />);

  test('Snapshot has item', () => expect(renderer.create(<ItemDetailDialog {...defaultProps} />).toJSON()).toMatchSnapshot());
  test('Snapshot no item', () => expect(renderer.create(<ItemDetailDialog {...{ ...defaultProps, item: null }} />).toJSON())
    .toMatchSnapshot());

  test('Click close IconButton', () => {
    const component = getShallowComponent();
    component.find('IconButton').simulate('click');
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });

  test('Click close Button', () => {
    const component = getShallowComponent();
    component.find('Button').simulate('click');
    expect(defaultProps.onClose).toHaveBeenCalledTimes(2);
  });
});
