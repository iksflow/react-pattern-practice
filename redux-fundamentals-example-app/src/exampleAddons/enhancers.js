export const sayHiOnDispatch = (createStore) => {
  return (rootReducer, preloadedState, enhancers) => {
    const store = createStore(rootReducer, preloadedState, enhancers);

    function newDispatch(action) {
      console.log('Hi!');
      const result = store.dispatch(action);
      console.log('Bye!');
      return result;
    }

    return { ...store, dispatch: newDispatch };
  };
};

export const includeMeaningOfLife = (createStore) => {
  return (rootReducer, preloadedState, enhancers) => {
    const store = createStore(rootReducer, preloadedState, enhancers);

    function newGetState() {
      return {
        ...store.getState(),
        meaningOfLife: 42,
      };
    }

    return { ...store, getState: newGetState };
  };
};
