<template>
  <div class="profile_container">
    <div class="left_content">
      <el-card class="box-card">
        <img :src="headImg" alt="">
        <div>
          <span class="name">{{userInfo.nickname | filterNull}}</span>
          <span class="editBtn themeRed" @click="changeForm">{{formName}}</span>
        </div>
      </el-card>
    </div>
    <div class="right_content">
      <div class="remark">工作时间是IDC行业的程序猿，休息的时候就变成了笔耕不辍的作家，周末还能化身成变出一桌美味菜肴的营养师...</div>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="评价" name="first">
        </el-tab-pane>
        <el-tab-pane label="收藏" name="second"></el-tab-pane>
        <el-tab-pane label="浏览" name="third"></el-tab-pane>
      </el-tabs>
      <el-form class="editForm" label-position="left" label-width="80px" v-if="isEdit" :model="editForm">
        <h3>个人信息修改</h3>
        <el-form-item label="用户名">
          <el-input v-model="editForm.name" readonly disabled></el-input>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="editForm.nickname"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="editForm.phone"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交</el-button>
        </el-form-item>
      </el-form>
      <el-form class="editForm" label-position="left" label-width="80px" v-else :model="passwordForm">
        <h3>个人信息修改</h3>
        <el-form-item label="旧密码" required>
          <el-input type="password" v-model="passwordForm.passwordBefore"></el-input>
        </el-form-item>
        <el-form-item label="新密码" required>
          <el-input type="password" v-model="passwordForm.passwordAfter"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="passwordSubmit">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import md5 from 'js-md5'
  import { getCookie } from '../../src/utils/util'
  export default {
    data() {
      return {
        userInfo: {},
        editForm: {},
        passwordForm: {},
        isEdit: true,
        formName: '修改密码',
        activeName: 'first',
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
      /**
       *
       * 切换表单
       *
       */
      changeForm() {
        this.isEdit = !this.isEdit
        this.formName = this.isEdit ? '修改密码' : '更新信息'
      },
      /**
       *
       * tab切换
       *
       */
      handleClick() {},
      /**
       *
       * 获取用户个人信息
       *
       */
      getUserInfo() {
        if (getCookie('id') && getCookie('id') !== 0) {
          var data = {
            userId: parseInt(getCookie('id'))
          }
          this.axios
            .get('http://localhost:8087/user/getUserInfo', { params: data })
            .then(response => {
              this.userInfo = response.data.data
              this.editForm = response.data.data
            })
            .catch(response => {
              console.log('getInfo error')
            })
        }
      },
      /**
       *
       * 提交信息更改
       *
       */
      onSubmit() {
        var data = {
          userId: parseInt(getCookie('id')),
          userNickname: this.editForm.nickname,
          userPhone: this.editForm.phone
        }
        this.axios
          .get('http://localhost:8087/user/update', { params: data })
          .then(response => {
            this.$message.success('提交成功～')
          })
          .catch(response => {
            console.log('editInfo error')
          })
      },
      /**
       *
       * 修改密码
       *
       */
      passwordSubmit() {
        var data = {
          userId: parseInt(getCookie('id')),
          passwordBefore: md5(this.passwordForm.passwordBefore),
          passwordAfter: md5(this.passwordForm.passwordAfter)
        }
        this.axios
          .get('http://localhost:8087/user/resetPsd', { params: data })
          .then(response => {
            this.$message.success('更改密码成功～')
            this.passwordForm = {}
          })
          .catch(response => {
            console.log('editPsd error')
          })
      }
    }
  }
</script>

<style lang="scss">
@import 'src/static/styles/profile.scss';
</style>
