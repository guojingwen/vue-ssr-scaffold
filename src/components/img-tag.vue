<template>
	<img :src="src" @error.once="imgLoadErr(errorUrl)" @click="$emit('click')">
</template>

<script>
export default {
  name: 'wp-img-tag',
  props: {
    errorUrl: String,
    src: String
  }
}
</script>
