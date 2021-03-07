<template>
  <div class="page-article" v-if="model">
    <div class="d-flex py-3 px-2 border-bottom">
      <div class="iconfont icon-back text-blue" @click="$router.go(-1)"></div>
      <strong class="flex-1 text-blue pl-2">
        {{ model.title }}
      </strong>
      <div class="text-grey">
        2019-09-19
      </div>
    </div>
    <div v-html="model.body" class="px-3 body fs-lg"></div>

    <div class="px-3 border-top py-3">
      <div class="d-flex ai-center">
        <i class="iconfont icon-Menu"></i>
        <strong class="text-blue fs-lg ml-2">相关资讯</strong>
      </div>
      <div class="pt-2 fs-lg">
        <router-link tag="div"
                     class="py-1"
                     :to="`/articles/${item._id}`"
                     v-for="item in model.related"
                     :key="item._id">
          {{ item.title }}
        </router-link>
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    name: "Article",
    data() {
      return {
        model: null
      }
    },
    props: {
      id: { required: true },
    },
    watch: {
      id: 'fetch',
      // id() {
      //   this.fetch()
      // }
    },
    methods: {
      async fetch () {
        const res = await this.$http.get(`articles/${this.id}`)
        this.model = res.data
      }
    },
    created () {
      this.fetch()
    },
  }
</script>

<style lang="scss">
  .page-article {
    .icon-back {
      font-size: 1.6923rem;
    }
    .body {
      img {
        max-width: 100%;
        height: auto;
      }
      iframe {
        width: 100%;
        height: auto;
      }
    }
  }
</style>
