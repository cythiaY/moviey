<template>
  <div class="index_container">
    <navComponent></navComponent>
    <div style="width:100%;height:120px;"></div>
    <div>
      <el-carousel :interval="3000" height="550px" :autoplay="true">
        <el-carousel-item>
          <img style="width:80%;margin-left:10%" :src="slide1" alt="">
          <div class="uk-position-center uk-panel">
            <h1>1</h1>
          </div>
        </el-carousel-item>
        <el-carousel-item>
          <img style="width:80%;margin-left:10%" :src="slide1" alt="">
          <div class="uk-position-center uk-panel">
            <h1>2</h1>
          </div>
        </el-carousel-item>
        <el-carousel-item>
          <img style="width:80%;margin-left:10%" :src="slide1" alt="">
          <div class="uk-position-center uk-panel">
            <h1>3</h1>
          </div>
        </el-carousel-item>
        <el-carousel-item>
          <img style="width:80%;margin-left:10%" :src="slide1" alt="">
          <div class="uk-position-center uk-panel">
            <h1>4</h1>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
    <img class="icon1" :src="icon1" alt="">
    <div class="newMoives">
      <div class="subTitle">
        <div>L A S T E S T</div>
        <div class="more">
          <router-link to="/list">More</router-link>
        </div>
      </div>
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
    <div class="hotMoives">
      <div class="subTitle">
        <span>H O T</span>
        <span class="more">
          <router-link to="#">More</router-link>
        </span>
      </div>
      <el-row :gutter="60">
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
    <div class="introduce">
      <el-row :gutter="80">
        <el-col :span="12">最新电影资讯</el-col>
        <el-col :span="12">实时在线推荐</el-col>
      </el-row>
      <el-row :gutter="80">
        <el-col :span="12">最新电影资讯</el-col>
        <el-col :span="12">实时在线推荐</el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import navCommon from './nav'
  export default {
    name: 'index',
    data() {
      return {
        slide1: require('../../src/static/images/bg03.jpeg'),
        icon1: require('../../src/static/images/roll.png'),
        lastestList: {},
        hotestList: {}
      }
    },
    mounted() {
      this.getMovies()
    },
    components: {
      navComponent: navCommon
    },
    methods: {
      getMovies() {
        this.$http
          .get('http://localhost:8087/movie/getMovies', { emulateJSON: true })
          .then(
            response => {
              this.lastestList = response.data.data.slice(1, 5)
              this.hotestList = response.data.data.slice(0, 4)
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
