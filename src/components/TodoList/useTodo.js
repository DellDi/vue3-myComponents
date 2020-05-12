/*
 * @Author: Dell_Di
 * @Date: 2020-05-11 16:26:13
 * @LastEditors: Dell_Di
 * @LastEditTime: 2020-05-11 16:45:53
 * @FilePath: \vue-3.0-components\vue3.0\src\components\TodoList\useTodo.js
 */
import { ref } from "vue";

const defalutList = [
  { text: "star this repository", done: false },
  { text: "fork this repository", done: false },
  { text: "follow author", done: false },
  { text: "vue-element-admin", done: true },
  { text: "vue", done: true },
  { text: "element-ui", done: true },
  { text: "axios", done: true },
  { text: "webpack", done: true },
];

const STORAGE_KEY = "todos";

export function useTodo() {
  const todos = ref(defalutList);
  const setLocalStorage = () => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  };
  const addTodo = (e) => {
    const text = e.target.value;
    if (text.trim()) {
      todos.push({
        text,
        done: false,
      });
      setLocalStorage();
    }
    e.target.value = "";
  };
  const toggleTodo = (val) => {
    val.done = !val.done;
    setLocalStorage();
  };
  const deleteTodo = (todo) => {
    todos.splice(todos.indexOf(todo), 1);
    setLocalStorage();
  };
  const editTodo = ({ todo, value }) => {
    todo.text = value;
    setLocalStorage();
  };
  const clearCompleted = () => {
    todos = todos.filter((todo) => !todo.done);
    setLocalStorage();
  };
  const toggleAll = ({ done }) => {
    todos.forEach((todo) => {
      todo.done = done;
      setLocalStorage();
    });
  };

  return {
    todos,
    setLocalStorage,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted,
    toggleAll,
  };
}
