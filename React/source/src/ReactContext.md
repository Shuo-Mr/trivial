# ReactContext

## createContext

创建一个 Context 对象。当 React 渲染一个订阅了这个 Context 对象的组件，这个组件会从组件树中离自身最近的那个匹配的 Provider 中读取到当前的 context 值。

```js
import { REACT_PROVIDER_TYPE, REACT_CONTEXT_TYPE } from "shared/ReactSymbols";

// 传入一个默认值,只有当组件所处的树中没有匹配到 Provider 时，其 defaultValue 参数才会生效。
// 返回一个context
export function createContext(defaultValue) {
  const context = {
    $$typeof: REACT_CONTEXT_TYPE,
    // 将默认值挂载到 context 的值
    _currentValue: defaultValue,
    _currentValue2: defaultValue,
    // 用于跟踪当前此上下文中有多少个并发渲染器
    _threadCount: 0,
    // 容器
    Provider: null,
    Consumer: null,
  };

  // 互相引用,避免js回收机制回收
  context.Provider = {
    $$typeof: REACT_PROVIDER_TYPE,
    _context: context,
  };

  context.Consumer = context;

  return context;
}
```
