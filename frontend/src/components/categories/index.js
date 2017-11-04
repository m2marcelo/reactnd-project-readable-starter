import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './index.css';

import { getCategories } from '../../actions/categories';

class Categories extends Component {
  componentDidMount () {
    const {categories, getCategories} = this.props;
    const fetched = categories && categories.fetched;
    !fetched && getCategories();
  }

  showCategory (name, path) {
    const current = this.props.category;
    const category = `${name.substring(0, 1).toUpperCase()}${name.substring(1)}`;

    const css = current === name ? 'enabled' : '';
    return (
      <li key={name}>
        <Link className={css} to={path}>{category}</Link>
      </li>
    );
  }

  showCategoryData (categories) {
    return categories.map((category) => {
      const path = `/category/${category.path}`;
      const {name} = category;
      return this.showCategory(name, path);
    });
  }

  render () {
    const {categories} = this.props;
    const {fetched} = categories;

    if (!fetched) {
      return null;
    }

    return (
      <ul className='Categories'>
        {this.showCategory('all', '')}
        {this.showCategoryData(categories.data)}
      </ul>
    );
  }
}

const mapStateToPros = ({categories}) => {
  return { categories };
}

export default connect(mapStateToPros, {getCategories})(Categories);
