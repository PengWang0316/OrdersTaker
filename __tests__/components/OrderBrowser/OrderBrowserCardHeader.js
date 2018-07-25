import React from 'react';
import renderer from 'react-test-renderer';

import { OrderBrowserCardHeader } from '../../../app/components/OrderBrowser/OrderBrowserCardHeader';
import { ORDER_STATUS_FINISHED, ORDER_STATUS_RECEIVED, ORDER_STATUS_PREPARING } from '../../../app/config';

jest.mock('@material-ui/core/CardHeader', () => 'CardHeader');
jest.mock('@material-ui/core/Tooltip', () => 'Tooltip');
jest.mock('@material-ui/icons/CheckCircle', () => 'CheckCircle');
jest.mock('@material-ui/icons/OfflinePin', () => 'OfflinePin');
jest.mock('@material-ui/icons/WatchLater', () => 'WatchLater');
jest.mock('@material-ui/icons/Help', () => 'Help');

describe('OrderBrowserCardHeader', () => {
  const defaultProps = {
    classes: {
      checkCircle: 'checkCircle',
      offlinPin: 'offlinPin',
      watchLater: 'watchLater',
      unknow: 'unkonw'
    },
    order: {
      dateStamp: '2018-07-24T00:20:48.033Z',
      status: ORDER_STATUS_FINISHED
    },
    onClick: jest.fn()
  };

  test('Snapshot ORDER_STATUS_FINISHED', () => expect(renderer.create(<OrderBrowserCardHeader {...defaultProps} />).toJSON()).toMatchSnapshot());
  test('Snapshot ORDER_STATUS_RECEIVED', () => expect(renderer.create(<OrderBrowserCardHeader {...{ ...defaultProps, order: { dateStamp: '2018-07-24T00:20:48.033Z', status: ORDER_STATUS_RECEIVED } }} />).toJSON()).toMatchSnapshot());
  test('Snapshot ORDER_STATUS_PREPARING', () => expect(renderer.create(<OrderBrowserCardHeader {...{ ...defaultProps, order: { dateStamp: '2018-07-24T00:20:48.033Z', status: ORDER_STATUS_PREPARING } }} />).toJSON()).toMatchSnapshot());
  test('Snapshot unknow status', () => expect(renderer.create(<OrderBrowserCardHeader {...{ ...defaultProps, order: { dateStamp: '2018-07-24T00:20:48.033Z', status: '' } }} />).toJSON()).toMatchSnapshot());
});
