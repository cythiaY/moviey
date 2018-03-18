<template>
  <div class="detail_container">
    <router-link :to="'/index'">
      <div class="go_back el-icon-arrow-left"></div>
    </router-link>
    <div class="main_detail">
      <el-row>
      <el-col :span="8">
      <div class="left_img">
        <img :src="cover" alt="">
        <div class="themeRed">打分</div>
      </div>
      </el-col>
      <el-col :span="14">
      <div class="right_info">
        <span>肖生克的救赎(The Shawshank Redemption)</span>
        <span>评分: <span class="themeRed">9.6</span></span>
        <div class="infos">
          时长：<span class="themeRed">142</span>分钟
          国家：<span class="themeRed">美国</span>
          导演：<span class="themeRed">弗兰克·德拉邦特</span>
          <div>
            类型：<span class="themeRed">剧情 / 犯罪</span>
          </div>
          <div>
            上映日期：<span class="themeRed">1994-09-10(多伦多电影节) / 1994-10-14(美国)</span>
          </div>
          <div class="introduce themeBlack">
            20世纪40年代末，小有成就的青年银行家安迪（蒂姆·罗宾斯 Tim Robbins 饰）因涉嫌杀害妻子及她的情人而锒铛入狱。
            在这座名为肖申克的监狱内，希望似乎虚无缥缈，终身监禁的惩罚无疑注定了安迪接下来灰暗绝望的人生。
            未过多久，安迪尝试接近囚犯中颇有声望的瑞德（摩根·弗里曼 Morgan Freeman 饰），请求对方帮自己搞来小锤子。
            以此为契机，二人逐渐熟稔，安迪也仿佛在鱼龙混杂、罪恶横生、黑白混淆的牢狱中找到属于自己的求生之道。
            他利用自身的专业知识，帮助监狱管理层逃税、洗黑钱，同时凭借与瑞德的交往在犯人中间也渐渐受到礼遇。
            表面看来，他已如瑞德那样对那堵高墙从憎恨转变为处之泰然，但是对自由的渴望仍促使他朝着心中的希望和目标前进。
            而关于其罪行的真相，似乎更使这一切朝前推进了一步……
            本片根据著名作家斯蒂芬·金（Stephen Edwin King）的原著改编。
          </div>
          <div class="casts">
            <div class="title themeRed">演员表</div>
            <el-row>
              <el-col :span="4" class="cast">
                <span>蒂姆·罗宾斯</span>
                <div class="themeRed">饰</div>
                <span>安迪·杜佛兰</span>
              </el-col>
              <el-col :span="4" class="cast">
                <span>摩根·弗里曼</span>
                <div class="themeRed">饰</div>
                <span>艾利斯·波德·瑞德</span>
              </el-col>
              <el-col :span="4" class="cast">
                <span>鲍勃·冈顿</span>
                <div class="themeRed">饰</div>
                <span>山姆·诺顿</span>
              </el-col>
              <el-col :span="4" class="cast">
                <span>威廉姆·赛德勒</span>
                <div class="themeRed">饰</div>
                <span>海伍</span>
              </el-col>
              <el-col :span="4" class="cast">
                <span>克兰西·布朗</span>
                <div class="themeRed">饰</div>
                <span>拜伦·海利</span>
              </el-col>
              <el-col :span="4" class="cast">
                <span>祖德·塞克利拉</span>
                <div class="themeRed">饰</div>
                <span>Guard Mert</span>
              </el-col>
            </el-row>
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
export default {
  name: 'detail',
  data () {
    return {
      bgImg: require('../../src/static/images/bg07.png'),
      cover: require('../../src/static/images/cover09.jpeg')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
@import "src/static/styles/detail.scss";
</style>
