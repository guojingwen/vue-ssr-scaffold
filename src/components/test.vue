<template>
	<div class="wr-link">
		<router-link to="/tabflow/lisi" active-class="wr-link-active">A(李四)</router-link>
		<router-link to="/tabflow/zhangsan" active-class="wr-link-active">
			B(张三)
		</router-link>
		<router-link to="/shareComp" active-class="wr-link-active">
			C(我)
		</router-link>
		<router-link to="/">首页</router-link>
	</div>
</template>

<script>
export default {
  name: 'wp-test',
}
</script>

<style lang="scss" type="text/scss">
	.wr-link {
		color: #9F9F9F;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
		font-size: 13px;
		padding: 6px;
		position: fixed;
		bottom: 180px;
		right: 10px;
		background-color: #ffffff;
		&-active {
			color: #3872f4;
		}
	}
</style>
