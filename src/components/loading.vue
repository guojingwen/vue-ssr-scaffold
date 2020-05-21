<template>
	<div class="wp-loading">
		<span class="wp-loading-ani">
			<i></i><i></i><i></i><i></i><i></i>
		</span>
		<p class="wp-loading-text">{{loadText}}</p>
	</div>
</template>

<script>
export default {
  name: 'wp-loading',
  props: {
    loadText: {
      type: String,
      default: '努力加载中'
    }
  }
}
</script>

<style lang="scss" type="text/scss">
	@import "../scss/common/_mixins";
	@import "../scss/common/_theme";
	.wp-loading {
		min-height: 76px;
		width: 100%;
		overflow: hidden;
		@include flex-ver-hor-center();

		@keyframes rotateAni {
			from {
				transform: rotate(0);
			}

			to {
				transform: rotate(360deg);
			}
		}

		&-ani {
			width: 40px;
			height: 40px;
			margin-right: 10px;
			position: relative;
			i {
				position: absolute;
				left: 20px;
				display: block;
				width: 4px;
				height: 4px;
				border-radius: 4px;
				background-color: $color-gray-font;
				animation: rotateAni 1.6s ease infinite;
				transform-origin: 0 20px;
				@for $i from 1 through 5 {
					&:nth-last-of-type(#{$i}) {
						animation-delay: ($i - 1) * 0.16s;
					}
				}
			}
		}
	}
</style>
