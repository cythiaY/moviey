<template>
  <div class="detail_container">
    <navComponent ref="navCom"></navComponent>
    <div class="go_back el-icon-arrow-left" @click="$router.go(-1)"></div>
    <div class="main_detail">
      <el-row>
        <el-col :span="8">
          <div class="left_img">
            <img :src="movieInfo.imgUrl" alt="">
            <div :class="isStar ? 'el-icon-star-on' : 'el-icon-star-off'" @click="isStar=!isStar;starMovie()">
              <span>{{isStar ? '取消收藏':'点击收藏'}}</span>
            </div>
          </div>
        </el-col>
        <el-col :span="14">
          <div class="right_info">
            <span>{{movieInfo.name}}</span>
            <span>评分:
              <span class="themeRed">{{movieInfo.score}}</span>
            </span>
            <div class="infos">
              国家：
              <span class="themeRed">{{movieInfo.area}}</span>
              <div>导演：
                <span class="themeRed">{{movieInfo.director}}</span>
              </div>
              <div>
                类型：
                <span class="themeRed">{{movieInfo.type}}</span>
              </div>
              <div>
                上映日期：
                <span class="themeRed">{{movieInfo.date}} 年</span>
              </div>
              <div class="introduce themeBlack">{{movieInfo.content}}</div>
              <div class="casts">
                <div class="title themeRed">演员表</div>
                <el-row class="themeBlack">{{movieInfo.actor}}</el-row>
              </div>
              <div class="comments">
                <div class="title">评论区
                  <el-button type="text" class="addBtn el-icon-edit-outline themeRed" @click="commentDialogVisiable = true">我想发表</el-button>
                </div>
                <div class="commentList">
                  <div class="commentator" v-for="item in commentList">
                    <span class="name themeRed">{{item.userName}}</span>
                    <span class="dateTime">{{item.time | toDateTime}}</span>
                    <div class="content">{{item.content}}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-dialog :visible.sync="commentDialogVisiable" title="发表影评">
      <div class="addComment">
        <el-form :model="commentForm">
          <el-input type="textarea" :rows="2" v-model="commentForm.content" resize="none" placeholder="快告诉我你的想法吧～" suffix-icon="el-icon-edit"></el-input>
          <el-rate class="score" v-model="commentForm.score" :allow-half="true" show-score :max="10">
          </el-rate>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="commentDialogVisiable = false">取 消</el-button>
        <el-button type="primary" @click="addComment">发 表</el-button>
      </span>
    </el-dialog>
    <!-- <div style="clear:both"></div> -->
  </div>
</template>

