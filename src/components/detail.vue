<template>
  <div class="detail_container">
    <!-- <navComponent></navComponent> -->
    <router-link :to="'/index'"><div class="go_back el-icon-arrow-left"></div></router-link>
    <div class="main_detail">
      <el-row>
      <el-col :span="8">
      <div class="left_img">
        <img :src="movieInfo.imgUrl" alt="">
        <div class="themeRed">打分</div>
      </div>
      </el-col>
      <el-col :span="14">
      <div class="right_info">
        <span>{{movieInfo.name}}</span>
        <span>评分: <span class="themeRed">{{movieInfo.score}}</span></span>
        <div class="infos">
          时长：<span class="themeRed">{{movieInfo.long}}</span>分钟
          国家：<span class="themeRed">{{movieInfo.area}}</span>
          导演：<span class="themeRed">{{movieInfo.director}}</span>
          <div>
            类型：<span class="themeRed">剧情 / 犯罪</span>
          </div>
          <div>
            上映日期：<span class="themeRed">{{movieInfo.date}}</span>
          </div>
          <div class="introduce themeBlack">{{movieInfo.content}}</div>
          <div class="casts">
            <div class="title themeRed">演员表</div>
            <el-row class="themeBlack">{{movieInfo.actor}}</el-row>
          </div>
          <div class="comments">
            <div class="title themeRed el-icon-edit-outline">评论区</div>
            <div class="addComment">
              <el-input placeholder="快告诉我你的想法哦～" suffix-icon="el-icon-edit"></el-input>
            </div>
            <div class="commentList">
              <div class="commentator">
                <span class="name themeRed">珍妮的肖像</span>
                <span class="dateTime">2017-05-09</span>
                <div class="content">恐惧让你沦为囚犯，希望让你重获自由。——《肖申克的救赎》</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </el-col>
      </el-row>
    </div>
    <div style="clear:both"></div>
  </div>
</template>

<script>
import navCommon from './nav'
export default {
  name: 'detail',
  data () {
    return {
      id: 0,
      movieInfo: {}
    }
  },
  mounted () {
    this.getDetail()
  },
  components: {
    'navComponent': navCommon
  },
  methods: {
    getDetail () {
      this.id = this.$route.params.id
      var data = {
        id: this.id
      }
      this.$http.get('http://localhost:8087/movie/getMovies', {params: data}, {emulateJSON: true}).then(response => {
        this.movieInfo = response.data.data[0]
      }, response => {
        console.log('获取失败～')
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
@import "src/static/styles/detail.scss";
</style>
