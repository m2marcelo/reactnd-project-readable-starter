import axios from 'axios';

import { GET_CATEGORIES, URL, AUTH } from '../constants';

export function getCategories () {
  const url = `${URL}/categories`;
  const config = {
    headers: {'Authorization': AUTH}
  }

  const request = axios.get(url, config);

  return {
    type: GET_CATEGORIES,
    payload: request
  }
}
