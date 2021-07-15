<template>
  <div class="logo">
<!--    <img src="~@/assets/images/logo.png" alt="">-->
    <h2 v-show="!collapsed" class="title">哎哟有房管理系统</h2>
  </div>
</template>

<script>
export default {
  name: "index",
  props: {
    collapsed: {
      type: Boolean
    }
  }
}
</script>

<style lang="scss" scoped>
.logo {
  display: flex;
  align-items: center;
  padding-left: 24px;
  height: $header-height;
  line-height: 64px;
  overflow: hidden;
  white-space: nowrap;
  background: #001529;

  h2{
      font-size: 16px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #FFFFFF;
  }

  img {
    height: 32px;
    margin-right: 8px;
  }

  .title {
    color: white;
    margin-bottom: 0;
  }
}
</style>
