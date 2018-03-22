<template>
  <div class="profile_container">
    <div class="left_content">
      <el-card class="box-card">
        <img :src="headImg" alt="">
        <div>
          <span class="name">Cythia_yyy</span>
          <span class="gender themeRed">女</span>
        </div>
      </el-card>
    </div>
    <div class="right_content">
      <div class="remark">工作时间是IDC行业的程序猿，休息的时候就变成了笔耕不辍的作家，周末还能化身成变出一桌美味菜肴的营养师...</div>
      <el-tabs v-model="first">
        <el-tab-pane label="评价" name="first">
        </el-tab-pane>
        <el-tab-pane label="收藏" name="second">收藏</el-tab-pane>
        <el-tab-pane label="浏览" name="third">浏览</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      headImg: require('../../src/static/images/headImg.jpg')
    }
  }
}
</script>

<style lang="scss">
@import 'src/static/styles/profile.scss';
</style>
