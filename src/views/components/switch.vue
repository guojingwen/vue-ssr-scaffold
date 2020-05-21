<template>
	<div class="page-components-switch">
		<wp-header title="switch"></wp-header>
		<br>
		<wp-item>
			<p class="hint">状态: {{isChoose}}</p>
			<wp-switch v-model="isChoose" />
		</wp-item>
		<br>
		<wp-item>
			<p class="hint">状态: {{isChoose2}}</p>
			<wp-switch v-model="isChoose2" theme="small"/>
		</wp-item>
	</div>
</template>

<script>
export default {
  data () {
    return {
      isChoose: true,
      isChoose2: 1
    }
  }
}
</script>
