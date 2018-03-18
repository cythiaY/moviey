<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script src="static/commom/uikit.min.js"></script>
<script src="static/commom/uikit-icons.min.js"></script>
<script src="static/commom/jquery-3.3.1.min.js"></script>
<!-- 引入组件库 -->
<script src="https://unpkg.com/element-ui/lib/index.js"></script>
<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
@import "static/commom/uikit.min.css";
@import "static/commom/common.scss";
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
