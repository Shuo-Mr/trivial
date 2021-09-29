# ReactForwardRef

## forwardRef

用于传递 ref 值.

```js
import { REACT_FORWARD_REF_TYPE, REACT_MEMO_TYPE } from "shared/ReactSymbols";
// 接收一个参数render函数
function forwardRef(
  render: (props: Props, ref: React$Ref<ElementType>) => React$Node
) {
  //  开发版警告信息, 忽略
  if (__DEV__) {
    // ...
  }
  const elementType = {
    $$typeof: REACT_FORWARD_REF_TYPE,
    render,
  };

  // 返回一个元素类型,供后续处理
  return elementType;
}
```
