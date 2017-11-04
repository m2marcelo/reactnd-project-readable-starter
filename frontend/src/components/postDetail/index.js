import React, { Component} from 'react';
import {connect} from 'react-redux';
import format from 'date-fns/format';
import {Link, Redirect} from 'react-router-dom';

import { fetchPosts, votePost, deletePost } from '../../actions/posts';
import { getComments } from '../../actions/comments';
import { VOTE } from '../../constants';
import {SortComments} from '../sort';
import Comment from '../comments';
import Score from '../score';
import Loading from '../loading';

import './index.css';

class PostDetail extends Component {
  componentDidMount () {
    const {fetchPosts, getComments, posts, comments} = this.props;
    const postID = this.getPostID();

    if (!posts || !posts.fetched) {
      fetchPosts();
    }

    if (!comments || !comments.fetched || !comments.data[postID]) {
      getComments(postID);
    }
  }

  getPostID () {
    const {match} = this.props;
    return match.params.post;
  }

  getCategoryID () {
    const {match} = this.props;
    return match.params.category;
  }

  deletePostHandler = () => {
    const postID = this.getPostID();
    const {deletePost, history} = this.props;
    deletePost(postID, () => {
      history.push("/");
    })
  }

  vote = (option) => {
    const post = this.getPostID();
    const {votePost} = this.props;
    votePost(post, option);
  }

  voteUp = () => {
    this.vote(VOTE.UP);
  }

  voteDown = () => {
    this.vote(VOTE.DOWN);
  }

  renderPost () {
    const {posts} = this.props;
    const postID = this.getPostID();
    const category = this.getCategoryID();
    const post = posts.data[postID];
    const {author, title, body, timestamp, voteScore} = post;

    return (
      <div>
        <h1 className='Post-title'>{title}</h1>
        <h6 className='Post-meta'>Submitted by <span>{author}</span>, {format(timestamp, 'D MMM YYYY')}</h6>

        <div className='Post-links'>
          <Link className='Link' to={`/${category}/${postID}/edit`}>
            Edit post
          </Link>
          <button className='Link' onClick={this.deletePostHandler}>
            Delete post
          </button>
        </div>

        <p className='Post-body'>{body}</p>

        <Score score={voteScore} voteUp={this.voteUp} voteDown={this.voteDown} />
      </div>
    );
  }

  sortComments () {
    const {comments} = this.props;
    const sortKey = comments.sort;
    const postID = this.getPostID();
    const postComments = comments.data[postID];

    if (!postComments || Object.keys(postComments).length === 0) {
      return [];
    }

    return Object.values(postComments).sort((a, b) => {
      return b[sortKey] - a[sortKey]
    });
  }

  renderComments () {
    const postComments = this.sortComments();
    const postID = this.getPostID();
    const categoryID = this.getCategoryID();

    if (postComments.length > 0) {
      return (
        <div>
          <SortComments />
          <ul>
          {
            postComments.map((comment) => {
              const {id} = comment;
              return (
                <Comment key={id} category={categoryID} post={postID} {...comment} />
              );
            })
          }
          </ul>
        </div>
      );
    } else {
      return (
        <div className='Post-comments'>No comments yet. Be the first!</div>
      );
    }
  }

  render () {
    const {posts, comments} = this.props;
    const postID = this.getPostID();
    const category = this.getCategoryID();

    if (!posts.fetched || !comments.fetched) {
      return (
        <Loading />
      );
    } else {

      const post = posts.data[postID];

      if (!post) {
        return (
          <Redirect to='/404' />
        );
      }

      return (
        <div className='Content'>
          <div className='Main'>
            {this.renderPost()}
            {this.renderComments()}

            <Link title='Add new comment' className='Rounded Add-comment' to={`/${category}/${postID}/comment/new`}>
              <svg version="1.1" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 100 100"><path d="M94.6,19.5v46.1c0,6.8-5.5,12.3-12.3,12.3H50.6c-1.9,0-3.5-1.6-3.5-3.5s1.6-3.5,3.5-3.5h31.8c2.9,0,5.3-2.4,5.3-5.3V19.5  c0-2.9-2.4-5.3-5.3-5.3H17.6c-2.9,0-5.3,2.4-5.3,5.3v46.1c0,2.9,2.4,5.3,5.3,5.3h1.6c1.9,0,3.5,1.6,3.5,3.5v8.3l10.8-10.8  c1.4-1.4,3.6-1.4,4.9,0c1.4,1.4,1.4,3.6,0,4.9L23.9,91.4c-0.9,0.9-2.1,1.4-3.3,1.4c-0.6,0-1.2-0.1-1.8-0.4c-1.8-0.7-2.9-2.5-2.9-4.4  V77.7c-5.9-0.9-10.4-6-10.4-12.1V19.5c0-6.8,5.5-12.3,12.3-12.3h64.7C89.1,7.2,94.6,12.7,94.6,19.5z M54.4,43c0-2.4-2-4.4-4.4-4.4  c-2.4,0-4.4,2-4.4,4.4c0,2.4,2,4.4,4.4,4.4C52.4,47.4,54.4,45.4,54.4,43z M68.2,43c0-2.4-2-4.4-4.4-4.4c-2.4,0-4.4,2-4.4,4.4  c0,2.4,2,4.4,4.4,4.4C66.2,47.4,68.2,45.4,68.2,43z M31.8,43c0,2.4,2,4.4,4.4,4.4c2.4,0,4.4-2,4.4-4.4c0-2.4-2-4.4-4.4-4.4  C33.8,38.5,31.8,40.5,31.8,43z"></path>
              </svg>
            </Link>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = ({comments, posts}) => {
  return { comments, posts };
}

export default connect(mapStateToProps, { getComments, fetchPosts, votePost, deletePost })(PostDetail);
