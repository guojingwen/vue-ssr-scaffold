<template>
	<header class="wp-header" :class="{'is-blue': isBlue}">
		<a class="navbar-left" :class="{'has-text': backText}" @click="goBack">
			<slot name="left">
				<i class="go-back-btn">{{backText}}</i>
			</slot>
		</a>
		<div class="navbar-title">
			<h1 class="title has-arrow" v-if="isCircle" @click="toggleSelectModeModal"
				:class="{'up-arrow': showSelectModal, 'down-arrow': !showSelectModal}">
				{{title}}
				<span class="arrow-area-block"></span>
			</h1>
			<h1 class="title" v-else-if="tagType === 'h1'">{{title}}</h1>
			<h2 class="title" v-else>{{title}}</h2>
		</div>
		<a class="navbar-right" v-show="reversedMenus.length || $slots.right">
			<slot name="right">
				<span class="navbar-text" v-for="(item, index) in reversedMenus" @click="go (item, index)" :key="index">
					<template v-if="item.iconType !== 'more'">
						<i :class="item.iconType ? `icon icon-${item.iconType}` : ''"></i>
						<span v-if="item.text" :class="(item.iconType && item.text) ? 'both' : ''"
							  :style="item.color ? `color: ${item.color};` : '' ">{{item.text}}</span>
						<i class="dot-tip" v-if="item.redDot">{{item.redDot | dotFilter}}</i>
					</template>
					<template v-else>
						<i class="point" v-for="i in 3" :key="i" />
					</template>
				</span>
			</slot>
		</a>
	</header>
</template>

<script>
/**
 * @example
 *      单个菜单 <wp-header :is-search="true" icon-type="mail" red-dot="7" path="/message" />
 *      多个菜单 <wp-header title="标题" :menus="menus"/>
 *          menus = [{iconType, text, color, redDot, path}]
 *      iconType 可能的值 mail search refresh help more
 *      backText 返回的文字 默认支持三个字宽度
 *      callback: 事件 点击菜单后的回调 ，返回菜单的角标
 */
export default {
  name: 'wp-header',
  props: {
    isCircle: {
      type: Boolean,
      default: false
    },
    isBlue: {
          	type: Boolean,
      default: false
    },
    showSelectModal: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '标题'
    },
    tagType: {
      type: String,
      default: 'h2'
    },
    iconType: String,
    color: String,
    text: String,
    redDot: Number,
    path: String,
    menus: Array,
    backText: String,
  },
  computed: {
    reversedMenus: function () {
      if (Array.isArray(this.menus) && this.menus.length) {
        return this.menus
      } else if (this.iconType || this.text) {
        return [{
          iconType: this.iconType,
          text: this.text,
          color: this.color,
          redDot: this.redDot,
          path: this.path
        }]
      } else {
        return []
      }
    }
  },
  filters: {
      	dotFilter (value) {
      	    return value <= 99 ? value : '99+'
    }
  },
  methods: {
    goBack () {
      if (this.$listeners.back) {
        return this.$emit('back')
      }

      if (this.$slots.left) {
        return
      }

      this.$router.go(-1)
    },
    go (item, index) {
      this.$emit('callback', index)
      if (item.path) {
        this.$router.push(item.path)
      }
    },
    toggleSelectModeModal () {
      this.$emit('showSelectModeModal')
    },
  }
}
</script>

