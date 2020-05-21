<template>
    <div class="pg-login">
        <wp-button class="it" type="primary" @click="doLogin">点击模拟登录</wp-button>
    </div>
</template>

<script>
import {getCookie, delCookie, setCookie} from '../util/cookies'
export default {
  methods: {
    doLogin (e) {
      setTimeout(() => { // 假设这是一个ajax请求
        // 此时调用登录接口返回成功
        setCookie('__wpt', 'my-authentication');
        this.$router.replace(decodeURIComponent(this.$route.query.target || '/'))
      }, 1000)
    }
  },
  mounted () {
    if (getCookie('__wpt')) {
      delCookie('__wpt')
    }
  }
};
</script>

<style lang="scss" type="text/scss">
.pg-login {
    padding: 50px 12px;
    display: flex;
    align-items: center;
    .wp-button .wp-button--primary {
        width: 50%;
    }
}
</style>
