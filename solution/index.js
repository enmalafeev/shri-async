module.exports = function (Homework) {
  const promisify = (asyncFn) => (...args) => {
    const promise = new Promise((resolve) => {
        asyncFn(...args, (data) => resolve(data));
    });
      return promise;
  };

  const { add, less } = Homework;

  return async (asyncArray, fn, initialValue, cb) => {
    const { get, length } = asyncArray;
    
    const promiseLength = promisify(length);
    const promiseGet = promisify(get);
    const promiseAdd = promisify(add);
    const promiseLess = promisify(less);

    const promiseFn = promisify(fn);

    const len = await promiseLength();

    for (let i = 0; await promiseLess(i, len); i = await promiseAdd(i, 1)) {
      let currentItem = await promiseGet(i);
      initialValue = await promiseFn(initialValue, currentItem, i, asyncArray);
    }
  
    return initialValue;
  }
}