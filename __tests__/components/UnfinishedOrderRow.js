import React from 'react';
import renderer from 'react-test-renderer';

import { UnfinishedOrderRow } from '../../app/components/UnfinishedOrderRow';

jest.mock('@material-ui/core/Typography', () => 'Typography');
jest.mock('@material-ui/core/CircularProgress', () => 'CircularProgress');
jest.mock('@material-ui/icons/CheckCircle', () => 'CheckCircle');

describe('UnfinishedOrderRow', () => {
  const defalutProps = {
    classes: {
      root: 'root',
      flexDiv: 'flexDiv',
      finishPercentage: 'finishPercentage',
      progress: 'progress',
      circleIcon: 'circleIcon'
    },
    order: {
      dateStamp: '2018-07-27T22:22:53.647Z'
    }
  };

  test('Snapshot without finishedItems', () => expect(renderer.create(<UnfinishedOrderRow {...defalutProps} />).toJSON()).toMatchSnapshot());
  test('Snapshot with finishedItems and different length', () => expect(renderer.create(<UnfinishedOrderRow {...{ ...defalutProps, order: { items: { a: true, b: true }, finishedItems: { a: true }, dateStamp: '2018-07-27T22:22:53.647Z' } }} />).toJSON()).toMatchSnapshot());
  test('Snapshot with finishedItems and same length', () => expect(renderer.create(<UnfinishedOrderRow {...{ ...defalutProps, order: { items: { a: true, b: true }, finishedItems: { a: true, b: true }, dateStamp: '2018-07-27T22:22:53.647Z' } }} />).toJSON()).toMatchSnapshot());
});
