<template>
  <li :class="{ completed: todo.done, editing: editing }" class="todo">
    <div class="view">
      <input :checked="todo.done" class="toggle" type="checkbox" @change="toggleTodo( todo)" />
      <label @dblclick="editing = true" v-text="todo.text" />
      <button class="destroy" @click="deleteTodo( todo )" />
    </div>
    <input
      v-show="editing"
      v-focus="editing"
      :value="todo.text"
      class="edit"
      @keyup.enter="doneEdit"
      @keyup.esc="cancelEdit"
      @blur="doneEdit"
    />
  </li>
</template>

<script>
import { ref, reactive } from "vue";
export default {
  name: "Todo",
  directives: {
    focus(el, { value }, { context }) {
      if (value) {
        context.$nextTick(() => {
          el.focus()
        })
      }
    }
  },
  setup(props, context) {
    const todo = reactive(props.todo)
    const editing = ref(false);
    const deleteTodo = todo => {
      context.emit("deleteTodo", todo);
    };
    const editTodo = ({ todo, value }) => {
      context.emit("editTodo", { todo, value });
    };
    const toggleTodo = todo => {
      context.emit("toggleTodo", todo);
    };
    const doneEdit = e => {
      const value = e.target.value.trim();
      if (!value) {
        deleteTodo({
          todo
        });
      } else if (editing.value) {
        editTodo({
          todo,
          value
        });
        editing.value = false;
      }
    };
    const cancelEdit = e => {
      e.target.value = todo.text;
      editing.value = false;
    };
    return {
      editing,
      todo,
      deleteTodo,
      editTodo,
      toggleTodo,
      doneEdit,
      cancelEdit
    };
  }
};
</script>