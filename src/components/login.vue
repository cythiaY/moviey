<template>
  <div class="container">
    <img class="bg" src="https://moviey.oss-cn-hangzhou.aliyuncs.com/images/image02.jpg" alt="">
    <img class="logo" src="https://moviey.oss-cn-hangzhou.aliyuncs.com/images/logoW.png" alt="">
    <div class="forms">
      <el-form class="loginForm" v-if="!isRegisterForm" :rules="rules" :model="loginForm">
        <el-form-item label="" prop="username">
          <el-input v-model="loginForm.username" placeholder="登录用户名" @blur="checkUserName"></el-input>
        </el-form-item>
        <el-form-item label="" prop="password">
          <el-input v-model="loginForm.password" type="password" placeholder="登录密码" @blur="checkUserPassord"></el-input>
        </el-form-item>
        <el-form-item>
          <button class="leftBtn" @click="login">{{loginState}}</button>
          <button class="rightBtn themeBgBlack" @click="isRegisterForm = true;resetForms()">切换注册</button>
        </el-form-item>
      </el-form>
      <el-form class="registerForm" :rules="rules" v-else :model="registerForm">
        <el-form-item label="" prop="username">
          <el-input v-model="registerForm.username" placeholder="注册用户名" @blur="checkUserName"></el-input>
        </el-form-item>
        <el-form-item label="" prop="password">
          <el-input v-model="registerForm.password" type="password" placeholder="注册密码" @blur="checkUserPassord"></el-input>
        </el-form-item>
        <el-form-item>
          <button class="leftBtn" @click="register">注册</button>
          <button class="rightBtn themeBgBlack" @click="isRegisterForm = false;resetForms()">切换登录</button>
        </el-form-item>
      </el-form>
      <div style="clear:both"></div>
    </div>
  </div>
</template>

<script>
  import md5 from 'js-md5'
  import { getCookie, setCookie } from '../../src/utils/util'
  export default {
    name: 'login',
    data() {
      return {
        loginForm: {},
        registerForm: {},
        loginState: '登录',
        isloginName: false,
        isloginPassword: false,
        isRegisterForm: false,
        rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ],
          password: [{ required: true, message: '请选择密码', trigger: 'blur' }]
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
                this.$router.push({ path: '/index' })
                console.log('aaa')
              } else {
                this.$message.error('用户名密码错误，请重新输入')
              }
            })
            .catch(error => {
              console.log('login error')
            })
        } else {
          this.$message.error('请输入正确的用户名密码')
        }
      },
      /**
       *
       * 用户注册
       *
       */
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
            userPassword: md5(this.registerForm.password),
            userType: 2
          }
          this.$get('/user/add', data).then(
            response => {
              this.$message.success('注册成功,快去登录吧！')
              this.isRegisterForm = false
              this.resetForms()
            },
            response => {
              console.log('注册失败～')
            }
          )
        }
      },
      /**
       *
       * 重置表单
       *
       */
      resetForms() {
        this.loginForm = {}
        this.registerForm = {}
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
@import 'src/static/styles/login.scss';
</style>
