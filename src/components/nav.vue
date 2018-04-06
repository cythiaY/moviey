<template>
  <nav class="uk-navbar-container uk-navbar-sticky top_nav" uk-navbar>
    <div class="logo">
      <img src="https://moviey.oss-cn-hangzhou.aliyuncs.com/images/logo.png" alt="">
    </div>
    <div class="uk-navbar-left">
      <ul class="uk-navbar-nav themeRed" style="width:100%;position:relative">
        <li>
          <router-link :to="'/index'" class="themeRed">首页</router-link>
        </li>
        <li v-if="isIndex"><a href="#recommendMoives" class="themeRed">推荐</a></li>
        <li v-if="isIndex"><a href="#newMoives" class="themeRed">最新</a></li>
        <li v-if="isIndex"><a href="#hotMoives" class="themeRed">最热</a></li>
        <li class="rightLi" v-if="isLogin">
          <el-dropdown>
            <span class="el-dropdown-link themeRed">
              {{userName}}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-if="!isProfile">
                <router-link :to="'/profile'" class="themeRed">我的</router-link>
              </el-dropdown-item>
              <el-dropdown-item>
                <span class="themeRed" @click="logout">切换账号</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </li>
        <li class="rightLi" v-else>
          <router-link :to="'/login'" class="themeRed">登录</router-link>
        </li>
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
  .logo {
    float: left;
    img {
      height: 80px;
    }
  }
  .rightLi {
    position: absolute;
    right: 0;
    margin-right: 400px;
  }
  li {
    line-height: 80px;
    margin: 0 40px;
    font-weight: 400;
  }
  border-top: 3px solid#f0506e;
}
</style>
<script>
  import { getCookie, delCookie } from '../../src/utils/util'
  export default {
    data() {
      return {
        isLogin: false,
        userName: '',
        isIndex: true,
        isProfile: false
      }
    },
    mounted() {
      this.getState()
      this.$on('isIndex', tag => {
        this.showIndexNav(tag)
      })
      this.$on('isProfile', () => {
        this.showProfileNav()
      })
    },
    methods: {
      /**
       *
       * 用户注销 删除cookie
       *
       */
      logout() {
        delCookie('id')
        this.$router.push({ path: '/login' })
      },
      /**
       *
       * 获取用户登录状态
       *
       */
      getState() {
        if (getCookie('id') && getCookie('id') !== 0) {
          this.isLogin = true
        }
        if (this.isLogin) {
          // 获取用户名
          var data = {
            userId: parseInt(getCookie('id'))
          }
          this.axios
            .get('http://localhost:8089/user/getUserInfo', { params: data })
            .then(response => {
              this.userName = response.data.data.nickname
                ? response.data.data.nickname
                : response.data.data.name
            })
            .catch(response => {
              console.log('login error')
            })
        }
      },
      /**
       *
       * 设置nav内容
       *
       */
      showIndexNav(tag) {
        this.isIndex = tag
      },
      showProfileNav() {
        this.isProfile = true
      }
    }
  }
</script>
