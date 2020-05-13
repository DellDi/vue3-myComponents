<!--
 * @Author: Dell_Di
 * @Date: 2020-05-11 13:52:01
 * @LastEditors: Dell_Di
 * @LastEditTime: 2020-05-11 14:24:31
 * @FilePath: \vue-3.0-components\vue3.0\src\App.vue
 -->
<template>
  <div id="app">
    <h1>{{title.name}}</h1>
    <div>{{user}}</div>
    <button @click="updateMyName">修改名称</button>
    <div>当前count：{{computedCount}}</div>
    <button @click="increment">修改count</button>
    <todo-list />
  </div>
</template>

<script>
import { reactive, ref, onMounted } from "vue";
import TodoList from './components/TodoList/index';
export default {
  name: "App",
  components: {
    TodoList
  },
  setup(props, context) {
    const title = reactive({
      name: "vue3.0"
    });
    const user = ref("沧海一粟");
    const updateMyName = () => {
      //如果需要修改值，可通过value
      user.value = "delldi";
    };
    onMounted(() => {
      console.log(props, context);
    });
    const computedCount = ref(0);
    const increment = () => {
      computedCount.value++;
    };
    return { title, user, updateMyName, computedCount, increment };
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
