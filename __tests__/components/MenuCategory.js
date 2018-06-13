import React from 'react';
import renderer from 'react-test-renderer';

import { MenuCategory } from '../../app/components/MenuCategory';

jest.mock('@material-ui/core/Typography', () => 'Typography');
jest.mock('../../app/components/MenuItem', () => 'MenuItem');

describe('MenuCategory', () => {
  test('Snapshot', () =>
    expect(renderer.create(<MenuCategory {...{ menu: { category: 'category', items: [{ _id: 1 }, { _id: 2 }] }, classes: { root: 'root', title: 'title', flexBox: 'flexBox' } }} />).toJSON())
      .toMatchSnapshot());
});
