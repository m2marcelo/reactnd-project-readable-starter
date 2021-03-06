import {
  SORT_POSTS_BY,
  FETCH_POSTS,
  SORT_POSTS,
  LIKE_POST,
  DISLIKE_POST,
  DELETE_POST,
  DELETE_COMMENT,
  NEW_POST,
  EDIT_POST,
  NEW_COMMENT
} from '../constants';

const initialState = {
  fetched: false,
  sort: SORT_POSTS_BY.VOTES
}

export default function (state = initialState, action) {
  let data;

  switch (action.type) {
  case FETCH_POSTS:
    return {
      ...state,
      fetched: true,
      data: action.payload
    }

  case SORT_POSTS:
    return {
      ...state,
      sort: action.payload
    }

  case LIKE_POST:
    data = {
      ...state.data
    }
    data[action.payload].voteScore += 1;

    return {
      ...state,
      data
    }

  case DISLIKE_POST:
    data = {
      ...state.data
    }
    data[action.payload].voteScore -= 1;

    return {
      ...state,
      data
    }

  case DELETE_POST:
    data = {
      ...state.data
    }
    delete data[action.payload];

    return {
      ...state,
      data
    }

  case DELETE_COMMENT:
    data = {
      ...state.data
    }
    data[action.meta.post].comments -= 1;

    return {
      ...state,
      data
    }

  case NEW_POST:
    data = {
      ...state.data
    }

    const newData = {
      comments: 0,
      voteScore: 0
    }

    data[action.payload.id] = {
      ...action.payload,
      ...newData
    }

    return {
      ...state,
      data
    }

  case EDIT_POST:
    data = {
      ...state.data
    }

    data[action.payload.id] = {
      ...state.data[action.payload.id],
      ...action.payload
    }

    return {
      ...state,
      data
    }

  case NEW_COMMENT:
    data = {
      ...state.data
    }

    data[action.payload.parentId].comments += 1;

    return {
      ...state,
      data
    }

  default:
    return state;
  }
}
