import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import { HiddenItemPanel } from '../../app/components/HiddenItemPanel';

jest.mock('@material-ui/core/Button', () => 'Button');
jest.mock('@material-ui/icons/ExpandMore', () => 'ExpandMore');
jest.mock('@material-ui/icons/ExpandLess', () => 'ExpandLess');
jest.mock('react-scroll', () => ({ scroller: { scrollTo: jest.fn() } }));
jest.mock('../../app/components/MenuItem', () => 'MenuItem');

describe('HiddenItemPanel', () => {
  const defaultProps = {
    items: [{ _id: 1 }, { _id: 2 }],
    classes: {
      flexBoxAround: 'flexBoxAround',
      buttonDiv: 'buttonDiv'
    },
    category: 'category'
  };
  const getShallowComponent = (props = defaultProps) => shallow(<HiddenItemPanel {...props} />);

  test('Initial', () => {
    const component = getShallowComponent();
    expect(component.state('isExpand')).toBe(false);
  });

  test('handleShowMoreClick', () => {
    const ReactScroll = require('react-scroll');
    const component = getShallowComponent();
    component.instance().handleShowMoreClick();
    expect(ReactScroll.scroller.scrollTo).not.toHaveBeenCalled();
    expect(component.state('isExpand')).toBe(true);
    component.instance().handleShowMoreClick();
    expect(ReactScroll.scroller.scrollTo).toHaveBeenCalledTimes(1);
    expect(ReactScroll.scroller.scrollTo).toHaveBeenLastCalledWith(defaultProps.category, {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart'
    });
    expect(component.state('isExpand')).toBe(false);
  });

  test('Snapshot isExpand false', () => expect(renderer.create(<HiddenItemPanel {...defaultProps} />).toJSON()).toMatchSnapshot());

  test('Snapshot isExpand true', () => {
    window.console.error = jest.fn(); // Silence unique key warning. It will be triggered by error.
    const component = getShallowComponent();
    component.setState({ isExpand: true });
    expect(renderer.create(component).toJSON()).toMatchSnapshot();
  });
});
