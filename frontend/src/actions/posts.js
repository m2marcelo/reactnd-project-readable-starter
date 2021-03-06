import axios from 'axios';

import { uuidv4 } from '../helpers';

import {
  URL,
  AUTH,
  FETCH_POSTS,
  SORT_POSTS,
  DISLIKE_POST,
  LIKE_POST,
  VOTE,
  EDIT_POST,
  NEW_POST,
  DELETE_POST
} from '../constants';

export function fetchPosts () {
  const postUrl = `${URL}/posts`;
  const config = {
    headers: {'Authorization': AUTH}
  }

  let postsWithComments;

  const request = axios.get(postUrl, config)
    .then((posts) => {
      // Working with an indexed object instead array for posts
      postsWithComments = posts.data.reduce((result, value) => {
        result[value.id] = value;
        return result;
      }, {});

      // for every post we need to get the number of comments in order to be
      // able to sort by popular (number of comments)
      return Promise.all(posts.data.map(post => {
        const postCommentsUrl = `${URL}/posts/${post.id}/comments`;
        return axios.get(postCommentsUrl, config)
          .then(comments => {
            return {
              id: post.id,
              comments: comments.data.length
            }
          });
      }))
        .then(values => {
          return values.reduce((result, value) => {
            result[value.id].comments = value.comments;
            return result;
          }, postsWithComments);
        })
      }
    );

  return {
    type: FETCH_POSTS,
    payload: request
  }
}

export function votePost (postID, option) {
  const url = `${URL}/posts/${postID}`;
  const config = {
    headers: {'Authorization': AUTH}
  }

  const data = {
    option
  }

  axios.post(url, data, config);

  return {
    type: option === VOTE.UP ? LIKE_POST : DISLIKE_POST,
    payload: postID
  }
}

export function deletePost (postID, callback) {
  const url = `${URL}/posts/${postID}`;
  const config = {
    headers: {'Authorization': AUTH}
  }

  axios.delete(url, config)
  .then(() => callback && callback());

  return {
    type: DELETE_POST,
    payload: postID
  }
}

export function savePost (values, callback) {
  const url = `${URL}/posts`;
  const config = {
    headers: {'Authorization': AUTH}
  }
  const metadata = {
    id: uuidv4(),
    timestamp: Date.now()
  }
  const data = {
    ...values,
    ...metadata
  }

  axios.post(url, data, config)
    .then(() => callback());

  return {
    type: NEW_POST,
    payload: data
  }
}

export function sortPosts (desiredOrder) {
  return {
    type: SORT_POSTS,
    payload: desiredOrder
  }
}

export function editPost (postID, values, callback) {
  const url = `${URL}/posts/${postID}`;
  const config = {
    headers: {'Authorization': AUTH}
  }
  const metadata = {
    id: postID
  }
  const data = {
    ...values,
    ...metadata
  }

  axios.put(url, values, config)
    .then(() => callback());

  return {
    type: EDIT_POST,
    payload: data
  }
}
