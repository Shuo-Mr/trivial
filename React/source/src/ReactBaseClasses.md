# ReactBaseClasses

## 源码

```js
import invariant from 'shared/invariant';
import ReactNoopUpdateQueue from "./ReactNoopUpdateQueue"; // React 队列更新机制

const emptyObject = {};

function Component(props, context, updater) {...}

Component.prototype.isReactComponent = {};

Component.prototype.setState = function(partialState, callback) {...}

Component.prototype.forceUpdate = function(callback) {...};

function ComponentDummy() {}
ComponentDummy.prototype = Component.prototype;

function PureComponent(props, context, updater) {...}

const pureComponentPrototype = (PureComponent.prototype = new ComponentDummy());
pureComponentPrototype.constructor = PureComponent;

Object.assign(pureComponentPrototype, Component.prototype);
pureComponentPrototype.isPureReactComponent = true;

export {Component, PureComponent};

```

### Component

```js
function Component(props, context, updater) {
  this.props = props;
  this.context = context;
  this.refs = emptyObject;
  this.updater = updater || ReactNoopUpdateQueue;
}

Component.prototype.isReactComponent = {};

// 设置原型方法
// 通过updater去通知执行对应的方法
Component.prototype.setState = function (partialState, callback) {
  this.updater.enqueueSetState(this, partialState, callback, "setState");
};

Component.prototype.forceUpdate = function (callback) {
  this.updater.enqueueForceUpdate(this, callback, "forceUpdate");
};
```

### PureComponent

```js
// 继承Component的原型链
function ComponentDummy() {}
ComponentDummy.prototype = Component.prototype;

function PureComponent(props, context, updater) {
  this.props = props;
  this.context = context;
  this.refs = emptyObject;
  this.updater = updater || ReactNoopUpdateQueue;
}

// 将PureComponent的原型链设置为ComponentDummy的实例对象, 即PureComponent.prototype 则拥有setState这些方法.
const pureComponentPrototype = (PureComponent.prototype = new ComponentDummy());
// 将pureComponentPrototype的构造函数从Component改为PureComponent
pureComponentPrototype.constructor = PureComponent;
// Avoid an extra prototype jump for these methods. 合并prototype避免方法进行更多的原型跳转
Object.assign(pureComponentPrototype, Component.prototype);
pureComponentPrototype.isPureReactComponent = true;
```
