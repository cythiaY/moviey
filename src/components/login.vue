<template>
  <div class="container">
    <div class="forms">
      <form class="loginForm" :model="loginForm">
        <div class="uk-margin">
          <input type="text" class="uk-input uk-width-2-5" v-model="loginForm.username" placeholder="用户名">
        </div>
        <div class="uk-margin">
          <input type="password" class="uk-input uk-width-2-5" name="" id="" v-model="loginForm.password" placeholder="密码">
        </div>
        <div class="uk-margin">
          <button class="uk-button uk-button-secondary" @click="login">登录</button>
          <button class="uk-button uk-button-link">忘记密码</button>
        </div>
      </form>
      <form class="uk-width-1-2">
        <div class="uk-margin">
          <input type="text" class="uk-input uk-width-2-5" placeholder="用户名">
        </div>
        <div class="uk-margin">
          <input type="password" class="uk-input uk-width-2-5" name="" id="" placeholder="密码">
        </div>
        <div class="uk-margin">
          <button class="uk-button uk-button-danger">注册</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      loginForm: {}
    }
  },
  methods: {
    login () {
      this.$http.post('http://localhost:8087/user/add', {userName: 'cdc', userPassword: '123456'}, {emulateJSON: true}).then(response => {
        console.log(response)
      }, response => {
        console.log('error')
      })
      console.log(this.loginForm.username)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
@import "src/static/styles/login.scss";
</style>
