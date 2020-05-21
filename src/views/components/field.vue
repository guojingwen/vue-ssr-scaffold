<template>
	<div class="page-components-field">
		<wp-header title="field"></wp-header>
		<br>
		<wp-item>
			<p class="hint">{{isInputDisabled ? '启用' : '禁用'}}表单</p>
			<wp-switch v-model="isInputDisabled" theme="small"/>
		</wp-item>
		<br>
		<wp-field type="text" label="昵称" placeholder="请输入昵称，最多10个字" v-model="nickName" :disabled="!isInputDisabled" :class="{'disabled': !isInputDisabled}"  :maxlength="10" />
		<wp-field type="textarea" label="个人简介" placeholder="请输入个人简介，textarea自动增高" v-model="introduction" :disabled="!isInputDisabled" :class="{'disabled': isInputDisabled}" :maxlength="100"/>
	</div>
</template>

<script>
    export default {
      data () {
        return {
          nickName: '',
          introduction: '',
          isInputDisabled: true,
        }
      }
    }
</script>

<style type="text/scss" lang="scss">
	.page-components-field .container {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: white;
		padding: 10px;
		.hint {
			color: #aaa;
			font-size: 13px;
		}
	}
</style>
