<template>
  <div class="index_container">
    <navComponent></navComponent>
    <div style="width:100%;height:120px;"></div>
    <div>
      <el-carousel :interval="3000" height="550px" style="margin-bottom: 40px;" :autoplay="true">
        <el-carousel-item>
          <img style="width:80%;margin-left:10%" :src="slide1" alt="">
          <div class="uk-position-center uk-panel">
            <h1>1</h1>
          </div>
        </el-carousel-item>
        <el-carousel-item>
          <img style="width:80%;margin-left:10%" :src="slide2" alt="">
          <div class="uk-position-center uk-panel">
            <h1>2</h1>
          </div>
        </el-carousel-item>
        <el-carousel-item>
          <img style="width:80%;margin-left:10%" :src="slide3" alt="">
          <div class="uk-position-center uk-panel">
            <h1>3</h1>
          </div>
        </el-carousel-item>
        <el-carousel-item>
          <img style="width:80%;margin-left:10%" :src="slide4" alt="">
          <div class="uk-position-center uk-panel">
            <h1>4</h1>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
    <img class="icon1" :src="icon1" alt="">
    <div class="newMoives" :style="{backgroundImage: 'url(' + bg1 + ')'}">
      <div class="subTitle">
        <div class="themeBlack">最 新</div>
        <div class="more">
          <router-link to="/list">更 多</router-link>
        </div>
      </div>
      <div style="display:table;height:100%">
        <el-row :gutter="40">
          <el-col :span="6" v-for="item in lastestList" :key="item.id">
            <el-card>
              <router-link :to="'/detail/' + item.id">
                <img :src="item.imgUrl" alt="">
              </router-link>
              <div class="item_name themeBlack">{{item.name}}</div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </div>
    <img class="icon1" :src="icon2" alt="">
    <div class="hotMoives">
      <div style="width:80%;display:table;height:100%;float:left">
        <el-row :gutter="40">
          <el-col :span="6" v-for="item in hotestList" :key="item.id">
            <el-card>
              <router-link :to="'/detail/' + item.id">
                <img :src="item.imgUrl" alt="">
              </router-link>
              <div class="item_name themeBlack">{{item.name}}</div>
            </el-card>
          </el-col>
        </el-row>
      </div>
      <div class="subTitle">
        <div>最热</div>
        <div class="more">
          <router-link to="#">更多</router-link>
        </div>
      </div>
    </div>
    <img class="icon1" :src="icon1" alt="">
    <div class="introduce" :style="{backgroundImage: 'url(' + bg2 + ')'}">
      <div :class="{'left':isLeft}">个性化推荐</div>
      <div :class="{'right':isRight}">最新电影推荐</div>
      <div :class="{'left':isLeft}">高分电影精选</div>
      <div :class="{'right':isRight}">电影观后点评</div>
    </div>
  </div>
</template>

<script>
  import navCommon from './nav'
  export default {
    name: 'index',
    data() {
      return {
        slide1: require('../../src/static/images/slide01.jpg'),
        slide2: require('../../src/static/images/slide02.jpg'),
        slide3: require('../../src/static/images/slide03.jpg'),
        slide4: require('../../src/static/images/slide04.jpg'),
        icon1: require('../../src/static/images/roll.png'),
        icon2: require('../../src/static/images/camera.png'),
        bg1: require('../../src/static/images/index_bg.png'),
        bg2: require('../../src/static/images/index_bg2.png'),
        lastestList: {},
        hotestList: {},
        isLeft: false,
        isRight: false
      }
    },
    mounted() {
      this.getLastMovies()
      this.getHostMovies()
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
       * 获取最新电影
       *
       */
      getLastMovies() {
        this.$http
          .get(
            'http://localhost:8087/movie/getMovies',
            { params: { orderType: 1 } },
            { emulateJSON: true }
          )
          .then(
            response => {
              this.lastestList = response.data.data.records.slice(0, 4)
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
        this.$http
          .get(
            'http://localhost:8087/movie/getMovies',
            { params: { orderType: 2 } },
            { emulateJSON: true }
          )
          .then(
            response => {
              this.hotestList = response.data.data.records.slice(0, 4)
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
