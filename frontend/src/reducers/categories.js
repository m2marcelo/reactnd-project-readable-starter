import { GET_CATEGORIES } from '../constants';

const initialState = {
  fetched: false
}

export default function (state = initialState, action) {
  switch (action.type) {
  case GET_CATEGORIES:
    return {
      ...state,
      fetched: true,
      data: action.payload.data.categories
    }
  default:
    return state;
  }
}
