import React, { Component } from 'react';
import store from './configState.js';

let id = 3;

export default class Todos extends Component {
  clickHandler = () => {
    store.dispatch({
      type: 'ADD_TODO',
      text: this.input.value,
      id: id++,
      vis: false
    })
    this.input.value = '';
  }
  changeHandler = (event) => {
    store.dispatch({
      type: 'VISIBILITY',
      id: Number(event.target.id),
      vis: !this.input.checked
    })
  }
  clickFilter = (tag) => {
    store.dispatch({
      type: 'FILTER_TODO',
      tag: tag
    })
  }


  componentWillMount = () => {
    store.subscribe(() => {
      this.forceUpdate();
    })
  }
  render() {
    let input;
    const olgTodos = store.getState().todos;
    const todos = (() => {
      switch (store.getState().filterTag) {
        case 'done':
          return olgTodos.filter(
            item => item.vis
          );
        case 'notdone':
          return olgTodos.filter(
            item => !item.vis
          );
        default:
          return olgTodos;
      }
    })()
    console.log("todos: ", todos);
    return (
      <div>
        <div>
          <input ref={ node => {
                         this.input = node;
                       } } />
          <button onClick={ this.clickHandler }>
            add
          </button>
        </div>
        <ul>
          { todos.map(todo => <li key={ todo.id }>
                                <input
                                       type="checkbox"
                                       id={ todo.id }
                                       defaultChecked={ todo.vis }
                                       onChange={ this.changeHandler } />
                                { todo.text }
                              </li>
            ) }
        </ul>
        <div>
          <button onClick={ () => this.clickFilter('all') }>
            all
          </button>
          <button onClick={ () => this.clickFilter('done') }>
            done
          </button>
          <button onClick={ () => this.clickFilter('notdone') }>
            not done
          </button>
        </div>
      </div>
    )
  }
}
