# 概述

首先,从github上面clone一下react的存储库,本文使用的是17.0.3版本, 大版本17, 是一个过渡版本,承接16和18.

从我先前写过几次的了解, 写得越细,代码越多,思路越乱, 故此次我选择, 先写大纲, 再根据实际写细则.至于其用法以及意义,react官网才是权威.

## 目录

react 的库很大, 里面包含了许多与之相关的库,如react-dom等, 故不关注这一块的代码,只关注核心代码.

```bash
├─ packages                   # react所有的包
│   ├─ react                  # react 核心库
│   │   ├─ index.js           # 入口文件
│   │   ├─ src                # 核心代码内容
│   │   └─ xxx                # 其他文件, 暂且忽略
│   ├─ share                  # 共享库, 主要一些共享的方法,以及配置
│   ├─ xxx                    # 其他包, 如react-dom等,先忽略
├─ xxx                        # 忽略掉其他文件,
├── pageage.json              # 相关依赖库
```

index.js 入口文件

解析: 入口文件, 用于抛出react对应的各种API
```
export {
  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
  act as unstable_act,
  Children,
  Component,
  Fragment,
  Profiler,
  PureComponent,
  StrictMode,
  Suspense,
  SuspenseList,
  cloneElement,
  createContext,
  createElement,
  createFactory,
  createMutableSource,
  createRef,
  forwardRef,
  isValidElement,
  lazy,
  memo,
  startTransition,
  unstable_Cache,
  unstable_DebugTracingMode,
  unstable_LegacyHidden,
  unstable_Offscreen,
  unstable_Scope,
  unstable_getCacheForType,
  unstable_useCacheRefresh,
  unstable_useOpaqueIdentifier,
  useCallback,
  useContext,
  useDebugValue,
  useDeferredValue,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useMutableSource,
  useReducer,
  useRef,
  useState,
  useTransition,
  version,
} from './src/React';

```

忽略这个文件的flow注释, 实际上, 作用只有一个, 用于导出src/React中的内容.