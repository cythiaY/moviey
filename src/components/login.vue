<template>
  <div class="container">
    <img class="bg" :src="bgImg" alt="">
    <img class="logo" :src="logo" alt="">
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
  import { userLogin } from '../../src/utils/user'
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
        bgImg: require('../../src/static/images/login_bg02.jpg'),
        logo: require('../../src/static/images/logoW.png'),
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
        console.log(md5('123456'))
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
            // userPassword: this.loginForm.password
          }
          this.axios
            .get('http://localhost:8089/user/login', { params: data })
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
            userPassword: md5(this.registerForm.password)
          }
          this.$http.get('http://localhost:8089/user/add', { params: data }).then(
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
