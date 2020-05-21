<template>
	<div class="wp-scroll">
		<div class="wp-scroll-wrapper" ref="scroller" @scroll="scrollHandler" v-infinite-scroll="loadMore" :infinite-scroll-listen-for-event="infiniteScrollListenForEvent" :infinite-scroll-distance="distance">
			<slot></slot>
			<wp-loading :loadText="loadText" v-show="loading" />
			<div class="no-more-data" v-show="loadMore && !loading && loadAllText" :class="loadAllClass">{{loadAllText}}</div>
		</div>
	</div>
</template>

<script>
/**
 * v-infinite-scroll	http://mint-ui.github.io/docs/#/zh-cn2/infinite-scroll
 * scroll event 监听滚动返回 scrollTop
 */
export default {
  name: 'wp-scroll',
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    loadText: String,
    noInfiniteScroll: {
      type: Boolean,
      default: false
    },
    loadAllText: {
      type: String,
      default: '一不小心就到底啦'
    },
    loadAllClass: String,
    loadMore: Function,
    infiniteScrollListenForEvent: Function,
    distance: {
      type: Number,
      default: 30
    },
  },
  methods: {
    scrollHandler () {
      if (!this.$refs.scroller) return
      Bus.$emit('scroll', this.$refs.scroller.scrollTop)
      if (this.$listeners.scroll) {
        this.$emit('scroll', this.$refs.scroller.scrollTop)
      }
    }
  },
}
</script>

<style type="text/scss" lang="scss">
@import '~@/scss/common/_theme.scss';
	.wp-scroll {
		overflow: hidden;
		flex: 1;
		display: flex;
        flex-direction: column;
        background-color: $color-gray-bg;
        -webkit-overflow-scrolling: touch;
		@at-root {
			#{&}-wrapper {
				flex: 1;
				overflow: scroll;
			}
		}
		.no-more-data {
			color: #9F9F9F;
			text-align: center;
			line-height: 32px;
			font-size: 12px;
			margin: 16px 0 12px 0;
			.hight-light {
				color: $color-blue-cr-lighter;
			}
		}
	}
</style>
