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
      <template v-for="item in columnItems" >
        <el-table-column v-if="item.label !== '操作'" :sortable="item.sortable" :show-overflow-tooltip="item.show-overflow-tooltip" :type="item.type" :prop="item.prop" :width="item.width" :label="item.label" :key="item.id">
        </el-table-column>
        <el-table-column v-else :label="item.label" :width="item.width" :key="item.id">
            <template slot-scope="scope" v-for="operation in item.operatins">
              <el-button v-if="operation.custom" :size="operation.size" :type="operation.btnType" @click="handleEvent(operation.type, scope.$index, scope.row)"  :key="operation.key">{{operation.custom.value}}</el-button>
              <el-button v-else :size="operation.size" :type="operation.btnType" @click="handleEvent(operation.type, scope.$index, scope.row)"  :key="operation.key">{{operation.btnName}}</el-button>
            </template>
        </el-table-column>
      </template>
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
