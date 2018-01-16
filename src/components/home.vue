<template>
  <div class="container">
    <v-header @toggleMenuStatus="toggleMenuStatus" class="top"></v-header>
    <div class="wrap">
      <v-aside id="aside" class="left open"></v-aside>
      <router-view id="view" class=" right content"></router-view>
    </div>
  </div>
</template>
<script>
import jQuery from 'jquery'
import vHeader from './header'
import vAside from './aside'
export default {
  name: 'home',
  methods: {
    toggleMenuStatus (val) {
      // val记录需要将Menu设置为什么状态
      var widthVal = (val === 'close' ? 0 : 20)
      var aside = jQuery('#aside')
      var view = jQuery('#view')
      aside.css({
        'width': widthVal + '%',
        'transition': 'all 0.5s'
      })
      view.css({
        'width': 100 - widthVal + '%',
        'transition': 'all 0.5s'
      })
    }
  },
  components: {
    vHeader,
    vAside
  }
}
</script>
<style lang="less" scoped>
@logoWidthEqAslide: 20%;
@topHeight: 0.6rem;
#l-h-height(@h) {
  line-height: @h;
  height: @h;
}
.container {
  width: 100%;
  overflow: scroll;
  height: 10px;
  .top {
    position: fixed;
    #l-h-height(@topHeight);
    width: 100%;
    overflow: scroll;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
    z-index: 2000;
  }
  .wrap {
    .left {
      position: fixed;
      top: @topHeight;
      left: 0;
      width: @logoWidthEqAslide;
      z-index: 1999;
      box-shadow: 1px 0px 4px rgba(0, 0, 0, 0.3);
    }
    .right {
      position: fixed;
      top: @topHeight;
      right: 0;
      width: 100% - @logoWidthEqAslide;
      height: 90%;
      overflow: scroll;
      z-index: 1888;
    }
  }
  .wrap::after {
    content: ' ';
    display: block;
    clear: both;
    zoom: 1;
  }
  &::after {
    content: ' ';
    display: block;
    clear: both;
    zoom: 1;
  }
}
</style>
