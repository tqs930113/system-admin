<template>
  <div class="header">
    <div class="logo">
      <div class="menu-btn" id="menu-btn" @click="toggleMenuStatus">
        <i class="iconfont icon-zuo"></i>
      </div>
      <div class="logo-title">
        用户权限管理系统
      </div>
    </div>
    <div class="header-right">
      <div class="wrap">
        <div class="navs-left">
          <div @click="toggleNavStatus" class="nav-btn  " id="nav-btn">
            <i class="waves-effect waves-button" :class=" navNavItemsShow ? 'iconfont ' + navBtnIcons[1] : 'iconfont ' + navBtnIcons[0]"></i>
          </div>
          <div  @click="slideLeft"  class="nav-prev bg-color nav-slide-hover" id="nav-prev">
            <i class="iconfont icon-zuo"></i>
          </div>
          <div v-show="navNavItemsShow" class="nav-container" id="nav-container">
            <transition name="el-fade-in-linear">
              <div  class="nav-items" id="nav-items">
                  <template v-for="item in navItems">
                  <div  class="transition-box" :key='item.id'>
                    <i v-if="item.icon.length > 0" :class="item.icon"></i>
                    {{item.title}}
                  </div>
                  </template>
              </div>
            </transition>
          </div>
          <div  @click="slideRight" class="nav-next bg-color nav-slide-hover" id="nav-next">
            <i class="iconfont icon-you"></i>
          </div>
        </div>
        <div class="toolbar">
          <div class="wrap">
            <div class="account left">
              <div class="picture">
              </div>
              <div class="user-name" alt="admin">
                <el-dropdown @command="handleCommand" placement="bottom-start">
                  <span class="el-dropdown-link" title="admin">
                    admin
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item  command="personalInfo">
                        <i class="iconfont icon-geren3"></i> 个人信息
                    </el-dropdown-item>
                    <el-dropdown-item command="personalSetting" disabled>
                      <i class="iconfont icon-yinsi"></i> 隐私管理</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </div>
              <router-link tag="div" to="./index" class="home left">
                <i class="waves-effect waves-button iconfont icon-home "></i>
              </router-link>
            <div class="settings left">
              <el-dropdown @command="handleCommand" placement="bottom">
                <span class="el-dropdown-link">
                  <i class="iconfont icon-gengduo1"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="fullScreen">
                    <i class="iconfont icon-quanping"></i> 全屏模式</el-dropdown-item>
                  <el-dropdown-item command="removeCache" disabled>
                    <i class="iconfont icon-qingchuhuancun"></i> 清除缓存</el-dropdown-item>
                  <el-dropdown-item command="systemSetting">
                    <i class="iconfont icon-shezhi"></i> 系统设置</el-dropdown-item>
                  <el-dropdown-item command="quit" divided>
                    <i class="iconfont icon-tuichu"></i> 退出</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script >
import jQuery from 'jquery'
import Waves from 'node-waves/dist/waves.min.js'

export default {
  mounted () {
    var that = this
    window.onresize = function () {
      // 窗口缩放调整nav的subResult的值
      if (!that.timer) {
        that.timer = true
        setTimeout(function () {
          that.getNavWidthOverVal()
          that.timer = false
        }, 500)
      }
    }

    // Waves.attach('.flat-box')
    Waves.displayEffect()
  },
  data () {
    return {
      // 存放navItems超出被隐藏部分的宽度值
      subResult: 0,
      // 存放缩放页面的计时器
      timer: false,
      navNavItemsShow: false,
      navBtnIcons: ['icon-gengduo', 'icon-fanhui1'],
      // 标记当前aside菜单的打开状态
      menuStatus: 'open',
      navItems: [{
        id: '1',
        title: 'nav1',
        icon: 'iconfont icon-msnui-org-struct'
      },
      {
        id: '2',
        title: 'nav2',
        icon: 'iconfont icon-msnui-org-struct'
      },
      {
        id: '3',
        title: 'nav3',
        icon: 'iconfont icon-msnui-org-struct'
      },
      {
        id: '4',
        title: 'nav4',
        icon: 'iconfont icon-msnui-org-struct'
      }]
    }
  },
  methods: {
    // 判断各种浏览器，找到正确的方法
    launchFullscreen (element) {
      if (element.requestFullscreen) {
        element.requestFullscreen()
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen()
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen()
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen()
      }
    },
    handleCommand (command) {
      // 菜单下拉框根据command值处理时间
      switch (command) {
        case 'quit':
          this.$router.push('/')
          break
        case 'fullScreen':
          this.launchFullscreen(document.documentElement)
          break
        case 'personalInfo':
          this.$router.push('/userInfo')
          break
      }
    },
    toggleNavStatus () {
      // 切换nav导航栏的显示状态
      this.navNavItemsShow = !this.navNavItemsShow
      this.getNavWidthOverVal()
    },
    getNavWidthOverVal () {
      // 获取当前nav超出父容器的宽度
      var navItems = jQuery('#nav-items')
      var navContainer = jQuery('#nav-container')
      var navPrev = jQuery('#nav-prev')
      var navNext = jQuery('#nav-next')
      setTimeout(() => {
        this.subResult = navItems.width() - navContainer.width()
        // 判断是否需要出现滑动条按钮
        if (this.subResult > 0) {
          navNext.css('display', 'block')
        } else {
          navPrev.css('display', 'none')
          navNext.css('display', 'none')
          navItems.css('left', 0)
        }
      }, 1)
    },
    slideLeft () {
      // 往左滑动nav
      var navPrev = jQuery('#nav-prev')
      var navNext = jQuery('#nav-next')
      var navItems = jQuery('#nav-items')
      var speed = 10
      var curLeft = parseInt(navItems.css('left'))
      if (curLeft + speed > 0) {
        navPrev.css('display', 'none')
      }
      navItems.css('left', curLeft + speed + 'px')
      navNext.css('display', 'block')
    },
    slideRight () {
      // 往右滑动nav
      var navPrev = jQuery('#nav-prev')
      var navNext = jQuery('#nav-next')
      var navItems = jQuery('#nav-items')
      var speed = 10
      var curLeft = parseInt(navItems.css('left'))
      if (Math.abs(curLeft - speed) > this.subResult) {
        navNext.css('display', 'none')
      }
      navItems.css('left', curLeft - speed + 'px')
      navPrev.css('display', 'block')
    },
    toggleMenuStatus () {
      // 改变侧边菜单的打开状态
      var that = this
      var menuBtn = jQuery('#menu-btn')
      menuBtn.stop().animate({
      }, '0.5s', function () {
        var transformVal = that.menuStatus === 'open' ? 'rotate(180deg)' : 'rotate(0deg)'
        menuBtn.css({
          'transform': transformVal,
          'transition': 'all 0.5s'
        })
        switch (that.menuStatus) {
          case 'open': that.menuStatus = 'close'; break
          case 'close': that.menuStatus = 'open'; break
        }
      })
      // 触发父组件home的方法
      that.$emit('toggleMenuStatus', that.menuStatus)
    }
  }
}
</script>

