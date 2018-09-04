<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab">
      <div class="tab_item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab_item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab_item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>

    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script>
import header from '@/components/header/header'

const ERR_OK = 0;

export default {
  name: 'App',
  components: {
    'v-header': header
  },
  data() {
    return {
      seller: {}
    };
  },
  created() {
    this.$http.get('/api/seller').then((response) => {
      response = response.body;
      if(response.errno === ERR_OK) {
        this.seller = response.data;
        //console.log(this.seller);
      }
    });
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
#app
  .tab
    display: flex
    positive: relative
    width: 100%
    height: 40px
    line-height: 40px
    &:after
      content: ''
      display: block
      positive: absolute
      left: 0
      bottom: 0
      width: 0
      border-top: 1px solid rgba(7, 17, 27, 0.1)
    .tab_item
        flex: 1
        text-align: center
        & > a
          display: block
          font-size: 14px
          color: rgb(77, 85, 93)
          &.active
            color: rgb(240, 20, 20)
</style>
