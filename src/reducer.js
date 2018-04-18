import { combineReducers } from 'redux';

const todosReducer = (state = [], action) => {
  // console.log("action: ",action,"  state: ",state)
  switch (action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text,
        vis: action.vis
      }
    case 'VISIBILITY':
      if (state.id !== action.id) {
        return state;
      }
      return {
        ...state,
          vis: !state.vis
      };

    default:
      return state;
  }
}
const filterTagReducer = (state = 'all', action) => {
  // console.log(state, action,"===state, action")
  switch (action.type) {
    case 'FILTER_TODO':
      return action.tag;

    default:
      return state;
  }
}

const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        todosReducer(undefined, action)
      ]
    case 'VISIBILITY':
      // console.log(state)
      return state.map(item => {
        return todosReducer(item, action)
      });
    default:
      return state;
  }
}

const filterTag = (state = 'all', action) => {
  switch (action.type) {
    case 'FILTER_TODO':
      return filterTagReducer(state = 'all', action);

    default:
      return state;
  }
}



const reducer = combineReducers({
  todos,
  filterTag
})

export default reducer;