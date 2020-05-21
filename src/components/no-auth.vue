<template>
	<div class="no-auth-wrap">
		<wp-img-tag src="~@/img/icon/page-not-allowed.png"/>
		<p>您没有权限访问该页面</p>
	</div>
</template>

<style type="text/scss" lang="scss">
	@import "../scss/common/_theme";
	.no-auth-wrap {
		text-align: center;
		font-size: 16px;
		color: $color-gray-dark;
		width: 100%;
		height: 100%;
		background-color: $color-white-bg;
		padding-top: 80px;
		box-sizing: border-box;

		img {
			width: 116px;
			height: 116px;
			display: block;
			margin: 0 auto;
			margin-bottom: 20px;
		}
	}
</style>
