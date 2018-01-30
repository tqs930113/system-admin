<template>
  <div class="user-info layout">
    <nav class="nav">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/userInfo' }"><i class="el-icon-menu"></i>个人信息</el-breadcrumb-item>
      </el-breadcrumb>
    </nav>
    <div class="content">
      <el-tabs type="border-card">
        <el-tab-pane label="基本信息">
          <div class="base-info">
            <el-form :model="user" ref="user"  status-icon  label-width="100px">
              <el-row :gutter="2">
                <el-col :span="12">
                  <el-row :gutter="2">
                    <el-col :span="24">
                      <el-form-item label="用户名:" prop="username">
                        <el-input type="text" v-model="user.username" disabled autofocus></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="2">
                    <el-col :span="24">
                      <el-form-item label="用户昵称:" prop="nickname">
                        <el-input type="text" v-model="user.nickname" clearable placeholder="请输入用户昵称"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="2">
                    <el-col :span="24">
                      <el-form-item label="真实姓名:" prop="fullname">
                        <el-input type="text" v-model="user.fullname" clearable placeholder="请输入用户真实姓名"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-col>
                <el-col :offset="3" :span="6">
                  <el-upload 
                    class="avatar-uploader"
                    :action="avatarURL"
                    :show-file-list="false"
                    :on-success="userAvatarSuccessUpload"
                    :before-upload="checkFile"
                    :on-error="errorUpload"
                    :headers="setheaders"
                    >
                      <img v-if="user.avatar" :src="user.avatar" class="avatar">
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                      <span class="picture_word">头像上传</span>
                  </el-upload>
                </el-col>
              </el-row>
              <el-row :gutter="2">
                <el-form-item label="性别:" prop="gender">
                  <template>
                    <el-col :span="3">
                    <el-radio v-model="user.gender" label="1">男</el-radio>
                    </el-col>
                    <el-col :span="3">
                    <el-radio v-model="user.gender" label="2">女</el-radio>
                    </el-col>
                  </template>
                </el-form-item>
              </el-row>
              <el-row :gutter="2">
                <el-col :span="8">
                  <el-form-item label="出生日期:" prop="birthdate">
                    <el-date-picker
                      v-model="user.birthdate"
                      type="date"
                      placeholder="选择出生日期"
                      format="yyyy 年 MM 月 dd 日"
                      value-format="yyyy-MM-dd HH:mm:dd">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="2">
                <el-col :span="12">
                  <el-form-item label="注册时间:" prop="registerDateTime">
                    <div class="register-datetime">{{user.registerDateTime}}</div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="2">
                <el-col :span="16">
                  <el-form-item label="联系地址:" prop="address">
                    <el-input
                      type="textarea"
                      :autosize="{ minRows: 2, maxRows: 4}"
                      placeholder="请输入联系地址"
                      v-model="user.address">
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="2">
                <el-col :span="4">
                  <el-form-item >
                    <el-button @click="updateUserBaseInfo" type="primary">保存</el-button>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </el-tab-pane>
        <el-tab-pane label="账号安全">
          <div class="account-security">
            <el-row>
              <el-col :span="24">
                <div class="caption">
                  修改密码
                </div>
              </el-col>
            </el-row>
            <el-row class="divide">
              <el-col :span="10">
                <el-form :model="updatePwd" ref="updatePwd" :rules="updatePwdRules" status-icon label-width="100px">
                  <el-form-item label="当前密码：" prop="oldPassword">
                    <el-input v-model="updatePwd.oldPassword" type="password" autofocus placeholder="请输入当前用户密码"></el-input>
                  </el-form-item>
                  <el-form-item label="新密码：" prop="newPassword">
                    <el-input v-model="updatePwd.newPassword" type="password"  placeholder="请输入新密码"></el-input>
                  </el-form-item>
                  <el-form-item label="确认新密码：" prop="newPasswordConfirm">
                    <el-input v-model="updatePwd.newPasswordConfirm" type="password"  placeholder="请重新输入新密码"></el-input>
                  </el-form-item>
                  <el-form-item  class="update-pwd_btn" >
                    <el-button type="primary" @click="updateUserPwd">修改</el-button>
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>
            <el-row class="divide">
              <el-row>
                <el-col :span="24">
                  <div class="caption">
                    绑定手机
                  </div>
                </el-col>
              </el-row>
              <el-col :span="14">
                <el-form :model="user" ref="bindPhone" :rules="bindPhoneRules" status-icon label-width="100px">
                  <div class="captcha-img-box clear">
                    <!-- 手机图片验证 -->
                    <el-form-item label="图片验证码：" prop="imgCaptcha">
                      <el-input  class="captcha-img-input"  v-model="user.imgCaptcha" type="text" autofocus placeholder="请输入右侧图片验证码"></el-input>
                      <el-button class="captcha-img" type="primary" ></el-button>
                    </el-form-item>
                  </div>
                  <div class="captcha-dynamic-box">
                    <!-- 手机动态验证码 -->
                  <el-form-item label="手机号：" prop="phone">
                    <el-input class="captcha-dynamic-input" v-model="user.phone" type="text"  placeholder="请输入手机号"></el-input>
                    <el-button type="primary" class="captcha-dynamic">
                      获取验证码
                    </el-button>
                  </el-form-item>
                  </div> 
                  <div class="captcha-dynamic-box">
                    <el-form-item label="手机验证码：" prop="captchaDynamic">
                      <el-input class="captcha-dynamic-input" v-model="user.captchaDynamic" type="text"  placeholder="请输入手机验证码"></el-input>
                      <el-button type="primary" @click="updateUserPwd" class="captcha-dynamic">绑定</el-button>
                    </el-form-item>
                  </div>
                </el-form>
              </el-col>
            </el-row>
            <el-row >
              <el-row>
                <el-col :span="24">
                  <div class="caption">
                    绑定邮箱
                  </div>
                </el-col>
              </el-row>
              <el-col :span="14">
                <el-form :model="user" ref="bindPhone" :rules="bindPhoneRules" status-icon label-width="100px">
                  <div class="captcha-img-box clear">
                    <!-- 邮箱图片验证 -->
                    <el-form-item label="图片验证码：" prop="imgCaptcha">
                      <el-input  class="captcha-img-input"  v-model="user.imgCaptcha" type="text" autofocus placeholder="请输入右侧图片验证码"></el-input>
                      <el-button class="captcha-img" type="primary" ></el-button>
                    </el-form-item>
                  </div>
                  <div class="captcha-dynamic-box">
                    <!-- 邮箱动态验证码 -->
                  <el-form-item label="邮箱：" prop="phone">
                    <el-input class="captcha-dynamic-input" v-model="user.phone" type="text"  placeholder="请输入手机号"></el-input>
                    <el-button type="primary" class="captcha-dynamic">
                      获取验证码
                    </el-button>
                  </el-form-item>
                  </div> 
                  <div class="captcha-dynamic-box">
                    <el-form-item label="邮箱验证码：" prop="captchaDynamic">
                      <el-input class="captcha-dynamic-input" v-model="user.captchaDynamic" type="text"  placeholder="请输入手机验证码"></el-input>
                      <el-button type="primary" @click="updateUserPwd" class="captcha-dynamic">绑定</el-button>
                    </el-form-item>
                  </div>
                </el-form>
              </el-col>
            </el-row>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import API from '../assets/js/API.js'
