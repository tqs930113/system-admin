<template>
  <div id="register" class="register container clear">
    <header class="register-header">
    </header>
    <section class="register-box">
      <div class="register-title">
        用户中心<em>（ 注册 )</em>
      </div>
      <div class="register-container clear">
          <div class="register-info left">
            <template>
              <el-tabs v-model="activeName" >
                <el-tab-pane label="用户注册" name="first" class="user-register">
                  <el-form :model="userForm" status-icon :rules="userRules" ref="userForm"  >
                    <el-form-item label="" prop="username">
                      <el-input autofocus v-model="userForm.username"  type="text" class='input' placeholder="请输入用户名"
                  clearable>
                       <i slot="prefix" class="el-input__icon iconfont icon-xingmingyonghumingnicheng"></i>
                      </el-input> 
                    </el-form-item>
                    <el-form-item label="" prop="password">
                      <el-input v-model="userForm.password" type="password"  class='input'  placeholder="请输入用户密码"
                  clearable>
                       <i slot="prefix" class="el-input__icon iconfont icon-mima"></i>
                      </el-input>
                    </el-form-item>
                    <el-form-item label="" prop="confirmPassword">
                      <el-input v-model="userForm.confirmPassword" type="password"  class='input'  placeholder="请再次输入用户密码"
                  clearable>
                        <i slot="prefix" class="el-input__icon iconfont icon-mima"></i>
                      </el-input>
                    </el-form-item>
                    <!-- 图片验证码 -->
                    <div class="captcha-img-box clear">
                      <el-form-item label="" prop="captchaImg">
                        <el-input v-model="userForm.captchaImg" required type="text" class='captcha-img-input input' placeholder="请输入右侧的验证码"
                        clearable>
                        <i slot="prefix" class="el-input__icon iconfont icon-yanzhengma"></i>
                        </el-input>
                        <el-button type="success" class="captcha-img">
                        </el-button>
                      </el-form-item>
                    </div>
                    <div class="form-group">
                      <el-form-item>
                        <el-button type="success" @click="register('userForm')" class="register-btn">登 录</el-button>
                      </el-form-item>
                    </div>
                  </el-form>
                </el-tab-pane>
                <el-tab-pane label="手机快速注册" name="second" class="phone">
                  <el-form :model="phoneForm" status-icon :rules="phoneRules" ref="phoneForm"  >
                    <el-form-item prop="userPhone">
                      <el-input autofocus v-model.number="phoneForm.userPhone"  type="text" class='input' placeholder="请输入注册手机号"
                      clearable>
                      <i slot="prefix" class="el-input__icon iconfont icon-shouji"></i>
                      </el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                      <el-input v-model="phoneForm.password" type="password"  class='input'  placeholder="请输入用户密码"
                      clearable>
                        <i slot="prefix" class="el-input__icon iconfont icon-mima"></i>
                      </el-input>
                    </el-form-item>
                    <el-form-item prop="confirmPassword">
                      <el-input v-model="phoneForm.confirmPassword" type="password"  class='input'  placeholder="请再次输入用户密码"
                      clearable>
                        <i slot="prefix" class="el-input__icon iconfont icon-mima"></i>
                      </el-input>
                    </el-form-item>
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
                       <el-button type="success" @click="register('emailForm')" class="register-btn">注 册</el-button>
                      </el-form-item>
                    </div>
                  </el-form>
                </el-tab-pane>
                <el-tab-pane label="邮箱快速注册" name="third">
                  <el-form :model="emailForm" status-icon :rules="emailRules" ref="emailForm"  >
                    <el-form-item prop="email">
                      <el-input autofocus v-model="emailForm.email"  type="email" class='input' placeholder="请输入用户邮箱"
                      clearable>
                      <i slot="prefix" class="el-input__icon iconfont icon-email"></i>
                      </el-input>
                    </el-form-item>
                    <el-form-item prop="username">
                      <el-input  v-model="emailForm.username" required type="text" class='input' placeholder="请输入用户名"
                      clearable>
                      <i slot="prefix" class="el-input__icon iconfont icon-xingmingyonghumingnicheng"></i>
                      </el-input>  
                    </el-form-item>
                    <el-form-item prop="password">
                      <el-input v-model="emailForm.password" type="password"  class='input'  placeholder="请输入用户密码"
                      clearable>
                        <i slot="prefix" class="el-input__icon iconfont icon-mima"></i>
                      </el-input>
                    </el-form-item>
                    <el-form-item prop="confirmPassword">
                      <el-input v-model="emailForm.confirmPassword" type="password"  class='input'  placeholder="请再次输入用户密码"
                      clearable>
                        <i slot="prefix" class="el-input__icon iconfont icon-mima"></i>
                      </el-input>
                    </el-form-item>
                    <div class="form-group">
                      <el-form-item>
                        <el-button type="success" @click="register('emailForm')" class="register-btn">注 册</el-button>
                      </el-form-item>
                    </div>
                  </el-form>
                </el-tab-pane>
              </el-tabs>
            </template>
          </div>
          <div class="divider left">
          </div>
          <div class="register-other right">
              <div class="warp">
                  <h5>如果已有账号：</h5>
                  <div>
                        <router-link to="/userLogin">
                        <i class="iconfont icon-xingmingyonghumingnicheng"></i>   立即登录
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
import systemConfig from '../assets/js/systemConfig'
import API from '../assets/js/API'
const api = new API()
export default {
  data () {
    var userValidateConfirmPassword = (rule, value, callback) => {
      if (value !== this.userForm.password) {
        callback(new Error('两次输入的密码不一致'))
      } else {
        callback()
      }
    }
    var phoneValidateConfirmPassword = (rule, value, callback) => {
      if (value !== this.phoneForm.password) {
        callback(new Error('两次输入的密码不一致'))
      } else {
        callback()
      }
    }
    var emailValidateConfirmPassword = (rule, value, callback) => {
      if (value !== this.phoneForm.password) {
        callback(new Error('两次输入的密码不一致'))
      } else {
        callback()
      }
    }
    var checkUserName = (rule, value, callback) => {
      var params = {}
      params.url = `${systemConfig.requestUrlConfig.register.checkUserName}?username=${value}`
      api.get(params)
      .then((res) => {
        if (api.validateResSuccess(res)) {
          if (res.data.datas.checked) {
            // 用户名唯一性验证通过
            callback()
          } else {
            // 用户名唯一性验证失败
            callback(new Error(systemConfig.tips.userInfo.checkUserNameError))
          }
        } else {
          // 用户名唯一性验证失败
          callback(new Error(systemConfig.tips.userInfo.checkUserNameError))
        }
      })
      .catch((err) => {
        console.log(err)
      })
    }
    // var checkEmail = (rule, value, callback) => {
    //   // 验证邮箱唯一性
    //   var params = {}
    //   params.url = `${systemConfig.requestUrlConfig.register.checkEmail}?email=${value}`
    //   api.get(params)
    //   .then((res) => {
    //     if (api.validateResSuccess(res)) {
    //       if (res.data.datas.checked) {
    //         // 邮箱唯一性验证通过
    //         callback()
    //       } else {
    //         // 邮箱唯一性验证失败
    //         callback(new Error(systemConfig.tips.userInfo.checkEmailError))
    //       }
    //     } else {
    //       // 邮箱唯一性验证失败
    //       callback(new Error(systemConfig.tips.userInfo.checkEmailError))
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err)
    //   })
    // }
    return {
      activeName: 'first',
      // 用户普通注册表单
      userForm: {
        username: '',
        password: '',
        confirmPassword: '',
        // 图片验证码
        captchaImg: ''
      },
      // 用户普通注册验证规则
      userRules: {
        username: [
          { required: true, message: '请输入登录用户名', trigger: 'blur' },
          { max: 12, message: '长度最长12个字符', trigger: 'blur' }
          // {validator: checkUserName, trigger: 'blur'}
        ],
        password: [
          { required: true, message: '请输入用户登录密码', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        confirmPassword: [
          {required: true, message: '请再次输入用户登录密码', trigger: 'blur'},
          {validator: userValidateConfirmPassword, trigger: 'blur'}
        ],
        captchaImg: [
          {required: true, message: '请输入图片验证码', trigger: 'blur'}
        ]
      },
      phoneForm: {
        userPhone: '',
        password: '',
        confirmPassword: '',
      // 手机动态验证码
        captchaDynamic: ''
      },
      // 手机快速注册验证规则
      phoneRules: {
        userPhone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { max: 11, message: '长度为11个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入用户登录密码', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        confirmPassword: [
          {required: true, message: '请再次输入用户登录密码', trigger: 'blur'},
          {validator: phoneValidateConfirmPassword, trigger: 'blur'}
        ],
        captchaDynamic: [
          {required: true, message: '请输入手机验证码', trigger: 'blur'}
        ]
      },
      // 邮箱快速注册表单
      emailForm: {
        email: '',
        username: '',
        password: '',
        confirmPassword: ''
      },
      // 邮箱快速注册验证规则
      emailRules: {
        email: [
          {required: true, message: '请输入邮箱', trigger: 'blur'}
          // {validator: checkEmail, trigger: 'blur'}
        ],
        username: [
          { required: true, message: '请输入登录用户名', trigger: 'blur' },
          { max: 12, message: '长度不超过12个字符', trigger: 'blur' },
          {validator: checkUserName, trigger: 'blur'}
        ],
        password: [
          { required: true, message: '请输入用户登录密码', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        confirmPassword: [
          {required: true, message: '请再次输入用户登录密码', trigger: 'blur'},
          {validator: emailValidateConfirmPassword, trigger: 'blur'}
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
    register (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var params = {}
          params.url = '/index'
          this.$router.push(params.url)
        } else {
          console.log('error submit!!')
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
  .register{
    background-color: #f8f9fc;
    width: 100%;
    overflow: auto;
    min-width: 1024px;
    height: 100%;
    min-height: 600px;
    position: relative; 

    .register-header{
      min-height: 50%;
      background-color:@green;
    }
    .register-box{
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

      .register-title{
        text-align: left;
        border-left: 5px solid @green;
        padding: 5px;
        margin: 10px;
        font-size: 18px;
        em{
          color:@green;
        }
      }

      .register-container{
        .register-info{
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
            .register-btn{
              display: block;
              width: 100%;
              margin-left: 0;
            }
          }
          .user-register{
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
          }
          
          .phone{
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
      .register-other{
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
