# React 源码

## React 核心代码入口

```js
export {
Children,
createMutableSource,
createRef,
Component,
PureComponent,
createContext,
forwardRef,
lazy,
memo,
useCallback,
useContext,
useEffect,
useImperativeHandle,
useDebugValue,
useLayoutEffect,
useMemo,
useMutableSource,
useReducer,
useRef,
useState,
REACT_FRAGMENT_TYPE as Fragment,
REACT_PROFILER_TYPE as Profiler,
REACT_STRICT_MODE_TYPE as StrictMode,
REACT_DEBUG_TRACING_MODE_TYPE as unstable_DebugTracingMode,
REACT_SUSPENSE_TYPE as Suspense,
createElement,
cloneElement,
isValidElement,
ReactVersion as version,
ReactSharedInternals as \_\_SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
// Deprecated behind disableCreateFactory
createFactory,
// Concurrent Mode
useTransition,
startTransition,
useDeferredValue,
REACT_SUSPENSE_LIST_TYPE as SuspenseList,
REACT_LEGACY_HIDDEN_TYPE as unstable_LegacyHidden,
REACT_OFFSCREEN_TYPE as unstable_Offscreen,
getCacheForType as unstable_getCacheForType,
useCacheRefresh as unstable_useCacheRefresh,
REACT_CACHE_TYPE as unstable_Cache,
// enableScopeAPI
REACT_SCOPE_TYPE as unstable_Scope,
useOpaqueIdentifier as unstable_useOpaqueIdentifier,
act,
};

```

按其顺序介绍:

### Chilren

对应 React.Chilren, 详情 Chilren.md

其结构如下:

```js
const Children = {
  map,
  forEach,
  count,
  toArray,
  only,
};
```

### ReactElement

详情 ReactElement.md

导出有:

```js
import {
  createElement as createElementProd,
  createFactory as createFactoryProd,
  cloneElement as cloneElementProd,
  isValidElement,
} from "./ReactElement";

// 开发版
import {
  createElementWithValidation,
  createFactoryWithValidation,
  cloneElementWithValidation,
} from "./ReactElementValidator";

const createElement = __DEV__ ? createElementWithValidation : createElementProd;
const cloneElement = __DEV__ ? cloneElementWithValidation : cloneElementProd;
const createFactory = __DEV__ ? createFactoryWithValidation : createFactoryProd;

export { createElement, cloneElement, createFactory, isValidElement };
```

### ReactMutableSource

详情, ReactMutableSource.md, 不重要, 用于创建可变的 React 源

```js
import { createMutableSource } from "./ReactMutableSource";
export { createMutableSource };
```

### ReactCreateRef

详情 ReactCreateRef.md

其只有一个函数, createRef, 用于创建 ref 对象.

```js
import { createRef } from "./ReactCreateRef";
export { createRef };
```

### ReactBaseClasses

抛出两个函数, Component 和 PureComponent, 用于创建类组件.
详情: ReactBaseClasses.md

```js
import { Component, PureComponent } from "./ReactBaseClasses";

export { Component, PureComponent };
```

### ReactContext

创建一个 Context 对象。当 React 渲染一个订阅了这个 Context 对象的组件，这个组件会从组件树中离自身最近的那个匹配的 Provider 中读取到当前的 context 值。

```js
import { createContext } from "./ReactContext";

export { createContext };
```

### ReactForwardRef

包含一个方法: forwardRef, 详情 ReactForwardRef.md

React.forwardRef 会创建一个 React 组件，这个组件能够将其接受的 ref 属性转发到其组件树下的另一个组件中。

```js
import { forwardRef } from "./ReactForwardRef";
export { forwardRef };
```

### ReactLazy

ReactLazy, 抛出一个函数 lazy, React.lazy 函数能让你像渲染常规组件一样处理动态引入（的组件）。暂不支持服务端渲染.常与 Suspense 连用.

详情 ReactLazy.md

```js
import { lazy } from "./ReactLazy";
export { lazy };
```

### ReactMemo

抛出一个函数 memo, React.memo 为高阶组件。用于通过记忆组件渲染结果的方式来提高组件的性能表现.

详情: ReactMemo.md
