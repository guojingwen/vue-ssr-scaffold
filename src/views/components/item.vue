<template>
	<div class="page-components-item">
		<wp-header title="item"></wp-header>

		<wp-scroll>
			<br>
			<wp-item>
				<p class="hint">状态: {{isChoose}}</p>
				<wp-switch v-model="isChoose" theme="small"/>
			</wp-item>
			<br>
			<wp-item iconClass="money-ico">
				分佣总收入已达<span class="money">88.88元</span>
			</wp-item>
			<br>
			<wp-item :iconClass="item.icon" hasRight v-for="(item, index) in list" v-if="!item.isNo" @click="go" :key="index">
				{{item.text}}
				<div class="extra">{{item.extra}}</div>
			</wp-item>
		</wp-scroll>
	</div>
</template>

<script>
export default {
  data () {
    return {
      isChoose: false,
      list: [
        {text: '我的内容', extra: '我发表的文章、回复、评论', icon: 'tiezi-ico'},
        {text: '我的问答', extra: '我解答、围观的问答', icon: 'answer-ico'},
      ],
    }
  },
  methods: {
    go () {
      console.log('跳转')
    }
  }
}
</script>

<style type="text/scss" lang="scss">
	@import '../../scss/common/_theme.scss';
	@import '../../scss/common/_mixins.scss';
	.page-components-item {
		.money-ico {
			width: 17px;
			height: 17px;
			background-image: url("#{$imgPath}user/money-ico.png");
		}
		.tiezi-ico {
			width: 14px;
			height: 15px;
			background-image: url("#{$imgPath}user/mytiezi-ico.png");
		}
		.answer-ico {
			width: 14px;
			height: 17px;
			background-image: url("#{$imgPath}user/answer-ico.png");
		}

		.money {
			margin: 0 6px;
			color: #EE6723;
		}
		.extra {
			font-size: 12px;
			color: $color-gray-font;
			float: right;
			padding-right: 12px;
			max-width: 58%;
			@include text-overflow();
		}
	}
</style>
