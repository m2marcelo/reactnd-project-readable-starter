import axios from 'axios';

import { URL, APIKEY } from '../config';
import { FETCH_CATEGORIES } from '../constants';

export function fetchCategories () {
  const url = `${URL}/categories`;
  const config = {
    headers: {'Authorization': APIKEY}
  }

  const request = axios.get(url, config);

  return {
    type: FETCH_CATEGORIES,
    payload: request
  }
}
