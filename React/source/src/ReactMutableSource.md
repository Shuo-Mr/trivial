# ReactMutableSource

## createMutableSource

创建可变的 React 源, 接收两个参数, react 源, 和获取版本函数, 减少被使用.

```js
function createMutableSource(source, getVersion) {
  const mutableSource = {
    _getVersion: getVersion,
    _source: source,
    _workInProgressVersionPrimary: null,
    _workInProgressVersionSecondary: null,
  };
  return mutableSource;
}
```
