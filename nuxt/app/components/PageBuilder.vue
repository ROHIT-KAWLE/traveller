<script setup lang="ts">
import type { PageBlock } from '#shared/types/schema'

const props = defineProps<{
  sections: PageBlock[]
}>()

// Blocks that must NOT be wrapped in a Container (need full viewport width)
const fullBleedCollections = ['block_hero']

const validBlocks = computed(() => {
  return (props.sections || []).filter((block) => {
    return block?.collection && block?.item
  })
})
</script>

<template>
  <div v-for="block in validBlocks" :key="block.id">
    <!-- Full-bleed blocks (hero) get no Container wrapper -->
    <template v-if="fullBleedCollections.includes(block.collection)">
      <ResolveBlock :block="block" />
    </template>
    <!-- All other blocks are wrapped in a Container with vertical padding -->
    <template v-else>
      <Container class="py-12 md:py-20">
        <ResolveBlock :block="block" />
      </Container>
    </template>
  </div>
</template>