module.exports = function (Homework) {
  const promisify = (asyncFn) => (...args) => {
    const promise = new Promise((resolve) => {
        asyncFn(...args, (data) => resolve(data));
    });
      return promise;
  };

  return async (asyncArray, fn, initialValue, cb) => {

    const promiseLength = promisify(asyncArray.length);
    const promiseGet = promisify(asyncArray.get);
    const promiseAdd = promisify(Homework.add);
    const promiseLess = promisify(Homework.less);

    const promiseFn = promisify(fn);

    const len = await promiseLength();

    for (let i = 0; await promiseLess(i, len); i = await promiseAdd(i, 1)) {
      let currentItem = await promiseGet(i);
      initialValue = await promiseFn(initialValue, currentItem, i, asyncArray);
    }


    return initialValue;
  }
}