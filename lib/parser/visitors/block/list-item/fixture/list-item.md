- more natural assertions: `expected, result` -> `result, expected`:

  ```js
  t.equal(error.message, 'hello world', `expected error.message to be 'hello world'`);
  ```

- ability to generate tests with ♨️[**Speca**](https://github.com/coderaiser/speca)
