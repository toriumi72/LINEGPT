<script setup lang="ts">
// const talkWith = await import('~/assets/talkWith.json')
// console.log(talkWith)

const test = ref(0)

const onCount = async () => {
  const { data } = await useFetch('/api/test')
  if (data.value) {
    test.value = data.value.count
  }
}
</script>

<template>
  <div>
    <button @click="onCount">Count</button>
    <p>Current Count: {{ test }}</p>
  </div>
</template>

<style scoped>

</style>
