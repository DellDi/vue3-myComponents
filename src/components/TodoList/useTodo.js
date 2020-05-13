/*
 * @Author: Dell_Di
 * @Date: 2020-05-11 16:26:13
 * @LastEditors: Dell_Di
 * @LastEditTime: 2020-05-11 16:45:53
 * @FilePath: \vue-3.0-components\vue3.0\src\components\TodoList\useTodo.js
 */
import { ref } from "vue";

const STORAGE_KEY = "todos";
let defalutList = window.localStorage.getItem(STORAGE_KEY)
  ? JSON.parse(window.localStorage.getItem(STORAGE_KEY))
  : [
      { text: "star this repository", done: false },
      { text: "fork this repository", done: false },
      { text: "follow author", done: false },
      { text: "vue-element-admin", done: true },
      { text: "vue", done: true },
      { text: "element-ui", done: true },
      { text: "axios", done: true },
      { text: "webpack", done: true },
    ];

export function useTodo() {
  let todos = ref(defalutList);
  const setLocalStorage = () => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(todos.value));
  };
  const addTodo = (e) => {
    const text = e.target.value;
    if (text.trim()) {
      todos.value.push({
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
    todos.value.splice(todos.value.indexOf(todo), 1);
    setLocalStorage();
  };
  const editTodo = ({ todo, value }) => {
    todo.text = value;
    setLocalStorage();
  };
  const clearCompleted = () => {
    todos = todos.value.filter((todo) => !todo.done);
    setLocalStorage();
  };
  const toggleAll = ({ done }) => {
    todos.value.forEach((todo) => {
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
