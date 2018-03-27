<template>
  <div class="detail_container">
    <navComponent ref="navCom"></navComponent>
    <div class="go_back el-icon-arrow-left" @click="$router.go(-1)"></div>
    <div class="main_detail">
      <el-row>
        <el-col :span="8">
          <div class="left_img">
            <img :src="movieInfo.imgUrl" alt="">
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
                <span class="themeRed">{{movieInfo.date | toDate}}</span>
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
        commentForm: {}
      }
    },
    mounted() {
      this.getDetail()
      this.getComments()
      this.setNav()
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
        this.$http
          .get(
            'http://localhost:8087/movie/getMovies',
            { params: data },
            { emulateJSON: true }
          )
          .then(
            response => {
              this.movieInfo = response.data.data[0]
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
        this.$http
          .get(
            'http://localhost:8087/comment/getComment',
            { params: data },
            { emulateJSON: true }
          )
          .then(
            response => {
              this.commentList = response.data.data
              console.log(this.commentList)
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
          console.log(this.commentForm)
          // 获取用户名
          // var userData = {
          //   id: getCookie('id')
          // }
          // this.axios
          //   .get('http://localhost:8087/user/getUserInfo', { params: userData })
          //   .then(response => {
          //     this.userName = response.data.data.name
          //   })
          //   .catch(response => {
          //     console.log('getName error')
          //   })
          var data = {
            userId: parseInt(getCookie('id')),
            movieId: parseInt(this.id),
            content: this.commentForm.content,
            score: this.commentForm.score
          }
          this.$http
            .get('http://localhost:8087/comment/addComment', { params: data })
            .then(
              response => {
                this.$message.success('评论成功～')
                this.commentDialogVisiable = false
                this.getComments()
              },
              response => {
                this.$message.error('评论失败～')
              }
            )
        }
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
@import 'src/static/styles/detail.scss';
</style>
