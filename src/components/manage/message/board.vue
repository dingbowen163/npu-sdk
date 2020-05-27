<template>
  <div class="content-view message-board">
    <header>
      <h2 class="header-title" v-if="roleId === 'user'">
        <i class="icon-font el-icon-s-comment"></i>
        <span>留言板</span>
      </h2>
      <h2 v-else>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">留言板</el-breadcrumb-item>
          <el-breadcrumb-item>详情</el-breadcrumb-item>
        </el-breadcrumb>
      </h2>
    </header>
  </div>
</template>

<script>
export default {
  data() {
    return {
      roleId: "user"
    };
  },
  methods: {},
  components: {},
  mounted() {}
};
</script>

<style lang="scss" scoped>
</style>
