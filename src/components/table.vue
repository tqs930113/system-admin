<template>
  <div class="table">
        <el-table
        v-loading="vLoading"
        :default-sort = "defaultSort"
        :border = "border"
        :header-row-class-name="headerowClassName"
        :highlight-current-row="highlightCurrentRow"
        :ref="ref"
        :data="tableData"
        :tooltip-effect="tooltipEffect"
        :style="style"
        @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            width="40">
          </el-table-column>
          <el-table-column
            type="index"
            label="序号"
            width="50">
          </el-table-column>
           <el-table-column
          prop="username"
          label="用户名"
          show-overflow-tooltip>
          </el-table-column>
           <el-table-column
          prop="nickname"
          label="用户昵称"
          width="150"
          show-overflow-tooltip>
          </el-table-column>
          <el-table-column
           width="100"
          prop="isAdmin"
          label="是否管理员"
          show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="创建日期"
            width="105"
            sortable
            >
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态"
            width="50">
          </el-table-column>
          <el-table-column 
            width="180"
            label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="text"
                @click="handleEdit(scope.$index, scope.row)">修改</el-button>
              <el-button
                size="mini"
                type="text"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              <el-button
                size="mini"
                type="text"
                @click="setOrUnsetAdmin(scope.$index, scope.row)">{{ scope.row.isAdmin === '是' ? '取消管理员' : '设为管理员'}}</el-button>
            </template>   
          </el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
  props: {
    columnItems: {
      // 表格列名称
      type: Object
    },
    tableData: {
      // 表格数据
      type: Object
    },
    vLoading: {
      // 是否有加载动画
      type: Boolean,
      default: true
    },
    defaultSort: {
      // 默认排序
      type: Object,
      default: {prop: 'date', order: 'descending'}
    },
    border: {
      // 是否有边框
      type: Boolean,
      default: true
    },
    headerowClassName: {
      // 表头的样式名称
      type: String
    },
    highlightCurrentRow: {
      // 是否高亮选中行
      type: Boolean,
      default: true
    },
    ref: {
      // 表格名称
      type: String
    },
    tooltipEffect: {
      type: String,
      default: 'dark'
    },
    style: {
      // 表格内联样式
      type: String,
      default: 'width: 100%'
    }

  },
  data () {
    return {
      // 表单选中项纪录
      multipleSelection: []
    }
  },
  methods: {
    handleEvent (type, index, row) {
      var eventObj = {}
      eventObj.type = type
      eventObj.index = index
      eventObj.row = row
      this.$emit('tableHandleEvent', eventObj)
    },
    handleSelectionChange (val) {
      // 触发父组件的handleSelectionChange函数以更新multipleSelction数组的值
      this.$emit('handleSelectionChange', val)
    }
  }
}
</script>
<style lang="less" scoped>

</style>
