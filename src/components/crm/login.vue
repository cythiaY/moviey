<template>
  <div class="container">
    <div class="bgColor"></div>
    <img class="logo" src="https://moviey.oss-cn-hangzhou.aliyuncs.com/images/logoW.png" alt="">
    <h3 class="crmTitle">Y Movie 后台管理系统</h3>
    <div class="forms">
      <el-form class="loginForm" style="background-color: #3B3A3F;box-shadow:none" :rules="rules" :model="loginForm">
        <el-form-item label="" prop="username">
          <el-input v-model="loginForm.username" placeholder="登录用户名" @blur="checkUserName"></el-input>
        </el-form-item>
        <el-form-item label="" prop="password">
          <el-input v-model="loginForm.password" type="password" placeholder="登录密码" @blur="checkUserPassord"  @keyup.enter.native="login"></el-input>
        </el-form-item>
        <el-form-item>
          <button class="themeBgRed" style="width:30%;margin-left:35%" @click="login">登录</button>
        </el-form-item>
      </el-form>
      <div style="clear:both"></div>
    </div>
  </div>
</template>

<script>
  import md5 from 'js-md5'
  import { getCookie, setCookie } from '../../../src/utils/util'
  export default {
    name: 'login',
    data() {
      return {
        loginForm: {},
        isloginName: false,
        isloginPassword: false,
        rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ],
          password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
        }
      }
    },
    methods: {
      /**
       *
       * 检查用户名输入
       *
       */
      checkUserName() {
        if (this.loginForm.username === '' || !this.loginForm.username) {
          this.isloginName = true
        } else {
          this.isloginName = false
        }
      },
      /**
       *
       * 检查密码输入
       *
       */
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
            userPassword: md5(this.loginForm.password)
          }
          this.$get('/user/login', data)
            .then(response => {
              setCookie('id', response.data, 1000 * 60 * 60)
              if (response.data && response.data !== 0) {
                this.$router.push({ path: '/crmindex' })
              } else {
                this.$message.error('用户名密码错误，请重新输入')
              }
            })
            .catch(response => {
              console.log('login error')
            })
        } else {
          this.$message.error('请输入正确的用户名密码')
        }
      },
      /**
       *
       * 重置表单
       *
       */
      resetForms() {
        this.loginForm = {}
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
@import 'src/static/styles/login.scss';
</style>