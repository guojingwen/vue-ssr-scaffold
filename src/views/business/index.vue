<template>
	<div class="page-business">
		<wp-header title="通用业务"></wp-header>
		<wp-scroll>
			<br>
			<wp-item hasRight @click="$router.push(item.path)" v-for="(item, index) in list" :key="index">{{item.name}}</wp-item>
			<br>
			<ul class="tips">
				<li>
					<span class="title">1. 瀑布流效果：</span>
					<span>跳转到"瀑布流"页面，上拉查看翻页效果</span>
					<span>跳转到A页面，上拉及点击tabbar查看翻页效果</span>
				</li>

				<li class="item">
					<span class="title">2. 返回上一页高度及页面切换动画</span>
					<span>A页面--->滚动一定高度--->跳转B页面--->滚动一定高度--->跳转到C页面--->返回到B页面--->返回到页面</span>
				</li>

				<li class="item">
					<span class="title">3. 测试goTop组件</span>
					<span>当滚动到超过手机屏幕2.5屏高度且往上滚动时显示，测试流程同上</span>
				</li>

				<li class="item">
					<span class="title">4. 关于后退从缓存里取数据的实现</span>
					<span>将数据缓存在在vuex的store里面，只是前进的时候是清空当前页面的state再重新获取数据</span>
					<span>先上车跑一下测试用例（A、B页面是动态路由，C与A、B是不同路由，但共用同一个组件）</span>
					<span>&nbsp;&nbsp;1: A--->B--->浏览器刷新页面--->后退到A (刷新浏览器页面后退可以正常加载数据)</span>
					<span>&nbsp;&nbsp;2: A--->C--->B--->C--->A  (动态路由，共用组件路由，数据缓存都正常，遇到登录页面无影响)</span>
					<span>说明: 原理实现详见entry-client.js，<br></span>
				</li>
				<li class="item">
					<span class="title">你可能会有一些疑问</span>
					<span class="q">Q: 前进后退如何判定？</span>
					<span class="a">
						A: 页面跳转的时候通过history.replaceState给当前页面打一个标记ts，然后在跳转，返回的时候，触发页面的声明周期，
						在生命周期里通过url表示知道是后退过了的，再次通过history.replaceState移除ts标记,这样不管你是点击导航栏返回还是浏览器返回再或者android物理键返回都可以识别处理
					</span>
					<span class="q">Q: 动态路由，共用组件路由跳来跳去，数据缓存是如何实现的？</span>
					<span class="a">A: 前面说了url有个ts标志，ts就是跳转离开当前页面时间的毫秒值，将页面数据存在store里面，通过key值就是tsq取到，这样数据就不会乱掉了</span>
					<span class="q">Q: 如果某些数据后退的时候也要更新咋办？</span>
					<span class="a">A: 新需要缓存的数据都是存在vuex的modules里面通过key值(路由meta.store)取到的，把不需要缓存的数据存储在vuex state里面即可</span>
				</li>
			</ul>
		</wp-scroll>
	</div>
</template>

<script>
    export default {
      data () {
        return {
          list: [
            {name: '瀑布流', path: '/flow'},
            {name: 'A动态路由tabflow/lisi', path: '/tabflow/lisi'},
            {name: 'B动态路由tabflow/zhangsan', path: '/tabflow/zhangsan'},
            {name: 'C与A、B共用组件/shareComp', path: '/shareComp'},
          ]
        }
      }
    }
</script>

<style type="text/scss" lang="scss">
.page-business {
	.tips {
		padding: 12px;
		color: #9F9F9F;
		font-size: 12px;
		li {
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			margin-bottom: 10px;
		}
	}
	.item {
		padding-bottom: 10px;
	}
	.title {
		color: #444444;
		font-weight: bold;
		margin-bottom: 5px;
	}
	.q {
		color: red;
	}
	.a {
		color: #444444;
	}
}
</style>
