<template>
  <div class="container" :style="{backgroundImage: 'url('+bgImg+')'}">
    <div class="forms">
      <form class="loginForm" :model="loginForm">
        <div class="floatR">
          <input type="text" class="uk-input uk-width-2-5" :class="{'uk-form-danger': isloginName}" v-model="loginForm.username" placeholder="用户名" @blur="checkUserName">
          <div class="warnning uk-width-2-5" :class="{'hide': !isloginName}">请输入正确的用户名</div>
        </div>
        <div class="uk-margin">
          <input type="password" class="uk-input uk-width-2-5" :class="{'uk-form-danger': isloginPassword}" v-model="loginForm.password" placeholder="密码" @blur="checkUserPassord">
          <div class="warnning uk-width-2-5" :class="{'hide': !isloginPassword}">请输入正确的密码</div>
        </div>
        <div class="uk-margin">
          <div class="uk-width-2-5" style="margin-left:30%">
            <button class="uk-button uk-button-small uk-button-secondary uk-align-left" @click="login">{{loginState}}</button>
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
  import { userLogin } from '../../src/utils/user'
  import { getCookie, setCookie } from '../../src/utils/util'
  export default {
    name: 'login',
    data() {
      return {
        loginForm: {},
        loginState: '登录',
        isloginName: false,
        isloginPassword: false,
        registerForm: {},
        bgImg: require('../../src/static/images/login_bg.jpeg')
      }
    },
    methods: {
      checkUserName() {
        if (this.loginForm.username === '' || !this.loginForm.username) {
          this.isloginName = true
        } else {
          this.isloginName = false
        }
      },
      checkUserPassord() {
        if (this.loginForm.password === '' || !this.loginForm.password) {
          this.isloginPassword = true
        } else {
          this.isloginPassword = false
        }
      },
      /**
       * 登录操作
       * 用户名、密码验证
       */
      login() {
        var tag = true
        if (this.loginForm.username === '' || !this.loginForm.username) {
          tag = false
          this.isloginName = true
        }
        if (this.loginForm.password === '' || !this.loginForm.password) {
          tag = false
          this.isloginPassword = true
        }
        if (tag) {
          var data = {
            userName: this.loginForm.username,
            userPassword: this.loginForm.password
          }
          this.axios
            .get('http://localhost:8087/user/login', { params: data })
            .then(response => {
              setCookie('id', response.data.data, 1000 * 60 * 60)
              if (response.data.data && response.data.data !== 0) {
                this.$router.push({ path: '/index' })
              } else {
                this.$message.error('用户名密码错误，请重新输入')
              }
            })
            .catch(response => {
              console.log('login error')
            })
        }
      },
      register() {
        var tag = true
        if (this.registerForm.username === '' || !this.registerForm.username) {
          tag = false
          this.isloginName = true
        }
        if (this.registerForm.password === '' || !this.registerForm.password) {
          tag = false
        }
        if (tag) {
          var data = {
            userName: this.registerForm.username,
            userPassword: this.registerForm.password
          }
          this.$http
            .post('http://localhost:8087/user/add', data, { emulateJSON: true })
            .then(
              response => {
                console.log(response.data)
              },
              response => {
                console.log('注册失败～')
              }
            )
        }
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
@import 'src/static/styles/login.scss';
</style>
