<!--
  爸爸-通用顶部导航栏组件
-->
<template>
  <div>
    <!-- 顶部导航条 -->
    <div class="topbar bg-black py-2 px-3 d-flex ai-center">
      <img src="../assets/logo.png" alt="" height="30">
      <div class="px-2 flex-1">
        <div class="text-white">王者荣耀</div>
        <div class="text-grey-1 fs-xxs">团队成就更多</div>
      </div>
      <button type="button" class="btn bg-primary">立即下载</button>
    </div>

    <div class="bg-primary pb-2 pt-3">
      <div class="nav nav-inverse pb-1 jc-around">
        <div class="nav-item active">
          <router-link class="nav-link" tag="div" to="/">首页</router-link>
        </div>
        <div class="nav-item">
          <router-link class="nav-link" tag="div" to="/">攻略中心</router-link>
        </div>
        <div class="nav-item">
          <router-link class="nav-link" tag="div" to="/">赛事中心</router-link>
        </div>
      </div>
    </div>

    <!-- 子路由 -->
    <router-view></router-view>

  </div>
</template>

<script>
  export default {
    name: "Main"
  }
</script>

<style lang="scss">
  .topbar {
    position: sticky;
    top: 0;
    z-index: 999;
  }
</style>
