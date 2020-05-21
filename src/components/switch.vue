<template>
	<label class="wp-switch" :class="theme || ''">
		<input class="wp-switch-input" @change="$emit('change', currentValue)" type="checkbox" v-model="currentValue">
		<span class="wp-switch-core"></span>
	</label>
</template>

<script>
/**
 * wp-switch
 * @module components/switch
 * @desc 切换按钮
 * @param {boolean, number} [value] - 绑定值，支持双向绑定
 * @param {string} [theme] - 主题色 可选为 "small"
 *
 * @example
 * <wp-switch v-model="value"></wp-switch>
 */
export default {
  name: 'wp-switch',
  props: {
    value: [Boolean, Number],
    theme: {
      type: String,
      default: ''
    }
  },
  computed: {
    currentValue: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', typeof this.value === 'number' ? Number(val) : val)
      }
    }
  }
}
</script>

<style lang="scss" type="text/scss">
	@import '../scss/common/_theme.scss';
	.wp-switch {
		display: flex;
		align-items: center;
		position: relative;
		* {
			pointer-events: none;
		}
		@at-root {
			#{&}-core {
				display: inline-block;
				position: relative;
				height: 33px;
				width: 58px;
				border: 1px solid $color-gray-lighter;
				border-radius: 16px;
				box-sizing: border-box;
				background: $color-gray-lighter;
				&::after, &::before {
					content: " ";
					position: absolute;
					top: 0;
					left: 0;
					transition:transform .15s;
					border-radius: 15px;
					background-color: $color-white-bg;
				}

				&::after {
					height: 31px;
					width: 31px;
					box-shadow: 0 1px 3px rgba(0, 0, 0, .4);
				}

				&::before {
					height: 31px;
					width: 56px;
				}
			}

			#{&}-input {
				display: none;
				&:checked {
					+ .wp-switch-core {
						border-color: #4cda60;
						background-color: #4cda60;
						&::before {
							transform: scale(0);
						}
						&::after {
							transform: translateX(25px);
						}
					}
				}
			}
		}

		&.small {
			border-radius: 12px;
			.wp-switch-core {
				width: 44px;
				height: 26px;
				&::after {
					height: 24px;
					width: 24px;
				}

				&::before {
					height: 24px;
					width: 42px;
				}
			}
			.wp-switch-input {
				&:checked {
					+ .wp-switch-core {
						border-color: #3f86ff;
						background-color: #3f86ff;
						&::after {
							transform: translateX(18px);
						}
					}
				}
			}
		}

	}
</style>
