<template>
  <div class="index_container">
    <navComponent></navComponent>
    <div style="width:100%;height:120px;"></div>
    <div>
      <el-carousel :interval="3000" height="550px" style="margin-bottom: 40px;" :autoplay="true">
        <el-carousel-item>
          <img style="width:80%;margin-left:10%" src="https://moviey.oss-cn-hangzhou.aliyuncs.com/images/mali.jpg" alt="">
          <div class="uk-position-center uk-panel imgText">
            <h1>玛丽与魔女之花</h1>
            <h4>4月28日上映</h4>
          </div>
        </el-carousel-item>
        <el-carousel-item>
          <img style="width:80%;margin-left:10%" src="https://moviey.oss-cn-hangzhou.aliyuncs.com/images/yanmie.jpg" alt="">
          <div class="uk-position-center uk-panel imgText">
            <h1>湮灭</h1>
            <h4>4月13日上映</h4>
          </div>
        </el-carousel-item>
        <el-carousel-item>
          <img style="width:80%;margin-left:10%" src="https://moviey.oss-cn-hangzhou.aliyuncs.com/images/qipaoxian.jpg" alt="">
          <div class="uk-position-center uk-panel imgText">
            <h1>起跑线</h1>
            <h4>4月4日上映</h4>
          </div>
        </el-carousel-item>
        <el-carousel-item>
          <img style="width:80%;margin-left:10%" src="https://moviey.oss-cn-hangzhou.aliyuncs.com/images/houlai.jpg" alt="">
          <div class="uk-position-center uk-panel imgText">
            <h1>后来的我们</h1>
            <h4>4月28日上映</h4>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
    <img class="icon1" src="https://moviey.oss-cn-hangzhou.aliyuncs.com/images/camera.png" alt="">
    <div id="recommendMoives" class="recommendMoives" :style="{backgroundImage: 'url(https://moviey.oss-cn-hangzhou.aliyuncs.com/images/index_bg2.png)'}">
      <div v-if="isRecommend" style="height:100%">
        <div style="width:80%;display:table;height:100%;float:left">
          <el-row :gutter="40">
            <el-col :span="6" v-for="(item,index) in recommendList" v-if="index < 4" :key="item.id">
              <el-card>
                <router-link :to="'/detail/' + item.id">
                  <img class="imgDiv" :src="item.imgUrl" alt="">
                </router-link>
                <div class="item_name themeBlack">{{item.name}}</div>
              </el-card>
            </el-col>
          </el-row>
        </div>
        <div class="subTitle">
          <div>推 荐</div>
          <div class="more">
            <router-link :to="{path:'/list',query: {type: 3}}">更 多</router-link>
          </div>
        </div>
      </div>
      <div v-else class="unlogin">
        <div class="content">
          <h4 class="themeBlack">请先登录查看推荐</h4>
          <router-link :to="'/login'" class="themeRed">登录</router-link>
        </div>
      </div>
    </div>
    <img class="icon2" src="https://moviey.oss-cn-hangzhou.aliyuncs.com/images/roll.png" alt="">
    <div id="newMoives" class="newMoives">
      <div class="subTitle">
        <div class="themeBlack">最 新</div>
        <div class="more">
          <router-link :to="{path:'/list',query: {type: 1}}">更 多</router-link>
        </div>
      </div>
      <div style="width:80%;display:table;height:100%">
        <el-row :gutter="40">
          <el-col :span="6" v-for="item in lastestList" :key="item.id">
            <el-card>
              <router-link :to="'/detail/' + item.id">
                <img class="imgDiv" :src="item.imgUrl" alt="">
              </router-link>
              <div class="item_name themeBlack">{{item.name}}</div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </div>
    <img class="icon1" src="https://moviey.oss-cn-hangzhou.aliyuncs.com/images/camera.png" alt="">
    <div id="hotMoives" class="hotMoives" :style="{backgroundImage: 'url(https://moviey.oss-cn-hangzhou.aliyuncs.com/images/index_bg.png)'}">
      <div style="width:80%;display:table;height:100%;float:left">
        <el-row :gutter="40">
          <el-col :span="6" v-for="item in hotestList" :key="item.id">
            <el-card>
              <router-link :to="'/detail/' + item.id">
                <img class="imgDiv" :src="item.imgUrl" alt="">
              </router-link>
              <div class="item_name themeBlack">{{item.name}}</div>
            </el-card>
          </el-col>
        </el-row>
      </div>
      <div class="subTitle">
        <div>最 热</div>
        <div class="more">
          <router-link :to="{path:'/list',query: {type: 2}}">更 多</router-link>
        </div>
      </div>
    </div>
    <img class="icon2" src="https://moviey.oss-cn-hangzhou.aliyuncs.com/images/camera.png" alt="">
    <div class="introduce" :style="{backgroundImage: 'url(https://moviey.oss-cn-hangzhou.aliyuncs.com/images/index_bg2.png)'}">
      <div :class="{'left':isLeft}">个性化推荐</div>
      <div :class="{'right':isRight}">最新电影推荐</div>
      <div :class="{'left':isLeft}">高分电影精选</div>
      <div :class="{'right':isRight}">电影观后点评</div>
    </div>
  </div>
</template>

<script>
  import { getCookie } from '../../src/utils/util'
  import navCommon from './nav'
  export default {
    name: 'index',
    data() {
      return {
        lastestList: {},
        hotestList: {},
        recommendList: {},
        isLeft: false,
        isRight: false,
        isRecommend: false,
        keyType: [],
        recommendIds: ''
      }
    },
    mounted() {
      this.getLastMovies()
      this.getHostMovies()
      this.getRecommendMovies()
      window.addEventListener('scroll', this.handleScroll)
    },
    components: {
      navComponent: navCommon
    },
    methods: {
      /**
       *
       * 监听页面滚动事件
       *
       */
      handleScroll() {
        var scrollHeight =
          window.pageYOffset ||
          document.documentElement.scrollTop ||
          document.body.scrollTop
        if (scrollHeight > 1500) {
          this.isLeft = true
          this.isRight = true
        } else {
          this.isLeft = false
          this.isRight = false
        }
      },
      /**
       *
       * 获取推荐电影
       *
       */
      getRecommendMovies() {
        if (getCookie('id')) {
          this.isRecommend = true
          this.$get('/movie/recommend/Movies', { user_id: getCookie('id') }).then(
            response => {
              if (response.data.length > 0) {
                this.recommendList = response.data.slice(0, 4)
              } else {
                this.$get('/behavior/getBehavior', {
                  userId: getCookie('id')
                }).then(response => {
                  console.log(response)
                  // 全新用户
                  if (response.data.isNew === 1) {
                    this.$get('/movie/recommend/initMovies').then(response => {
                      this.recommendList = response.data.slice(0, 4)
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
                    this.$data.recommendList = resultArr
                  }
                })
              }
            },
            response => {
              console.log('获取失败～')
            }
          )
        } else {
          this.isRecommend = false
        }
      },
      des(x, y) {
        return x.value - y.value
      },
      /**
       *
       * 获取最新电影
       *
       */
      getLastMovies() {
        this.$get('/movie/getMovies', { orderType: 1 }).then(
          response => {
            this.lastestList = response.data.records.slice(0, 4)
          },
          response => {
            console.log('获取失败～')
          }
        )
      },
      /**
       *
       * 获取最热电影
       *
       */
      getHostMovies() {
        this.$get('/movie/getMovies', { orderType: 2 }).then(
          response => {
            this.hotestList = response.data.records.slice(0, 4)
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
@import 'src/static/styles/index.scss';
</style>
