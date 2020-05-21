<template>
	<div class="page-components">
		<wp-header title="元素组件"></wp-header>
		<wp-scroll>
			<br>
			<wp-item hasRight @click="$router.push(item.path)" v-for="item, index in list" :key="index">{{item.name}}</wp-item>
		</wp-scroll>
	</div>
</template>

<script>
export default {
  data () {
    return {
      list: [
        {name: 'button', path: '/button'},
        {name: 'checkbox', path: '/checkbox'},
        {name: 'switch', path: '/switch'},
        {name: 'field', path: '/field'},
        {name: 'item', path: '/item'},
        {name: 'tabbar', path: '/tabbar'},
        {name: 'header', path: '/header'},
      ]
    }
  }
}
</script>
