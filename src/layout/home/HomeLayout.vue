<template>
  <el-container>
    <el-header>
      <el-row :gutter="20">
        <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
        <el-col :span="16">
          <el-menu
            :default-active="activeIndex2"
            mode="horizontal"
            @select="handleSelect"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            router="true"
          >
            <el-menu-item index="1">首页</el-menu-item>
            <el-menu-item index="2">联系作者</el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
    </el-header>

    <el-main>
      <router-view :key="key" />
    </el-main>

    <el-footer style="text-align: center; font-size: 12px">
      版权所有 JEmbrace
    </el-footer>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1",
    };
  },
  computed: {
    key() {
      return this.$route.path;
    },
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style scoped>
</style>
