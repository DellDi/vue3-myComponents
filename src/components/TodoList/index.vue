<!--
 * @Author: Dell_Di
 * @Date: 2020-05-11 14:25:58
 * @LastEditors: Dell_Di
 * @LastEditTime: 2020-05-11 17:37:29
 * @FilePath: \vue-3.0-components\vue3.0\src\components\TodoList\index.vue
 -->
<template>
  <div>
    <section class="todoapp">
      <!-- header -->
      <header class="header">
        <input class="new-todo" autocomplete="off" placeholder="Todo List" @keyup.enter="addTodo" />
      </header>
      <!-- main section -->
      <section v-show="todos.length" class="main">
        <input
          id="toggle-all"
          :checked="allChecked"
          class="toggle-all"
          type="checkbox"
          @change="toggleAll({ done: !allChecked })"
        />
        <label for="toggle-all" />
        <ul class="todo-list">
          <todo
            v-for="(todo, index) in filteredTodos"
            :key="index"
            :todo="todo"
            @toggleTodo="toggleTodo"
            @editTodo="editTodo"
            @deleteTodo="deleteTodo"
          />
        </ul>
      </section>
      <!-- footer -->
      <footer v-show="todos.length" class="footer">
        <span class="todo-count">
          <strong>{{ remaining }}</strong>
          {{ remaining }} left
        </span>
        <ul class="filters">
          <li v-for="(val, key) in filters" :key="key">
            <a :class="{ selected: visibility === key }" @click.prevent="visibility = key">{{ key }}</a>
          </li>
        </ul>
        <!-- <button class="clear-completed" v-show="todos.length > remaining" @click="clearCompleted">
        Clear completed
        </button>-->
      </footer>
    </section>
  </div>
</template>

<script>
import { ref, computed, reactive } from "vue";
import Todo from "./Todo";
import { useTodo } from "./useTodo";

const filtersObj = {
  all: todos => todos,
  active: todos => todos.filter(todo => !todo.done),
  completed: todos => todos.filter(todo => todo.done)
};

