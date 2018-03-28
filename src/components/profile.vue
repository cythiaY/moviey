<template>
  <div class="profile_container">
    <div class="left_content">
      <el-card class="box-card">
        <img :src="headImg" alt="">
        <div>
          <span class="name">{{userInfo.nickname | filterNull}}</span>
          <span class="editBtn themeRed" @click="isEdit=!isEdit">编辑</span>
        </div>
      </el-card>
    </div>
    <div class="right_content">
      <div class="remark">工作时间是IDC行业的程序猿，休息的时候就变成了笔耕不辍的作家，周末还能化身成变出一桌美味菜肴的营养师...</div>
      <el-tabs v-model="first">
        <el-tab-pane label="评价" name="first">
        </el-tab-pane>
        <el-tab-pane label="收藏" name="second">收藏</el-tab-pane>
        <el-tab-pane label="浏览" name="third">浏览</el-tab-pane>
      </el-tabs>
      <el-form v-if="isEdit" :model="editForm">
        <el-form-item label="名称">
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>
        <el-form-item label="活动区域">
          <el-input v-model="editForm.region"></el-input>
        </el-form-item>
        <el-form-item label="活动形式">
          <el-input v-model="editForm.type"></el-input>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import { getCookie } from '../../src/utils/util'
  export default {
    data() {
      return {
        userInfo: {},
        editForm: {},
        isEdit: false,
        headImg: require('../../src/static/images/headImg.jpg')
      }
    },
    mounted() {
      this.getUserInfo()
    },
    filters: {
      filterNull: function(val) {
        if (!val || val === '') return '快改个昵称吧'
        return val
      }
    },
    methods: {
      getUserInfo() {
        if (getCookie('id') && getCookie('id') !== 0) {
          var data = {
            userId: parseInt(getCookie('id'))
          }
          this.axios
            .get('http://localhost:8087/user/getUserInfo', { params: data })
            .then(response => {
              this.userInfo = response.data.data
            })
            .catch(response => {
              console.log('getInfo error')
            })
        }
      }
    }
  }
</script>

<style lang="scss">
@import 'src/static/styles/profile.scss';
</style>
