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
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <div v-if="item.type === 'raw_html'" v-html="scope.row[item.value] || '—'"></div>
          <span
            v-else-if="item.type === 'link'"
            class="link-cell"
            @click="handleClick({command: 'gotoLink', row: scope.row})"
          >{{ scope.row[item.value] !== null ? scope.row[item.value] : '—' }}</span>
          <div v-else-if="item.type === 'menu'">
            <span v-for="(btn, i) in scope.row.menu" :key="i">
              <el-popover
                :ref="`popover-${scope.$index}`"
                placement="bottom"
                @show="showPopover"
                trigger="click"
                v-if="btn.type === 'changeDate'"
              >
                <el-date-picker v-model="date" :placeholder="btn.placeholder" value-format="yyyy-MM-dd"></el-date-picker>
                <div class="popoverBtns">
                  <el-button type="text" @click="scope._self.$refs[`popover-${scope.$index}`][0].doClose()">取消</el-button>
                  <el-button
                    type="primary"
                    @click="handleClick({command: btn.command, row: scope.row, date, btn})"
                  >确定</el-button>
                </div>
                <el-link slot="reference" :title="btn.btnTitle">{{btn.title}}</el-link>
              </el-popover>

              <el-link
                :type="btn.buttonType"
                @click="handleClick({command: btn.command, row: scope.row})"
                v-if="btn.type !== 'changeDate'"
              >{{btn.title}}</el-link>
            </span>
            <span v-if="!scope.row.menu.length">—</span>
          </div>
           <span
            v-else-if="item.type === 'clickable'"
            class="link-cell"
            @click="handleClick({command: item.command, row: scope.row})"
          >{{ scope.row[item.value] !== null ? scope.row[item.value] : '—' }}</span>
          <span v-else>{{ scope.row[item.value] !== null ? scope.row[item.value] : '—' }}</span>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="setting-pagination-panel"
      layout="prev, pager, next"
      :total="pageInfo.total"
      :current-page="pageInfo.pageindex"
      :page-size="pageInfo.pagesize"
      @current-change="currentPageChange"
    ></el-pagination>
  </div>
</template>

<script>
import { cloneDeep } from "lodash";

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
  methods: {
    handleClick(data) {
      this.$emit("settingsClick", data);
    },
    showPopover() {
      this.date = "";
    },
    currentPageChange(page) {
      this.$emit("currentChange", page);
    }
  },
  components: {},
  mounted() {
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/table.scss";
</style>
