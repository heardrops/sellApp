<template>
  <div class="goods">
    <div class="menu_wrapper" ref="menuWrapper">
      <ul>
        <li class="menu_item" v-for="(item, index) in goods" :key="index" @click="selectMenu(index, $event)" :class="{'current':currentIndex===index}">
          <span class="text border-1px">
            <iconClassMap v-show="item.type > 0" :iconType="item.type"></iconClassMap>
            {{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods_wrapper" ref="foodWrapper">
      <ul style="list-style:none;">
        <li class="foods_list foods_list_hook" v-for="(item, index) in goods" :key="index">
          <h1 class="title">{{item.name}}</h1>
          <ul style="list-style:none;">
            <li class="foods_item border-1px" v-for="(food, index) in item.foods" :key="index" @click="selectFood(food, $event)">
              <div class="icon">
                <img :src="food.icon" width="57" height="57">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span>
                  <span>好评率{{food.rating ? food.rating : 0}}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span>
                  <span class="old">￥{{food.oldPrice}}</span>
                </div>
                <div class="cartcontrol_wrapper">
                  <cartcontrol :foodItem="food"></cartcontrol>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopcart :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice" :selectFoods="selectFoods"></shopcart>
    <foodinfo :food="selectedFood" ref="foodinfo"></foodinfo>
  </div>
</template>

<script>
import iconClassMap from '@/components/iconClassMap/iconClassMap'
import BScroll from 'better-scroll'
import cartcontrol from '@/components/cartcontrol/cartcontrol'
import shopcart from '@/components/shopcart/shopcart'
import foodinfo from '@/components/foodinfo/foodinfo'

const ERR_OK = 0;

export default {
  name: 'goods',
  data () {
    return {
      goods: [],
      listHeight: [],//存放每一个list的高度
      scrollY: 0,//页面滚动距离
      selectedFood: {}
    };
  },
  props: {
  	seller: {
  		type: Object
  	}
  },
  created() {
    this.$http.get('/api/goods').then((response) => {
      response = response.body;
      if(response.errno == ERR_OK) {
        this.goods = response.data;
        this.$nextTick(() => {
          this._initScroll();
          this._calculateHeight();
        });
      }
    });
  },
  components: {
    iconClassMap,
    cartcontrol,
    shopcart,
    foodinfo
  },
  methods: {
    _initScroll() {//页面滑动
      this.menuScroll = new BScroll(this.$refs.menuWrapper, {
        click: true
      });
      this.foodScroll = new BScroll(this.$refs.foodWrapper, {
        click: true,
        probeType: 3
      });
      this.foodScroll.on("scroll", (pos) => {
        this.scrollY = Math.abs(Math.round(pos.y));//将位置四舍五入后取绝对值
      });
    },
    _calculateHeight() {
      let foodList = this.$refs.foodWrapper.getElementsByClassName('foods_list_hook');
      let height = 0;
      this.listHeight.push(height);
      for(let i = 0; i < foodList.length; i++) {
        let item = foodList[i];
        height += item.clientHeight;
        this.listHeight.push(height);
      }
    },
    selectMenu(index, event) {//点击左侧menu, 影响右侧foods，event就是事件对象
      if(!event._constructed) {
        return;
      }
      let foodList = this.$refs.foodWrapper.getElementsByClassName('foods_list_hook');
      let foodli = foodList[index];//点击menu后， 对应的foodlist[index]
      this.foodScroll.scrollToElement(foodli, 300);//300ms滚动到对应的foodlist位置
    },
    selectFood(food, event) {
      if(!event._constructed) {
        return;
      }
      this.selectedFood = food;
      this.$refs.foodinfo.initShow();//获取foodinfo组件的show方法
    }
  },
  computed: {
    currentIndex() {//当前list的index，对应menu-item的index
      for(let i = 0; i < this.listHeight.length; i++) {
        let currenHeight = this.listHeight[i];
        let nextHeight = this.listHeight[i+1];
        if(!nextHeight || (this.scrollY >= currenHeight && this.scrollY < nextHeight)) {
          return i;
        }
      }
      return 0;
    },
    selectFoods() {//已选中foods
      let foods = [];//存放选中foods的数组
      this.goods.forEach((item) => {
        item.foods.forEach((food) => {//找到所有选择foods
          if(food.count) {
            foods.push(food);
          }
        });
      });
      return foods;
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixin.styl'

.goods
  display: flex
  position: absolute
  top: 174px
  bottom: 48px
  width: 100%
  overflow: hidden
  .menu_wrapper
    flex: 0 0 80px
    width: 80px
    background: #f3f5f7
    margin-left: -40px
    .menu_item
      display: table
      height: 54px
      width: 56px
      padding: 0 12px
      line-height: 14px
      margin: 0 auto
      &.current
        margin-top: -1px
        z-index: 10
        background: #fff
        .text
          border-none()
      .icon
        margin-right: 2px
      .text
        display: table-cell
        vertical-align: middle
        font-size: 12px
        border-1px(rgba(7, 17, 27, 0.1))
  .foods_wrapper
    flex: 1
    margin-left: -40px
    .title
      padding-left: 14px
      height: 26px
      line-height: 26px
      border-left: 2px solid #d9dde1
      font-size: 12px
      color: rgb(147, 153, 159)
      background: #f3f5f7
    .foods_item
      display: flex
      margin: 18px 18px 0 -20px
      padding-bottom: 18px
      border-1px(rgba(7, 17, 27, 0.1))
      &:last-child
        border-none()
      .icon
        flex: 0 0 57px
        margin: 10px
      .content
        flex: 1
        .name
          font-size: 14px
          line-height: 14px
          height: 14px
          margin: 2px 0 8px 0
          color: rgb(7, 17, 27)
        .desc, .extra
          line-height: 10px
          font-size: 10px
          color: rgb(147, 153, 159)
        .desc
          line-height: 12px
          margin-bottom: 8px
        .extra
          .count
            margin-right: 12px
        .price
          line-height: 24px
          font-weight: 700
          .now, .old
            line-height: 24px
            margin-right: 0px
          .now
            font-size: 14px
            font-weight: 700
            color: rgb(240, 20, 20)
          .old
            font-size: 10px
            color: rgb(147, 153, 159)
            text-decoration: line-through
        .cartcontrol_wrapper
          position: absolute
          right: 0
          bottom: 12px
</style>