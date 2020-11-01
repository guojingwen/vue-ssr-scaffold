<template>
	<div class="page-components-checkbox">
		<wp-header title="checkbox"></wp-header>
		<br>
		<div class="container">
<!--			<wp-checkbox data-test="val" v-model="isChoose" />-->
			<wp-checkbox v-model="isChoose" />
			<p class="hint">状态: {{isChoose}}</p>
		</div>
	</div>
</template>

<script>
export default {
  data () {
    return {
      isChoose: true
    }
  },
}
</script>

<style type="text/scss" lang="scss">
	.page-components-checkbox .container {
		display: flex;
		align-items: center;
		background-color: white;
		padding: 10px;
		.hint {
			color: #aaa;
			font-size: 13px;
		}
	}
</style>
