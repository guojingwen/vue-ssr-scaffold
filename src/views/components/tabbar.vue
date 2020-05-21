<template>
	<div class="page-components-tabbar">
		<wp-header title="tabbar"></wp-header>
		<br>
		<wp-tabbar v-model="selectIndex" :list="list" @click="switchTab" class="border-bottom" />
		<br>
		<wp-tabbar v-model="selectIndex2" :list="list2" @click="switchTab2" class="border-v" />

	</div>
</template>

<script>
export default {
  data () {
    return {
      selectIndex: 0,
      list: [
        {text: '我的问答'},
        {text: '我的提问'},
      ],
      selectIndex2: 2,
      list2: [
        {text: '已回答'},
        {text: '已围观'},
        {text: '已超时'},
        {text: '已拒绝'},
      ]
    }
  },
  methods: {
    switchTab (item, index) {
      this.selectIndex = index
    },
    switchTab2 (item, index) {
      this.selectIndex2 = index
    }
  }
}
</script>

<style type="text/scss" lang="scss">
	@import '../../scss/common/theme';
	@import '../../scss/common/mixins';

	.page-components-tabbar {
		.border-v {
			@include myBorders((T,B));
		}
		.border-bottom {
			@include myBorders((B));
		}
	}
</style>
