import axios from 'axios';

import { URL, AUTH } from '../constants';
import { uuidv4 } from '../helpers';

import {
  GET_COMMENTS,
  SORT_COMMENTS,
  DOWN_VOTE_COMMENT,
  UP_VOTE_COMMENT,
  DELETE_COMMENT,
  NEW_COMMENT,
  UPDATE_COMMENT,
  VOTE,
} from '../constants';

export function getComments (postID) {
  const url = `${URL}/posts/${postID}/comments`;
  const config = {
    headers: {'Authorization': AUTH}
  }

  const request = axios.get(url, config)
    .then(comments => {
      let result = {};
      result[postID] = comments.data.reduce((result, comment) => {
        result[comment.id] = comment;
        return result;
      }, {});
      return result;
    })

  return {
    type: GET_COMMENTS,
    payload: request
  }
}

export function sortComments (byKey) {
  return {
    type: SORT_COMMENTS,
    payload: byKey
  }
}

export function voteComment (postID, commentID, option) {
  const url = `${URL}/comments/${commentID}`;
  const config = {
    headers: {'Authorization': AUTH}
  }

  const data = {
    option
  }

  axios.post(url, data, config);

  return {
    type: option === VOTE.UP ? UP_VOTE_COMMENT : DOWN_VOTE_COMMENT,
    payload: commentID,
    meta: {
      post: postID
    }
  }
}

export function deleteComment (postID, commentID) {
  const url = `${URL}/comments/${commentID}`;
  const config = {
    headers: {'Authorization': AUTH}
  }

  axios.delete(url, config);

  return {
    type: DELETE_COMMENT,
    payload: commentID,
    meta: {
      post: postID
    }
  }
}

export function saveComment (postID, values, callback) {
  const url = `${URL}/comments`;
  const config = {
    headers: {'Authorization': AUTH}
  }
  const metadata = {
    id: uuidv4(),
    timestamp: Date.now(),
    parentId: postID,
    voteScore: 1
  }
  const data = {
    ...values,
    ...metadata
  }

  axios.post(url, data, config)
    .then(() => callback());

  return {
    type: NEW_COMMENT,
    payload: data
 }
}

export function updateComment (commentID, values, callback) {
  const url = `${URL}/comments/${commentID}`;
  const config = {
    headers: {'Authorization': AUTH}
  }
  const metadata = {
    timestamp: Date.now()
  }
  const data = {
    ...values,
    ...metadata
  }

  axios.put(url, data, config)
    .then(() => callback());

  return {
    type: UPDATE_COMMENT,
    payload: data
  }
}
