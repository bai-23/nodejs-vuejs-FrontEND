<template>
  <div class="card bg-white p-3 mt-3 ">
    <!-- 头部 -->
    <div class="card-header d-flex ai-center" :class="{'border-bottom': !plain, 'pb-3': !plain}">
      <i class="iconfont" :class="`icon-${icon}`"></i>
      <div class="fs-xl flex-1 px-2"><strong>{{ title }}</strong></div>
      <i class="iconfont icon-menu" v-if="!plain"></i>
    </div>
    <!-- 内容主体 -->
    <div class="card-body pt-3">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Card",
    props: {
      title: { type: String, required: true },
      icon: { type: String, required: true },
      plain: { type: Boolean, default: false }
    },
  }
</script>

<style lang="scss">
  @import '../assets/scss/_variables.scss';

.card {
  border-bottom: 1px solid $border-color;
}
</style>
