import { createStore } from 'redux';

interface State {
  value: number;
}

const initialState: State = { value: 0 };

interface Action {
  type: 'counter/incremented' | 'counter/decremented';
}

const counterReducer = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case 'counter/incremented':
      return { ...state, value: state.value + 1 };
    case 'counter/decremented':
      return { ...state, value: state.value - 1 };
    default:
      return state;
  }
};

const store = createStore(counterReducer);

export default store;
