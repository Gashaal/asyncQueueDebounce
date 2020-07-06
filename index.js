function asyncQueueDebounce(cb) {
  // TODO: rewrite to efficient queue
  const queue = [];
  let isPending = false;

  return function() {
    const self = this;
    const args = arguments;

    async function pend(cb) {
      isPending = true;

      try {
        await cb();
      } catch (e) {
        throw e;
      } finally {
        isPending = false;
        if (queue.length) {
          pend(queue.shift());
        }
      }
    }

    if (isPending) {
      queue.push(() => cb.apply(self, args));
    } else {
      pend(() => cb.apply(self, args));
    }
  };
}

module.exports = asyncQueueDebounce;
