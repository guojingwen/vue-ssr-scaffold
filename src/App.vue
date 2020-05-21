<template>
	<div id="app">
		<transition :name="animation">
			<router-view class="page" :class="{'fix-ios10': isIosAndLt10}" v-if="isRouteReload"></router-view>
		</transition>
		<wp-go-top></wp-go-top>
	</div>
</template>

<script>
import {backHandler} from './util'

// 修复ios10safari样式问题 （暂时没找到好方法）
let userAgent, isIOS, isIosAndLt10 = false
if (process.env.VUE_ENV === 'server') {
  userAgent = global.context.req.headers['user-agent']
} else {
  userAgent = navigator.userAgent
}
isIOS = !!userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
if (isIOS) {
  let ver = userAgent.match(/OS (\d+)_(\d+)_?(\d+)?/);
  ver = parseInt(ver[1], 10);
  isIosAndLt10 = ver < 11
}

export default {
  name: 'app',
  data () {
    return {
      isRouteReload: true, // 通过该变量实现更新页面 主要用于 1、动态路由跳转（/other/1 跳转到 /other/2）  2、公用组件的路由跳转（/user/post 与 other/post/:userId 相互跳转））
      firstIn: true,
      backHandler,
      isIosAndLt10,
    }
  },
  mounted () {
    this.firstIn = false
    Bus.$on('toReload', this.toReload)
  },
  methods: {
    toReload () { // 刷新页面
      this.isRouteReload = false
      this.$nextTick(() => {
        this.isRouteReload = true
      })
    }
  },
  computed: {
    'animation' () {
      if (this.firstIn) return 'fade'
      return backHandler.isBack ? 'slide-right' : 'slide-left'
    }
  }
}
</script>

<style type="text/scss" lang="scss">
	#app {
		width: 100%;
		height: 100%;
		overflow: hidden;
		position: relative;
		margin: 0 auto;
		max-width: 768px;
	}
	.page {
		display: flex;
		flex-direction: column;
		position: absolute;
		height: 100%;
		width: 100%;
		transition: all .2s linear;
	}
	.fix-ios10 { // ios 11 以下系统
		display: -webkit-box;
	}
	.fade-enter-active, .fade-leave-active {
		transition: opacity .2s ease;
	}
	.fade-enter, .fade-leave-active {
		opacity: 0
	}

	.slide-left-enter, .slide-right-leave-active {
		opacity: 0;
		transform: translate(100%, 0);
	}
	.slide-left-leave-active, .slide-right-enter {
		opacity: 0;
		transform: translate(-100%, 0);
	}
</style>
