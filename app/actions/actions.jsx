import moment from 'moment';

import firebase, {firebaseRef} from 'app/firebase/';

export var setSearchText = (searchText) => {
  return {
    type: 'SET_SEARCH_TEXT',
    searchText
  };
};

export var toggleShowCompleted = () => {
  return {
    type: 'TOGGLE_SHOW_COMPLETED'
  };
};

export var addTodo = (todo) => {
  return {
    type: 'ADD_TODO',
    todo
  };
};

export var startAddTodo = (text) => {
  return (dispatch, getState) => {
    var todo = {
      text,
      completed: false,
      createdAt: moment().unix(),
      completedAt: null
    };

    var todoRef = firebaseRef.child('todos').push(todo);

    return todoRef.then(() => {
      dispatch(addTodo({
        ...todo,
        id: todoRef.key
      }));
    });
  };
};

export var addTodos = (todos) => {
  return {
    type: 'ADD_TODOS',
    todos
  };
};

export const updateTodo = (id, updates) => {
  return {
    type: 'UPDATE_TODO',
    id,
    updates
  };
};

export const startUpdateTodo = (id, completed) => {
  return (dispatch, getState) => {
    const todoRef = firebaseRef.child(`todos/${id}`);
    const updates = {
      completed,
      completedAt: completed ? moment().unix() : null
    };

    return todoRef.update(updates)
      .then(() => {
        dispatch(updateTodo(id, updates));
      });
  };
};