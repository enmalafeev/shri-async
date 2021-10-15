module.exports = function (Homework) {
  const { add, less } = Homework;

  const promisify = (asyncFn) => (...args) => {
    const promise = new Promise((resolve) => {
        asyncFn(...args, (data) => resolve(data));
    });
    return promise;
  };

  const promiseLess = promisify(less);
  const promiseAdd = promisify(add);

  return async (asyncArray, fn, initialValue, cb) => {
    const { get, length } = asyncArray;
    const promiseLength = promisify(length);
    const promiseGet = promisify(get);
    const promiseFn = promisify(fn);

    const inner = async () => {
      const len = await promiseLength();
      for (let i = 0; await promiseLess(i, len); i = await promiseAdd(i, 1)) {
        let currentItem = await promiseGet(i);
        initialValue = await promiseFn(initialValue, currentItem, i, asyncArray);
      }
      return initialValue;
    }

    const res = await inner();
    cb(res);
  }
}