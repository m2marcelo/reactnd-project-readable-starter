import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from "react-redux";
import {createStore, applyMiddleware} from "redux";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import promise from "redux-promise";

import reducers from "./reducers";
import PostList from './components/postList';
import { EditPost, EditComment } from './components/form';
import PostDetail from './components/postDetail';
import NotFound from './components/notFound';
import Header from './components/header';

import './index.css';

const createStoreWithMiddlewares = applyMiddleware(promise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddlewares(reducers)}>
    <Router>
      <div className="Container">
        <Route component={Header} />

        <Switch className="Content">
          <Route path='/' exact component={PostList} />
          <Route path='/category/:category' component={PostList} />
          <Route path='/:category/:post/comment/:comment/edit' component={EditComment} />
          <Route path='/:category/:post/comment/new' component={EditComment} />
          <Route path='/:category/:post/edit' component={EditPost} />
          <Route path='/:category/new' exact component={EditPost} />
          <Route path='/:category/:post' component={PostDetail} />
          <Route component={NotFound}/>
        </Switch>
      </div>
    </Router>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
