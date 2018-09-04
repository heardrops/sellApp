<template>
  <div class="ratings" ref="ratingsContent">
    <div class="retings_content">
    	<div class="overview">
    		<div class="overview_left">
    			<h1 class="foodScore">{{seller.foodScore}}</h1>
    			<div class="title">综合评分</div>
    			<div class="rankRate">高于周边商家{{seller.rankRate}}%</div>
    		</div>
    		<div class="overview_right">
    			<div class="score_wrapper">
    				<span class="title">服务态度</span>
					<star :size="36" :score="seller.score"></star>
					<span class="score">{{seller.score}}</span>
    			</div>
    			<div class="delivery_wrapper">
    				<span class="title">送达时间</span>
    				<span class="deliveryTime">{{seller.deliveryTime}}分钟</span>
    			</div>
    		</div>
    	</div>
      <split></split>
      <ratingSelect :ratings="ratings" :desc="desc" @selRatings="filterRatings" :select-type="selectType" :only-content="onlyContent" @isContent="isContent"></ratingSelect>
    	<div class="ratings_wrapper">
    		<ul>
    			<li class="ratings_item" v-for="(ratingItem, index) in ratings" :key="index" v-show="needShowList(ratingItem.rateType, ratingItem.text)">
    				<div class="avatar">
    					<img :src="ratingItem.avatar" width="28" height="28">
    				</div>
    				<div class="content">
    					<div class="username">{{ratingItem.username}}</div>
    					<div class="star_wrapper">
    						<star :size="24" :score="ratingItem.score"></star>
                <span class="deliveryTime">
                  {{ratingItem.deliveryTime}}分钟送达
                </span>
    					</div>
              <p class="text">{{ratingItem.text}}</p>
              <div class="recommend_wrapper">
                <i class="icon-thumb_up"></i>
                <span class="text" v-for="(recommendItem, index) in ratingItem.recommend" :key="index">{{recommendItem}}</span>
              </div>
              <div class="rating_time">{{ratingItem.rateTime}}</div>
    				</div>
    			</li>
    		</ul>
    	</div>
    </div>
  </div>
</template>

<script>
import ratingSelect from '@/components/ratingSelect/ratingSeclect'
import star from '@/components/star/star'
import split from '@/components/split/split'
import BScroll from 'better-scroll'

const ERROR_OK = 0;
const ALL = 2;

export default {
  name: 'ratings',
  data () {
    return {
    	ratings: [],
      desc: {
        all: '全部',
        positive: '满意',
        negative: '不满意'
      },
      selectType: ALL,
      onlyContent: true
    };
  },
  props: {
  	seller: {
  		type: Object
  	}
  },
  components: {
  	star,
    split,
    ratingSelect
  },
  created() {
  	this.$http.get('/api/ratings').then((response) => {
  		response = response.body;
  		if(response.errno === ERROR_OK) {
  			this.ratings = response.data;

        this.$nextTick(() => {
          this._initScroll();
        });
  		}
  	});
  },
  methods: {
    _initScroll() {
      this.scroll = new BScroll(this.$refs.ratingsContent, {
        click: true
      });
    },
    filterRatings(type) {
      this.selectType = type;
      this.$nextTick(() => {
        this.scroll.refresh();
      });
    },
    isContent(bl) {
      this.onlyContent = bl;
      this.$nextTick(() => {
        this.scroll.refresh();
      });
    },
    needShowList(type, text) {
      if(this.onlyContent && !text) {
        return false;
      }
      if(this.selectType === ALL) {
        return true;
      } else {
        return this.selectType === type;
      }
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
.ratings
  position: fixed
  top: 174px
  left: 0
  bottom: 0
  width: 100%
  overflow: hidden
  .overview
    display: flex
    padding: 18px 
    .overview_left
      flex: 0 0 137px
      padding-bottom: 6px
      width: 137px
      text-align: center
      border-right: 1px solid rgba(7, 17, 27, 0.1)
      .foodScore
        font-size: 24px
        color: rgb(255, 153, 0)
        line-height: 28px
      .title
        font-size: 12px
        line-height: 12px
        color: rgb(7, 17, 27)
        margin-bottom: 8px
      .rankRate
        font-size: 10px
        line-height: 10px
        color: rgb(147, 153, 159)
    .overview_right
      flex: 1
      padding: 6px 0 0 24px
      font-size: 0
      .score_wrapper
        margin-bottom: 8px
        .title
          font-size: 12px
          display: inline-block
          line-height: 18px
        .star
          padding: 0 12px
          display: inline-block
          vertical-align: top
        .score
          font-size: 12px
          display: inline-block
          line-height: 18px
          color: rgb(255, 153, 0)
      .delivery_wrapper
        margin-bottom: 8px
        font-size: 0
        .title
          font-size: 12px
          line-height: 18px
          padding-right: 12px
        .deliveryTime
          font-size: 12px
          line-height: 18px
          color: rgb(147, 153, 159)
  .ratings_wrapper
    .ratings_item
      padding: 18px
      display: flex
      .avatar
        flex: 0 0 28px
        width: 28px
        margin-right: 12px
        img
          border-radius: 50%
    .content
      flex: 1
      position: relative
      .username
        padding-bottom: 8px
        font-size: 10px
        line-height: 12px
        color: rgb(7, 17, 27)
      .star_wrapper
        font-size: 0
        padding-bottom: 6px
        .star
          display: inline-block
          vertical-align: top
          margin-right: 6px
        .deliveryTime
          display:inline-block
          vertical-align: top
          font-size: 10px
          font-weight: 200
          line-height: 12px
          color: rgb(147, 153, 159)
      .text
        font-size: 12px
        line-height: 18px
        color: rgb(7, 17, 27)
        padding-bottom: 8px
      .recommend_wrapper
        width: 100%
        font-size: 0
        .icon-thumb_up
          display: inline-block
          font-size: 12px
          line-height: 16px
          color: rgb(0, 160, 220)
          margin: 0 8px 6px 0
        .text
          display: inline-block
          width: 70px
          box-sizing: border-box
          margin-right: 8px
          padding: 0 6px
          border: 1px solid rgba(7, 17, 27, 0.1)
          border-radius: 1px
          background: #fff
          text-align: center
          overflow: hidden
          text-overflow: ellipsis
          white-space: nowrap
          font-size: 9px
          line-height: 9px
          color: rgb(147, 153, 159)
      .rating_time
        position: absolute
        right: 0
        top: 0
        display: inline-block
        font-size: 10px
        font-weight: 200
        line-height: 12px
        color: rgb(147, 153, 159)
</style>