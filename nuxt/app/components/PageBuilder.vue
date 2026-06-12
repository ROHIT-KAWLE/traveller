<script setup lang="ts">
import type { PageBlock } from '#shared/types/schema'


const props = defineProps<{
  sections: PageBlock[]
}>()

const validBlocks = computed(() => {
  return (props.sections || []).filter((block) => {
    return block?.collection && block?.item
  })
})
</script>

<template>
  <div v-for="block in validBlocks" :key="block.id">
    <BaseBlock :block="block" />
  </div>
</template>