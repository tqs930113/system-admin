<template>
  <div id="login" class="login">
    <div class="login-box">
      <div class="login-title">
        网站后台管理系统
      </div>
      <div class="login-container">
          <el-input autofocus v-model="username" required type="text" class='input' prefix-icon="el-icon-edit-outline" placeholder="请输入姓名"></el-input>  
          <el-input v-model="password" type="text"  class='input' prefix-icon="el-icon-edit" placeholder="请输入用户密码"></el-input>
          <div class="form-group">
            <el-button type="text">忘记密码</el-button>
            <el-button type="primary" @click="login">登录</el-button>
            <el-button type="danger" @click="reset">重置</el-button>
          </div>
      </div>
    </div>
    <div class="copyright">
     COPYRIGHT &copy; 2017  网站后台管理系统
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      username: '3NEde0Z2wmY=',
      password: '',
      redirectUrl: ''
    }
  },
  watch: {
    password (cval, bval) {
      this.redirectUrl = cval
    }
  },
  methods: {
    login () {
      var params = {}
      params.url = '/index'
      this.$router.push(params.url)
    },
    reset () {
      var self = this
      // console.log('username is :' + this.username)
      self.username = ''
      self.password = ''
    }
  }
}
</script>
 <style scoped>
  .login{
    background-color:#00a65a;
    width: 100%;
    height: 100%;
    position: relative; 
  }
  .login::after{
    content: ' ';
    display: block;
    clear: both;
    zoom: 1;
  }
  .login-box{
    width: 400px;
    height: 280px;
    position: absolute;
    background-color:white;
    box-shadow: 0 0 10px 0 rgba(255,255,255,.8);
    top: 50%;
    left: 50%;
    margin-top:-150px;
    margin-left: -200px;
    border-radius:5px;
    padding: 10px 20px;
  }
  .login-title{
    text-align: center;
    padding: 20px;
    font-size: 20px;
  }
  .input,.form-group{
    padding: 10px 0;
  }
  .tip{
    padding: 10px;
    height: 20px;
    line-height: 20px;
    text-align: left;
    font-size: 12px;
    color:rgb(153, 153, 153);
  }
  .copyright{
    position: absolute;
    width: 100%;
    bottom: 20px;
    height: 40px;
    line-height: 20px;
    text-align:center;
    font-weight: bold;
    color:white;
  }
</style>
