<!--
  大儿子-主页面
-->
<template>
  <div>
    <!-- 轮播图 -->
    <swiper :options="swiperOption">
      <swiper-slide>
        <img class="w-100"
             src="../assets/images/b9905b35bb0afa9050d9ddbe04d82d29.jpeg">
      </swiper-slide>
      <swiper-slide>
        <img class="w-100"
             src="../assets/images/ddc8c8922cbb694dfb73c86bb03fce22.jpeg">
      </swiper-slide>
      <swiper-slide>
        <img class="w-100"
             src="../assets/images/210794580bb9303653804bb7b482f2a4.jpeg">
      </swiper-slide>

      <!-- 控制点 -->
      <div class="swiper-pagination pagination-home text-right px-3 pb-2"
           slot="pagination"></div>
    </swiper>

    <!-- 图标导航 -->
    <div class="nav-icon bg-white mt-3 text-center pt-3 text-grey">
      <div class="d-flex flex-wrap ">
        <div class="nav-item mb-3" v-for="n in 10" :key="n">
          <i class="sprite sprite-news"></i>
          <div class="py-2">爆料站</div>
        </div>
      </div>

      <div class="bg-light py-2 fs-sm d-flex ai-center jc-center">
        <i class="sprite sprite-arrow mr-1"></i>
        <span>收起</span>
      </div>
    </div>

    <!-- 新闻资讯 -->
    <list-card icon="Menu" title="新闻资讯" :categories="newsCats">
      <template #items="{ category }">  <!--父组件拿到子组件的category-->
        <router-link class="py-2 fs-lg d-flex"
                     tag="div"
                     :to="`/articles/${ news._id }`"
                     v-for="(news, i) in category.newsList" :key="i">
          <span class="text-info">[{{ news.categoryName }}]</span>
          <span class="px-2">|</span>
          <span class="flex-1 text-dark-1 text-ellipsis pr-2">{{ news.title }}</span>
          <span class="text-grey-1 fs-sm">{{ news.createdAt | date }}</span>
        </router-link>
      </template>
    </list-card>

    <!-- 英雄列表 -->
    <list-card icon="iconfontcrown" title="英雄列表" :categories="heroCats">
      <template #items="{ category }">  <!--父组件拿到子组件的category-->
        <div class="d-flex flex-wrap" style="margin: 0 -0.5rem;">
          <router-link
               tag="div"
               :to="`/heroes/${hero._id}`"
               class="p-2 text-center"
               style="width: 20%;"
               v-for="(hero, i) in category.heroList" :key="i">
            <img :src="hero.avatar" alt="" class="w-100">
            <div> {{ hero.name }}</div>
          </router-link>
        </div>

      </template>
    </list-card>
  </div>
</template>

<script>
import ListCard from '../components/ListCard'
import dayjs from 'dayjs'

export default {
  name: 'Home',
  components: {
    ListCard
  },
  filters: {
    date (val) {
      return dayjs(val).format('MM/DD')
    }
  },
  data () {
    return {
      swiperOption: {
        pagination: {
          el: ".pagination-home"
        }
      },
      newsCats: [],
      heroCats: []
    }
  },
  created () {
    this.fetchNewsCats()
    this.fetchHeroCats()
  },
  methods: {
    async  fetchNewsCats() {
      const res = await this.$http.get('news/list')
      this.newsCats = res.data
    },
    async  fetchHeroCats() {
      const res = await this.$http.get('heroes/list')
      this.heroCats = res.data
    }
  }
}
</script>

<style lang="scss">
  @import '../assets/scss/variables';

  /* 轮播图 */
  .pagination-home {
    .swiper-pagination-bullet {
      opacity: 1;
      border-radius: 0.1538rem; // 2px
      background: map_get($colors, 'white');

      &.swiper-pagination-bullet-active {
        background: map_get($colors, 'info');
      }
    }
  }

  /* 图标导航 */
  .nav-icon {
    border-top: 1px solid $border-color;
    border-bottom: 1px solid $border-color;

    .nav-item {
      width: 25%;
      border-right: 1px solid $border-color;

      &:nth-child(4n) {
        border-right: none;  // 除4余0的item不加边框（每排第四个）
      }
    }
  }
</style>
