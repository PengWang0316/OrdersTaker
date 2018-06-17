import React from 'react';
import renderer from 'react-test-renderer';

import { RecipePanel } from '../../app/components/RecipePanel';

jest.mock('@material-ui/core/Typography', () => 'Typography');
jest.mock('@material-ui/core/ExpansionPanel', () => 'ExpansionPanel');
jest.mock('@material-ui/core/ExpansionPanelSummary', () => 'ExpansionPanelSummary');
jest.mock('@material-ui/core/ExpansionPanelDetails', () => 'ExpansionPanelDetails');
jest.mock('@material-ui/core/List', () => 'List');
jest.mock('@material-ui/core/ListItem', () => 'ListItem');
jest.mock('@material-ui/core/ListItemText', () => 'ListItemText');
jest.mock('@material-ui/core/Divider', () => 'Divider');

Math.random = jest.fn().mockReturnValue(1); // Random function is used to generate keys.

describe('RecipePanel', () => {
  const props = {
    classes: {
      recipe: 'recipe',
      panel: 'panel',
      list: 'list',
      listText: 'listText'
    },
    recipes: ['recipe A', 'recipe B']
  };

  test('Snapshot', () => expect(renderer.create(<RecipePanel {...props} />).toJSON()).toMatchSnapshot());
});
