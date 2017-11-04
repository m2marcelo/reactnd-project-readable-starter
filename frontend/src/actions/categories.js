import axios from 'axios';

import { FETCH_CATEGORIES, URL, AUTH } from '../constants';

export function fetchCategories () {
  const url = `${URL}/categories`;
  const config = {
    headers: {'Authorization': AUTH}
  }

  const request = axios.get(url, config);

  return {
    type: FETCH_CATEGORIES,
    payload: request
  }
}
