<template>
	<div class="wp-indicator" v-show="visible">
		<i class="loading"></i>
	</div>
</template>

<script>
export default {
	name: 'wp-indicator',
	data () {
	    return {
            visible: false
		}
	}
}
</script>

<style type="text/scss" lang="scss">
	@import "../../../scss/common/theme";
	@import "../../../scss/common/mixins";

	.wp-indicator {
		@include mask(rgba(0, 0, 0, 0.3), 101);
		.loading {
			@include abs-left-top-center(50px, 50px);
			display: inline-block;
			vertical-align: middle;
			@include i-back-ico("#{$imgPath}send-post/loading_large_animation@2x.png");
			animation: loading 1.4s linear 0s normal none infinite;
		}
	}

	@-webkit-keyframes loading {
		from {
			-webkit-transform: rotate(0deg)
		}
		to {
			-webkit-transform: rotate(360deg)
		}
	}

	@-moz-keyframes loading {
		from {
			-moz-transform: rotate(0deg)
		}
		to {
			-moz-transform: rotate(360deg)
		}
	}

	@-ms-keyframes loading {
		from {
			-ms-transform: rotate(0deg)
		}
		to {
			-ms-transform: rotate(360deg)
		}
	}

	@-o-keyframes loading {
		from {
			-o-transform: rotate(0deg)
		}
		to {
			-o-transform: rotate(360deg)
		}
	}
</style>
