<template>
  <div id="top" class="list_container">
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
          <li :class="{'isActiveLi':liTag === 3}" @click="getRecommendMovies">推荐</li>
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
          <img src="https://moviey.oss-cn-hangzhou.aliyuncs.com/images/nodata.png" alt="">
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
        <el-pagination v-if="total > 0" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="10" layout="total, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </el-col>
    </el-row>
    <a href="#top"><img class="topBtn" src="https://moviey.oss-cn-hangzhou.aliyuncs.com/images/top.png" alt=""></a>
  </div>
</template>
<script>
  import { getCookie } from '../../src/utils/util'
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
        keyType: [],
        recommendIds: ''
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
        if (this.$route.query.type) {
          if (parseInt(this.$route.query.type) === 3) {
            this.getRecommendMovies()
          } else {
            this.changeOrder(this.$route.query.type)
          }
        }
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
        this.$get('/movie/getMovies', this.getMovieData).then(
          response => {
            this.total = response.data.total
            if (this.total > 0) {
              this.isDataNull = false
            } else {
              this.isDataNull = true
            }
            this.listData = response.data.records
          },
          response => {
            console.log('获取失败～')
          }
        )
      },
      /**
       *
       * 获取推荐电影
       *
       */
      getRecommendMovies() {
        if (getCookie('id')) {
          this.liTag = 3
          this.$get('/movie/recommend/Movies', { user_id: getCookie('id') }).then(
            response => {
              if (response.data.length > 0) {
                this.total = response.data.length
                this.listData = response.data
              } else {
                this.$get('/behavior/getBehavior', {
                  userId: getCookie('id')
                }).then(response => {
                  // 全新用户
                  if (response.data.isNew === 1) {
                    this.$get('/movie/recommend/initMovies').then(response => {
                      this.total = response.data.length
                      this.listData = response.data
                    })
                  } else {
                    var jsonArr = response.data
                    for (var key in jsonArr) {
                      if (key.indexOf('Type') === -1) {
                        delete jsonArr[key]
                      }
                    }
                    var maxStr = ''
                    for (var i = 0; i < 4; i++) {
                      var max = 0
                      var maxKey = ''
                      for (const key in jsonArr) {
                        if (jsonArr[key] > max) {
                          max = jsonArr[key]
                          maxKey = key
                        }
                      }
                      delete jsonArr[maxKey]
                      maxStr += maxKey
                    }
                    if (maxStr.indexOf('romance') > -1) {
                      this.$data.keyType.push('爱情')
                    }
                    if (maxStr.indexOf('action') > -1) {
                      this.$data.keyType.push('动作')
                    }
                    if (maxStr.indexOf('comedy') > -1) {
                      this.$data.keyType.push('喜剧')
                    }
                    if (maxStr.indexOf('scifi') > -1) {
                      this.$data.keyType.push('奇幻')
                    }
                    if (maxStr.indexOf('crime') > -1) {
                      this.$data.keyType.push('犯罪')
                    }
                    if (maxStr.indexOf('war') > -1) {
                      this.$data.keyType.push('战争')
                    }
                    if (maxStr.indexOf('animation') > -1) {
                      this.$data.keyType.push('动画')
                    }
                    if (maxStr.indexOf('thriller') > -1) {
                      this.$data.keyType.push('悬疑')
                    }
                    var resultArr = []
                    this.$data.keyType.forEach(element => {
                      this.$get('/movie/getMovies', {
                        movieType: element,
                        orderType: 2
                      }).then(
                        response => {
                          var total = 0
                          var i = 0
                          while (total < 2) {
                            var item = response.data.records.slice(i, i + 1)[0]
                            if (this.$data.recommendIds.indexOf(item.id) === -1) {
                              this.$data.recommendIds += item.id
                              resultArr.push(item)
                              total++
                            }
                            i++
                          }
                        },
                        response => {
                          console.log('获取失败～')
                        }
                      )
                    })
                    this.$data.listData = resultArr
                    this.$data.total = 8
                  }
                })
              }
            },
            response => {
              console.log('获取失败～')
            }
          )
        }
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
@import 'src/static/styles/list.scss';
</style>
