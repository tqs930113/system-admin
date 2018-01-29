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
          <el-form :model="user" ref="user" :rules="userRules" status-icon  label-width="100px">
            <el-form-item label="用户名:" prop="username">
              <el-input type="text" v-model="user.username" disabled autofocus></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="配置管理">配置管理</el-tab-pane>
        <el-tab-pane label="角色管理">角色管理</el-tab-pane>
        <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
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
        registerDateTime: '',
        // 性别
        gender: '',
        // 生日
        birthdate: '',
        // 邮箱
        email: '',
        // 联系电话
        phone: '',
        // 用户全名
        fullname: '',
        // 联系地址
        address: ''
      },
      userRules: {

      }
    }
  }
}
</script>
<style lang="less" scoped>

</style>

