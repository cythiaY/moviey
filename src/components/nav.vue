<template>
  <nav class="uk-navbar-container uk-navbar-sticky top_nav" uk-navbar>
    <div class="uk-navbar-left">
      <ul class="uk-navbar-nav themeRed">
        <li><router-link :to="'/index'" class="themeRed">首页</router-link></li>
        <li>推荐</li>
        <li>最新</li>
        <li>最热</li>
        <li>
          <router-link :to="'profile'" class="themeRed">我的</router-link>
        </li>
        <li>设置</li>
      </ul>
    </div>
  </nav>
</template>
<style lang="scss" scoped>
.top_nav {
  height: 80px;
  position: fixed;
  top: 0;
  z-index: 999;
  width: 100%;
  background-color: rgba(238, 238, 238, 0.3) !important;
  li {
    line-height: 80px;
    margin: 0 40px;
    font-weight: 400;
  }
  border-top: 3px solid#f0506e;
  // border-bottom: 1px solid #eee;
  // box-shadow: 0px 2px 6px #eee;
  // rgba(240,79,109,0.1)
}
</style>
<script>
export default {}
</script>
