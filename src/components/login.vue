<template>
  <div>
    <div class="form_item">
      <input type="text" placeholder="用户名">
    </div>
    <div class="form_item">
      <input type="password" name="" id="" placeholder="密码">
    </div>
    <div class="form_item">
      <button class="uk-button uk-button-secondary">登录</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
@import "src/static/styles/login.scss";
</style>
