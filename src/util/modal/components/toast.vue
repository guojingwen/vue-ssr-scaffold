<template>
	<div class="wp-toast" v-if="visible" @click="close">
		<div class="toast-box" v-html="opts.content"></div>
	</div>
</template>

<script>
    export default {
        name: 'wp-toast',
        data () {
            return {
                visible: false,
                timer: null,
                opts: {
                    content: '',
                    duration: 1000,
                    callback: null,
				}
            }
        },
        methods: {
            open () {
                this.visible = true
                this.timer = setTimeout(() => {
                    if (this.visible) this.visible = false
					if (typeof this.opts.callback === 'function') {
                        this.opts.callback()
					}
                }, this.opts.duration)
            },
            close () {
                this.visible = false
				clearTimeout(this.timer)
            }
        }
    }
</script>

<style lang="scss" type="text/scss">
	@import "../../../scss/common/theme";
	@import "../../../scss/common/mixins";

	.wp-toast {
		@include mask(transparent, 101);
		@include flex-ver-hor-center();
		.toast-box {
			width: 50%;
			min-height: 50px;
			color: $color-gray-light;
			font-size: 15px;
			padding: 10px 5%;
			border-radius: 5px;
			@include flex-ver-hor-center();
			margin-bottom: 20%;
			background: rgba(0, 0, 0, .7);
			i {
				margin: 10px 0;
				@include i-mixin-style(44, 44);
			}
			.share-ico {
				@include i-back-ico("#{$imgPath}share-ok.png");
				&.false {
					@include i-back-ico("#{$imgPath}share-false.png");
				}
			}
		}
	}
</style>
