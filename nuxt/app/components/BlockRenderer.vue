<script setup lang="ts">
import type { PageBlock } from '#shared/types/schema'

defineProps<{
  blocks: PageBlock[]
}>()
</script>

<template>
  <div>
    <ResolveBlock
      v-for="(block, i) in blocks"
      :key="block.id || i"
      :block="block"
    />
  </div>
</template>