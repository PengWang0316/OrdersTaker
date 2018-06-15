import React from 'react';
import renderer from 'react-test-renderer';

import MenuCategory from '../../app/components/MenuCategory';

jest.mock('@material-ui/core/Typography', () => 'Typography');
jest.mock('../../app/components/MenuItem', () => 'MenuItem');
jest.mock('../../app/components/HiddenItemPanel', () => 'HiddenItemPanel');

describe('MenuCategory', () => {
  test('Snapshot menu.times length > isAmount', () =>
    expect(renderer.create(<MenuCategory {...{ itemAmount: 1, menu: { category: 'category', items: [{ _id: 1 }, { _id: 2 }] }, classes: { root: 'root', title: 'title', flexBoxAround: 'flexBoxAround', flexBoxStart: 'flexBoxStart' } }} />).toJSON())
      .toMatchSnapshot());

  test('Snapshot menu.times length < isAmount', () =>
    expect(renderer.create(<MenuCategory {...{ itemAmount: 5, menu: { category: 'category', items: [{ _id: 1 }, { _id: 2 }] }, classes: { root: 'root', title: 'title', flexBoxAround: 'flexBoxAround', flexBoxStart: 'flexBoxStart' } }} />).toJSON())
      .toMatchSnapshot());
});
