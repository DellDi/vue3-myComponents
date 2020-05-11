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
      <input class="new-todo" autocomplete="off" placeholder="Todo List" @keyup.enter="addTodo">
    </header>
    <!-- main section -->
    <section v-show="todos.length" class="main">
      <input id="toggle-all" :checked="allChecked" class="toggle-all" type="checkbox" @change="toggleAll({ done: !allChecked })">
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
        {{ remaining | pluralize('item') }} left
      </span>
      <ul class="filters">
        <li v-for="(val, key) in filters" :key="key">
          <a :class="{ selected: visibility === key }" @click.prevent="visibility = key">{{ key | capitalize }}</a>
        </li>
      </ul>
      <!-- <button class="clear-completed" v-show="todos.length > remaining" @click="clearCompleted">
        Clear completed
      </button> -->
    </footer>
  </section>
  </div>
</template>

<script>
import { ref, reactive } from "vue";
export default {
  name: "TodoList",
  filters: {
    pluralize: (n, w) => n === 1 ? w : w + 's',
    capitalize: s => s.charAt(0).toUpperCase() + s.slice(1)
  },
  setup() {
      
  }
};
</script>

<style lang="scss" scoped>
</style>