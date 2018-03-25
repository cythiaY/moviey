<template>
  <nav class="uk-navbar-container uk-navbar-sticky top_nav" uk-navbar>
    <div class="uk-navbar-left">
      <ul class="uk-navbar-nav themeRed">
        <li>
          <router-link :to="'/index'" class="themeRed">首页</router-link>
        </li>
        <li>推荐</li>
        <li>最新</li>
        <li>最热</li>
        <li v-if="isLogin">
          <el-dropdown>
            <span class="el-dropdown-link themeRed">
              {{userName}}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <router-link :to="'profile'" class="themeRed">我的</router-link>
              </el-dropdown-item>
              <el-dropdown-item>
                <router-link :to="'login'" class="themeRed">切换账号</router-link>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </li>
        <li v-else>
          <router-link :to="'login'" class="themeRed">登录</router-link>
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
  import { getCookie } from '../../src/utils/util'
  export default {
    data() {
      return {
        isLogin: false,
        userName: ''
      }
    },
    mounted() {
      this.getState()
    },
    methods: {
      // 获取用户登录状态
      getState() {
        if (getCookie('id') && getCookie('id') !== 0) {
          this.isLogin = true
        }
        // 获取用户名
        var data = {
          id: getCookie('id')
        }
        this.axios
          .get('http://localhost:8087/user/getUserInfo', { params: data })
          .then(response => {
            this.userName = response.data.data.nickname
              ? response.data.data.nickname
              : response.data.data.name
          })
          .catch(response => {
            console.log('login error')
          })
      }
    }
  }
</script>
