import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import { LoginRedirect } from '../../app/components/LoginRedirect';
import { JWT_MESSAGE, LOGIN_CALLBACK_URL } from '../../app/config';

jest.mock('@material-ui/core/LinearProgress', () => 'LinearProgress');
jest.mock('@material-ui/core/Typography', () => 'Typography');

describe('LoginRedirect', () => {
  const defaultProps = {
    classes: {
      root: 'root',
      progress: 'progeress',
      title: 'title'
    },
    parserUserFromJwt: jest.fn(),
    history: {
      push: jest.fn()
    },
    location: { search: { match: jest.fn() } },
    user: {}
  };
  const getShallowComponent = (props = defaultProps) => shallow(<LoginRedirect {...defaultProps} />);

  test('constructor without jwt', () => {
    getShallowComponent();
    expect(defaultProps.location.search.match).toHaveBeenCalledTimes(1);
    expect(defaultProps.parserUserFromJwt).not.toHaveBeenCalled();
    // expect(localStorage.setItem).not.toHaveBeenCalled();
    // expect(localStorage.getItem).not.toHaveBeenCalled();
    expect(defaultProps.history.push).not.toHaveBeenCalled();
    expect(localStorage.getItem(JWT_MESSAGE)).toBeNull();
  });

  test('constructor with jwt and user', () => {
    getShallowComponent({ ...defaultProps, user: { _id: 'id' } });
    expect(defaultProps.location.search.match).toHaveBeenCalledTimes(2);
    expect(defaultProps.parserUserFromJwt).not.toHaveBeenCalled();
    expect(defaultProps.history.push).not.toHaveBeenCalled();
    expect(localStorage.getItem(JWT_MESSAGE)).toBeNull();
  });

  test('constructor with jwt and  without user', () => {
    defaultProps.location.search.match.mockReturnValueOnce(['', 'jwtMessage']);
    getShallowComponent();
    expect(defaultProps.location.search.match).toHaveBeenCalledTimes(3);
    expect(defaultProps.parserUserFromJwt).toHaveBeenCalledTimes(1);
    expect(defaultProps.parserUserFromJwt).toHaveBeenLastCalledWith('jwtMessage');
    // expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    // expect(localStorage.setItem).toHaveBeenLastCalledWith(JWT_MESSAGE, 'jwtMessage');
    // expect(localStorage.getItem).toHaveBeenCalledTimes(1);
    // expect(localStorage.getItem).toHaveBeenLastCalledWith(LOGIN_CALLBACK_URL);
    // expect(localStorage.getItem(JWT_MESSAGE)).toEqual('jwtMessage');
    expect(defaultProps.history.push).toHaveBeenCalledTimes(1);
    expect(defaultProps.history.push).toHaveBeenLastCalledWith('/');
  });

  test('constructor with jwt and  without user', () => {
    localStorage.removeItem(JWT_MESSAGE);
    localStorage.setItem(LOGIN_CALLBACK_URL, 'callbackUrl');
    defaultProps.location.search.match.mockReturnValueOnce(['', 'jwtMessage']);
    // localStorage.__STORE__[LOGIN_CALLBACK_URL] = 'callbackUrl'; // Set up a fake local storage value.
    getShallowComponent();
    expect(defaultProps.location.search.match).toHaveBeenCalledTimes(4);
    expect(defaultProps.parserUserFromJwt).toHaveBeenCalledTimes(2);
    expect(defaultProps.parserUserFromJwt).toHaveBeenLastCalledWith('jwtMessage');
    // expect(localStorage.setItem).toHaveBeenCalledTimes(2);
    // expect(localStorage.setItem).toHaveBeenLastCalledWith(JWT_MESSAGE, 'jwtMessage');
    // expect(localStorage.getItem).toHaveBeenCalledTimes(2);
    // expect(localStorage.getItem).toHaveBeenLastCalledWith(LOGIN_CALLBACK_URL);
    expect(defaultProps.history.push).toHaveBeenCalledTimes(2);
    expect(defaultProps.history.push).toHaveBeenLastCalledWith('callbackUrl');
  });

  test('snapshot', () => expect(renderer.create(<LoginRedirect {...defaultProps} />).toJSON()).toMatchSnapshot());
});
