<template>
  <div class="list_container">
    <navComponent ref="navCom"></navComponent>
    <div class="searchMovie">
      <el-input :class="[!showInput?'displayNone':'displayBlock']" placeholder="输入关键词查找" v-model="keyword" @keyup.enter.native="searchMovie"></el-input>
      <el-button class="append" icon="el-icon-search" @click="showInput=!showInput"></el-button>
    </div>
    <el-row style="margin-top:80px">
      <el-col class="leftNav" :span="6">
        <ul>
          <li :class="{'isActiveLi':liTag === 1}" @click="changeOrder(1)">最新</li>
          <li :class="{'isActiveLi':liTag === 2}" @click="changeOrder(2)">最热</li>
          <li :class="{'isActiveLi':liTag === 3}" @click="changeOrder(3)">推荐</li>
        </ul>
        <div style="width:30%;margin-left:35%;height:2px;background-color:#f0506e;padding-left: 40px;"></div>
        <ul>
          <li :class="{'isActiveYear':yearTag === 2016}" @click="changeYear(2016)">2016</li>
          <li :class="{'isActiveYear':yearTag === 2015}" @click="changeYear(2015)">2015</li>
          <li>
            <el-input class="inputYear" v-model="yearTag" placeholder="搜索年份" @keyup.enter.native="changeYear(0)"></el-input>
          </li>
          <li :class="{'isActiveYear':yearTag === 1}" @click="changeYear(1)">全部</li>
        </ul>
      </el-col>
      <el-col class="rightContent" :span="18">
        <el-tabs v-model="category" @tab-click="handleClick">
          <el-tab-pane label="全部" name="first"></el-tab-pane>
          <el-tab-pane label="爱情" name="second"></el-tab-pane>
          <el-tab-pane label="犯罪" name="eighth"></el-tab-pane>
          <el-tab-pane label="喜剧" name="third"></el-tab-pane>
          <el-tab-pane label="悬疑" name="fourth"></el-tab-pane>
          <el-tab-pane label="科幻" name="fifth"></el-tab-pane>
          <el-tab-pane label="动画" name="sixth"></el-tab-pane>
          <el-tab-pane label="历史" name="seventh"></el-tab-pane>
        </el-tabs>
        <div class="nodata" v-if="isDataNull">
          <img :src="nodata" alt="">
          <div>抱歉哦～暂无相关资源</div>
        </div>
        <div class="listContent" v-else>
          <el-row :gutter="100">
            <el-col :span="12" v-for="item in listData" :key="item.id">

              <div class="bg">
                <img :src="item.imgUrl" alt="">
                <div class="text">
                  <router-link :to="'/detail/' + item.id">
                    <div class="name themeRed">{{item.name}}</div>
                  </router-link>
                  <div class="director">by {{item.director}}</div>
                  <el-rate v-model="item.score/2" disabled show-score text-color="#ff9900" score-template="{value}">
                  </el-rate>
                  <div class="area">{{item.area}}</div>
                  <div class="area">{{item.type | turnType}}</div>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
        <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-size="10" layout="total, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import navCommon from './nav'
  export default {
    name: 'List',
    data() {
      return {
        category: 'first',
        listData: {},
        getMovieData: {},
        liTag: 0,
        yearTag: 0,
        currentPage: 1,
        total: 0,
        showInput: false,
        keyword: '',
        isDataNull: true,
        nodata: require('../../src/static/images/nodata.png')
      }
    },
    mounted() {
      this.getMovies()
      this.setNav()
    },
    filters: {
      turnType: function(val) {
        if (!val || val === '') return '暂无分类'
        return val
      }
    },
    components: {
      navComponent: navCommon
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
       * 切换页码
       *
       */
      handleCurrentChange(val) {
        this.getMovieData.page_no = parseInt(val)
        this.getMovies()
      },
      /**
       *
       * 查询
       *
       */
      searchMovie() {
        this.getMovieData.keyword = this.keyword
        this.getMovieData.page_no = 1
        this.getMovies()
      },
      /**
       *
       * 切换最新最热类型
       *
       */
      changeOrder(tag) {
        this.liTag = tag
        this.getMovieData.orderType = tag
        this.getMovieData.page_no = 1
        this.getMovies()
      },
      /**
       *
       * 切换年份
       *
       */
      changeYear(tag) {
        if (tag === 0) {
          this.getMovieData.year = String(this.yearTag)
        } else if (tag === 1) {
          this.getMovieData.year = '1'
        } else {
          this.getMovieData.year = String(tag)
        }
        this.yearTag = parseInt(this.getMovieData.year)
        this.getMovieData.page_no = 1
        this.getMovies()
      },
      /**
       *
       * 切换tab（更新电影类型）
       *
       */
      handleClick(tab) {
        if (tab.name === 'first') {
          this.getMovieData.movieType = ''
        } else {
          this.getMovieData.movieType = tab.label
        }
        this.getMovieData.page_no = 1
        this.getMovies()
      },
      /**
       *
       * 获取电影列表（筛选）
       *
       */
      getMovies() {
        this.$http
          .get(
            'http://localhost:8087/movie/getMovies',
            { params: this.getMovieData },
            { emulateJSON: true }
          )
          .then(
            response => {
              this.total = response.data.data.total
              if (this.total > 0) {
                this.isDataNull = false
              } else {
                this.isDataNull = true
              }
              this.listData = response.data.data.records
            },
            response => {
              console.log('获取失败～')
            }
          )
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
@import 'src/static/styles/list.scss';
</style>
