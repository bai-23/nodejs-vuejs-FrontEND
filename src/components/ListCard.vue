<template>
  <card :icon="icon" :title="title">
    <!-- 子导航 -->
    <div class="nav jc-between">
      <div class="nav-item"
           :class="{ active: active === i }"
           v-for="(category,i) in categories" :key="i"
           @click="$refs.list.swiper.slideTo(i)"> <!-- 滚动到索引值(内容监听标题点击) -->
        <div class="nav-link">{{ category.name }}</div>
      </div>
    </div>
    <!-- 资讯内容 -->
    <div class="pt-3">
      <swiper ref="list"
              :options="{ autoHeight: true }"
              @slide-change="() => active = $refs.list.swiper.realIndex"> <!-- 获取当前正确的索引值（标题监听内容滚动） -->
        <swiper-slide v-for="(category,i) in categories" :key="i">
          <slot name="items" :category="category"></slot> <!--将category传给父组件Home-->
        </swiper-slide>
      </swiper>
    </div>
  </card>
</template>

<script>
  import Card from "./Card";

  export default {
    name: "ListCard",
    components: {
      Card
    },
    props: {
      icon: { type: String, required:true },
      title: { type: String, required:true },
      categories: { type: Array, required:true },
    },
    data() {
      return {
        active: 0,
      }
    }
  }
</script>

<style>

</style>
