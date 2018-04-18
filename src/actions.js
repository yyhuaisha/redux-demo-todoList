let itemId = 0;
// 添加list
export addTodo = text => {
  return {
    type: 'ADD_TODO',
    id: itemId++,
    text,
    vis: false
  }
}

// 显示隐藏
export visibility = vis => {
  return {
    type: 'VISIBILITY',
    id,
    vis
  }
}

// 过滤btn
export filterTodo = tag => {
  return {
    type: 'FILTER_TODO',
    tag
  }
}