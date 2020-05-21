<template>
	<div class="page-components-header">
		<wp-header title="header"></wp-header>
		<br>
		<wp-header :isSearch="true" iconType="mail" :redDot="7" path="/"/>
		<br>
		<wp-header backText="返回" text="消息" color="red" path="/"/>
		<br>
		<wp-header title="warmplace" :menus="menus" @callback="go"/>
		<br>
		<wp-header title="warmplace" :menus="menus" @callback="go">
			<span class="navbar-text" slot="left">自定义</span>
			<span slot="right">自定义</span>
		</wp-header>
	</div>
</template>

<script>
export default {
  data () {
    return {
      menus: [{iconType: 'search'}, {iconType: 'refresh'}],
    }
  },
  methods: {
    go (index) {
      console.log(index ? '刷新' : '搜索')
    }
  }
}
</script>
