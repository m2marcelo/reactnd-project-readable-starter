import React from 'react';
import {connect} from 'react-redux';
import {sortComments} from '../../actions/comments';
import { SORT_COMMENTS_BY, COMMENTS_SORTING_LABELS } from '../../constants';

const SortCommentsOptions = ({activeSort, sortComments}) => {
  const buttons = Object.values(SORT_COMMENTS_BY).map((sortKey) => {
    return (
      <li key={sortKey}>
        <button
          className={activeSort === sortKey ? 'Button Button--small is-active' : 'Button  Button--small'}
          onClick={(e) => {
              sortComments(sortKey)
            }
          }
        >{COMMENTS_SORTING_LABELS[sortKey]}</button>
      </li>
    );
  })

  return (
    <ul className='Sort'>
      <li key='plain' className='Sort-comments'>
        Show comments:
      </li>

      {buttons}
    </ul>
  );
}

const mapStateToProps = state => {
  return {
    activeSort: state.comments.sort
  }
}

export default connect(mapStateToProps, {sortComments})(SortCommentsOptions);