<style lang="less" scoped>
@white: #fdfefd;
@logoWidthEqAslide: 20%;
@commonHeight: 0.6rem;
@transitionBoxPadding: 0 0.05rem;
@transitionBoxMargin: 0 0.05rem;
@logoTitleWidth: 75%;
// 设置为圆形
#square(@d) {
  width: @d;
  height: @d;
  border-radius: 50%;
}
#l-h-height(@h) {
  line-height: @h;
  height: @h;
}
.header {
  #l-h-height(@commonHeight);
  .logo {
    #l-h-height(@commonHeight);
    width: @logoWidthEqAslide;
    font-size: 0.16rem;
    float: left;
    .menu-btn {
      transform: rotate(0deg);
      cursor: pointer;
      #square(.3rem);
      float: left;
      position: relative;
      top: 50%;
      margin-top: -0.15rem;
      left: 0.1rem;
      line-height: 0.3rem;
    }
    .logo-title {
      float: right;
      width: @logoTitleWidth;
      text-align: center;
    }
    &::after {
      content: ' ';
      display: block;
      clear: both;
      zoom: 1;
    }
  }
  .header-right {
    width: 100% - @logoWidthEqAslide;
    float: right;
    .navs-left {
      width: 75%;
      z-index: 2000;
      float: left;
      overflow: hidden;
      position: relative;
      .nav-btn {
        #l-h-height(@commonHeight);
        width: @commonHeight;
        cursor: pointer;
        position: relative;
        // left: 0;
        z-index: 99999;

      }
      .nav-prev{
        position: absolute;
        left: @commonHeight;
        top:0;
        z-index: 2000;
        display: none;
      }
      .nav-next{
        position: absolute;
        right: 0;
        top: 0;
        z-index: 2000;
        display: none;
      }
      .nav-container{
        position: absolute;
        transition: all .5s;
        #l-h-height(@commonHeight);
        width: 80%;
        left: @commonHeight;
        top:0;
        overflow: hidden;
        .nav-items {
          position: absolute;
          transition: all .5s;
          left: 0;
          top: 0;
          white-space: nowrap;
          overflow:auto;
          .transition-box {
          // position: absolute;
          #l-h-height(@commonHeight);
          border-radius: 4px;
          text-align: center;
          display: inline-block;
          padding: @transitionBoxPadding;
          margin: @transitionBoxMargin;

          &:first-of-type {
            margin-left: 0px;
          }
        
          }
        }
      }
    }
    .toolbar {
      width: 25%;
      float: right;

      .left {
        float: left;
      }
      .home {
        width: 20%;
        cursor: pointer;
      }
      .settings {
        width: 20%;
        cursor: pointer;
        text-align: center;
      }
      .account {
        width: 60%;
        cursor: pointer;
        .picture {
          cursor: default;
          background: url('../assets/imgs/account.jpeg') no-repeat center center;
          background-size: cover;
          float: left;
          #l-h-height(@commonHeight - .1);
          width: @commonHeight - 0.1;
          margin-top: 0.05rem;
          position: relative;
          top: 50%;
          border-radius: 50%;
          background-color: white;
        }
        .user-name {
          text-align: left;
          text-indent: 1em;
          overflow: hidden;
        }
      }
    }
  }
}
</style>

