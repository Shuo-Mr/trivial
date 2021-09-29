# ReactLazy

## lazy

接收一个参数, 参数类型为一个导入组件的函数.

```js
import { REACT_LAZY_TYPE } from "shared/ReactSymbols";

const Uninitialized = -1;
const Pending = 0;
const Resolved = 1;
const Rejected = 2;

function lazy(ctor) {
  // 加载器, 根据 _status 判断当前加载状态
  const payload = {
    // We use these fields to store the result.
    _status: -1,
    _result: ctor,
  };

  const lazyType = {
    $$typeof: REACT_LAZY_TYPE,
    _payload: payload,
    _init: lazyInitializer,  // 对应的初始化构造器
  };

  return lazyType;
}

function lazyInitializer(payload) {
  // 未初始化状态
  if (payload._status === Uninitialized) {
    // 获取 ctor
    const ctor = payload._result;
    const thenable = ctor();

    // 转换为下一个状态, 成功 or 失败
    thenable.then(
      (moduleObject) => {
        // 如果当前状态为未初始化或处理中国呢
        if (payload._status === Pending || payload._status === Uninitialized) {
          const resolved = payload;
          resolved._status = Resolved;
          resolved._result = moduleObject;
        }
      },
      (error) => {
        if (payload._status === Pending || payload._status === Uninitialized) {
          // Transition to the next state.
          const rejected = payload;
          rejected._status = Rejected;
          rejected._result = error;
        }
      }
    );

    // 如果此时正在等待 thenable 完成, 讲状态设置为挂起, 等待 thenable 完成
    if (payload._status === Uninitialized) {
      const pending = payload;
      pending._status = Pending;
      pending._result = thenable;
    }
  }

  // 成功: 返回对应模块, 失败: 抛出错误
  if (payload._status === Resolved) {
    const moduleObject = payload._result;
    return moduleObject.default;
  } else {
    throw payload._result;
  }
}
```
