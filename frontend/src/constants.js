export const URL = 'http://localhost:5001';
export const AUTH = 'marcelo';

export const GET_CATEGORIES = 'getCategories';
export const FETCH_POSTS = 'fetchPosts';
export const SORT_POSTS = 'sortPosts';
export const LIKE_POST = 'likePost';
export const DISLIKE_POST = 'dislikePost';
export const DELETE_POST = 'deletePost';
export const GET_COMMENTS = 'getComments';
export const SORT_COMMENTS = 'sortComments';
export const LIKE_COMMENT = 'likeComment';
export const DISLIKE_COMMENT = 'dislikeComment';
export const DELETE_COMMENT = 'deleteComment';
export const NEW_POST = 'newPost';
export const EDIT_POST = 'editPost';
export const NEW_COMMENT = 'newComment';
export const EDIT_COMMENT = 'editComment';
export const COMMENT_TOO_SHORT = "Oh c'mon! Speak up! Add some 20 characters, be free! :D";
export const ERROR_NAME = 'I am sure you have a bigger name...';
export const ERROR_TITLE = 'Please add a bigger title, people need to understand :)';
export const WRITE_COMMENT = 'Please, write your comment here';
export const AUTHOR_PLACEHOLDER = 'Marcelo N. de Morais';

export const SORT_POSTS_BY = {
  VOTES: 'voteScore',
  COMMENTS: 'comments',
  DATE: 'timestamp'
}

export const POSTS_SORTING_LABELS = {
  voteScore: 'By score',
  comments: 'By comments',
  timestamp: 'By date'
}

export const SORT_COMMENTS_BY = {
  VOTES: 'voteScore',
  DATE: 'timestamp'
}

export const COMMENTS_SORTING_LABELS = {
  voteScore: 'By score',
  timestamp: 'By date'
}

export const VOTE = {
  UP: 'upVote',
  DOWN: 'downVote'
}
