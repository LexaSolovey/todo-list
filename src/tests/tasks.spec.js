import undoableTodos from '../reducers/listOfTasksToState';
import configureStore from 'redux-mock-store';
const middlewares = []
const mockStore = configureStore(middlewares)

describe('todos reducer', () => {
    it('should return the initial state', () => {
      const initialState = {}
      const store = mockStore(initialState);
      expect(undoableTodos(undefined, {})).toEqual([
        {
          text: 'Use Redux',
          completed: false,
          id: 0
        }
      ])
    })
  });
