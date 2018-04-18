import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from './configState.js';

let id = 3;


const getTodos = (todos, filterTag) => {
  switch (filterTag) {
    case 'done':
      return todos.filter(
        item => item.vis
      );
    case 'notdone':
      return todos.filter(
        item => !item.vis
      );
    default:
      return todos;
  }
}


const changeHandler = (event) => {
  store.dispatch({
    type: 'VISIBILITY',
    id: Number(event.target.id),
    vis: !event.target.checked
  })
}
const clickFilter = (tag) => {
  store.dispatch({
    type: 'FILTER_TODO',
    tag: tag
  })
}

class Todos extends Component {
  clickHandler = (event) => {
    event.preventDefault();
    store.dispatch({
      type: 'ADD_TODO',
      text: this.input.value,
      id: id++,
      vis: false
    })
    this.input.value = '';
  }
  // componentWillMount = () => {
  //   store.subscribe(() => {
  //     this.forceUpdate();
  //   })
  // }

  render() {
    let input;
    const { todos,filterTag } = this.props;


    console.log("todos: ", todos, "filterTag: ",filterTag);
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
                                       onChange={ changeHandler } />
                                { todo.text }
                              </li>
            ) }
        </ul>
        <div>
          <button onClick={ () => clickFilter('all') } disabled={filterTag === 'all'}>
            all
          </button>
          <button onClick={ () => clickFilter('done') } disabled={filterTag === 'done'}>
            done
          </button>
          <button onClick={ () => clickFilter('notdone') } disabled={filterTag === 'notdone'}>
            not done
          </button>
        </div>
      </div>
    )
  }
}


const mapStateToProps = state => {
  return {
    todos: getTodos(state.todos, state.filterTag),
    filterTag: state.filterTag,
    // todos: getVisibleTodos(state.todos, state.visibilityFilter)
  }
}

export default connect(mapStateToProps)(Todos);
