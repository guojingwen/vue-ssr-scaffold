<template>
	<div>
		<wp-header title="标题"></wp-header>
		<wp-scroll>
			<div class="not-found-wrap">
				<h2 class="err-title">404</h2>
				<p>页面不存在</p>
			</div>
		</wp-scroll>
	</div>
</template>

<style lang="scss" type="text/scss">
	@import "../scss/common/_theme";
	.not-found-wrap {
		text-align: center;
		font-size: 16px;
		color: $color-gray-dark;
		width: 100%;
		height: 100%;
		background-color: $color-white-bg;
		padding-top: 80px;
		box-sizing: border-box;

		.err-title {
			font-size: 32px;
			width: 100%;
			text-align: center;
			margin: 0;
			padding: 50px 20px 20px;
			box-sizing: border-box;
		}
	}
</style>
