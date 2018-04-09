<template>
  <div class="crmIndex_container">
    <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect" background-color="#3b3a3f" text-color="#fff" active-text-color="#f0506e">
      <el-menu-item index="1">电影管理</el-menu-item>
      <el-menu-item index="2">评论管理</el-menu-item>
      <el-menu-item index="3">用户管理</el-menu-item>
      <el-submenu index="4">
        <template slot="title">{{userName}}</template>
        <el-menu-item index="4-1" @click="logout">注销</el-menu-item>
      </el-submenu>
    </el-menu>
    <el-card class="tables">
      <div v-show="activeIndex == '1'">
        <div class="tableHead">
          <span>电影列表</span>
          <el-button type="primary" size="medium" icon="el-icon-plus" plain @click="movieFormVisible = true">添加</el-button>
          <el-input suffix-icon="el-icon-search" size="medium" v-model="searchMovieInput" placeholder="输入名称关键字" @keyup.enter.native="searchMovie"></el-input>
        </div>
        <el-table :data="movieData" style="width: 100%">
          <el-table-column prop="name" label="名称">
          </el-table-column>
          <el-table-column prop="director" label="导演">
            <template slot-scope="scope">{{scope.row.director | isNull}}</template>
          </el-table-column>
          <el-table-column prop="type" label="类型">
            <template slot-scope="scope">{{scope.row.type | isNull}}</template>
          </el-table-column>
          <el-table-column prop="area" label="国家">
            <template slot-scope="scope">{{scope.row.area | isNull}}</template>
          </el-table-column>
          <el-table-column prop="date" label="上映年份">
          </el-table-column>
          <el-table-column prop="score" label="评分">
            <template slot-scope="scope">{{scope.row.score | isNull}}</template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="movieEdit(scope.row.id)">编辑</el-button>
              <el-button type="text" class="deleteBtn" size="small" @click="deleteMovie(scope.row.id, scope.row.name)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination @current-change="handleCurrentChange1" :current-page="currentPage1" :page-size="10" layout="total, prev, pager, next, jumper" :total="total1">
        </el-pagination>
      </div>
      <div v-show="activeIndex == '2'">
        <div class="tableHead">
          <span>评论列表</span>
          <el-input suffix-icon="el-icon-search" size="medium" placeholder="输入内容关键字" v-model="searchCommentInput" @keyup.enter.native="searchComment"></el-input>
        </div>
        <el-table :data="commentData" style="width: 100%">
          <el-table-column prop="userName" label="评论者">
          </el-table-column>
          <el-table-column prop="movieName" label="电影名称">
          </el-table-column>
          <el-table-column prop="content" label="评价内容">
          </el-table-column>
          <el-table-column prop="score" label="评分">
          </el-table-column>
          <el-table-column prop="time" label="评论时间">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" class="deleteBtn" size="small" @click="deleteComment(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination @current-change="handleCurrentChange2" :current-page="currentPage2" :page-size="10" layout="total, prev, pager, next, jumper" :total="total2">
        </el-pagination>
      </div>
      <div v-show="activeIndex == '3'">
        <div class="tableHead">
          <span>用户列表</span>
          <el-button type="primary" size="medium" icon="el-icon-plus" plain @click="userFormVisible = true">添加</el-button>
          <el-input suffix-icon="el-icon-search" size="medium" placeholder="输入用户名关键字" v-model="searchUserInput" @keyup.enter.native="searchUser"></el-input>
        </div>
        <el-table :data="userData" style="width: 100%">
          <el-table-column prop="name" label="用户名">
          </el-table-column>
          <el-table-column prop="nickname" label="昵称">
            <template slot-scope="scope">{{scope.row.nickname | isNull}}</template>
          </el-table-column>
          <el-table-column prop="type" label="类型">
            <template slot-scope="scope">{{scope.row.type | toName}}</template>
          </el-table-column>
          <el-table-column prop="phone" label="手机号">
            <template slot-scope="scope">{{scope.row.phone | isNull}}</template>
          </el-table-column>
          <el-table-column prop="createTime" label="注册时间">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="userEdit(scope.row.id)">编辑</el-button>
              <el-button type="text" class="deleteBtn" size="small" @click="deleteUser(scope.row.id, scope.row.name)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination @current-change="handleCurrentChange3" :current-page="currentPage3" :page-size="10" layout="total, prev, pager, next, jumper" :total="total3">
        </el-pagination>
      </div>
    </el-card>
    <!-- 添加电影dialog -->
    <el-dialog title="添加电影" :visible.sync="movieFormVisible">
      <el-form class="dialogForm" :model="addMovieForm">
        <el-form-item label="名称" label-width="100px" required>
          <el-input v-model="addMovieForm.name"></el-input>
        </el-form-item>
        <el-form-item label="导演" label-width="100px">
          <el-input v-model="addMovieForm.director"></el-input>
        </el-form-item>
        <el-form-item label="演员表" label-width="100px">
          <el-input v-model="addMovieForm.actor"></el-input>
        </el-form-item>
        <el-form-item label="类型" label-width="100px">
          <el-input v-model="addMovieForm.type"></el-input>
        </el-form-item>
        <el-form-item label="国家" label-width="100px">
          <el-input v-model="addMovieForm.area"></el-input>
        </el-form-item>
        <el-form-item label="年份" label-width="100px" required>
          <el-input v-model="addMovieForm.date"></el-input>
        </el-form-item>
        <el-form-item label="海报地址" label-width="100px" required>
          <el-input v-model="addMovieForm.imgUrl"></el-input>
        </el-form-item>
        <el-form-item label="评分" label-width="100px">
          <el-input v-model="addMovieForm.score"></el-input>
        </el-form-item>
        <el-form-item label="视频地址" label-width="100px">
          <el-input v-model="addMovieForm.url"></el-input>
        </el-form-item>
        <el-form-item label="电影简介" label-width="100px">
          <el-input type="textarea" :rows="3" resize="none" v-model="addMovieForm.content"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="movieFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addMovie">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑查看电影dialog -->
    <el-dialog title="编辑电影信息" :visible.sync="movieEditVisible">
      <el-form class="dialogForm" :model="editMovieForm">
        <el-form-item label="名称" label-width="100px" required>
          <el-input v-model="editMovieForm.name" readonly></el-input>
        </el-form-item>
        <el-form-item label="导演" label-width="100px">
          <el-input v-model="editMovieForm.director"></el-input>
        </el-form-item>
        <el-form-item label="演员表" label-width="100px">
          <el-input v-model="editMovieForm.actor"></el-input>
        </el-form-item>
        <el-form-item label="类型" label-width="100px">
          <el-input v-model="editMovieForm.type"></el-input>
        </el-form-item>
        <el-form-item label="国家" label-width="100px">
          <el-input v-model="editMovieForm.area"></el-input>
        </el-form-item>
        <el-form-item label="年份" label-width="100px" required>
          <el-input v-model="editMovieForm.date"></el-input>
        </el-form-item>
        <el-form-item label="海报地址" label-width="100px" required>
          <el-input v-model="editMovieForm.imgUrl"></el-input>
        </el-form-item>
        <el-form-item label="评分" label-width="100px">
          <el-input v-model="editMovieForm.score"></el-input>
        </el-form-item>
        <el-form-item label="视频地址" label-width="100px">
          <el-input v-model="editMovieForm.url"></el-input>
        </el-form-item>
        <el-form-item label="电影简介" label-width="100px">
          <el-input type="textarea" :rows="3" resize="none" v-model="editMovieForm.content"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="movieEditVisible = false">取 消</el-button>
        <el-button type="primary" @click="editMovie">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 新增用户dialog -->
    <el-dialog title="新增用户" :visible.sync="userFormVisible">
      <el-form class="dialogForm" :model="addUserForm">
        <el-form-item label="用户名" label-width="100px" required>
          <el-input v-model="addUserForm.name"></el-input>
        </el-form-item>
        <el-form-item label="初始密码" label-width="100px" required>
          <el-input type="password" v-model="addUserForm.password"></el-input>
        </el-form-item>
        <el-form-item label="昵称" label-width="100px">
          <el-input v-model="addUserForm.nickname"></el-input>
        </el-form-item>
        <el-form-item label="手机号" label-width="100px">
          <el-input v-model="addUserForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="类型" label-width="100px" required>
          <el-select v-model="addUserForm.type" placeholder="类型">
            <el-option label="管理员" :value="parseInt(1)">
            </el-option>
            <el-option label="普通用户" :value="parseInt(2)">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="userFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑用户详情dialog -->
    <el-dialog title="编辑用户详情" :visible.sync="userEditVisible">
      <el-form class="dialogForm" :model="editUserForm">
        <el-form-item label="用户名" label-width="100px" required>
          <el-input v-model="editUserForm.name" readonly></el-input>
        </el-form-item>
        <el-form-item label="昵称" label-width="100px">
          <el-input v-model="editUserForm.nickname"></el-input>
        </el-form-item>
        <el-form-item label="手机号" label-width="100px">
          <el-input v-model="editUserForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="类型" label-width="100px" required>
          <el-select v-model="editUserForm.type" placeholder="类型">
            <el-option label="管理员" :value="parseInt(1)">
            </el-option>
            <el-option label="普通用户" :value="parseInt(2)">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="注册时间" label-width="100px">
          <el-input v-model="editUserForm.createTime" readonly></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="userEditVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUser">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { getCookie, delCookie } from '../../../src/utils/util'
  import md5 from 'js-md5'
  export default {
    data() {
      return {
        userName: '',
        activeIndex: '1',
        movieData: [],
        userData: [],
        commentData: [],
        total1: 0,
        currentPage1: 1,
        total2: 0,
        currentPage2: 1,
        total3: 0,
        currentPage3: 1,
        getMovieParams: {},
        getUserParams: {},
        getCommentParams: {},
        searchMovieInput: '',
        searchCommentInput: '',
        searchUserInput: '',
        addMovieForm: {},
        addUserForm: {},
        movieFormVisible: false,
        userFormVisible: false,
        movieEditVisible: false,
        userEditVisible: false,
        editMovieForm: {},
        editUserForm: {}
      }
    },
    mounted() {
      this.getState()
      this.getMovies()
      this.getUsers()
      this.getComments()
    },
    filters: {
      toName: function(val) {
        if (val === 1) {
          return '管理员'
        } else {
          return '普通用户'
        }
      },
      isNull: function(val) {
        if (!val) return '暂无'
        return val
      }
    },
    methods: {
      /**
       *
       * 获取用户登录状态
       *
       */
      getState() {
        if (getCookie('id') && getCookie('id') !== 0) {
          // 获取用户名
          var data = {
            userId: parseInt(getCookie('id'))
          }
          this.$get('/user/getUserInfo', data)
            .then(response => {
              this.userName = response.data.nickname
                ? response.data.nickname
                : response.data.name
            })
            .catch(response => {
              console.log('login error')
            })
        }
      },
      /**
       *
       * 用户注销 删除cookie
       *
       */
      logout() {
        delCookie('id')
        this.$router.push({ path: '/crmlogin' })
      },
      handleSelect(key) {
        this.activeIndex = key
      },
      /**
       *
       * 切换页码
       *
       */
      handleCurrentChange1(val) {
        this.getMovieParams.page_no = parseInt(val)
        this.getMovies()
      },
      handleCurrentChange2(val) {
        this.getCommentParams.page_no = parseInt(val)
        this.getComments()
      },
      handleCurrentChange3(val) {
        this.getUserParams.page_no = parseInt(val)
        this.getUsers()
      },
      /**
       *
       * 获取电影列表
       *
       */
      getMovies() {
        this.$get('/movie/getMovies', this.getMovieParams).then(
          response => {
            this.total1 = response.data.total
            this.movieData = response.data.records
          },
          response => {
            console.log('获取失败～')
          }
        )
      },
      /**
       *
       * 获取用户列表
       *
       */
      getComments() {
        this.$get('/comment/getComment', this.getCommentParams).then(
          response => {
            this.total2 = response.data.total
            this.commentData = response.data.records
          },
          response => {
            console.log('获取失败～')
          }
        )
      },
      /**
       *
       * 获取用户列表
       *
       */
      getUsers() {
        this.$get('/user/getUsers', this.getUserParams).then(
          response => {
            this.total3 = response.data.total
            this.userData = response.data.records
          },
          response => {
            console.log('获取失败～')
          }
        )
      },
      /**
       *
       * 删除电影/delete/user
       *
       */
      deleteMovie(movieId, movieName) {
        var that = this
        this.$confirm('确定删除电影「' + movieName + '」?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            var data = {
              id: parseInt(movieId)
            }
            this.$get('/movie/delete/Movies', data)
              .then(function(response) {
                that.getMovies()
                that.$message.success('删除电影成功!')
              })
              .catch(function(error) {
                console.log(error)
              })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          })
      },
      /**
       *
       * 删除评论
       *
       */
      deleteComment(commentId) {
        var that = this
        this.$confirm('确定删除该条评论?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            var data = {
              comment_id: parseInt(commentId)
            }
            this.$get('/comment/deleteComment', data)
              .then(function(response) {
                that.getComments()
                that.$message.success('删除评论成功!')
              })
              .catch(function(error) {
                console.log(error)
              })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          })
      },
      /**
       *
       * 删除电影
       *
       */
      deleteUser(userId, userName) {
        var that = this
        this.$confirm('确定删除用户：' + userName + '?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            var data = {
              id: parseInt(userId)
            }
            this.$get('/user/delete/user', data)
              .then(function(response) {
                that.getUsers()
                that.$message.success('删除用户成功!')
              })
              .catch(function(error) {
                console.log(error)
              })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          })
      },
      /**
       *
       * 查询电影
       *
       */
      searchMovie() {
        this.getMovieParams.keyword = this.searchMovieInput
        this.getMovieParams.page_no = 1
        this.getMovies()
      },
      /**
       *
       * 查询评论内容
       *
       */
      searchComment() {
        this.getCommentParams.keyword = this.searchCommentInput
        this.getCommentParams.page_no = 1
        this.getComments()
      },
      /**
       *
       * 查询用户
       *
       */
      searchUser() {
        this.getUserParams.keyword = this.searchUserInput
        this.getUserParams.page_no = 1
        this.getUsers()
      },
      /**
       *
       * 添加电影
       *
       */
      addMovie() {
        var tag = true
        if (this.addMovieForm.imgUrl === '' || !this.addMovieForm.imgUrl) {
          tag = false
          this.$message.error('请先填写电影海报地址')
        }
        if (this.addMovieForm.date === '' || !this.addMovieForm.date) {
          tag = false
          this.$message.error('请先填写电影年份')
        }
        if (this.addMovieForm.name === '' || !this.addMovieForm.name) {
          tag = false
          this.$message.error('请先填写电影名称')
        }
        if (tag) {
          this.$post('/movie/add/Movies', this.addMovieForm)
            .then(function(response) {
              this.movieFormVisible = false
              this.addMovieForm = {}
              this.$message.success('添加电影成功！')
            })
            .catch(function(error) {
              console.log(error)
            })
        }
      },
      /**
       *
       * 查看电影
       *
       */
      movieEdit(id) {
        this.movieEditVisible = true
        this.$get('/movie/getMovies', { id: id }).then(
          response => {
            this.editMovieForm = response.data.records[0]
          },
          response => {
            console.log('获取失败～')
          }
        )
      },
      /**
       *
       * 提交编辑电影
       *
       */
      editMovie() {
        var tag = true
        if (this.editMovieForm.imgUrl === '' || !this.editMovieForm.imgUrl) {
          tag = false
          this.$message.error('请先填写电影海报地址')
        }
        if (this.editMovieForm.date === '' || !this.editMovieForm.date) {
          tag = false
          this.$message.error('请先填写电影年份')
        }
        if (this.editMovieForm.name === '' || !this.editMovieForm.name) {
          tag = false
          this.$message.error('请先填写电影名称')
        }
        var that = this
        if (tag) {
          this.$post('/movie/update/Movies', this.editMovieForm)
            .then(function(response) {
              that.$message.success('编辑电影成功！')
              that.movieEditVisible = false
              that.editMovieForm = {}
              that.getMovies()
            })
            .catch(function(error) {
              console.log(error)
            })
        }
      },

      /**
       *
       * 查看用户
       *
       */
      userEdit(id) {
        this.userEditVisible = true
        var data = {
          userId: parseInt(id)
        }
        this.$get('/user/getUserInfo', data)
          .then(response => {
            this.editUserForm = response.data
          })
          .catch(response => {
            console.log('login error')
          })
      },
      /**
       *
       * 提交编辑用户
       *
       */
      editUser() {
        var tag = true
        if (this.editUserForm.type === '' || !this.editUserForm.type) {
          tag = false
          this.$message.error('请先选择用户类型')
        }
        var that = this
        if (tag) {
          var data = {
            userId: parseInt(this.editUserForm.id),
            userNickname: this.editUserForm.nickname,
            type: this.editUserForm.type,
            userPhone: this.editUserForm.phone
          }
          this.$get('/user/update', data)
            .then(function(response) {
              that.$message.success('编辑用户成功！')
              that.userEditVisible = false
              that.editMovieForm = {}
              that.getUsers()
            })
            .catch(function(error) {
              console.log(error)
            })
        }
      },
      /**
       *
       *添加用户
       *
       */
      addUser() {
        var tag = true
        if (this.addUserForm.type === '' || !this.addUserForm.type) {
          tag = false
          this.$message.error('请先选择用户类型')
        }
        if (this.addUserForm.password === '' || !this.addUserForm.password) {
          tag = false
          this.$message.error('请先填写初始密码')
        }
        if (this.addUserForm.name === '' || !this.addUserForm.name) {
          tag = false
          this.$message.error('请先填写用户名')
        }
        var that = this
        if (tag) {
          var data = {
            userName: this.addUserForm.name,
            userPassword: md5(this.addUserForm.password),
            userNickName: this.addUserForm.nickname,
            userType: this.addUserForm.type,
            userPhone: this.addUserForm.phone
          }
          this.$get('/user/add', data)
            .then(function(response) {
              that.$message.success('添加用户成功！')
              that.userFormVisible = false
              that.addUserForm = {}
              that.getUsers()
            })
            .catch(function(error) {
              console.log(error)
            })
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
.crmIndex_container {
  .el-menu {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 999;
  }
  .tables {
    margin-top: 100px;
    padding: 20px;
    width: 80%;
    margin-left: 10%;
    .deleteBtn {
      color: #f56c6c;
    }
    .el-pagination {
      float: right;
      padding: 20px 0;
    }
    .tableHead {
      height: 60px;
      span {
        font-size: 26px;
        line-height: 36px;
      }
      .el-button {
        margin-left: 30px;
      }
      .el-input {
        width: 20%;
        float: right;
      }
    }
  }
  .dialogForm {
    width: 80%;
    margin-left: 10%;
  }
}
</style>

