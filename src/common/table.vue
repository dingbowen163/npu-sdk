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
        :min-width="136"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <div v-if="item.type === 'raw_html'" v-html="scope.row[item.value] || '—'"></div>
          <div v-else-if="item.type === 'el_tag'">
            <el-tag :type="scope.row.tagType">{{scope.row[item.value]}}</el-tag>
          </div>
          <div v-else-if="item.type === 'operate_btn' && scope.row[item.value]">
            <el-button
              @click="handleClick({command: 'delayDate', row: scope.row})"
            >{{scope.row[item.value]}}</el-button>
          </div>
          <span v-else>{{ scope.row[item.value] !== null ? scope.row[item.value] : '—' }}</span>
        </template>
      </el-table-column>
    </el-table>
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
      headerData: this.metas.headerData
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
    handleClick({ command, row }) {
      this.$emit("settingsClick", {command, row});
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