import systemConfig from '../assets/js/systemConfig'
const api = new API()
export default {
  data () {
    return {
      user: {
        // 登录用户名
        username: '',
        // 用户头像
        avatar: '',
        // 用户昵称
        nickname: '',
        // 注册时间
        registerDateTime: '2018年01月13日',
        // 性别
        gender: '1',
        // 生日
        birthdate: '',
        // 邮箱
        email: '',
        // 联系电话
        phone: '',
        // 用户全名
        fullname: '',
        // 联系地址
        address: '',
        // 图片验证码
        imgCaptcha: '',
        // 动态验证码
        captchaDynamic: ''
      },
      bindPhoneRules: {
        // 绑定手机表单校验规则
      },
      updatePwd: {
        // 修改用户密码
        oldPassword: '',
        newPassword: '',
        newPasswordConfirm: ''
      },
      updatePwdRules: {
        oldPassword: [
          { reqired: true, message: '请输入当前用户密码', trigger: 'blur' }
        ]
      },
      // 上传用户头像地址
      avatarURL: 'https://jsonplaceholder.typicode.com/posts/'
    }
  },
  computed: {
    setheaders () {
      var tempObj = {}
      tempObj.token = api.getToken('token')
      return tempObj
    }
  },
  watch: {
  },
  methods: {
    updateUserBaseInfo () {
      // 修改用户基本信息
      console.log('submit')
    },
    updateUserPwd () {
      // 修改用户密码
    },
    userAvatarSuccessUpload (response, file, fileList) {
      // 用户头像图片上传成功后将图片地址存入user的avatar
      if (response.code !== '000000') {
        api.reqFail(this, response.message)
        return false
      }
      this.user.avatar = response.datas.picSrc
      api.reqSuccess(this, '上传成功')
    },
    errorUpload (err, file, fileList) {
      console.log(err)
      api.reqFail(this, '图片上传失败')
    },
    checkFile (file) {
      // 在上传之前检测文件格式及大小
      var fileSize = Math.floor(file.size / 1204)
      var tempArr = file.type.split('/')
      var fileType = tempArr[tempArr.length - 1]
      if (fileSize > systemConfig.fileConf.size) {
        api.reqFail(this, '超过上传文件的限制大小！')
        return false
      }
      if (systemConfig.fileConf.type.indexOf(fileType) < 0) {
        api.reqFail(this, '文件类型不符合要求')
        return false
      }
      return true
    }
  }
}
</script>
<style lang="less" scoped>
// 定义常量
@green:#00a65a;
.user-info{
  .content{
    .base-info{
      min-width: 3rem;
      
      .el-row{
        padding-bottom: .2rem;
      }
      .el-form > .el-row{
        padding-bottom: .2rem;

        &:first-of-type{
          padding-bottom: 0;
        }
      }
      .register-datetime{
        text-align: left;
      }
    }
  .account-security{
    padding: .1rem .2rem;
    .el-form-item{
      margin-bottom: .2rem;
    }
    .update-pwd_btn{
      text-align: left;
    }
    .caption{
      border-left: .05rem @green solid;
      text-align: left;
      padding: .05rem 0;
      padding-left: .1rem;
      margin: .2rem 0;
    }

    .divide{
      padding-bottom: .25rem;
      border-bottom: 1px @green dashed;
    }
  }
  // 图片验证码
  .captcha-img-box{
    .captcha-img-input{
      width: 65%;
      min-width: 1.6rem;
      float: left;
    }
    .captcha-img{
      width: 25%;
      min-width: 1rem;
      height: 40px;
      background-color:white;
    }
  }
  // 动态验证码
  .captcha-dynamic-box{
    .captcha-dynamic-input{
      width: 65%;
      min-width: 1.6rem;
      float: left;
    }
    .captcha-dynamic{
      width: 25%;
      min-width: 1rem;
    }
  }
/* 图片上传 */
.avatar-uploader{
  font-size: 28px;
  color: #8c939d;
  width: 110px;
  height: 110px;
  line-height: 110px;
  text-align: center;
  border:1px dotted #8c939d;
  border-radius:5px;
}
.avatar-uploader:hover{
  border-color:@green;
  color:@green;
}
.picture_word{
  display: block;
  font-size: 10px;
  height: 10px;
  line-height: 10px;
  margin-top: -32px;
}
.click_wrap{
  height: 100% !important;
  width:100%
}
.avatar{
  width: 100%;
  height: 100%;
}

  }
}
</style>

