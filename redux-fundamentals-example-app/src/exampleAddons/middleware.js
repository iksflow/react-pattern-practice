export const print1 = (storeAPI) => (next) => (action) => {
  console.log('print1 start');
  const result = next(action);
  console.log('print1 end');
  return result;
};

export const print2 = (storeAPI) => (next) => (action) => {
  console.log('print2 start');
  const result = next(action);
  console.log('print2 end');
  return result;
};

export const print3 = (storeAPI) => (next) => (action) => {
  console.log('print3 start');
  const result = next(action);
  console.log('print3 end');
  return result;
};
