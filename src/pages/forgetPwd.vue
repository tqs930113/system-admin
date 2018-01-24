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
              <el-input autofocus v-model="userPhone" required type="text" class='input' placeholder="请输入手机号"
              clearable>
              <i slot="prefix" class="el-input__icon iconfont icon-shouji"></i>
              </el-input>
              <!-- 图片验证码 -->
              <div class="captcha-img-box clear">
                <el-input v-model="captchaImg" required type="text" class='captcha-img-input input' placeholder="请输入右侧的验证码"
                  clearable>
                <i slot="prefix" class="el-input__icon iconfont icon-yanzhengma"></i>
                </el-input>
                <el-button type="success" class="captcha-img">
                </el-button>
              </div>
              <!-- 动态验证码 -->
              <div class="captcha-dynamic-box">
                <el-input v-model="captchaDynamic" required type="text" class='captcha-dynamic-input input' placeholder="请输入手机验证码"
                clearable>
                <i slot="prefix" class="el-input__icon iconfont icon-iconfontmima1"></i>
                </el-input>
                <el-button type="success" class="captcha-dynamic">
                  获取验证码
                </el-button>
              </div>
              <div class="form-group">
                <el-button type="success" @click="phoneGetBackPwd" class="forget-pwd-btn">找回密码</el-button>
              </div>
            </div>
            <div label="重置密码" class="phone" v-show="phoneStepActive === 1">
              <el-input v-model="phonePassword" type="text"  class='input'  placeholder="请输入用户密码"
              clearable>
              <i slot="prefix" class="el-input__icon iconfont icon-mima"></i>
              </el-input>
                <el-input v-model="phoneConfirmPassword" type="text"  class='input'  placeholder="请再次输入用户密码"
              clearable>
                <i slot="prefix" class="el-input__icon iconfont icon-mima"></i>
              </el-input>
              <div class="form-group">
                <el-button type="success" @click="phoneResetPwd" class="forget-pwd-btn">重置密码</el-button>
              </div>
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
              <el-input autofocus v-model="email" required type="text" class='input' placeholder="请输入注册时使用的邮箱"
              clearable>
              <i slot="prefix" class="el-input__icon iconfont icon-shouji"></i>
              </el-input>
              <div class="form-group">
                <el-button type="success" @click="comfirmEmail" class="forget-pwd-btn">找回密码</el-button>
              </div>
            </div>
            <div label="验证邮箱"  class="email" v-show="emailStepActive === 1">
              <!-- 动态验证码 -->
              <div class="captcha-dynamic-box">
                <el-input v-model="captchaDynamic" required type="text" class='captcha-dynamic-input input' placeholder="请输入手机验证码"
                clearable>
                <i slot="prefix" class="el-input__icon iconfont icon-iconfontmima1"></i>
                </el-input>
                <el-button type="success" class="captcha-dynamic">
                  获取验证码
                </el-button>
              </div>
              <div class="form-group">
                <el-button type="success" @click="checkEmail" class="forget-pwd-btn">验证邮箱</el-button>
              </div>
            </div>
            <div label="重置密码"  class="email" v-show="emailStepActive === 2">
              <el-input v-model="phonePassword" type="text"  class='input'  placeholder="请输入用户密码"
              clearable>
              <i slot="prefix" class="el-input__icon iconfont icon-mima"></i>
              </el-input>
                <el-input v-model="phoneConfirmPassword" type="text"  class='input'  placeholder="请再次输入用户密码"
              clearable>
                <i slot="prefix" class="el-input__icon iconfont icon-mima"></i>
              </el-input>
              <div class="form-group">
                <el-button type="success" @click="emailResetPwd" class="forget-pwd-btn">重置密码</el-button>
              </div>
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
      captchaDynamic: ''
    }
  },
  watch: {
    password (cval, bval) {
      this.redirectUrl = cval
    }
  },
  methods: {
    phoneGetBackPwd () {
      // 手机找回方式下设置步骤状态为重置密码
      this.phoneStepActive = 1
    },
    phoneResetPwd () {
      // 手机找回方式下重置账号密码
      this.$router.push('/userLogin')
    },
    emailResetPwd () {
      // 邮箱找回方式下重置账号密码
      this.$router.push('/userLogin')
    },
    comfirmEmail () {
      // 确认邮箱存在
      this.emailStepActive = 1
    },
    checkEmail () {
      // 检验邮箱合法
      this.emailStepActive = 2
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