export default {
  name: "TodoList",
  components: {
    Todo
  },
  filters: {
    pluralize: (n, w) => (n === 1 ? w : w + "s"),
    capitalize: s => s.charAt(0).toUpperCase() + s.slice(1)
  },
  setup() {
    const {
      todos,
      setLocalStorage,
      addTodo,
      toggleTodo,
      deleteTodo,
      editTodo,
      clearCompleted,
      toggleAll
    } = useTodo();
    const filters = reactive(filtersObj);
    const visibility = ref("all");
    const allChecked = computed(() => todos.value.every(todo => todo.done));
    const filteredTodos = computed(() =>
      filters[visibility.value](todos.value)
    );
    const remaining = computed(() => {
      return todos.value.filter(todo => !todo.done).length;
    });
    return {
      todos,
      visibility,
      filters,
      allChecked,
      filteredTodos,
      remaining,
      setLocalStorage,
      addTodo,
      toggleTodo,
      deleteTodo,
      editTodo,
      clearCompleted,
      toggleAll
    };
  }
};
</script>
<style scoped>
@charset "UTF-8";
.todoapp {
  font: 14px "Helvetica Neue", Helvetica, Arial, sans-serif;
  line-height: 1.4em;
  color: #4d4d4d;
  min-width: 230px;
  max-width: 550px;
  margin: 0 auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-weight: 300;
  background: #fff;
  z-index: 1;
  position: relative;
  /*
  Hack to remove background from Mobile Safari.
  Can't use it globally since it destroys checkboxes in Firefox
*/
}
.todoapp button {
  margin: 0;
  padding: 0;
  border: 0;
  background: none;
  font-size: 100%;
  vertical-align: baseline;
  font-family: inherit;
  font-weight: inherit;
  color: inherit;
  -webkit-appearance: none;
  appearance: none;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.todoapp :focus {
  outline: 0;
}
.todoapp .hidden {
  display: none;
}
.todoapp .todoapp {
  background: #fff;
  margin: 130px 0 40px 0;
  position: relative;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);
}
.todoapp .todoapp input::-webkit-input-placeholder {
  font-style: italic;
  font-weight: 300;
  color: #e6e6e6;
}
.todoapp .todoapp input::-moz-placeholder {
  font-style: italic;
  font-weight: 300;
  color: #e6e6e6;
}
.todoapp .todoapp input::input-placeholder {
  font-style: italic;
  font-weight: 300;
  color: #e6e6e6;
}
.todoapp .todoapp h1 {
  position: absolute;
  top: -155px;
  width: 100%;
  font-size: 100px;
  font-weight: 100;
  text-align: center;
  color: rgba(175, 47, 47, 0.15);
  -webkit-text-rendering: optimizeLegibility;
  -moz-text-rendering: optimizeLegibility;
  text-rendering: optimizeLegibility;
}
.todoapp .new-todo,
.todoapp .edit {
  position: relative;
  margin: 0;
  width: 100%;
  font-size: 18px;
  font-family: inherit;
  font-weight: inherit;
  line-height: 1.4em;
  border: 0;
  color: inherit;
  padding: 6px;
  border: 1px solid #999;
  box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.todoapp .new-todo {
  padding: 10px 16px 16px 60px;
  border: none;
  background: rgba(0, 0, 0, 0.003);
  box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
}
.todoapp .main {
  position: relative;
  z-index: 2;
  border-top: 1px solid #e6e6e6;
}
.todoapp .toggle-all {
  text-align: center;
  border: none;
  /* Mobile Safari */
  opacity: 0;
  position: absolute;
}
.todoapp .toggle-all + label {
  width: 60px;
  height: 34px;
  font-size: 0;
  position: absolute;
  top: -52px;
  left: -13px;
  -webkit-transform: rotate(90deg);
  transform: rotate(90deg);
}
.todoapp .toggle-all + label:before {
  content: "❯";
  font-size: 22px;
  color: #e6e6e6;
  padding: 10px 27px 10px 27px;
}
.todoapp .toggle-all:checked + label:before {
  color: #737373;
}
.todoapp .todo-list {
  margin: 0;
  padding: 0;
  list-style: none;
}


.todoapp .footer {
  color: #777;
  position: relative;
  padding: 10px 15px;
  height: 40px;
  text-align: center;
  border-top: 1px solid #e6e6e6;
}
.todoapp .footer:before {
  content: "";
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: 40px;
  overflow: hidden;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2), 0 8px 0 -3px #f6f6f6,
    0 9px 1px -3px rgba(0, 0, 0, 0.2), 0 16px 0 -6px #f6f6f6,
    0 17px 2px -6px rgba(0, 0, 0, 0.2);
}
.todoapp .todo-count {
  float: left;
  text-align: left;
}
.todoapp .todo-count strong {
  font-weight: 300;
}
.todoapp .filters {
  margin: 0;
  padding: 0;
  position: relative;
  z-index: 1;
  list-style: none;
}
.todoapp .filters li {
  display: inline;
}
.todoapp .filters li a {
  color: inherit;
  font-size: 12px;
  padding: 3px 7px;
  text-decoration: none;
  border: 1px solid transparent;
  border-radius: 3px;
}
.todoapp .filters li a:hover {
  border-color: rgba(175, 47, 47, 0.1);
}
.todoapp .filters li a.selected {
  border-color: rgba(175, 47, 47, 0.2);
}
.todoapp .clear-completed,
.todoapp html .clear-completed:active {
  float: right;
  position: relative;
  line-height: 20px;
  text-decoration: none;
  cursor: pointer;
}
.todoapp .clear-completed:hover {
  text-decoration: underline;
}
.todoapp .info {
  margin: 65px auto 0;
  color: #bfbfbf;
  font-size: 10px;
  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.5);
  text-align: center;
}
.todoapp .info p {
  line-height: 1;
}
.todoapp .info a {
  color: inherit;
  text-decoration: none;
  font-weight: 400;
}
.todoapp .info a:hover {
  text-decoration: underline;
}
@media screen and (-webkit-min-device-pixel-ratio: 0) {
  .todoapp .toggle-all,
  .todoapp .todo-list li .toggle {
    background: none;
  }
  .todoapp .todo-list li .toggle {
    height: 40px;
  }
}
@media (max-width: 430px) {
  .todoapp .footer {
    height: 50px;
  }
  .todoapp .filters {
    bottom: 10px;
  }
}
</style>