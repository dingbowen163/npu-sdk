<template>
  <div class="view table">
    <el-table
      :data="tableData"
      border
      stripe
      style="width: 100%"
      class="sdk-table"
      header-align="left"
      header-cell-class-name="sdk-table-header"
      cell-class-name="sdk-table-cell"
    >
      <template slot="empty">
        <div class="no-table-data">
          <div class="no-data">暂无数据</div>
        </div>
      </template>
      <el-table-column
        v-for="(item, index) in headerData"
        :key="index"
        :prop="item.value"
        :label="item.label"
        :width="item.width"
        class-name="sdk-table-column-cell"
        :min-width="150"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <div v-if="item.type === 'raw_html'" v-html="scope.row[item.value] || '—'"></div>
          <div v-else-if="item.type === 'operate_btn' && scope.row[item.value]">
            <el-popover placement="bottom" v-model="scope.row.visible" @show="showPopover">
              <el-date-picker
                v-model="date"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
              <div class="popoverBtns">
                <el-button type="text" @click="scope.row.visible = false">取消</el-button>
                <el-button
                  type="primary"
                  @click="handleClick({command: 'delayDate', row: scope.row, date})"
                >确定</el-button>
              </div>
              <el-button slot="reference">{{scope.row[item.value]}}</el-button>
            </el-popover>
          </div>
          <div v-else-if="item.type === 'new_date'">
            <span class="data-con">{{scope.row[item.value] || '—'}}</span>
            <el-popover placement="bottom" v-model="scope.row.visible" @show="showPopover">
              <el-date-picker
                v-model="date"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
              <div class="popoverBtns">
                <el-button type="text" @click="scope.row.visible = false">取消</el-button>
                <el-button
                  type="primary"
                  @click="handleClick({command: 'delayDate', row: scope.row, date})"
                >确定</el-button>
              </div>
              <el-button slot="reference">修改</el-button>
            </el-popover>
          </div>
          <div v-else-if="item.type === 'raw_html_operate'">
            <el-button-group v-if="scope.row.showBtns">
              <el-button type="success" plain>通过</el-button>
              <el-button type="danger" plain>拒绝</el-button>
            </el-button-group>
          </div>
          <span v-else>{{ scope.row[item.value] !== null ? scope.row[item.value] : '—' }}</span>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="setting-pagination-panel"
      layout="prev, pager, next"
      :total="pageInfo.total"
      :current-page="pageInfo.pageNum"
      :page-size="pageInfo.pageSize"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  props: {
    metas: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      tableData: this.metas.tableData,
      headerData: this.metas.headerData,
      pageInfo: this.metas.pageInfo,
      date: ""
    };
  },
  watch: {
    metas: {
      handler(v) {
        this.tableData = v.tableData;
        this.headerData = v.headerData;
      },
      deep: true
    }
  },
  methods: {
    handleClick(data) {
      this.$emit("settingsClick", data);
    },
    showPopover() {
      this.date = "";
    }
  },
  components: {},
  mounted() {
    console.log(this.metas);
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/table.scss";
</style>
