import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { fetchBasicInformation } from '../../app/actions/BasicInformationActions';
import { FETCH_BASIC_INFORMATION_SUCCESS } from '../../app/actions/ActionTypes';
import { API_FETCH_BASIC_INFORMATION } from '../../app/actions/ApiUrls';

const axiosMock = new MockAdapter(axios); // Setting up a mock for axios.
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('BasicInformationActions', () => {
  test('fetchBasicInformation', () => {
    const basicInformation = {};
    axiosMock.onGet(API_FETCH_BASIC_INFORMATION).reply(200, basicInformation);
    const expectedActions = [{ type: FETCH_BASIC_INFORMATION_SUCCESS, basicInformation }];
    const store = mockStore();
    return store.dispatch(fetchBasicInformation())
      .then(() => expect(store.getActions()).toEqual(expectedActions));
  });

  test('fetchBasicInformation with axios error', () => {
    const mockErrorFn = jest.fn();
    window.console.error = mockErrorFn;
    axiosMock.onGet(API_FETCH_BASIC_INFORMATION).networkError();
    const store = mockStore();
    return store.dispatch(fetchBasicInformation())
      .then(() => expect(mockErrorFn).toHaveBeenCalledTimes(1));
  });
});
