<template>
  <div class="list_container">
    <router-link :to="'/index'">
      <div class="go_back el-icon-arrow-left"></div>
    </router-link>
    <el-row>
      <el-col class="leftNav" :span="6">
        <ul>
          <li>最新</li>
          <li>最热</li>
          <li>推荐</li>
        </ul>
        <ul>
          <li>2018</li>
          <li>2017</li>
          <li>2010-2016</li>
          <li>2001-2009</li>
          <li>其他</li>
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
        <div class="listContent">
          <el-row :gutter="100">
            <el-col :span="12" v-for="item in listData" :key="item.id">
              <div class="bg">
                <img :src="item.imgUrl" alt="">
                <div class="text">
                  <div class="name">{{item.name}}</div>
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
      </el-col>
    </el-row>
  </div>
</template>
<script>
  export default {
    name: 'List',
    data() {
      return {
        category: 'first',
        listData: {}
      }
    },
    mounted() {
      this.getMovies()
    },
    filters: {
      turnType: function(val) {
        if (!val || val === '') return '暂无分类'
        return val
      }
    },
    methods: {
      handleClick() {},
      getMovies() {
        this.$http
          .get('http://localhost:8087/movie/getMovies', { emulateJSON: true })
          .then(
            response => {
              this.listData = response.data.data.slice(0, 10)
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
