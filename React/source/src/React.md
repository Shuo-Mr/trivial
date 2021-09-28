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
