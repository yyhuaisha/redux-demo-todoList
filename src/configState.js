import { createStore } from 'redux';
import reducer from './reducer.js';

const initialState = {
  todos: [{
    id: 0,
    text: 'first',
    vis: false
  }, {
    id: 1,
    text: 'two',
    vis: false
  }, {
    id: 2,
    text: 'three',
    vis: false
  }],
  filterTag: "all"
}

export default createStore(reducer, initialState);