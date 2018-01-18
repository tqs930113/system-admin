<template>
  <div class="aside">
    <el-menu :default-active="routerPath" :unique-opened="true" router class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" background-color="#222d32" text-color="#fff" active-text-color="#06bd6b">
     <template v-for="item in items">
          <template v-if="item.hasOwnProperty('children')">
            <el-submenu :key="item.id" :index="item.index">
                <template slot="title">
                    <i :class="item.icon"></i>
                    <span>{{item.label}}</span>
                </template>
                <el-menu-item v-for="subItem in item.children" :key="subItem.index" :index="subItem.index">
                    {{subItem.label}}
                </el-menu-item>
            </el-submenu> 
          </template>
          <template v-else>
            <el-menu-item :key="item.id" :index="item.index">
                <i :class="item.icon"></i>
                <span slot="title">{{item.label}}</span>
            </el-menu-item>
          </template>
      </template>
    </el-menu>
  </div>
</template>
<script>
export default {
  data () {
    return {
      items: [
        {
          id: 1,
          label: '首页',
          index: 'index',
          icon: 'el-icon-tickets'
        },
        {
          id: 2,
          label: '投票管理',
          index: 'voteManager',
          icon: 'el-icon-document',
          children: [{
            id: 4,
            label: '投票管理1',
            index: 'voteManager',
            icon: 'el-icon-document'
          }]
        },
        {
          id: 3,
          label: '用户权限管理',
          index: 'userManager',
          icon: 'el-icon-menu'
        }
      ]
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    onClicked () {
      var val = '/about'
      this.$router.push(val)
    }
  },
  computed: {
    onRouted () {
      return this.$route.path.replace('/', '')
    },
    routerPath () {
      var arr = this.$route.path.split('/')
      return arr[1]
    }
  }
}
</script>
<style lang="less" scoped>
// 修改element插件样式
.el-menu {
  height: 100%;
  border-right-width: 0px;
}
.el-submenu .el-menu-item {
  padding: 0;
  min-width: 0;
}
.el-submenu,
.el-menu-item {
  text-align: left;
  text-indent: 0.5em;
}
.el-submenu{
  background-color:red !important;
}

.aside {
  position: absolute;
  overflow: auto;
  height: 100%;
  .left {
    position: relative;
    left: 0;
    top: 0;
    width: 90%;
    overflow: scroll;
    height: 100%;
  }
  .right {
    position: relative;
    right: 0;
    top: 0;
    width: 10%;
    min-width: 0.16rem;
    height: 100%;
    color: black;
    border-right: 1px solid #d8d8d8;
    border-left: 1px solid #d8d8d8;

    // .menu-btn {
    //   height: 0.2rem;
    //   position: absolute;
    //   top: 50%;
    //   margin-top: -0.1rem;
    //   cursor: pointer;
    // }
  }
}
</style>
