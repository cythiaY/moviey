<template>
  <div>
    <navComponent ref="navCom"></navComponent>
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
          <el-tab-pane label="收藏" name="first">
            <div class="nodata" v-if="isStarNull">
              <img src="https://moviey.oss-cn-hangzhou.aliyuncs.com/images/nodata.png" alt="">
              <div>还没有呢 快去收藏吧</div>
            </div>
            <div v-else class="starMovie" v-for="item in starList" :key="item.id">
              <div>
                <router-link class="themeBlack" :to="'/detail/' + item.id">{{item.name}}</router-link>
                <span class="score">{{item.score}}分</span>
              </div>
              <div>{{item.type}}</div>
            </div>
          </el-tab-pane>
          <el-tab-pane label=" 评价" name="second">
            <div class="nodata" v-if="isScoreNull">
              <img src="https://moviey.oss-cn-hangzhou.aliyuncs.com/images/nodata.png" alt="">
              <div>还没有呢 快去评价吧</div>
            </div>
            <div v-else class="starMovie" v-for="item in scoreList" :key="item.id">
              <div>
                <router-link class="themeBlack" :to="'/detail/' + item.id">{{item.name}}</router-link>
                <span class="score">{{item.score}}分</span>
              </div>
              <div>{{item.type}}</div>
            </div>
          </el-tab-pane>
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
        <el-form class="editForm" :rules="rules" label-position="left" ref="passwordForm" label-width="80px" v-else :model="passwordForm">
          <h3>修改登录密码</h3>
          <el-form-item label="旧密码" prop="passwordBefore">
            <el-input type="password" v-model="passwordForm.passwordBefore"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="passwordAfter">
            <el-input type="password" v-model="passwordForm.passwordAfter"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="passwordSubmit">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import md5 from 'js-md5'
  import navCommon from './nav'
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
        headImg: require('../../src/static/images/headImg.jpg'),
        rules: {
          passwordBefore: [
            { required: true, message: '请输入旧密码', trigger: 'blur' }
          ],
          passwordAfter: [
            { required: true, message: '请输入新密码', trigger: 'blur' }
          ]
        },
        starIdArr: [],
        scoreIdArr: [],
        starList: [],
        scoreList: [],
        isStarNull: false,
        isScoreNull: false
      }
    },
    mounted() {
      this.getUserInfo()
      this.setNav()
    },
    components: {
      navComponent: navCommon
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
       * 设置顶部导航
       *
       */
      setNav() {
        this.$refs['navCom'].$emit('isIndex', false)
        this.$refs['navCom'].$emit('isProfile')
      },
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
          this.$get('/user/getUserInfo', data)
            .then(response => {
              this.userInfo = response.data
              this.editForm = response.data
              var stars = response.data.star // 用户收藏
              var scores = response.data.score // 用户评价
              if (stars) {
                this.isStarNull = false
                this.starIdArr = stars.substring(0, stars.length - 1).split(':')
                this.getMoviesList()
              } else {
                this.isStarNull = true
              }
              if (scores) {
                this.isScoreNull = false
                this.scoreIdArr = scores
                  .substring(0, scores.length - 1)
                  .split(':')
                this.getMoviesScoreList()
              } else {
                this.isScoreNull = true
              }
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
        this.$get('/user/update', data)
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
        this.$refs['passwordForm'].validate(valid => {
          console.log(valid)
          if (valid) {
            var data = {
              userId: parseInt(getCookie('id')),
              passwordBefore: md5(this.passwordForm.passwordBefore),
              passwordAfter: md5(this.passwordForm.passwordAfter)
            }
            this.$get('/user/resetPsd', data)
              .then(response => {
                if (response.data) {
                  this.$message.success('更改密码成功～')
                } else {
                  this.$message.error('旧密码输入错误！')
                }
                this.passwordForm = {}
              })
              .catch(response => {
                console.log('editPsd error')
              })
          } else {
            this.$message.error('请先填写表单')
          }
        })
      },
      /**
       *
       * 获取用户收藏电影列表
       *
       */
      getMoviesList() {
        this.starIdArr.forEach(element => {
          var data = {
            id: element
          }
          this.$get('/movie/getMovies', data).then(
            response => {
              this.starList.push(response.data.records[0])
            },
            response => {
              console.log('获取失败～')
            }
          )
        })
        console.log(this.starList)
      },
      getMoviesScoreList() {
        this.scoreIdArr.forEach(element => {
          var data = {
            id: element
          }
          this.$get('/movie/getMovies', data).then(
            response => {
              this.scoreList.push(response.data.records[0])
            },
            response => {
              console.log('获取失败～')
            }
          )
        })
      }
    }
  }
</script>

<style lang="scss">
@import 'src/static/styles/profile.scss';
</style>
