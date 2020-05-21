<template>
	<div class="wp-field" :class="[{'is-textarea': type === 'textarea'}]">
		<div class="wp-field-title">
			{{label}}
		</div>
		<div class="wp-field-value">
			<textarea
				v-if="type === 'textarea'"
				class="wp-field-core"
				@change="$emit('change', currentValue)"
				ref="input"
				:placeholder="placeholder"
				:rows="rows"
				:disabled="disabled"
				:readonly="readonly"
				v-model="currentValue"
				@input="currentValue = $event.target.value"
				v-autosize></textarea>
			<input
				v-else
				class="wp-field-core"
				@change="$emit('change', currentValue)"
				ref="input"
				:placeholder="placeholder"
				:number="type === 'number'"
				:type="type"
				:disabled="disabled"
				:readonly="readonly"
				:value="currentValue"
				:maxlength="maxlength"
				@input="active=true; currentValue = $event.target.value"
				@focus="active=true"
				@blur="active=false">
		</div>
		<div class="wp-field-clear" v-if="!disableClear" @click="handleClear" @touchstart="handleClear">
			<i class="wp-icon-clear"
			   :style="{visibility: (currentValue && active) ? 'visible' : 'hidden'}"></i>
		</div>
	</div>
</template>

<script>
/**
 * wp-field
 * @desc 文本输入框
 * @module components/field
 *
 * @param {string} [type=text] - field 类型，接受 text，number, textarea 等
 * @param {string} [label] - 标签
 * @param {string} [rows] - textarea 的 rows
 * @param {string} [placeholder] - placeholder
 * @param {string} [disabled] - disabled
 * @param {string} [readonly] - readonly
 * @param {Function} [callback] 用于数据校验
 *
 * @example
 * <wp-field label="联系地址" placeholder="请输入您的联系地址" type="text" v-model="data.address"></wp-field>
 */
export default {
  name: 'wp-field',
  props: {
    type: {
      type: String,
      default: 'text'
    },
    rows: String,
    label: String,
    placeholder: String,
    readonly: Boolean,
    disabled: Boolean,
    disableClear: Boolean,
    maxlength: Number,
    callback: Function,
    value: {}
  },
  data () {
    return {
      active: false,
      currentValue: typeof this.value === 'undefined' ? '' : this.value
    }
  },
  methods: {
    handleClear () {
      this.currentValue = ''
      this.$refs.input.focus()
    }
  },
  watch: {
    value (val) {
      let valu = val.slice(0, this.maxlength)
      if (this.callback) {
        this.currentValue = this.callback(valu)
      } else {
        this.currentValue = valu
      }
    },
    currentValue (val) {
      this.$emit('input', val)
    }
  }
}
</script>

<style lang="scss" type="text/scss">
	@import '../scss/common/theme';
	@import '../scss/common/mixins';

	.wp-field {
		padding: 10px;
		font-size: 14px;
		min-height:32px;
		background-color: $color-white;
		text-align: left;
		display: flex;
		align-items: center;
		@include myBorders((B));
		@at-root {
			#{&}-title {
				width: 100px;
				color: $color-gray-font;
			}
			#{&}-value {
				flex: 1;
				display: flex;
			}
			#{&}-core {
				appearance: none;
				border-radius: 0;
				border: 0;
				flex: 1;
				outline: 0;
				line-height: 1.6;
				font-size: inherit;
				width: 100%;
				background-color: $color-white;
			}
			.wp-icon-clear {
				@include i-mixin-ico("#{$imgPath}send-post/delete.png", 14, 14);
			}
		}
	}
</style>