<style lang="scss" type="text/scss">
	@import '../scss/common/_theme.scss';
	@import '../scss/common/_mixins.scss';

	.wp-header {
		@include myBorders((B), $color-gray-bd, $color-white-bg);
		height: 44px;
		display: flex;
		box-sizing: border-box;
		justify-content: space-between;
		z-index: $header-z;
		position: relative;

		&.is-blue {
			background: $color-blue-cr-lighter;

			.title {
				color: $color-white;
			}
			.go-back-btn {
				background-image: url("#{$imgPath}header/go-white.png");
			}
		}

		.navbar-left,
		.navbar-right {
			box-sizing: border-box;
			height: 44px;
			@include flex-ver-hor-center();
			position: relative;
			z-index: $header-z + 1;
			background-color: transparent;
		}
		.navbar-left {
			width: 44px;
			&.has-text {
				width: 75px;
				padding-left: 10px;
				.go-back-btn {
					width: 65px;
					background-position: left;
					text-indent: 12px;
					line-height: 44px;
					font-style: normal;
				}
			}
		}
		.navbar-right {
			box-sizing: border-box;
			min-width: 44px;
			position: relative;
			&:active {
				.point {
					background-color: $color-orange-btn-active;
				}
			}
			.point {
				position: absolute;
				width: 3px;
				height: 3px;
				border-radius: 50%;
				top: 50%;
				left: 50%;
				margin-left: -2.5px;
				margin-top: -1.5px;
				background-color: $color-gray-font-darker;
				&:nth-child(2) {
					margin-left: -8.5px;
				}
				&:nth-child(3) {
					margin-left: 3.5px;
				}
			}
			.dot-tip {
				position: absolute;
				right: 0;
				top: 7px;
				background-color: $color-red-bg;
				border-radius: 20px;
				color: $color-white;
				font-size: 12px;
				min-width: 10px;
				text-align: center;
				padding: 0 4px;
				font-style: normal;
				height: 18px;
				@include flex-ver-center();
				transform: scale(.75);
			}
			$icon: icon;
			.#{$icon} {
				display: inline-block;
				vertical-align: middle;
				width: 20px;
				height: 20px;
				background-repeat: no-repeat;
				background-size: cover;
				background-position: center center;
			}
			.#{$icon}-search {
				width: 21px;
				height: 21px;
				background-image: url("#{$imgPath}icon/search.png");
				background-size: contain;
			}
			.#{$icon}-mail {
				width: 28px;
				height: 28px;
				background-image: url("#{$imgPath}header/msg.png");
			}
			.#{$icon}-refresh {
				background-size: 16px 16px;
				background-image: url("#{$imgPath}header/icon-refresh.png");
			}
			.#{$icon}-help {
				width: 17px;
				height: 17px;
				background-image: url("#{$imgPath}header/icon-help-header.png");
			}
            .#{$icon}-share {
				background: url('#{$imgPath}header/share-icon.png') no-repeat;
                background-position: center;
                background-size: 16px 16px;
			}
			.#{$icon}-home-search {
				background-size: 19px 19px;
				background-image: url("#{$imgPath}header/icon-head-search.png");
			}
			.#{$icon}-home-message {
				width: 21px;
				background-size: 21px 17px;
				background-image: url("#{$imgPath}header/icon-head-message.png");
			}
		}
		.navbar-text {
			width: 44px;
			height: 100%;
			@include flex-ver-hor-center();
			position: relative;
			font-size: 14px;
			color: $color-gray-font-darker;
			&.deactive {
				color: $color-gray-light;
			}
			&.active {
				color: $color-blue-bg;
			}
		}
		.navbar-title {
			position: absolute;
			width: 100%;
			height: 44px;
			@include flex-ver-hor-center();
			font-size: 20px;
			color: $color-gray-dark;
			user-select: none;
			left: 0;
			top: 0;
			.title {
				font-size: 18px;
				font-weight: normal;
				margin: 0 46px;
				text-align: center;
				position: relative;
				@include text-overflow();
				&.has-arrow {
					overflow: visible;
					.arrow-area-block {
						width: 20px;
						height: 44px;
						opacity: 0;
						position: absolute;
						right: -20px;
						top: 0;
					}

					&:after {
						content: '';
						display: block;
						width: 8px;
						height: 4px;
						position: absolute;
						right: -10px;
						top: 50%;
						margin-top: -2px;
					}
				}
				&.down-arrow:after {
					background: url("#{$imgPath}down-arrow.png") no-repeat;
					background-size: 100% 100%;
				}
				&.up-arrow:after {
					background: url("#{$imgPath}up-arrow.png") no-repeat;
					background-size: 100% 100%;
				}
			}
		}
		.go-back-btn {
			display: block;
			width: 44px;
			height: 100%;
			background: url("#{$imgPath}header/go-back.png") no-repeat;
			background-position: center;
			background-size: 20px 20px;
		}
	}
</style>
