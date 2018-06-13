import React from 'react';
import renderer from 'react-test-renderer';

import { MenuItem } from '../../app/components/MenuItem';

jest.mock('@material-ui/core/Typography', () => 'Typography');
jest.mock('@material-ui/core/Avatar', () => 'Avatar');
jest.mock('../../app/components/PriceItem', () => 'PriceItem');

describe('MenuItem', () => {
  test('Snapshot', () => expect(renderer.create(<MenuItem {...{ item: { photo: 'photo', name: 'name' }, classes: { menuItem: 'menuItem', avatar: 'avatar', menuName: 'menuName' } }} />).toJSON())
    .toMatchSnapshot());
});
