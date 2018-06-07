import axios from 'axios';

import { FETCH_BASIC_INFORMATION_SUCCESS } from './ActionTypes';
import { API_FETCH_BASIC_INFORMATION } from './ApiUrls';

const fetchInformationSccuess = basicInformation => ({
  type: FETCH_BASIC_INFORMATION_SUCCESS,
  basicInformation
});

export const fetchBasicInformation = () =>
  dispatch => axios.get(API_FETCH_BASIC_INFORMATION)
    .then(({ data }) => dispatch(fetchInformationSccuess(data))).catch(err => console.error(err));

export default fetchBasicInformation;
