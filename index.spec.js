const debounce = require("./index");
const waitForExpect = require("wait-for-expect");

test("asyncQueueDebounce", async () => {
  const cb = jest.fn().mockResolvedValue();
  const decorated = debounce(cb);
  const self = { a: 1 };

  decorated.call(self, "1");
  decorated("2");
  decorated("3");

  expect(cb).toHaveBeenCalledTimes(1);
  expect(cb).toHaveBeenNthCalledWith(1, "1");
  expect(cb.mock.instances[0]).toBe(self);

  // TODO: more efficient way to check it
  await waitForExpect(() => expect(cb).toHaveBeenNthCalledWith(2, "2"));
  await waitForExpect(() => expect(cb).toHaveBeenNthCalledWith(3, "3"));
});
