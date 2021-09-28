# ReactElement

## 是什么?

每一个 React 元素,或者都是一个 AST(抽象语法树) 对象, 实际数据结构就是一个对象, 通过对象容易管理元素中的各种内容以及属性.
react AST 对象, 通过 $$typeof 这个属性来表示这个对象是一个什么类型的内容, 其值是一个预定义好的 Symbol 值, 具体配置在 ReactSymbols.js. 详情可看 ReactSymbols.md

## 源码

### ReactElemnt

核心代码:

工厂函数: 用于返回一个 React 元素

```js
// type: 标签名, (self: 用于定位this, source: 注释对象)(生产版不使用)
const ReactElement = function (type, key, ref, self, source, owner, props) {
  const element = {
    $$typeof: REACT_ELEMENT_TYPE,

    // 元素内部互相
    type: type,
    key: key,
    ref: ref,
    props: props,

    // 负责记录创建该元素的所有者
    _owner: owner,
  };

  return element;
};
```

### createElement

对应 React.createElement, 用于创建一个 React 元素

```js
function createElement(type, config, children) {
  let propName;

  // Reserved names are extracted
  const props = {};

  let key = null;
  let ref = null;
  let self = null;
  let source = null;

  // 附带配置情况
  if (config != null) {
    // 是否有 ref 值
    if (hasValidRef(config)) {
      ref = config.ref;
    }
    // 是否有 key 值
    if (hasValidKey(config)) {
      key = "" + config.key;
    }

    self = config.__self === undefined ? null : config.__self;
    source = config.__source === undefined ? null : config.__source;
    // 遍历属性config内的其他属性, 并添加到props中
    for (propName in config) {
      if (
        hasOwnProperty.call(config, propName) &&
        !RESERVED_PROPS.hasOwnProperty(propName)
      ) {
        props[propName] = config[propName];
      }
    }
  }

  // 子节点不一定只有一个
  const childrenLength = arguments.length - 2;
  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    // 创建子节点数组
    const childArray = Array(childrenLength);
    for (let i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }
    props.children = childArray;
  }

  // Resolve default props, 处理type的默认props
  if (type && type.defaultProps) {
    const defaultProps = type.defaultProps;
    for (propName in defaultProps) {
      if (props[propName] === undefined) {
        props[propName] = defaultProps[propName];
      }
    }
  }

  return ReactElement(
    type,
    key,
    ref,
    self,
    source,
    ReactCurrentOwner.current,
    props
  );
}
```

### jsx

通常我们不会直接使用 React.createElement 这种顶层 Api 来生成 Raect 元素, 而是使用 jsx 的语法, 然而,最终 jsx 也会将其转为 ReactElement 对象.

```jsx
function jsx(type, config, maybeKey) {
    et propName;
    const props = {};

    let key = null;
    let ref = null;


    if (maybeKey !== undefined) {
        key = '' + maybeKey;
    }

    if (hasValidKey(config)) {
        key = '' + config.key;
    }

    if (hasValidRef(config)) {
        ref = config.ref;
    }

    for (propName in config) {
        if (
        hasOwnProperty.call(config, propName) &&
        !RESERVED_PROPS.hasOwnProperty(propName)
        ) {
        props[propName] = config[propName];
        }
    }


    // Resolve default props
    if (type && type.defaultProps) {
        const defaultProps = type.defaultProps;
        for (propName in defaultProps) {
            if (props[propName] === undefined) {
                props[propName] = defaultProps[propName];
            }
        }
    }


  return ReactElement(
    type,
    key,
    ref,
    undefined,
    undefined,
    ReactCurrentOwner.current,
    props,
  );
}
```

### jsxDEV

同 jsx 类型, 增加对 ref 和 key 的值, 验证以及警告信息, 其他无特殊之处, 最终返回 ReactElement 元素.

### createFactory

返回给定类型的工厂函数, 较少被使用, 遗留钩子, 等待移除

```js
function createFactory(type) {
  const factory = createElement.bind(null, type);
  factory.type = type;
  return factory;
}
```

### cloneElement

克隆元素, 用于克隆一个已有的元素, 并修改新增一些配置,源码与 createElement 类似, 就是操作 element 对象, 并生成新元素,故不着重解释,该函数最终返回一个克隆元素.

```js
function cloneElement(element, config, children) {
  return ReactElement(element.type, key, ref, self, source, owner, props);
}
```

### cloneAndReplaceKey

克隆替换元素的 key 值, 并返回一个新元素

```js
export function cloneAndReplaceKey(oldElement, newKey) {
  const newElement = ReactElement(
    oldElement.type,
    newKey,
    oldElement.ref,
    oldElement._self,
    oldElement._source,
    oldElement._owner,
    oldElement.props
  );

  return newElement;
}
```

### isValidElement

工具函数: 用于判断元素是否为 react 元素

代码如下:

```js
function isValidElement(object) {
  return (
    typeof object === "object" &&
    object !== null &&
    object.$$typeof === REACT_ELEMENT_TYPE
  );
}
```
