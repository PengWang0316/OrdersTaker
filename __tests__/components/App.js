import React from 'react';
import renderer from 'react-test-renderer';

import App from '../../app/components/App';

jest.mock('react-router-dom', () => ({
  BrowserRouter: ({ children }) => children,
  Route: ({ path, render }) => {
    if (render) return `<Route render=${render()} />`;
    return `<Route path=${path} />`;
  },
  Switch: ({ children }) => children
}));
jest.mock('../../app/components/Navbar', () => 'Navbar');
jest.mock('../../app/components/containers/HomePageContainer', () => 'HomePageContainer');

describe('App component test', () => {
  test('App snapshot', () => expect(renderer.create(<App />).toJSON()).toMatchSnapshot());
});
