<template>
    <div class="wp-no-data">
        <i></i>
        <div class="no-data-text" v-html="text"></div>
        <slot name="button-login"></slot>
    </div>
</template>

<script>
export default {
  name: 'wp-no-data',
  props: {
    text: ''
  },
  mounted () {
    // todo 头部1px的底边线 及 ios app单独处理
  }
}
</script>

<style type="text/scss" lang="scss">
@import '../scss/common/_theme.scss';
@import '../scss/common/_mixins.scss';

.wp-no-data {
    flex: 1;
    background: $color-white-bg;
    text-align: center;
    color: $color-gray-font;
    font-size: 14px;
    height: 100%;
    i {
        @media (max-width: 320px) {
            margin-top: 60px;
        }
        margin-top: 100px;
        @include i-mixin-ico("#{$imgPath}icon/page-not-allowed.png", 115.5, 115);
    }
    .no-data-text {
        margin-top: 30px;
    }
    .button-login{
        display: inline-block;
        padding: 10px 33px;
        margin-top: 20px;
        font-size: 14px;
        color: $color-white;
        text-align: center;
        vertical-align: middle;
        background-color: $color-blue-cr-lighter;
        border-radius: 100px;
    }
}
</style>
