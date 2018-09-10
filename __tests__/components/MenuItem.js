import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme'; // Have to use mount to test a context.

import { MenuItem } from '../../app/components/MenuItem';
import context from '../../app/contexts/ShowDetailDialogContextTestHelper';

jest.mock('@material-ui/core/Typography', () => 'Typography');
// jest.mock('@material-ui/core/Avatar', () => 'Avatar');
jest.mock('../../app/components/PriceItem', () => 'PriceItem');
jest.mock('../../app/contexts/ShowDetailDialogContext'); // The __mocks__/ShowDetailDialogContext.js will be used automatically.

window.console.error = jest.fn(); // Silencing the unuseful warning causes by mount.

describe('MenuItem', () => {
  const defaultProps = { item: { photo: 'photo', name: 'name' }, classes: { menuItem: 'menuItem', avatar: 'avatar', menuName: 'menuName' } };

  test('Snapshot', () => expect(renderer.create(<MenuItem {...defaultProps} />).toJSON())
    .toMatchSnapshot());

  test('Click image and Typography element', () => {
    // const ComponentWithContext = getComponentWithContext();
    // showDetailDialogContext.
    const component = mount(<MenuItem {...defaultProps} />);
    // console.log(component.html());
    // console.log(component.find('Avatar'));
    component.find('img').simulate('click');
    expect(context).toHaveBeenCalledTimes(1);
    component.find('Typography').simulate('click');
    expect(context).toHaveBeenCalledTimes(2);
  });
});
