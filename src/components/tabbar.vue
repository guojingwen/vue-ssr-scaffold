<template>
	<section class="wp-tabbar">
		<div class="wp-tabbar-item" :class="{'active': value === index}" v-for="item, index in list" @click="$emit('click', item, index)">
			<span>{{item.text}}</span>
		</div>
	</section>
</template>

<script>
export default {
  name: 'wp-tabbar',
  props: {
    list: Array,
    value: Number
  }
}
</script>

<style lang="scss" type="text/scss">
	@import '../scss/common/_theme.scss';
	@import '../scss/common/_mixins.scss';
	.wp-tabbar {
		display: flex;
		background-color: $color-white-bg;

		@at-root {
			#{&}-item {
				height: 40px;
				flex: 1;
				text-align: center;
				font-size: 14px;
				position: relative;
				color: $color-gray-font;
				@include flex-ver-hor-center();
				&.active:after {
					position: absolute;
					bottom: 0;
					left: 50%;
					margin-left: -8px;
					content: '';
					width: 16px;
					height: 2px;
					background-color: #3872f4;
				}
				&.active span {
					color: #3872f4;
				}
			}
		}
	}
</style>
