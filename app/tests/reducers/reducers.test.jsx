var expect = require('expect');
var df = require('deep-freeze-strict');
var uuid = require('node-uuid');
var moment = require('moment');

var reducers = require('reducers');

describe('Reducers', () => {
  describe('searchTextReducer', () => {
    it('should set searchText', () => {
      var action = {
        type: 'SET_SEARCH_TEXT',
        searchText: 'python'
      };

      var res = reducers.searchTextReducer(df(''), df(action));

      expect(res).toBe('python');
    });
  });

  describe('showCompletedReducer', () => {
    it('should toggle showCompleted', () => {
      var action = {
        type: 'TOGGLE_SHOW_COMPLETED'
      };

      var res = reducers.showCompletedReducer(df(false), df(action));

      expect(res).toBe(true);
    });
  });

  describe('todosReducer', () => {
    it('should add new todo', () => {
      var action = {
        type: 'ADD_TODO',
        todo: {
          id: 123,
          text: 'Learn Haskell one day',
          completed: false,
          createdAt: moment().unix()
        }
      };

      var res = reducers.todosReducer(df([]), df(action));

      expect(res.length).toBe(1);
      expect(res[0]).toEqual(action.todo);
    });

    it('should toggle completion on todo', () => {
      var id = uuid.v4();
      var todos = [{
        id: id,
        text: 'Learn SQL another day',
        completed: false,
        createdAt: moment().unix(),
        completedAt: undefined
      }];
      var action = {
        type: 'TOGGLE_TODO',
        id: id
      };

      var res = reducers.todosReducer(df(todos), df(action));

      expect(res[0].completed).toBe(true);
      expect(res[0].completedAt).toNotBe(undefined);
    });

    it('should add existing todos', () => {
      var todos = [{
        id: 1,
        text: 'ptdr',
        completed: false,
        completedAt: undefined,
        createdAt: 424242
      }];
      var action = {
        type: 'ADD_TODOS',
        todos
      };

      var res = reducers.todosReducer(df([]), df(action));

      expect(res.length).toBe(1);
      expect(res[0]).toEqual(todos[0]);
    });
  });
});