<template>
  <div id="app">
    <router-view/>
    <div class="footer">
      <img src="https://moviey.oss-cn-hangzhou.aliyuncs.com/images/logo.png" alt="">
      <div class="text">
        Email & GitHub：cythia.xy@gmail.com
      </div>
      <div>17816869330</div>
    </div>
  </div>
</template>

<script src="static/commom/uikit.min.js"></script>
<script src="static/commom/uikit-icons.min.js"></script>
<script src="static/commom/jquery-3.3.1.min.js"></script>
<!-- 引入组件库 -->
<script src="https://unpkg.com/element-ui/lib/index.js"></script>
<script>
  export default {
    name: 'App',
    data() {
      return {}
    }
  }
</script>

<style lang="scss">
@import 'static/commom/uikit.min.css';
@import 'static/commom/common.scss';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
  .footer {
    padding-left: 0 10%;
    text-align: center;
    height: 200px;
    color: #f0506e;
    img {
      width: 200px;
    }
  }
  a {
    text-decoration: none;
  }
}
</style>
