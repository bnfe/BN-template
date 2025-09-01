<template>
  <div class="table">
    <el-table
      ref="table"
      class="table__content"
      :style="`width:${options.width}`"
      :stripe="options.stripe"
      :border="options.border"
      :fit="options.fit"
      :size="options.size"
      :row-style="options.rowStyle"
      :highlight-current-row="options.highlightCurrentRow"
      :data="list"
      :lazy="options.lazy"
      :height="options.height"
      :load="loadGetData"
      row-key="id"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      @row-click="clickRow"
      @row-dblclick="dblclickRow"
      @row-contextmenu="contextmenu"
      @header-click="headClick"
      @header-contextmenu="headcontextmenu"
      @current-change="rowChange"
      @selection-change="handleSelectionChange"
    >
      <!-- 表格展开行 -->
      <el-table-column v-if="options.type === 'expand'" type="expand">
        <template slot-scope="scope">
          <expand-dom
            :index-row="scope.$index"
            :row="scope.row"
            :render="options.render"
          ></expand-dom>
        </template>
      </el-table-column>
      <!-- 表格开启多选 -->
      <el-table-column
        v-else-if="options.type === 'selection'"
        type="selection"
        style="width: 55px"
      ></el-table-column>
      <template v-for="(column, index) in columns">
        <el-table-column
          v-if="column.render || column.slot"
          :key="index"
          :prop="column.prop"
          :show-overflow-tooltip="column.tooltip && column.tooltip === 'close' ? false : true"
          :align="options.align || 'center'"
          :header-align="'center'"
          :width="column.width"
          :min-width="column.minWidth"
          :fixed="column.fixed"
          :label="column.label"
        >
          <template slot-scope="scope">
            <!-- 有render渲染render -->
            <expand-table
              v-if="column.render"
              :column="column"
              :index-row="scope.$index"
              :row="scope.row"
              :render="column.render"
            />
            <!-- 有slot渲染slot -->
            <slot
              v-if="column.slot"
              :name="column.slot"
              :column="column"
              :index-row="scope.$index"
              :row="scope.row"
            ></slot>
            <!-- 无render直接显示数据 -->
          </template>
        </el-table-column>
        <el-table-column
          v-else
          :key="index + 100"
          :prop="column.prop"
          :show-overflow-tooltip="true"
          :align="options.align || 'center'"
          :header-align="'center'"
          :width="column.width"
          :min-width="column.minWidth"
          :fixed="column.fixed"
          :label="column.label"
        >
          <template slot-scope="scope">
            <span v-if="column.index">
              {{ (pagination.current - 1) * pagination.pageSize + scope.$index + 1 }}
            </span>
            <span v-else>
              {{
                typeof scope.row[column.prop] === "number" || scope.row[column.prop]
                  ? scope.row[column.prop]
                  : "-"
              }}
            </span>
          </template>
        </el-table-column>
      </template>
      <el-empty v-if="!list.length" slot="empty" :image-size="200"></el-empty>
    </el-table>
    <el-pagination
      v-if="showPagination"
      class="table__page"
      style="margin-top: 20px; text-align: center"
      :page-size="pagination.pageSize"
      :current-page="pagination.current"
      :total="pagination.total"
      :layout="paginationConfig.layout"
      :background="paginationConfig.background"
      :page-sizes="paginationConfig.pageSizes"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>
<script>
export default {
  name: "CommonTable",
  components: {
    expandTable: {
      functional: true, // 函数式组件
      props: {
        row: Object,
        index: Number,
        indexRow: Number,
        column: {
          type: Object,
          default: null
        },
        render: Function
      },
      render: (h, ctx) => {
        const { row, index, indexRow: $index, column = {} } = ctx.props;
        const params = { row, index, $index, column };
        return ctx.props.render(h, params);
      }
    },
    // type=expand时渲染column点击展开
    expandDom: {
      functional: true, // 函数式组件
      props: {
        row: Object,
        indexRow: Number,
        render: Function
      },
      render: (h, ctx) => {
        const { row, indexRow } = ctx.props;
        const params = {
          row,
          indexRow
        };
        return ctx.props.render(h, params);
      }
    }
  },
  props: {
    showPagination: {
      type: Boolean,
      default: true
    },
    // 数据列表
    list: {
      type: Array,
      default: () => []
    },
    // 需要展示的列 === prop：列数据对应的属性，label：列名，align：对齐方式，width：列宽
    columns: {
      type: Array,
      default: () => []
    },
    // 分页参数
    pagination: {
      type: Object,
      default: () => ({
        pageSize: 20, // 每页数量
        current: 1, // 当前页
        total: 0 // 总数
      })
    },
    paginationConfig: {
      type: Object,
      default: () => ({
        layout: "total,sizes,prev,pager,next,jumper",
        // background: true, // 是否为分页按钮添加背景色
        pageSizes: [10, 20, 50] // page-sizes
      })
    },
    // opt
    options: {
      type: Object,
      default() {
        return {
          fit: true, // 列宽是否自动撑开
          // size: 'small',
          border: false, // 是否需要边框
          highlightCurrentRow: false, // 是否高亮当前行
          align: "center",
          type: "",
          // rowStyle: { height: "200px" }, // 表头样式

          render() {}
          // showSummary: false
        };
      }
    }
  },
  data() {
    return {};
  },
  methods: {
    loadGetData(row, treeNode, resolve) {
      // 懒加载事件数据
    },
    handleSizeChange(size) {
      this.$emit("changePageSize", size);
    },
    handleCurrentChange(current) {
      this.$nextTick(() => {
        this.$refs.table.bodyWrapper.scrollTop = 0;
      });
      this.$emit("changePage", current);
    },
    clickRow(row, column, event) {
      // 单击行事件
      let data = {
        row: row,
        column: column,
        event: event
      };
      this.$emit("clickRow", data);
    },
    dblclickRow(row, column, event) {
      // 双击行事件
      let data = {
        row: row,
        column: column,
        event: event
      };
      this.$emit("dblclickRow", data);
    },
    contextmenu(row, column, event) {
      // 右键行事件-没去掉页面默认的
      let data = {
        row: row,
        column: column,
        event: event
      };
      this.$emit("contextmenu", data);
    },
    headClick(column, event) {
      // 头部列点击事件
      let data = {
        column: column,
        event: event
      };
      this.$emit("headClick", data);
    },
    headcontextmenu(column, event) {
      // 头部列右键点击事件
      let data = {
        column: column,
        event: event
      };
      this.$emit("headcontextmenu", data);
    },
    rowChange(currentRow, oldCurrentRow) {
      // 当前行发生改变时的事件
      let data = {
        currentRow: currentRow,
        oldCurrentRow: oldCurrentRow
      };
      this.$emit("rowChange", data);
    },
    handleSelectionChange(val) {
      // 多行选中
      this.$emit("handleSelectionChange", val);
    }
  }
};
</script>
