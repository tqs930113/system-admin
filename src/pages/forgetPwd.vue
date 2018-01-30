<template>
  <div id="forget-pwd" class="forget-pwd container clear">
    <header class="forget-pwd-header">
    </header>
    <section class="forget-pwd-box">
      <div class="forget-pwd-title">
          <router-link to="/userLogin" class="go-login">返回登录</router-link>
          <span>|</span>
          <a class="get-back-method" @click="showPhoneMethod = !showPhoneMethod">{{showPhoneMethod ? '通过邮箱找回' : '通过手机找回'}}<i class="iconfont icon-xiangyou2"></i></a>
      </div>
      <div class="forget-pwd-container phone clear" v-show="showPhoneMethod" >
          <div class="progress-nav">
            <el-steps process-status="wait" :active="phoneStepActive" finish-status="success" align-center>
              <el-step title="验证手机号"></el-step>
              <el-step title="重置密码"></el-step>
            </el-steps>
          </div>
          <div class="forget-pwd-info">
            <div label="手机号方式找回密码" class="phone" v-show="phoneStepActive === 0">
              <el-form :model="phoneForm" status-icon :rules="phoneRules" ref="phoneForm"  >
                <el-form-item prop="userPhone">
                  <el-input autofocus v-model="phoneForm.userPhone"  type="text" class='input' placeholder="请输入手机号"
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
                    <el-input v-model="phoneForm.captchaDynamic" required type="text" class='captcha-dynamic-input input' placeholder="请输入手机验证码"
                    clearable>
                    <i slot="prefix" class="el-input__icon iconfont icon-iconfontmima1"></i>
                    </el-input>
                    <el-button type="success" class="captcha-dynamic">
                      获取验证码
                    </el-button>
                  </el-form-item>
                </div>
                <div class="form-group">
                  <el-form-item >
                    <el-button type="success" @click="phoneGetBackPwd('phoneForm')" class=" forget-pwd-btn">找回密码</el-button>
                  </el-form-item>
                </div>
              </el-form>
            </div>
            <div label="重置密码" class="phone" v-show="phoneStepActive === 1">
              <el-form :model="phoneResetPwdForm" status-icon :rules="phoneResetPwdRules" ref="phoneResetPwdForm">
                <el-form-item prop="phonePassword">
                  <el-input v-model="phoneResetPwdForm.phonePassword" type="password"  class='input'  placeholder="请输入用户密码"
                  clearable>
                  <i slot="prefix" class="el-input__icon iconfont icon-mima"></i>
                  </el-input>
                </el-form-item>
                <el-form-item prop="phoneConfirmPassword">
                  <el-input v-model="phoneResetPwdForm.phoneConfirmPassword" type="password"  class='input'  placeholder="请再次输入用户密码"
                clearable>
                    <i slot="prefix" class="el-input__icon iconfont icon-mima"></i>
                  </el-input>
                </el-form-item>
                <div class="form-group">
                  <el-form-item>
                    <el-button type="success" @click="phoneResetPwd('phoneResetPwdForm')" class=" forget-pwd-btn">重置密码</el-button>
                  </el-form-item>
                </div>
              </el-form>
            </div>
          </div>
      </div>
      <div class="forget-pwd-container email clear" v-show="!showPhoneMethod">
          <div class="progress-nav">
            <el-steps process-status="wait" :active="emailStepActive" finish-status="success" align-center>
              <el-step title="输入邮箱地址"></el-step>
              <el-step title="验证邮箱"></el-step>
              <el-step title="重置密码"></el-step>
            </el-steps>
          </div>
          <div class="forget-pwd-info">
            <div label="输入邮箱地址"  class="email" v-show="emailStepActive === 0">
              <el-form :model="emailForm" status-icon :rules="emailRules" ref="emailForm">
                <el-form-item prop="email">
                  <el-input autofocus v-model="emailForm.email"  type="email" class='input' placeholder="请输入注册时使用的邮箱"
                  clearable>
                  <i slot="prefix" class="el-input__icon iconfont icon-shouji"></i>
                  </el-input>
                </el-form-item>
                <div class="form-group">
                  <el-form-item>
                    <el-button type="success" @click="comfirmEmail('emailForm')" class="forget-pwd-btn">找回密码</el-button>
                  </el-form-item>
                </div>
              </el-form>
            </div>
            <div label="验证邮箱"  class="email" v-show="emailStepActive === 1">
              <el-form :model="checkEmailForm" ref="checkEmailForm" status-icon :rules="checkEmailRules">
              <!-- 动态验证码 -->
                <div class="captcha-dynamic-box">
                  <el-form-item prop="captchaDynamic">
                    <el-input v-model="checkEmailForm.captchaDynamic" required type="text" class='captcha-dynamic-input input' placeholder="请输入手机验证码"
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
                    <el-button type="success" @click="checkEmail('checkEmailForm')" class="forget-pwd-btn">验证邮箱</el-button>
                  </el-form-item>
                </div>
              </el-form>
            </div>
            <div label="重置密码"  class="email" v-show="emailStepActive === 2">
              <el-form :model="emailResetPwdForm" status-icon :rules="emailResetPwdRules" ref="emailResetPwdForm">
                <el-form-item prop="emailPassword">
                  <el-input v-model="emailResetPwdForm.emailPassword" type="password"  class='input'  placeholder="请输入用户登录密码"
                  clearable>
                  <i slot="prefix" class="el-input__icon iconfont icon-mima"></i>
                  </el-input>
                </el-form-item>
                <el-form-item prop="emailConfirmPassword">
                  <el-input v-model="emailResetPwdForm.emailConfirmPassword" type="password"  class='input'  placeholder="请再次输入用户密码"
                clearable>
                    <i slot="prefix" class="el-input__icon iconfont icon-mima"></i>
                  </el-input>
                </el-form-item>  
                <div class="form-group">
                  <el-form-item >
                    <el-button type="success" @click="emailResetPwd('emailResetPwdForm')" class=" forget-pwd-btn">重置密码</el-button>
                  </el-form-item>
                </div>
              </el-form>
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
    var emailValidateConfirmPassword = (rule, value, callback) => {
      // 检验用邮箱方式重置密码时，两次密码输入是否一致
      if (value !== this.emailResetPwdForm.emailPassword) {
        callback(new Error('两次输入的密码不一致'))
      } else {
        callback()
      }
    }
    var phoneResetValidateConfirmPassword = (rule, value, callback) => {
      // 检验用手机找回方式重置密码时，两次密码输入是否一致
      if (value !== this.phoneResetPwdForm.phonePassword) {
        callback(new Error('两次输入的密码不一致'))
      } else {
        callback()
      }
    }
    return {
      // 邮箱找回密码步骤导航当前步数
      emailStepActive: 0,
      // 手机找回密码步骤导航当前步数
      phoneStepActive: 0,
      // 展示是否以手机方式找回密码
      showPhoneMethod: true,
      activeName: 'first',
      username: '',
      email: '',
      userPhone: '',
      phonePassword: '',
      phoneConfirmPassword: '',
      // 图片验证码
      captchaImg: '',
      // 手机动态验证码
      captchaDynamic: '',
      phoneForm: {
        userPhone: '',
        captchaImg: '',
      // 手机动态验证码
        captchaDynamic: ''
      },
      // 手机方式找回密码验证规则
      phoneRules: {
        userPhone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { max: 11, message: '长度为11个字符', trigger: 'blur' }
        ],
        captchaImg: [
          {required: true, message: '请输入图片验证码', trigger: 'blur'}
        ],
        captchaDynamic: [
          {required: true, message: '请输入手机验证码', trigger: 'blur'}
        ]
      },
      // 手机验证重置密码表单
      phoneResetPwdForm: {
        phonePassword: '',
        phoneConfirmPassword: ''
      },
      phoneResetPwdRules: {
        phonePassword: [
          { required: true, message: '请输入用户登录密码', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        phoneConfirmPassword: [
          {required: true, message: '请再次输入用户登录密码', trigger: 'blur'},
          {validator: phoneResetValidateConfirmPassword, trigger: 'blur'}
        ]
      },
      // 邮箱找回确认用户邮箱表单
      emailForm: {
        email: ''
      },
      // 邮箱找回确认用户邮箱表单验证规则
      emailRules: {
        email: [
          {required: true, message: '请输入邮箱', trigger: 'blur'}
        ]
      },
       // 邮箱有效性验证表单
      checkEmailForm: {
        // 邮箱动态验证码
        captchaDynamic: ''
      },
      // 邮箱有效性验证规则
      checkEmailRules: {
        captchaDynamic: [
          {required: true, message: '请输入邮箱验证码', trigger: 'blur'}
        ]
      },
      // 手机验证重置密码表单
      emailResetPwdForm: {
        emailPassword: '',
        emailConfirmPassword: ''
      },
      emailResetPwdRules: {
        emailPassword: [
          { required: true, message: '请输入用户登录密码', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        emailConfirmPassword: [
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
    phoneGetBackPwd (formName) {
      var that = this
      that.$refs[formName].validate((valid) => {
        if (valid) {
          // 手机找回方式下设置步骤状态为重置密码
          that.phoneStepActive = 1
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    phoneResetPwd (formName) {
      var that = this
      that.$refs[formName].validate((valid) => {
        if (valid) {
          // 手机找回方式下重置账号密码
          that.$router.push('/userLogin')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    emailResetPwd (formName) {
      var that = this
      that.$refs[formName].validate((valid) => {
        if (valid) {
          // 邮箱找回方式下重置账号密码
          that.$router.push('/userLogin')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    comfirmEmail (formName) {
      var that = this
      that.$refs[formName].validate((valid) => {
        if (valid) {
          // 确认邮箱存在
          that.emailStepActive = 1
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    checkEmail (formName) {
      var that = this
      that.$refs[formName].validate((valid) => {
        if (valid) {
           // 检验邮箱合法
          that.emailStepActive = 2
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
  .forget-pwd{
    background-color: #f8f9fc;
    width: 100%;
    overflow: auto;
    min-width: 10.24rem;
    height: 100%;
    min-height: 6rem;
    position: relative; 

    .forget-pwd-header{
      min-height: 50%;
      background-color:@green;
    }
    .forget-pwd-box{
      width: 4rem;
      position: absolute;
      background-color:white;
      box-shadow: 0 0 10px 0 rgba(0,0,0,.5);
      top: 50%;
      left: 50%;
      margin-top:-1.8rem;
      margin-left: -2rem;
      border-radius:.05rem;
      padding: .1rem .2rem;

      .forget-pwd-title{
        color:@green;
        text-align: right;
        padding: .1rem;
        margin: .1rem;
        font-size: .14rem;
        a{
            color:@green;
        }
        .get-back-method{
          cursor: pointer;
        }
        .iconfont{
            vertical-align: text-bottom;
            font-size: .18rem;
            padding-left: .05rem;
        }
      }

      .forget-pwd-container{
        .progress-nav{
          text-align: left;
        }
        .forget-pwd-info{
          padding: .1rem .2rem;
          .input,.form-group{
            padding: .1rem 0;
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
            .forget-pwd-btn{
              display: block;
              width: 100%;
              margin-left: 0;
            }
          }
          .phone,.email{
            .captcha-img-box{
              .captcha-img-input{
                width: 55%;
                float: left;
              }
              .captcha-img{
                width: 35%;
                margin: .1rem 0;
                height: .4rem;
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
                margin: .1rem 0;
              }
            }
          }
        }
        .divider::after{
          content: "or";
          display: block;
          position: absolute;
          top: 50%;
          padding: .05rem 0;
          margin-left: -0.8rem;
          background-color: #fff;
        }
      }
      .forget-pwd-other{
        width: 38%;
        height: 2rem;
        position: relative;
        text-align: left;
        .iconfont{
          font-size: .24rem;
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
            padding: .05rem 0;
          }
          .thirdLogin{
            li{
              display: inline-block;
              padding: .05rem;
            }
          }
        }
      }
    }

    .copyright{
      position: absolute;
      width: 100%;
      bottom: .05rem;
      height: .4rem;
      line-height: .2rem;
      text-align:center;
      font-weight: bold;
    }
  }
</style>
