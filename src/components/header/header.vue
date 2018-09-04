<template>
	<div class="header">
		<div class="content_wrapper">
			<div class="avatar">
		    	<img :src="seller.avatar" width="64" height="64">
			</div>
			<div class="content">
		    	<div class="title">
		    		<span class="brand"></span>
		    		<span class="name">{{seller.name}}</span>
		    	</div>
		    	<div class="description">
		    		{{seller.description}}/{{seller.deliveryTime}}分钟送达
		    	</div>
		    	<div class="support" v-if="seller.supports">
		    		<iconClassMap class="icon" :iconType="seller.supports[0].type"></iconClassMap>
		    		<span class="text">{{seller.supports[0].description}}</span>
		    	</div>
		    </div>
		    <div class="support-count" v-if="seller.supports" @click="showDetail">
		    	<span class="count">{{seller.supports.length}}个</span>
		    	<i class="icon-keyboard_arrow_right"></i>
		    </div>
		</div>
		<div class="bulletin_wrapper" @click="showDetail">
			<span class="bulletin-title"></span>
			<span class="bulletin-text">{{seller.bulletin}}</span>
			<i class="icon-keyboard_arrow_right"></i>
		</div>
		<div class="background">
			<img :src="seller.avatar" width="100%" height="100%">
		</div>
		<div class="detail" v-show="detailShow">
			<div class="detail_wrapper clearfix">
				<div class="detail_main">
					<h1 class="name">{{seller.name}}</h1>
					<div class="star-wrapper">
						<star :size="48" :score="seller.score"></star>
					</div>
					<div class="title">
						<div class="line"></div>
						<div class="text">优惠信息</div>
						<div class="line"></div>
					</div>
					<ul class="supports">
						<li class="support_item" style="margin-bottom:12px; padding: 0 12px;" v-for="(supportItem, index) in seller.supports" :key="index">
							<iconClassMap class="icon" :iconType="supportItem.type"></iconClassMap>
							<span class="text" style="line-height: 16px; font-size=12px;">{{supportItem.description}}</span>
						</li>
					</ul>
					<div class="title">
						<div class="line"></div>
						<div class="text">商家公告</div>
						<div class="line"></div>
					</div>
					<div class="bulletin" style="width:80%;margin: 0 auto;">
						<p class="content" style="padding: 0 12px; line-height: 24px; font-size: 12px;">{{seller.bulletin}}</p>
					</div>
				</div>
			</div>
			<div class="detail-close" @click="hideDetail">
				<i class="icon-close"></i>
			</div>
		</div>
	</div>
</template>

<script>
import iconClassMap from '@/components/iconClassMap/iconClassMap'
import star from '@/components/star/star'

export default {
  name: 'header',
  data () {
    return {
    	detailShow: false
    };
  },
  props: {
  	seller: Object
  },
  methods: {
  	showDetail() {
  		this.detailShow = true;
  	},
  	hideDetail() {
  		this.detailShow = false;
  	}
  },
  components: {
  	iconClassMap,
  	star
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">

@import '../../common/stylus/mixin.styl'

.header
	position: relative
	background: rgba(7, 17, 27, 0.5)
	color: #fff
	overflow: hidden
	.content_wrapper
		position: relative
		padding: 24px 12px 18px 24px
		font-size: 0
		.avatar
			display: inline-block
			vertical-align: top
			img
				border-radius: 2px
		.content
			display: inline-block
			margin-left: 16px
			font-size: 14px
			.title
				margin: 2px 0 8px 0
				.brand
					width: 30px
					height: 18px
					display: inline-block
					vertical-align: top
					background-size: 30px 18px
					background-repeat: no-repeat
				.name
					margin-left: 6px
					font-size: 16px
					line-height: 18px
					font-weight: hold
			.description
				line-height: 12px
				margin-bottom: 10px
				font-size: 12px
			.support
				.icon
					display: inline-block
				.text
					font-size: 10px
					line-height: 12px
					vertical-align: top
		.support-count
			position: absolute
			right: 12px
			bottom: 18px
			padding: 0 8px
			height: 24px
			line-height: 24px
			text-align: center
			background: rgba(0, 0, 0, 0.2)
			border-radius: 14px
			.count
				font-size: 10px
				vertical-align: top
			.icon-keyboard_arrow_right
				font-size: 10px
				margin-left: 2px
				line-height: 24px
	.bulletin_wrapper
		position: relative
		background: rgba(7, 17, 27, 0.2)
		height: 28px
		line-height: 28px
		padding: 0 22px 0 12px
		overflow: hidden
		white-space: nowrap
		text-overflow: ellipsis
		.bullrtin-title
			display: inline-block
			vertical-align: top
			width: 22px
			height: 12px
			margin-top: 8px
		.bulletin-text
			vertical-align: top
			font-size: 10px
			margin: 0 4px
		.icon-keyboard_arrow_right
			position: absolute
			font-size: 10px
			right: 12px
			top: 8px
	.background
		position: absolute
		top: 0
		left: 0
		width: 100%
		height: 100%
		z-index: -1
		filter: blur(10px)
	.detail
		position: fixed
		z-index: 100
		width: 100%
		height: 100%
		top: 0
		left: 0
		overflow: auto
		background: rgba(7, 17, 27, 0.8)
		backdrop-filter: blur(10px)
		.detail_wrapper
			width: 100%
			min-height: 100%
			.detail_main
				margin-top: 64px
				padding-bottom: 64px
				.name
					line-height: 16px
					text-align: center
					font-size: 16px
					font-weight: 700
				.star-wrapper
					margin-top: 18px
					text-align: center
					padding: 2px 0
				.title
					width: 80%
					display: flex
					margin: 28px auto 24px auto
				.line
					flex: 1
					position: relative
					top: -6px
					border-bottom: 1px solid rgba(255, 255, 255, 0.2)
				.text
					padding: 0 12px
					font-size: 14px
					font-weight: 700
			.supports
				margin: 0 auto
				width: 80%
				.support_item
					margin-bottom: 12px
					padding: 0 12px
					font-size: 0
					&:last-cjild
						margin-bottom: 0
				.icon
					width: 16px
					height: 16px
					margin-right: 16px
					background-repeat: no-repeat
				.text
					line-height: 16px
					font-size: 12px
		.bulletin
			width: 80%
			margin: 0 auto
			.content
				padding: 0 12px
				line-height: 24px
				font-size: 12px
		.detail-close
			position: relative
			width: 32px
			height: 32px
			margin: -64px auto 0 auto
			clear: both
			font-size: 32px
</style>