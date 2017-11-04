import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {votePost, deletePost} from '../../actions/posts';
import { VOTE } from '../../constants';
import format from 'date-fns/format';
import Score from '../score';

import './index.css';

const PostItem = (props) => {
  const {id, author, title, timestamp, comments, voteScore, votePost, deletePost, category} = props;

  const voteUp = (e) => {
    votePost(id, VOTE.UP);
  }

  const voteDown = (e) => {
    votePost(id, VOTE.DOWN);
  }

  return (
    <li className='PostItem'>
      <h2 className='PostItem-title'>
        <Link to={`/${category}/${id}`}>
          {title}
        </Link>
      </h2>

      <div className='PostItem-meta'>
        <div>
          Submitted by <span className='PostItem-author'>{author}</span>, {format(timestamp, 'D MMM YYYY')}
        </div>

        <div>{comments} comments</div>
      </div>

      <Score score={voteScore} voteUp={voteUp} voteDown={voteDown} />

      <button className='Link PostItem-delete' onClick={(e) => deletePost(id)}>
        <svg height="60px" version="1.1" viewBox="0 0 60 60" width="60px" ><title/><desc/><defs/><g fill="none" fill-rule="evenodd" id="Page-1" stroke="none" stroke-width="1"><g fill="#0A0B09" id="Group" transform="translate(0.000000, 1.000000)"><path d="M52.472,40.6 L53.659,37.342 C53.79,36.981 53.704,36.578 53.436,36.303 C53.168,36.027 52.767,35.929 52.403,36.052 L49.796,36.92 L48.166,36.105 C47.818,35.933 47.397,35.976 47.091,36.223 C46.786,36.469 46.653,36.87 46.751,37.25 L47.558,40.38 C44.573,41.403 42.227,44.422 41.237,47.702 L42.665,22 L44,22 C44.552,22 45,21.553 45,21 C45,20.447 44.552,20 44,20 L41.206,20 C40.844,15.769 38.516,11.34 35.07,9.671 L36.621,6.432 C36.794,6.07 36.734,5.64 36.469,5.338 C36.203,5.037 35.784,4.923 35.403,5.052 L32.719,5.946 L30.036,5.052 C29.667,4.927 29.259,5.03 28.992,5.313 C28.725,5.597 28.646,6.009 28.79,6.37 L29.961,9.306 C27.801,9.945 25.737,11.518 24.136,13.801 L24,13.783 L24,10 C24,9.607 23.771,9.251 23.413,9.089 C23.055,8.928 22.636,8.989 22.341,9.248 L20.343,11 L17.719,11 C17.334,11 16.983,11.221 16.817,11.568 C16.651,11.915 16.699,12.327 16.94,12.627 L19.151,15.372 C17.887,16.465 16.868,18.06 16.223,20 L14,20 C13.448,20 13,20.447 13,21 C13,21.553 13.448,22 14,22 L14.773,22 L15.489,34.894 C14.323,34.34 13.149,33.984 12,33.832 L12,29 C12,28.639 11.805,28.305 11.49,28.128 C11.174,27.951 10.788,27.957 10.48,28.147 L7.438,30 L4.719,30 C4.357,30 4.024,30.195 3.847,30.511 C3.67,30.826 3.677,31.212 3.866,31.52 L6.079,35.148 C4.406,36.251 2.941,37.968 1.836,40.198 C-0.152,44.211 -0.562,48.989 0.79,52.371 C3.042,58 6.702,58 14.719,58 C15.508,58 16.282,57.904 17.034,57.728 C17.213,57.896 17.455,58 17.719,58 L39.719,58 C40.25,58 40.688,57.585 40.718,57.056 L40.949,52.896 C41.55,55.317 43.593,58 49.719,58 C57.55,58 58.719,53.614 58.719,51 C58.719,46.882 56.142,42.226 52.472,40.6 L52.472,40.6 Z M32.403,7.948 C32.609,8.017 32.83,8.017 33.036,7.948 L33.799,7.694 L33.144,9.063 C33.037,9.046 32.933,9.017 32.824,9.006 C32.547,8.976 32.267,8.988 31.988,8.992 L31.445,7.63 L32.403,7.948 L32.403,7.948 Z M32.614,10.994 C36.173,11.371 38.778,15.842 39.193,20 L32.373,20 C30.969,17.517 28.707,15.339 26.214,14.335 C27.768,12.397 30.07,10.733 32.614,10.994 L32.614,10.994 Z M19.808,13 L20.719,13 C20.962,13 21.196,12.912 21.378,12.752 L22,12.207 L22,13.9 C21.803,13.944 21.605,13.985 21.41,14.049 C21.216,14.112 21.031,14.203 20.844,14.287 L19.808,13 L19.808,13 Z M22.029,15.951 C24.708,15.072 28.01,17.188 30.005,20 L18.346,20 C19.17,17.934 20.488,16.453 22.029,15.951 L22.029,15.951 Z M6.501,32 L7.719,32 C7.903,32 8.083,31.949 8.24,31.854 L10,30.781 L10,33.779 C9.473,33.823 8.954,33.898 8.452,34.036 C8.254,34.091 8.062,34.17 7.868,34.241 L6.501,32 L6.501,32 Z M2.647,51.629 C1.514,48.795 1.908,44.559 3.628,41.086 C4.637,39.05 5.957,37.519 7.442,36.633 L7.556,36.647 C7.733,36.647 7.913,36.601 8.076,36.501 C8.213,36.417 8.314,36.301 8.393,36.174 C8.589,36.096 8.786,36.019 8.986,35.964 C9.428,35.841 9.89,35.779 10.362,35.754 C10.536,35.901 10.754,36 11,36 C11.226,36 11.424,35.911 11.591,35.785 C12.896,35.933 14.264,36.423 15.619,37.222 L16.648,55.741 C16.022,55.895 15.381,56 14.719,56 C6.368,56 4.332,55.84 2.647,51.629 L2.647,51.629 Z M38.773,56 L18.665,56 L16.779,22.054 L16.933,22.074 C17.059,22.074 17.179,22.045 17.293,22 L40.662,22 L38.773,56 L38.773,56 Z M49.235,38.876 L49.272,38.895 C49.509,39.013 49.784,39.034 50.036,38.948 L51.071,38.604 L50.541,40.059 C50.271,40.025 49.997,40 49.719,40 L49.529,40.014 L49.235,38.876 L49.235,38.876 Z M49.719,56 C42.719,56 42.719,52.236 42.719,51 C42.719,46.948 45.949,42 49.719,42 C53.489,42 56.719,46.948 56.719,51 C56.719,52.236 56.719,56 49.719,56 L49.719,56 Z" id="Fill-160"/><path d="M35.775,28.002 C35.216,27.986 34.752,28.394 34.721,28.944 L33.721,46.944 C33.69,47.496 34.112,47.968 34.664,47.998 L34.72,48 C35.247,48 35.688,47.588 35.718,47.056 L36.718,29.056 C36.748,28.504 36.326,28.032 35.775,28.002" id="Fill-161"/><path d="M21.664,28.002 C21.112,28.032 20.69,28.504 20.721,29.056 L21.721,47.056 C21.75,47.588 22.191,48 22.718,48 L22.775,47.998 C23.326,47.968 23.749,47.496 23.718,46.944 L22.718,28.944 C22.687,28.394 22.23,27.99 21.664,28.002" id="Fill-162"/><path d="M29,28 C28.448,28 28,28.447 28,29 L28,47 C28,47.553 28.448,48 29,48 C29.552,48 30,47.553 30,47 L30,29 C30,28.447 29.552,28 29,28" id="Fill-163"/><path d="M7.719,21 C8.27,21 8.713,20.556 8.716,20.006 C8.719,19.456 8.275,19.006 7.725,19 C7.223,18.994 4.719,18.823 4.719,16 C4.719,14.618 5.233,14.361 6.166,13.895 C7.244,13.355 8.719,12.618 8.719,10 C8.719,7.971 7.797,6.402 6.124,5.585 C5.627,5.341 5.029,5.549 4.787,6.044 C4.544,6.541 4.75,7.14 5.246,7.382 C6.237,7.866 6.719,8.723 6.719,10 C6.719,11.382 6.205,11.639 5.272,12.105 C4.195,12.645 2.719,13.382 2.719,16 C2.719,19.955 5.99,21 7.719,21" id="Fill-164"/><path d="M53.719,27.517 C53.167,27.517 52.719,27.964 52.719,28.517 C52.719,29.069 53.167,29.517 53.719,29.517 C55.449,29.517 58.719,28.472 58.719,24.517 C58.719,21.898 57.244,21.161 56.166,20.622 C55.233,20.155 54.719,19.898 54.719,18.517 C54.719,17.239 55.201,16.383 56.192,15.898 C56.688,15.656 56.894,15.058 56.651,14.561 C56.41,14.065 55.81,13.858 55.314,14.102 C53.641,14.919 52.719,16.487 52.719,18.517 C52.719,21.135 54.195,21.872 55.272,22.411 C56.205,22.878 56.719,23.135 56.719,24.517 C56.719,27.34 54.216,27.511 53.719,27.517" id="Fill-165"/><path d="M46.719,13.517 C46.167,13.517 45.719,13.964 45.719,14.517 C45.719,15.069 46.167,15.517 46.719,15.517 C48.449,15.517 51.719,14.472 51.719,10.517 C51.719,7.898 50.244,7.161 49.167,6.622 C48.233,6.155 47.719,5.898 47.719,4.517 C47.719,3.239 48.201,2.383 49.192,1.898 C49.688,1.656 49.894,1.058 49.651,0.561 C49.409,0.065 48.81,-0.143 48.314,0.102 C46.641,0.919 45.719,2.487 45.719,4.517 C45.719,7.135 47.195,7.872 48.272,8.411 C49.205,8.878 49.719,9.135 49.719,10.517 C49.719,13.34 47.216,13.511 46.719,13.517" id="Fill-166"/></g></g></svg>
      </button>
    </li>
  );
}

export default connect(null, {votePost, deletePost})(PostItem);
