<template>
  <div class="index_container">
    <nav class="uk-navbar-container uk-navbar-sticky top_nav" uk-navbar>
      <div class="uk-navbar-left">
        <ul class="uk-navbar-nav">
          <li>首页</li>
          <li>推荐</li>
          <li>最新</li>
          <li>最热</li>
          <li>我的</li>
          <li>设置</li>
        </ul>
      </div>
    </nav>
    <div style="width:100%;height:80px;"></div>
    <el-carousel interval="3000" height="500px" autoplay="true" type="card">
      <el-carousel-item>
        <img :src="slide1" alt="">
        <div class="uk-position-center uk-panel"><h1>1</h1></div>
      </el-carousel-item>
      <el-carousel-item>
        <img :src="slide1" alt="">
        <div class="uk-position-center uk-panel"><h1>2</h1></div>
      </el-carousel-item>
      <el-carousel-item>
        <img :src="slide1" alt="">
        <div class="uk-position-center uk-panel"><h1>3</h1></div>
      </el-carousel-item>
      <el-carousel-item>
        <img :src="slide1" alt="">
        <div class="uk-position-center uk-panel"><h1>4</h1></div>
      </el-carousel-item>
      <el-carousel-item>
        <img :src="slide1" alt="">
        <div class="uk-position-center uk-panel"><h1>5</h1></div>
      </el-carousel-item>
    </el-carousel>
    <div class="newMoives">
      <div class="subTitle">
        <span>L A S T E S T</span>
        <span class="more"><router-link to="#">More</router-link></span>
      </div>
      <el-row  :gutter="40">
        <el-col :span="6">
          <el-card>
            <img :src="slide1" alt="">
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card>
            <img :src="slide1" alt="">
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card>
            <img :src="slide1" alt="">
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card>
            <img :src="slide1" alt="">
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div class="hotMoives">
      <div class="subTitle">
        <span>H O T</span>
        <span class="more"><router-link to="#">More</router-link></span>
      </div>
      <el-row  :gutter="40">
        <el-col :span="6">
          <el-card>
            <img :src="slide1" alt="">
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card>
            <img :src="slide1" alt="">
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card>
            <img :src="slide1" alt="">
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card>
            <img :src="slide1" alt="">
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      slide1: require('../../src/static/images/login_bg.jpeg')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
@import "src/static/styles/index.scss";
</style>
