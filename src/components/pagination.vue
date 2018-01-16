<template>
<!-- 组件调用字段
  <v-pagination 
  @refreshPageList="refreshPageList" 
  :page="page"
  :loading="true"//默认false
  >
  </v-pagination>
 -->
  <div class="pagination">
    <el-pagination 
    @size-change="handleSizeChange" 
    @current-change="handleCurrentChange" 
    :current-page="page.currentPage" 
    :page-sizes="page.pageSizeOptions" 
    :page-size="page.pageSize" 
    layout="total, sizes, prev, pager, next, jumper" 
    :total="page.total">
    </el-pagination>
  </div>
</template>
<script>
import systemConfig from '../assets/js/systemConfig'
export default {
  props: {
    page: {
      type: Object,
      default: function () {
        return systemConfig.page
      }
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
    }
  },
  methods: {
    test () {
    },
    handleSizeChange (val) {
      // 当切换pagesize大小时触发，请求数据并重新渲染
      this.page.pageSize = val
      this.handleChange()
    },
    handleCurrentChange (val) {
       // 当切换当前页索引时大小时触发，请求数据并重新渲染
      this.page.currentPage = val
      this.handleChange()
    },
    handleChange () {
      var that = this
      var obj = {
        params: {},
        loading: that.loading
      }
      if (this.loading) {
        obj.loading = true
      }
      obj.params.url = `${systemConfig.requestUrlConfig.userManagerRequestUrlConfig.list}?pageNumber=${this.page.currentPage}&pageSize=${this.page.pageSize}`
      // var errMsg = '刷新用户列表失败'
      // this.ajaxMethod(that, params, errMsg)
      that.$emit('refreshPageList', obj)
    }
  }
}
</script>
<style lang="less" scoped>
.pagination {
  margin-top: 20px;
  text-align: right;
}
</style>


