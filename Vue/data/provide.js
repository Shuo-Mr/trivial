const app = Vue.createApp({});

app.component("todp-list", {
  data() {
    return {
      todos: ["Feed a cat", "Buy tickets"],
    };
  },
  provide: {
    user: "John Doe",
  },
  template: `
    <div>
      {{ todos.length }}
      <!-- 模板的其余部分 -->
    </div>
  `,
});

app.component("todo-list-statistics", {
  inject: ["user"],
  created() {
    console.log(`Injected property: ${this.user}`); // > 注入 property: John Doe
  },
});

//  非响应, 即todos变化, 子组件的inject并不会变化
app.component("todo-list", {
  data() {
    return {
      todos: ["Feed a cat", "Buy tickets"],
    };
  },
  provide() {
    return {
      todoLength: this.todos.length,
    };
  },
  template: `
      ...
    `,
});

// 处理响应性

app.component("todo-list", {
  // ...
  provide() {
    return {
      todoLength: Vue.computed(() => this.todos.length),
    };
  },
});

app.component("todo-list-statistics", {
  inject: ["todoLength"],
  created() {
    console.log(`Injected property: ${this.todoLength.value}`); // > Injected property: 5
  },
});
