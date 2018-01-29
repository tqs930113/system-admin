<template>
  <div id="login" class="login container clear">
    <header class="login-header">
    </header>
    <section class="login-box">
      <div class="login-title">
        用户中心<em>（ 登录 )</em>
      </div>
      <div class="login-container clear">
          <div class="login-info left">
            <template>
              <el-tabs v-model="activeName" >
                <el-tab-pane label="密码登录" name="first">
                  <el-form :model="userForm" status-icon :rules="phoneRules" ref="userForm"  >
                    <el-form-item prop="username">
                      <el-input autofocus v-model="userForm.username"  type="text" class='input' placeholder="请输入用户名"
                      clearable>
                      <i slot="prefix" class="el-input__icon iconfont icon-xingmingyonghumingnicheng"></i>
                      </el-input>  
                    </el-form-item>
                    <el-form-item prop="password">
                      <el-input v-model="userForm.password" type="password"  class='input'  placeholder="请输入用户密码"
                      clearable>
                      <i slot="prefix" class="el-input__icon iconfont icon-mima"></i>
                      </el-input>
                    </el-form-item>
                    <div class="form-group">
                      <el-form-item>
                        <el-button class="forget" @click="forgetPwd" type="text">忘记密码？</el-button>
                        <el-button type="success" @click="login('userForm')" class="login-btn">登 录</el-button>
                      </el-form-item>
                    </div>
                  </el-form>
                </el-tab-pane>
                <el-tab-pane label="手机号登录" name="second" class="phone">
                   <el-form :model="phoneForm" status-icon :rules="phoneRules" ref="phoneForm"  >
                     <el-form-item prop="userPhone">
                      <el-input autofocus v-model="phoneForm.userPhone" type="text" class='input' placeholder="请输入手机号"
                      clearable>
                      <i slot="prefix" class="el-input__icon iconfont icon-shouji"></i>
                      </el-input>
                     </el-form-item>
                    <!-- 图片验证码 -->
                    <div class="captcha-img-box clear">
                      <el-form-item prop="captchaImg">
                        <el-input v-model="phoneForm.captchaImg"  type="text" class='captcha-img-input input' placeholder="请输入右侧的验证码"
                        clearable>
                        <i slot="prefix" class="el-input__icon iconfont icon-yanzhengma"></i>
                        </el-input>
                        <el-button type="success" class="captcha-img">
                        </el-button>
                      </el-form-item>
                    </div>
                    <!-- 动态验证码 -->
                    <div class="captcha-dynamic-box">
                      <el-form-item prop="captchaDynamic">
                        <el-input v-model="phoneForm.captchaDynamic"  type="text" class='captcha-dynamic-input input' placeholder="请输入手机验证码"
                        clearable>
                        <i slot="prefix" class="el-input__icon iconfont icon-iconfontmima1"></i>
                        </el-input>
                        <el-button type="success" class="captcha-dynamic">
                          获取验证码
                        </el-button>
                      </el-form-item>
                    </div>
                    <div class="form-group">
                      <el-form-item>
                        <el-button type="success" @click="login('phoneForm')" class="login-btn">登 录</el-button>
                      </el-form-item>
                    </div>
                   </el-form>
                </el-tab-pane>
                <el-tab-pane label="邮箱验证登录" name="third">
                  <el-form :model="emailForm" status-icon :rules="emailRules" ref="emailForm"  >
                    <el-form-item prop="email">
                      <el-input autofocus v-model="emailForm.email" required type="text" class='input' placeholder="请输入用户邮箱"
                      clearable>
                      <i slot="prefix" class="el-input__icon iconfont icon-email"></i>
                      </el-input> 
                    </el-form-item> 
                    <el-form-item prop="password">
                      <el-input v-model="emailForm.password" type="password"  class='input' placeholder="请输入用户密码"
                      clearable>
                      <i slot="prefix" class="el-input__icon iconfont icon-mima"></i>
                      </el-input>
                    </el-form-item>
                    <div class="form-group">
                      <el-form-item>
                        <el-button @click="forgetPwd"
                        class="forget" type="text">忘记密码？</el-button>
                        <el-button type="success" @click="login('emailForm')" class="login-btn">登 录</el-button>
                      </el-form-item>
                    </div>
                  </el-form>
                </el-tab-pane>
              </el-tabs>
            </template>
          </div>
          <div class="divider left">
          </div>
          <div class="login-other right">
              <div class="warp">
                  <h5>如果还没有账号：</h5>
                  <div>
                        <router-link to="/register">
                        <i class="iconfont icon-zhuce"></i>   立即注册
                        </router-link>
                  </div>
                  <br/>
                  <h5>使用第三方账号登录：</h5>
                  <ul class="thirdLogin">
                      <li><a href="" title="微信账号登录"><i class="iconfont icon-weixindenglufanbai"></i></a></li>
                      <li><a href="" title="QQ账号登录"><i class="iconfont icon-qqdenglufanbai"></i></a></li>
                      <li><a href="" title="微博账号登录"><i class="iconfont icon-weibodenglufanbai"></i></a></li>
                      <li><a href="" title="百度账号登录"><i class="iconfont icon-baidu1"></i></a></li>
                  </ul>
              </div>
          </div>
      </div>
    </section>
    <v-footer></v-footer>
  </div>
