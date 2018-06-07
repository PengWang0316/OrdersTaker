import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import { Banner } from '../../app/components/Banner';

jest.mock('@material-ui/core/Hidden', () => 'Hidden');

describe('Banner', () => {
  const defaultProps = {
    classes: {},
    basicInformation: {
      banners: [{
        url: 'url', xsUrl: 'xsUrl', title: 'title', subTitle: 'subTitle'
      }]
    },
    fetchBasicInformation: jest.fn()
  };
  const getShallowComponent = (props = defaultProps) => shallow(<Banner {...props} />);

  test('Initialize the component', () => {
    getShallowComponent();
    expect(defaultProps.fetchBasicInformation).not.toHaveBeenCalled();
    getShallowComponent({ ...defaultProps, basicInformation: null });
    expect(defaultProps.fetchBasicInformation).toHaveBeenCalledTimes(1);
  });

  test('snapshot', () => expect(renderer.create(<Banner {...defaultProps} />).toJSON()).toMatchSnapshot());
});
