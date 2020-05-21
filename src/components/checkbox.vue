<template>
	<span class="wp-checkbox" @click.stop="currentValue = !currentValue">
		<input type="checkbox" class="wp-checkbox-input" v-model="currentValue">
		<span class="wp-checkbox-core"></span>
	</span>
</template>

<script>
/**
 * wp-checkbox
 * @example
 * <wp-checkbox v-model="item.chose" />
 */
export default {
  name: 'wp-checkbox',
  props: {
    value: Boolean
  },
  data () {
    return {
      currentValue: this.value
	  }
  },
  watch: {
    value (val) {
      this.currentValue = val
    },
    currentValue (val) {
      this.$emit('input', val)
    }
  }
}
</script>

<style type="text/scss" lang="scss">
	@import '../scss/common/_theme.scss';
	@import '../scss/common/_mixins.scss';

	.wp-checkbox {
		min-width: 36px;
		@include flex-ver-hor-center();
		$selecter: &;
		@at-root {
			#{$selecter}-input {
				display: none;
				&:checked {
					+ #{$selecter}-core {
						background-color: #26a2ff;
						border-color: #26a2ff;

						&::after {
							border-color: $color-white;
							transform: rotate(45deg) scale(1);
						}
					}
				}
			}

			#{$selecter}-core {
				display: inline-block;
				background-color: $color-white;
				border-radius: 100%;
				border: 1px solid #ccc;
				position: relative;
				width: 20px;
				height: 20px;
				vertical-align: middle;
				&::after {
					border: 2px solid transparent;
					border-left: 0;
					border-top: 0;
					content: " ";
					position: absolute;
					top: 4px;
					right: 7px;
					width: 4px;
					height: 8px;
					transform: rotate(45deg) scale(0);
					transition: transform .2s;
				}
			}
		}
	}
</style>