</template>
<script>
import vFooter from '../components/footer'
export default {
  data () {
    return {
      activeName: 'first',
      // 用户普通登录表单
      userForm: {
        username: '',
        password: '',
        confirmPassword: '',
        // 图片验证码
        captchaImg: ''
      },
      // 用户普通登录验证规则
      userRules: {
        username: [
          { required: true, message: '请输入登录用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入用户登录密码', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      phoneForm: {
        userPhone: '',
        // 手机图片验证码
        captchaImg: '',
      // 手机动态验证码
        captchaDynamic: ''
      },
      // 手机快速登录验证规则
      phoneRules: {
        userPhone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { max: 11, message: '长度为11个字符', trigger: 'blur' }
        ],
        captchaDynamic: [
          {required: true, message: '请输入手机验证码', trigger: 'blur'}
        ],
        captchaImg: [
          {required: true, message: '请输入图片验证码', trigger: 'blur'}
        ]
      },
      // 邮箱快速登录表单
      emailForm: {
        email: '',
        password: ''
      },
      // 邮箱快速登录验证规则
      emailRules: {
        email: [
          {required: true, message: '请输入邮箱', trigger: 'blur'}
        ],
        password: [
          { required: true, message: '请输入用户登录密码', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    password (cval, bval) {
      this.redirectUrl = cval
    }
  },
  methods: {
    forgetPwd () {
      var url = '/forgetPwd'
      this.$router.push(url)
    },
    login (formname) {
      this.$refs[formname].validate((valid) => {
        if (valid) {
          var params = {}
          params.url = '/index'
          this.$router.push(params.url)
        } else {
          console.log(new Error('表单验证未通过'))
          return false
        }
      })
    }
  },
  components: {
    vFooter
  }
}
</script>
<style lang="less" scoped>
@green:#00a65a;
  .left{
    float: left;
  }
  .right{
    float: right;
  }
  .clear::after{
    content: ' ';
    display: block;
    clear: both;
    zoom: 1;
  }
  .login{
    background-color: #f8f9fc;
    width: 100%;
    overflow: auto;
    min-width: 1024px;
    height: 100%;
    min-height: 600px;
    position: relative; 

    .login-header{
      min-height: 50%;
      background-color:@green;
    }
    .login-box{
      width: 600px;
      position: absolute;
      background-color:white;
      box-shadow: 0 0 10px 0 rgba(0,0,0,.5);
      top: 50%;
      left: 50%;
      margin-top:-180px;
      margin-left: -300px;
      border-radius:5px;
      padding: 10px 20px;

      .login-title{
        text-align: left;
        border-left: 5px solid @green;
        padding: 5px;
        margin: 10px;
        font-size: 18px;
        em{
          color:@green;
        }
      }

      .login-container{
        .login-info{
          width: 60%;
          padding: 10px 20px;
          border-right: 1px dashed #d8d8d8;
          .input,.form-group{
            padding: 10px 0;
          }
          .form-group{
            .forget{
              display:block;
              color:@green;
              text-align: right;
              &:first-child{
                width: 100%;
              }
            }
            .login-btn{
              display: block;
              width: 100%;
              margin-left: 0;
            }
          }
          .phone{
            .captcha-img-box{
              .captcha-img-input{
                width: 55%;
                float: left;
              }
              .captcha-img{
                width: 35%;
                margin: 10px 0;
                height: 40px;
                background-color:white;
              }
            }
            .captcha-dynamic-box{
              .captcha-dynamic-input{
                width: 55%;
                float: left;
              }
              .captcha-dynamic{
                width: 35%;
                margin: 10px 0;
              }
            }
          }
        }
        .divider::after{
          content: "or";
          display: block;
          position: absolute;
          top: 50%;
          padding: 5px 0;
          margin-left: -8px;
          background-color: #fff;
        }
      }
      .login-other{
        width: 38%;
        height: 200px;
        position: relative;
        text-align: left;
        .iconfont{
          font-size: 24px;
        }
        .warp{
          width: 80%;
          height: 80%;
          position: absolute;
          top: 0;
          right: 0;
          left: 0;
          bottom: 0;
          margin: auto;
          overflow: hidden;
          a{
            color:@green;
          }
          h5{
            padding: 5px 0;
          }
          .thirdLogin{
            li{
              display: inline-block;
              padding: 5px;
            }
          }
        }
      }
    }

    .copyright{
      position: absolute;
      width: 100%;
      bottom: 5px;
      height: 40px;
      line-height: 20px;
      text-align:center;
      font-weight: bold;
    }
  }
  .tip{
    padding: 10px;
    height: 20px;
    line-height: 20px;
    text-align: left;
    font-size: 12px;
    color:rgb(153, 153, 153);
  }
</style>
