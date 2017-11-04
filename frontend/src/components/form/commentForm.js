import React from 'react'
import {Field, reduxForm} from 'redux-form'
import {renderText, renderTextarea} from './util';
import {
  COMMENT_TOO_SHORT,
  ERROR_NAME,
  WRITE_COMMENT,
  AUTHOR_PLACEHOLDER
} from '../../constants';

const validate = values => {
  const errors = {}
  if (!values.body) {
    errors.body = 'Required'
  } else if (values.body.length < 20) {
    errors.body = COMMENT_TOO_SHORT
  }

  if (!values.author) {
    errors.author = 'Required'
  } else if (values.author.length < 2) {
    errors.author = ERROR_NAME
  }

  return errors
}

const CommentForm = (props) => {
  const {handleSubmit, pristine, reset, submitting} = props;

  return (
    <form className='Form' onSubmit={handleSubmit}>
      <div className='Form-group'>
        <label className='Form-label'>Body</label>
        <div>
          <Field
            name="body"
            component={renderTextarea}
            placeholder={WRITE_COMMENT}
          />
        </div>
      </div>

      <div className='Form-group'>
        <label className='Form-label'>Author</label>
        <div>
          <Field
            name="author"
            component={renderText}
            type="text"
            placeholder={AUTHOR_PLACEHOLDER}
          />
        </div>
      </div>

      <div className='Form-group'>
        <button className='Button' type="submit" disabled={pristine || submitting}>
          Submit
        </button>
        <button className='Button' type="button" disabled={pristine || submitting} onClick={reset}>
          Clean
        </button>
      </div>
    </form>
  )
};

export default reduxForm({
  form: 'comment',
  validate,
})(CommentForm);
