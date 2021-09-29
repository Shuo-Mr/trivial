# ReactMemo

## memo

memo 是一个高阶组件, 接收两个参数, 第一个参数为组件元素, 第二参数为比较函数, 用于比较是否需要更新渲染组件

```js
import { REACT_MEMO_TYPE } from "shared/ReactSymbols";

function memo(type, compare) {
  const elementType = {
    $$typeof: REACT_MEMO_TYPE,
    type,
    compare: compare === undefined ? null : compare,
  };

  return elementType;
}
```
