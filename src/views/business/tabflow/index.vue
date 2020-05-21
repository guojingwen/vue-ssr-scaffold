<template>
	<div class="page-business-tabflow">
		<wp-header :title="`${cTitle}的内容`" />
		<wp-test></wp-test>
		<wp-tabbar :list="tabs" v-model="selectIndex" @click="switchTab" class="border-bottom"/>

		<wp-scroll :loading="data._hasData" :loadMore="loadMore" loadText="努力加载中" v-show="states.loading || data.list.length">
			<div class="item" v-for="(item,index) in data.list" :key="index">
				{{item.title || item.name}}
			</div>
		</wp-scroll>
		<wp-no-data :text="tabs[selectIndex].noDataText" v-show="!states.loading && !data.list.length && data.pageIndex" />
	</div>
</template>

<script>
import {shareCompModule, SELECT_INDEX, MARTIAL_ARTS, MAGIC_WEAPON, LEADROLES} from './shareCompStore'
import {tabflowModule, SELECT_INDEX_OTHER, OTHER_MARTIAL_ARTS, OTHER_MAGIC_WEAPON, OTHER_LEADROLES} from './store'
let selectIndexPath = `${shareCompModule.name}/${SELECT_INDEX}`

const states = {
  loading: false
}
let tabs, params = {}

const initData = (userId) => {
  const isOther = !!userId
  const paths = [[MARTIAL_ARTS, MAGIC_WEAPON, LEADROLES], [OTHER_MARTIAL_ARTS, OTHER_MAGIC_WEAPON, OTHER_LEADROLES]]
  if (isOther) {
    selectIndexPath = `${tabflowModule.name}/${SELECT_INDEX_OTHER}`
  }

  tabs = [
    {text: '秘籍', noDataText: '您还没有获得秘籍'},
    {text: '法宝', noDataText: '暂无数据'},
    {text: '角色', noDataText: '暂无数据'}]
  tabs.forEach((item, i) => {
    item.path = `${isOther ? tabflowModule.name : shareCompModule.name}/${paths[Number(isOther)][i]}`
  })
  if (isOther) {
    params.userId = userId
  }

  return {
    isOther,
    tabs,
    params,
  }
}

const getData = (app, store) => {
  let index = store.getters[selectIndexPath]
  return store.dispatch(
    tabs[index].path, [Object.assign({}, params
    ), states]).then(res => {
    // 这里可以对数据进行一些格式化处理
    store.commit(tabs[index].path, res)
  })
}

export default {
  asyncData ({app, store, route}) {
    initData(route.params.userId)
    return getData(app, store)
  },
  data () {
    return Object.assign({
      states,
    }, initData(this.$route.params.userId))
  },

  methods: {
    switchTab (item, index) {
      if (this.states.loading || index === this.selectIndex) return
      this.$store.commit(this.tabs[this.selectIndex].path, {pageIndex: 0, list: [], _hasData: true})
      this.$store.commit(selectIndexPath, index)
      Bus.$emit('scrollTo', true)
      getData(this, this.$store)
    },
    loadMore () { // scroll触发
      if (this.data._hasData && !this.states.loading) getData(this, this.$store)
    },
  },
  computed: {
    data () {
      return this.$store.getters[this.tabs[this.selectIndex].path]
    },
    selectIndex () {
      if (this.isOther) {
        selectIndexPath = `${tabflowModule.name}/${SELECT_INDEX_OTHER}`
      } else {
        selectIndexPath = `${shareCompModule.name}/${SELECT_INDEX}`
      }
      return this.$store.getters[selectIndexPath]
    },
			  cTitle () {
      if (this.isOther) {
        return this.$route.params.userId
					 } else {
        return '我'
					 }
    }
  },
  watch: {
    '$route' (to, from) {
      Bus.$emit('toReload')
    }
  },
}
</script>

<style type="text/scss" lang="scss">
	@import '../../../scss/common/_theme.scss';
	@import '../../../scss/common/_mixins.scss';

	.page-business-tabflow {
		.item {
			height: 60px;
			line-height: 60px;
			padding: 10px 12px;
			text-align: center;
			@include myBorders((B));
		}
	}
</style>
