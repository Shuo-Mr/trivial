# React.Chilren

## 结构

- map
- forEach
- count
- only
- toArray

### 导出

```export
export {
  forEachChildren as forEach,
  mapChildren as map,
  countChildren as count,
  onlyChild as only,
  toArray,
};
```

### only

```only
function onlyChild<T>(children: T): T {
    // 断言, 用于抛出警告
  invariant(
    isValidElement(children),
    'React.Children.only expected to receive a single React element child.',
  );
  return children;
}

```

only 很好理解, 通过 isValidElement 函数,判断其是否是真实的 React 的 Elment 元素, 不是则抛出警告.

### toArray

```toArray
function toArray(children: ?ReactNodeList): Array<React$Node> {
  return mapChildren(children, child => child) || [];
}
```

将一个 ReactNode 列表,转为数组, 具体看 mapChldren.

### count

```count
function countChildren(children: ?ReactNodeList): number {
  let n = 0;
  mapChildren(children, () => {
    n++;
    // Don't return anything
  });
  return n;
}
```

用处:统计节点的数量
通过 n, 同时便利节点列表,递增 n, 最终返回 n 作为数量

### forEach

```forEach
function forEachChildren(
  children: ?ReactNodeList,
  forEachFunc: ForEachFunc,
  forEachContext: mixed,
): void {
  mapChildren(
    children,
    function() {
      forEachFunc.apply(this, arguments);
      // Don't return anything.
    },
    forEachContext,
  );
}
```

### map

```map
function mapChildren(
  children: ?ReactNodeList,
  func: MapFunc,
  context: mixed,
): ?Array<React$Node> {
  if (children == null) {
    return children;
  }
  const result = [];
  let count = 0; // 返回第二个值,即索引
  // 核心代码
  mapIntoArray(children, result, '', '', function(child) {
    return func.call(context, child, count++);
  });
  return result;
}

```

### 核心代码

#### mapIntoArray

mapIntoArray 的代码很长且有许多判断, 并增加对应的 key, 但是归根是一个递归函数, 用于遍历所传入的内容,进行返回, 故减少部分代码,关注核心代码

```mapIntoArray
function mapIntoArray(
  children,
  array,
  escapedPrefix,  // 命名参数, 忽略
  nameSoFar,  // 命名参数, 忽略
  callback,
) {

  // 是否执行回调
  let invokeCallback = false;
  if (children === null) {
    invokeCallback = true;
  } else {
    switch (type) {
      case 'string':
      case 'number':
        invokeCallback = true;
        break;
      case 'object':
        // 判断是否为React元素
        switch (children.$$typeof) {
          case REACT_ELEMENT_TYPE:
          case REACT_PORTAL_TYPE:
            invokeCallback = true;
        }
    }
  }

  // 在children符合条件下, 执行回调
  if (invokeCallback) {
    const child = children;
    let mappedChild = callback(child);
    // 自动生成key
    // 回调返回值为数组
    if (isArray(mappedChild)) {
      // 生成对应的key, 可忽略
      let escapedChildKey = '';
      if (childKey != null) {
        escapedChildKey = escapeUserProvidedKey(childKey) + '/';
      }
      // 递归处理
      mapIntoArray(mappedChild, array, escapedChildKey, '', c => c);
    } else if (mappedChild != null) {
      if (isValidElement(mappedChild)) {
        // 克隆元素,保留旧节点
        mappedChild = cloneAndReplaceKey(
          mappedChild,
          escapedPrefix +
            (mappedChild.key && (!child || child.key !== mappedChild.key)
              ? // $FlowFixMe Flow incorrectly thinks existing element's key can be a number
                escapeUserProvidedKey('' + mappedChild.key) + '/'
              : '') +
            childKey,
        );
      }
      // 推入结果
      array.push(mappedChild);
    }
    return 1;
  }


  // 对于数组
  let child;
  let subtreeCount = 0; // Count of children found in the current subtree.

  let nextName;
  const nextNamePrefix =
    nameSoFar === '' ? SEPARATOR : nameSoFar + SUBSEPARATOR;

  if (isArray(children)) {
    // 遍历处理每个子项
    for (let i = 0; i < children.length; i++) {
      child = children[i];
      nextName = nextNamePrefix + getElementKey(child, i);
      subtreeCount += mapIntoArray(
        child,
        array,
        escapedPrefix,
        nextName,
        callback,
      );
    }
  } else {

    // 处理类数组 -- 特殊情况
    const iteratorFn = getIteratorFn(children);
    if (typeof iteratorFn === 'function') {
      const iterableChildren = children;

      if (__DEV__) {
        // 抛出警告, 不要使用Map数据结构
        if (iteratorFn === iterableChildren.entries) {
          if (!didWarnAboutMaps) {
            console.warn(
              'Using Maps as children is not supported. ' +
                'Use an array of keyed ReactElements instead.',
            );
          }
          didWarnAboutMaps = true;
        }
      }

      // 使用遍历器遍历迭代对象
      const iterator = iteratorFn.call(iterableChildren);
      let step;
      let ii = 0;
      while (!(step = iterator.next()).done) {
        child = step.value;
        nextName = nextNamePrefix + getElementKey(child, ii++);
        subtreeCount += mapIntoArray(
          child,
          array,
          escapedPrefix,
          nextName,
          callback,
        );
      }
    } else if (type === 'object') {
      // children 为普通对象则抛出异常
      const childrenString = '' + (children: any);
      invariant(
        false,
        'Objects are not valid as a React child (found: %s). ' +
          'If you meant to render a collection of children, use an array ' +
          'instead.',
        childrenString === '[object Object]'
          ? 'object with keys {' + Object.keys((children: any)).join(', ') + '}'
          : childrenString,
      );
    }
  }

  return subtreeCount;

}

```

简陋代码(可运行):

```简陋代码
let test = {
    forEach: function (children, func, context) {
        console.log('foreach....')
        test.map(children, function() {
            console.log('argument:', arguments)
            func.apply(this, arguments)
        }, context)
    },
    map: function (chilren, func, context) {
        console.log('开始执行map...')
        const result = []
        let count = 0
        mapIntoArray(chilren, result, function (child) {
            console.log('开始执行callBack...', 'child:', child)
            const item = func.call(context, child, count++);
            console.log('拿到的item', item)
            return item;
        })
        console.log(result, '结果')
        return result;
    }
}


function mapIntoArray(children, result, callback) {

  // 假如children为React元素, 或者数字, 字符串,空, 则执行以下这段, 并return
  if (!Array.isArray(children)) {
      const child = children;
      let mappedChild = callback(child);
      console.log('单个内容, mappedChild:', mappedChild)
      if (Array.isArray(mappedChild)) {
          console.log('是array')
          mapIntoArray(mappedChild, result, c => c);
      } else if (mappedChild != null) {
          console.log('非array')
          // 克隆mappedChild, 再推入, 此处省略克隆
          result.push(mappedChild);
      }
      return 1;
  }

  let child;
  let subtreeCount = 0; // Count of children found in the current subtree.
  if (Array.isArray(children)) {
    // 遍历返回
    for (let i = 0; i < children.length; i++) {
    child = children[i];
    subtreeCount += mapIntoArray(
    child,
    result,
    callback,
  );
  }
  } else {
    //....
  }
  return subtreeCount;
}

```
