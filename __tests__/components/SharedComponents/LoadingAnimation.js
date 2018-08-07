import React from 'react';
import renderer from 'react-test-renderer';
// import { shallow } from 'enzyme';

import { LoadingAnimation } from '../../../app/components/SharedComponents/LoadingAnimation';

jest.mock('@material-ui/core/LinearProgress', () => 'LinearProgress');

describe('LoadingAnimation test', () => {
  const defaultProps = {
    isLoading: true,
    classes: {
      root: 'root',
      div: 'div'
    }
  };
  test('Snapshot with isLoading true', () => expect(renderer.create(<LoadingAnimation {...defaultProps} />).toJSON()).toMatchSnapshot());

  test('Snapshot with isLoading false', () => expect(renderer.create(<LoadingAnimation isLoading={false} />).toJSON()).toMatchSnapshot());
});
