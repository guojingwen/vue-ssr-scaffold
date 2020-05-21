<template>
	<div class="page-components-button">
		<wp-header title="button"></wp-header>
		<br>
		<wp-button type="primary">按钮</wp-button>
		<br>
		<wp-button type="primary" plain>幽灵按钮</wp-button>
		<br>
		<wp-button @click="alert">事件</wp-button>
		<br>
		<wp-button disabled >disabled</wp-button>

		<br>
		<p class="hint">自定义</p>
		<div class="bottom">
			<wp-button class="it" type="default" >取消</wp-button>
			<wp-button class="it" type="primary" >确定</wp-button>
		</div>
	</div>
</template>

<script>
export default {
  methods: {
    alert () {
      console.log('点击了按钮')
    }
  }
}
</script>

<style type="text/scss" lang="scss">
	@import '../../scss/common/_theme.scss';
	@import '../../scss/common/_mixins.scss';

	.page-components-button {
		.bottom {
			display: flex;
			align-items: center;
			justify-content: space-around;
			padding: 12px;
			text-align: center;
			@include myBorders((T), $color-gray-border, #fff);
			@include iphone-x-footer();
			.it {
				width: 45%;
			}
		}
		.hint {
			color: #aaa;
			font-size: 13px;
		}
	}
</style>
