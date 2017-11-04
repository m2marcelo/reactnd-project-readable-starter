import {
  SORT_POSTS_BY,
  GET_COMMENTS,
  SORT_COMMENTS,
  LIKE_COMMENT,
  DISLIKE_COMMENT,
  DELETE_COMMENT,
  NEW_COMMENT,
  EDIT_COMMENT
} from '../constants';

const initialState = {
  fetched: false,
  sort:SORT_POSTS_BY.VOTES
}

export default function (state = initialState, action) {
  let data;

  switch (action.type) {
  case GET_COMMENTS:
    return {
      ...state,
      fetched: true,
      data: {...state.data, ...action.payload}
    }

  case SORT_COMMENTS:
    return {
      ...state,
      sort: action.payload
    }

    case DELETE_COMMENT:
      data = {
        ...state.data
      }

      delete data[action.meta.post][action.payload];

      return {
        ...state,
        data
      }

    case NEW_COMMENT:
      data = {
        ...state.data
      }

      data[action.payload.parentId][action.payload.id] = action.payload;

      return {
        ...state,
        data
      }

  case LIKE_COMMENT:
    data = {
      ...state.data
    }

    data[action.meta.post][action.payload].voteScore += 1;

    return {
      ...state,
      data
    }

  case DISLIKE_COMMENT:
    data = {
      ...state.data
    }

    data[action.meta.post][action.payload].voteScore -= 1;

    return {
      ...state,
      data
    }

  case EDIT_COMMENT:
    data = {
      ...state.data
    }

    data[action.payload.parentId][action.payload.id] = action.payload;

    return {
      ...state,
      data
    }


  default:
    return state;
  }
}
