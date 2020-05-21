<template>
	<transition name="fadein-fadeout">
		<div class="wp-go-top" v-show="show" @click="toTop"></div>
	</transition>
</template>

<script>
import { backHandler } from '../util'

export default {
  name: 'wp-go-top',
  data () {
    return {
      show: false
    }
  },
  mounted () {
    this.maxHideHeight = screen.height * 2.5
    this.previousScrollTop = 0
    this.start = new Date().getTime()
    Bus.$on('scrollTo', opts => this.toTop(opts))
    Bus.$on('scroll', scrollTop => {
      let now = new Date().getTime()
      if (this.start + 100 > now) return // 性能优化
      this.start = now
      this.show = scrollTop > this.maxHideHeight && scrollTop < this.previousScrollTop
      this.previousScrollTop = scrollTop
    })
  },
  methods: {
    toTop (...args) {
      let animate = false, scrollY = 0

      if (args.length === 1) {
        if (typeof args[0] === 'number') {
          scrollY = args[0]
        }

        if (typeof args[0] === 'boolean') {
				    animate = args[0]
        }
      }

      if (args.length > 1) {
        scrollY = args[0]
        animate = args[1]
      }

      let pages = document.getElementById('app').querySelectorAll('.page'),
        page = pages[pages.length - 1]
      page && (this.view = page.querySelector('.wp-scroll-wrapper'))
      if (!animate) {
        this.view.scrollTop = scrollY
      } else {
        const interval = 40 // 肉眼分辨的最小时间间隔
        const speed = Math.max(this.view.scrollTop / 200 * interval, 1)
        const timer = setInterval(() => {
          this.view.scrollTop -= speed
          if (this.view.scrollTop <= scrollY) {
            clearInterval(timer)
          }
        }, interval)
      }
    }
  },
  watch: {
    '$route' (to, from) {
      if (!backHandler.isBack && (from.name === to.name)) {
        this.toTop()
      }
      if (from.name !== to.name) {
        this.show = false
      }
    }
  }
}
</script>

<style lang="scss" type="text/scss">
	@import "../scss/common/theme";
	@import "../scss/common/_mixins";

	$aniName: fadein-fadeout;
	.#{$aniName}-enter-active {
		transition: all .3s ease;
	}
	.#{$aniName}-leave-active {
		transition: all .15s cubic-bezier(1.0, 0.5, 0.8, 1.0);
	}
	.#{$aniName}-enter, .#{$aniName}-leave-active {
		opacity: 0;
	}

	.wp-go-top {
		position: fixed;
		bottom: 50px;
		right: 10px;
		z-index: $float-btn-z;
		margin-bottom: constant(safe-area-inset-bottom);
		margin-bottom: env(safe-area-inset-bottom);
		@include i-mixin-ico("#{$imgPath}icon-back-top.png", 70, 70);
	}
</style>
