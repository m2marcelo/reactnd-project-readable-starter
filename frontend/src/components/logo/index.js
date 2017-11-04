import React from 'react';
import {Link} from 'react-router-dom';

import './index.css';

const Logo = () => {
  return (
    <h1 className='Logo'>
      <Link to='/'>Marcelo's Readable</Link>
    </h1>
  );
}

export default Logo;
