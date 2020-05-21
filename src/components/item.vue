<template>
	<div class="wp-item" :class="{'has-right': hasRight}" @click="$emit('click')">
		<slot name="left">
			<i class="wp-item-icon" :class="iconClass" v-if="iconClass"></i>
		</slot>
		<div class="wp-item-content">
			<slot></slot>
		</div>
		<slot name="right">
			<i class="wp-item-right" v-if="hasRight"></i>
		</slot>
	</div>
</template>

<script>
export default {
  name: 'wp-item',
  props: {
    hasRight: Boolean,
    iconClass: String,
  }
}
</script>

<style type="text/scss" lang="scss">
	@import '../scss/common/_theme.scss';
	@import '../scss/common/_mixins.scss';

	.wp-item {
		@include flex-ver-hor-center();
		box-sizing: border-box;
		padding: 10px 12px;
		&:nth-of-type(1) {
			@include myBorders((B, T))
		}
		&:not(:nth-of-type(1)) {
			@include myBorders((B))
		}
		&.has-right:active {
			background-color: $color-gray-cr-light-tint;
		}
		@at-root {
			#{&}-icon {
				width: 15px;
				height: 15px;
				background-repeat: no-repeat;
				background-size: contain;
				background-position: center;

				+ .wp-item-content {
					padding-left: 10px;
				}
			}
			#{&}-content {
				font-size: 15px;
				flex: 1;
				color: $color-gray-dark;
				overflow: hidden;
				display: flex;
				align-items: center;
				justify-content: space-between;
			}
			#{&}-right {
				@include i-mixin-ico("#{$imgPath}go-right.png", 9, 17, contain);
			}
		}
	}
</style>
