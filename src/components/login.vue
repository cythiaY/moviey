<template>
  <div class="container" :style="{backgroundImage: 'url('+bgImg+')'}">
    <div class="forms">
      <form class="loginForm" :model="loginForm">
        <div class="floatR">
          <input type="text" class="uk-input uk-width-2-5" v-model="loginForm.username" placeholder="用户名">
        </div>
        <div class="uk-margin">
          <input type="password" class="uk-input uk-width-2-5" v-model="loginForm.password" placeholder="密码">
        </div>
        <div class="uk-margin">
          <div class="uk-width-2-5" style="margin-left:30%">
            <button class="uk-button uk-button-small uk-button-secondary uk-align-left" @click="login">登录</button>
            <button class="uk-button uk-button-link uk-align-right" style="line-height:40px">忘记密码</button>
          </div>
        </div>
      </form>
      <form class="uk-width-1-2" :model="registerForm">
        <div class="uk-margin">
          <input type="text" class="uk-input uk-width-2-5" v-model="registerForm.username" placeholder="用户名">
        </div>
        <div class="uk-margin">
          <input type="password" class="uk-input uk-width-2-5" v-model="registerForm.password" placeholder="密码">
        </div>
        <div class="uk-margin">
          <button class="uk-button uk-button-small uk-width-1-5 uk-button-danger" @click="register">注册</button>
        </div>
      </form>
      <div style="clear:both"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      loginForm: {},
      registerForm: {},
      bgImg: require('../../src/static/images/login_bg.jpeg'),
      isloginName: false
    }
  },
  methods: {
    /**
     * 登录操作
     * 用户名、密码验证
     */
    login () {
      var tag = true
      if (this.loginForm.username === '' || !this.loginForm.username) {
        tag = false
        this.isloginName = true
      }
      if (this.loginForm.password === '' || !this.loginForm.password) {
        tag = false
      }
      console.log(this.loginForm.username, this.loginForm.password, tag)
      if (tag) {
        var data = {
          userName: this.loginForm.username,
          userPassword: this.loginForm.password
        }
        this.$http.get('http://localhost:8087/user/login', {params: data}, {emulateJSON: true}).then(response => {
          UIkit.notification({
            message: '恭喜你注册成功！',
            status: 'success',
            pos: 'top-center'
          })
        }, response => {
          console.log('登录失败～')
        })
      }
    },
    register () {
      var tag = true
      if (this.registerForm.username === '' || !this.registerForm.username) {
        tag = false
        this.isloginName = true
      }
      if (this.registerForm.password === '' || !this.registerForm.password) {
        tag = false
      }
      console.log(this.registerForm.username, this.registerForm.password, tag)
      if (tag) {
        var data = {
          userName: this.registerForm.username,
          userPassword: this.registerForm.password
        }
        this.$http.post('http://localhost:8087/user/add', data, {emulateJSON: true}).then(response => {
          console.log(response.data)
        }, response => {
          console.log('注册失败～')
        })
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
@import "src/static/styles/login.scss";
</style>
