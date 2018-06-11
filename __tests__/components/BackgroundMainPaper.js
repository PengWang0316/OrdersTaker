import React from 'react';
import renderer from 'react-test-renderer';

import { BackgroundMainPaper } from '../../app/components/BackgroundMainPaper';

jest.mock('@material-ui/core/Paper', () => 'Paper');

describe('BackgroundMainPaper', () => {
  const defaultPorps = {
    classes: {
      root: 'root',
      pager: 'pager'
    },
    children: <div />
  };

  test('snapshot', () => expect(renderer.create(<BackgroundMainPaper {...defaultPorps} />).toJSON()).toMatchSnapshot());
});
