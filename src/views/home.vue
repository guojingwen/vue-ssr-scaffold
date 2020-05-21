<template>
	<div class="page-home">
		<wp-header title="首页"></wp-header>
		<br>
		<wp-item hasRight @click="$router.push('/components')">元素组件</wp-item>
		<wp-item hasRight @click="$router.push('/business')" class="mt20">通用业务</wp-item>
	</div>
</template>


<style lang="scss" type="text/scss">
.page-home {
	.mt20 {
		margin-top: 20px;
	}
}
</style>