<script>
  import navCommon from './nav'
  import { getCookie } from '../../src/utils/util'
  export default {
    name: 'detail',
    data() {
      return {
        id: 0,
        movieInfo: {},
        commentList: {},
        commentDialogVisiable: false,
        commentForm: {},
        isStar: false,
        typeParam: {}, // 更新用户行为记录参数
        intervalFuc: {}
      }
    },
    mounted() {
      this.getDetail()
      this.getComments()
      this.setNav()
      this.updateBehavior()
    },
    components: {
      navComponent: navCommon
    },
    filters: {
      toDate: function(val) {
        var dateStr = new Date(val)
        let month =
          dateStr.getMonth() + 1 < 10
            ? '0' + (dateStr.getMonth() + 1)
            : dateStr.getMonth() + 1
        let date =
          dateStr.getDate() < 10 ? '0' + dateStr.getDate() : dateStr.getDate()
        return dateStr.getFullYear() + '-' + month + '-' + date
      },
      toDateTime: function(val) {
        var dateStr = new Date(val)
        let month =
          dateStr.getMonth() + 1 < 10
            ? '0' + (dateStr.getMonth() + 1)
            : dateStr.getMonth() + 1
        let date =
          dateStr.getDate() < 10 ? '0' + dateStr.getDate() : dateStr.getDate()
        let hour =
          dateStr.getHours() < 10 ? '0' + dateStr.getHours() : dateStr.getHours()
        let minute =
          dateStr.getMinutes() < 10
            ? '0' + dateStr.getMinutes()
            : dateStr.getMinutes()
        let second =
          dateStr.getSeconds() < 10
            ? '0' + dateStr.getSeconds()
            : dateStr.getSeconds()
        return (
          dateStr.getFullYear() +
          '-' +
          month +
          '-' +
          date +
          ' ' +
          hour +
          ':' +
          minute +
          ':' +
          second
        )
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
      },
      /**
       *
       * 获取电影详情
       *
       */
      getDetail() {
        this.id = this.$route.params.id
        var data = {
          id: this.id
        }
        this.$get('/movie/getMovies', data).then(
          response => {
            this.movieInfo = response.data.records[0]
          },
          response => {
            console.log('获取失败～')
          }
        )
        // 获取用户收藏记录
        var userData = {
          userId: parseInt(getCookie('id'))
        }
        this.$get('/user/getUserInfo', userData).then(
          response => {
            let str = response.data.star
            if (str) {
              this.isStar = str.indexOf(this.$route.params.id + ':') > -1
            } else {
              this.isStar = false
            }
          },
          response => {
            console.log('获取失败～')
          }
        )
      },
      /**
       *
       * 获取当前影评
       *
       */
      getComments() {
        var data = {
          movieId: this.id
        }
        this.$get('/comment/getComment', data).then(
          response => {
            this.commentList = response.data.records
          },
          response => {
            console.log('获取失败～')
          }
        )
      },
      /**
       *
       * 发表评论
       *
       */
      addComment() {
        var tag = true
        if (!this.commentForm.score || this.commentForm.score === '') {
          this.$message({
            message: '请先给这部电影打分',
            type: 'warning'
          })
          tag = false
        }
        if (!this.commentForm.content || this.commentForm.content === '') {
          this.$message({
            message: '请先填写影评内容',
            type: 'warning'
          })
          tag = false
        }
        if (tag) {
          var data = {
            userId: parseInt(getCookie('id')),
            movieId: parseInt(this.id),
            content: this.commentForm.content,
            score: this.commentForm.score
          }
          this.$get('/comment/addComment', data).then(
            response => {
              this.$message.success('评论成功～')
              this.commentDialogVisiable = false
              this.addUserscore()
              this.getComments()
            },
            response => {
              this.$message.error('评论失败～')
            }
          )
        }
      },
      /**
       *
       * 添加用户点评记录
       *
       */
      addUserscore() {
        var data = {
          userId: parseInt(getCookie('id')),
          movieId: parseInt(this.id)
        }
        this.$get('/user/scoreMovie', data).then(
          response => {
            console.log('添加用户评论数组成功')
          },
          response => {
            console.error('添加用户评论失败～')
          }
        )
      },
      /**
       *
       * 收藏／取消收藏电影
       *
       */
      starMovie() {
        var data = {
          userId: parseInt(getCookie('id')),
          movieId: parseInt(this.id),
          tag: this.isStar
        }
        this.$get('/user/starMovie', data).then(
          response => {
            this.$message.success('操作成功～')
          },
          response => {
            this.$message.error('操作失败～')
            this.isStar = !this.isStar
          }
        )
      },
      /**
       * 更新用户行为记录
       */
      updateBehavior() {
        this.$get('/movie/recommend/Movies', { user_id: getCookie('id') }).then(
          response => {
            if (response.data.length === 0) {
              this.whichType(this.movieInfo.type)
            }
          }
        )
      },
      /**
       *
       * 判断电影类型
       * 并循环记录用户行为
       *
       */
      whichType(str) {
        if (str.indexOf('爱情') > -1) {
          this.typeParam.romanceTypeNum = true
        }
        if (str.indexOf('动作') > -1) {
          this.typeParam.actionTypeNum = true
        }
        if (str.indexOf('喜剧') > -1) {
          this.typeParam.comedyTypeNum = true
        }
        if (str.indexOf('奇幻') > -1 || str.indexOf('科幻') > -1) {
          this.typeParam.scifiTypeNum = true
        }
        if (str.indexOf('犯罪') > -1) {
          this.typeParam.crimeTypeNum = true
        }
        if (str.indexOf('战争') > -1) {
          this.typeParam.warTypeNum = true
        }
        if (str.indexOf('动画') > -1 || str.indexOf('儿童') > -1) {
          this.typeParam.animationTypeNum = true
        }
        if (str.indexOf('悬疑') > -1 || str.indexOf('惊悚') > -1) {
          this.typeParam.thrillerTypeNum = true
        }
        this.typeParam.userId = parseInt(getCookie('id'))
        var that = this
        // 10s循环，记录用户浏览记录
        this.intervalFuc = setInterval(function() {
          that.$get('/behavior/update', that.typeParam).then(response => {})
        }, 10000)
      }
    },
    // 跳出当前页面后清除循环
    destroyed: function() {
      clearInterval(this.intervalFuc)
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
@import 'src/static/styles/detail.scss';
</style>
