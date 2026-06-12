<script setup lang="ts">
const { data, error, pending } = await useFetch('/api/pages/one', {
  query: {
    permalink: '/',
  },
})

if (error.value || !data.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Home page not found',
  })
}

const page = computed(() => data.value)
const blocks = computed(() => page.value?.blocks || [])
</script>

<template>
  <div v-if="pending">Loading...</div>

  <div v-else>
    <PageBuilder :sections="blocks" />
  </div>
</template>