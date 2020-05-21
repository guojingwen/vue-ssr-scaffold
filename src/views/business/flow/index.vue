<template>
    <div class="page-theme">
        <wp-header tag-type="h1" title="武侠小说"></wp-header>
        <wp-test></wp-test>
        <wp-scroll :loadMore="loadMore" :loading="data._hasData" v-show="states.loading || data.list.length">
            <ul class="content">
                <li class="item" v-for="(item, index) in data.list" :key="index">
					          <span>{{item.title}}</span>
                    <span>{{item.content}}</span>
                </li>
            </ul>
        </wp-scroll>
        <wp-no-data text="暂无内容" v-show="!states.loading && !data.list.length" />
    </div>
</template>

<script>
import {flowModule, BOOKS} from './store'
const name = flowModule.name
const path = `${name}/${BOOKS}`

const states = {
  loading: false,
}

const getData = (app, store) => store.dispatch(path, [{}, states]).then(res => {
  // 这里可做一些数据处理
  store.commit(path, res)
})

export default {
  asyncData: ({app, store}) => getData(app, store),
  htmlHeadConfig: { // 给搜索引擎爬虫用的
    title: '热门武侠 _warmplace.cn',
    description: '武侠小说描述 warmplace.cn',
    keywords: '武侠、金庸、浪迹天涯'
  },
  data () {
    return {
      data: this.$store.getters[path],
      states,
      activities: [
        {text: '待开始', class: 'tostart'},
        {text: '进行中', class: 'starting'},
        {text: '已结束', class: 'end'},
      ]
    }
  },
  methods: {
    loadMore () {
      if (this.data._hasData && !this.states.loading) getData(this, this.$store)
    },
  }
}
</script>

<style type="text/scss" lang="scss">
@import '../../../scss/common/_theme.scss';
@import '../../../scss/common/_mixins.scss';

.page-theme {
    .content{
        background-color: $color-white-bg;
    }
    .item {
        padding: 20px 12px;
        display: flex;
        line-height: 1.5;
        flex-direction: column;
        @include myBorders((B));
        span {
            &:nth-of-type(1) {
                font-size: 16px;
                @include text-overflow();
            }
            &:nth-of-type(2) {
                font-size: 14px;
                color: #9F9F9F;
                @include line-num-overflow(3);
            }
        }
    }
}
</style>
