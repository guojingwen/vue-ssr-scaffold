<template>
	<button
		class="wp-button"
		:class="['wp-button--' + type, { 'is-disabled': disabled, 'is-plain': plain}]"
		@click="$emit('click', $event)"
		:disabled="disabled">
		<label class="wp-button-text">
			<slot></slot>
		</label>
	</button>
</template>

<script>
/**
 * wp-button
 *
 * @param {string} [type=default] - 显示类型，接受 default, primary
 * @param {boolean} [disabled=false] - 禁用
 * @param {boolean} [plain=false] - 幽灵按钮(空白背景)
 *
 * @example
 * <wp-button class="it" type="primary" @click="$emit('del')">删除</wp-button>
 */
export default {
  name: 'wp-button',
  props: {
    disabled: Boolean,
    plain: Boolean,
    type: {
      type: String,
      default: 'default',
      validator (value) {
        return [
          'default',
          'primary'
        ].indexOf(value) > -1;
      }
    },
  }
}
</script>

<style type="text/scss" lang="scss">
	@import '../scss/common/_theme.scss';

	.wp-button {
		appearance: none;
		border-radius: 4px;
		border: 0;
		box-sizing: border-box;
		color: inherit;
		font-size: 14px;
		height: 40px;
		outline: 0;
		overflow: hidden;
		text-align: center;
		position: relative;
		display: inline-block;
		padding: 0 12px;
		&::after {
			background-color: #000;
			content: " ";
			opacity: 0;
			position: absolute;
			top: 0;
			right: 0;
			bottom:0;
			left: 0;
		}

		&:not(.is-disabled):active::after {
			opacity: .4;
		}

		&.is-disabled {
			opacity: .6;
		}

		@at-root {
			#{&}--default {
				color: #656b79;
				background-color: $color-white;
				box-shadow: 0 0 1px #b8bbbf;
				&.is-plain {
					border: 1px solid #5a5a5a;
					background-color: transparent;
					box-shadow: none;
					color: #5a5a5a;
				}
			}

			#{&}--primary {
				color: $color-white;
				background-color: $color-blue-cr-lighter;
				&.is-plain {
					border: 1px solid $color-blue-cr-lighter;
					background-color: transparent;
					color: $color-blue-cr-lighter;
				}
			}
		}
	}
</style>
